import { bigIntFromBytes, concatenateBytes, DynamicBuffer, xor } from "@oslojs/binary";
import { constantTimeEqual } from "../subtle/index.js";
import {
	ASN1EncodableSequence,
	ASN1Null,
	ASN1ObjectIdentifier,
	ASN1OctetString,
	encodeASN1,
	encodeObjectIdentifier
} from "@oslojs/asn1";

import type { HashAlgorithm } from "../hash/index.js";

export function verifyRSASSAPKCS1v15Signature(
	publicKey: RSAPublicKey,
	hashObjectIdentifier: string,
	hashed: Uint8Array,
	signature: Uint8Array
): boolean {
	const s = bigIntFromBytes(signature);
	const m = powmod(s, publicKey.e, publicKey.n);
	const em = new Uint8Array(Math.ceil((publicKey.n.toString(2).length - 1) / 8));
	for (let i = 0; i < em.byteLength; i++) {
		em[i] = Number((m >> BigInt((em.byteLength - i - 1) * 8)) & 0xffn);
	}
	const t = encodeASN1(
		new ASN1EncodableSequence([
			new ASN1EncodableSequence([
				new ASN1ObjectIdentifier(encodeObjectIdentifier(hashObjectIdentifier)),
				new ASN1Null()
			]),
			new ASN1OctetString(hashed)
		])
	);
	if (em.byteLength < t.byteLength + 11) {
		return false;
	}
	const ps = new Uint8Array(em.byteLength - t.byteLength - 3).fill(0xff);
	const emPrime = new DynamicBuffer(0);
	emPrime.writeByte(0x00);
	emPrime.writeByte(0x01);
	emPrime.write(ps);
	emPrime.writeByte(0x00);
	emPrime.write(t);
	return constantTimeEqual(em, emPrime.bytes());
}

export function verifyRSASSAPSSSignature(
	publicKey: RSAPublicKey,
	Hash: HashAlgorithm,
	MGF1Hash: HashAlgorithm,
	saltLength: number,
	message: Uint8Array,
	signature: Uint8Array
): boolean {
	const s = bigIntFromBytes(signature);
	if (s < 0 || s >= publicKey.n) {
		return false;
	}
	const m = powmod(s, publicKey.e, publicKey.n);
	const maximalEMBits = publicKey.n.toString(2).length - 1;
	const em = new Uint8Array(Math.ceil((publicKey.n.toString(2).length - 1) / 8));
	for (let i = 0; i < em.byteLength; i++) {
		em[i] = Number((m >> BigInt((em.byteLength - i - 1) * 8)) & 0xffn);
	}

	const messageHash = new Hash();
	messageHash.update(message);
	const mHash = messageHash.digest();

	if (em.byteLength < mHash.byteLength + saltLength + 2) {
		return false;
	}
	if (em[em.byteLength - 1] !== 0xbc) {
		return false;
	}

	const db = em.slice(0, em.byteLength - mHash.byteLength - 1);
	const h = em.slice(em.byteLength - mHash.byteLength - 1, em.byteLength - 1);
	if (db[0] >> (8 - (8 * em.byteLength - maximalEMBits)) !== 0) {
		return false;
	}

	const dbMask = mgf1(MGF1Hash, h, em.byteLength - mHash.byteLength - 1);
	xor(db, dbMask);
	for (let i = 0; i < Math.floor((em.byteLength - mHash.byteLength - 1) / 8); i++) {
		db[i] = 0;
	}
	db[Math.floor((em.byteLength - mHash.byteLength - 1) / 8)] &=
		(1 << (8 - ((em.byteLength - mHash.byteLength - 1) % 8))) - 1;
	const salt = db.slice(db.byteLength - saltLength);
	const mPrime = new DynamicBuffer(8 + mHash.byteLength + saltLength);
	mPrime.write(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
	mPrime.write(mHash);
	mPrime.write(salt);
	const hPrimeHash = new Hash();
	hPrimeHash.update(mPrime.bytes());

	return constantTimeEqual(h, hPrimeHash.digest());
}

export class RSAPublicKey {
	public n: bigint;
	public e: bigint;

	constructor(n: bigint, e: bigint) {
		this.n = n;
		this.e = e;
	}
}

function mgf1(Hash: HashAlgorithm, Z: Uint8Array, l: number): Uint8Array {
	let T = new Uint8Array();
	let count = 0;
	while (T.byteLength < l) {
		const C = new Uint8Array(4);
		for (let j = 0; j < C.byteLength; j++) {
			C[j] = Number((count >> ((C.byteLength - j - 1) * 8)) & 0xff);
		}
		const zcHash = new Hash();
		zcHash.update(concatenateBytes(Z, C));
		T = concatenateBytes(T, zcHash.digest());
		count++;
	}
	return T.slice(0, l);
}

function powmod(x: bigint, y: bigint, p: bigint): bigint {
	let res = 1n; // Initialize result
	x = x % p;
	while (y > 0) {
		if (y % 2n === 1n) {
			res = euclideanMod(res * x, p);
		}
		y = y >> 1n;
		x = euclideanMod(x * x, p);
	}
	return res;
}

function euclideanMod(x: bigint, y: bigint): bigint {
	const r = x % y;
	if (r < 0n) {
		return r + y;
	}
	return r;
}
