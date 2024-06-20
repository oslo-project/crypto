export { ECDSACurve, Point, p192, p224, p256, p384, p521, secp256k1 } from "./curve.js";

import { Point } from "./curve.js";
import { euclideanMod, inverseMod, shanksTonelli } from "./math.js";
import { bigIntBytes, bigIntFromBytes } from "@oslojs/binary";

import type { ECDSACurve } from "./curve.js";

export function verifyECDSA(
	publicKey: ECDSAPublicKey,
	hash: Uint8Array,
	r: bigint,
	s: bigint
): boolean {
	const q = new Point(publicKey.x, publicKey.y);
	if (!publicKey.curve.isOnCurve(q)) {
		return false;
	}
	if (publicKey.curve.multiply(bigIntBytes(publicKey.curve.n), q) !== null) {
		return false;
	}
	const e = hash.slice(0, publicKey.curve.size);
	const u1 = euclideanMod(bigIntFromBytes(e) * inverseMod(s, publicKey.curve.n), publicKey.curve.n);
	const u1G = publicKey.curve.multiply(bigIntBytes(u1), publicKey.curve.g);
	if (u1G === null) {
		return false;
	}
	const u2 = euclideanMod(r * inverseMod(s, publicKey.curve.n), publicKey.curve.n);
	const u2Q = publicKey.curve.multiply(bigIntBytes(u2), q);
	if (u2Q === null) {
		return false;
	}
	const coord1 = publicKey.curve.add(u1G, u2Q);
	if (coord1 === null) {
		return false;
	}
	return euclideanMod(r, publicKey.curve.n) === coord1.x;
}

export class ECDSAPublicKey {
	public curve: ECDSACurve;
	public x: bigint;
	public y: bigint;

	constructor(curve: ECDSACurve, x: bigint, y: bigint) {
		this.curve = curve;
		this.x = x;
		this.y = y;
	}

	public sec1UncompressedBytes(): Uint8Array {
		const bytes = new Uint8Array(1 + this.curve.size * 2);
		bytes[0] = 0x04;
		const xBytes = bigIntBytes(this.x);
		const yBytes = bigIntBytes(this.y);
		bytes.set(xBytes, 1 + this.curve.size - xBytes.byteLength);
		bytes.set(yBytes, 1 + this.curve.size);
		return bytes;
	}

	public sec1CompressedBytes(): Uint8Array {
		const bytes = new Uint8Array(1 + this.curve.size);
		if (this.y % 2n === 0n) {
			bytes[0] = 0x02;
		} else {
			bytes[0] = 0x03;
		}
		const xBytes = bigIntBytes(this.x);
		bytes.set(xBytes, 1 + this.curve.size - xBytes.byteLength);
		return bytes;
	}
}

export function parseSEC1PublicKeyBytes(curve: ECDSACurve, bytes: Uint8Array): ECDSAPublicKey {
	if (bytes.byteLength < 1) {
		throw new Error();
	}
	if (bytes[0] === 0x04) {
		if (bytes.byteLength !== curve.size * 2 + 1) {
			throw new Error();
		}
		const x = bigIntFromBytes(bytes.slice(1, curve.size + 1));
		const y = bigIntFromBytes(bytes.slice(curve.size + 1));
		return new ECDSAPublicKey(curve, x, y);
	}
	if (bytes[0] === 0x02) {
		if (bytes.byteLength !== curve.size + 1) {
			throw new Error();
		}
		const x = bigIntFromBytes(bytes.slice(1));
		const y2 = euclideanMod(x ** 3n + curve.a * x + curve.b, curve.p);
		const y = shanksTonelli(y2, curve.p);
		if (y % 2n === 0n) {
			return new ECDSAPublicKey(curve, x, y);
		}
		return new ECDSAPublicKey(curve, x, curve.p - y);
	}
	if (bytes[0] === 0x03) {
		if (bytes.byteLength !== curve.size + 1) {
			throw new Error();
		}
		const x = bigIntFromBytes(bytes.slice(1));
		const y2 = euclideanMod(x ** 3n + curve.a * x + curve.b, curve.p);
		const y = shanksTonelli(y2, curve.p);
		if (y % 2n === 1n) {
			return new ECDSAPublicKey(curve, x, y);
		}
		return new ECDSAPublicKey(curve, x, curve.p - y);
	}
	throw new Error("Unknown format");
}

export class ECDSASignature {
	public r: bigint;
	public s: bigint;

	constructor(r: bigint, s: bigint) {
		if (r < 1n || s < 1n) {
			throw new TypeError("Invalid signature");
		}
		this.r = r;
		this.s = s;
	}

	public ieeeP1363Bytes(curve: ECDSACurve): Uint8Array {
		const rs = new Uint8Array(curve.size * 2);
		const rBytes = bigIntBytes(this.r);
		if (rBytes.byteLength > curve.size) {
			throw new Error("'r' is too large");
		}
		const sBytes = bigIntBytes(this.r);
		if (rBytes.byteLength > curve.size) {
			throw new Error("'s' is too large");
		}
		rs.set(rBytes, curve.size - rBytes.byteLength);
		rs.set(sBytes, rs.byteLength - sBytes.byteLength);
		return rs;
	}
}

export function parseIEEEP1363ECDSASignatureBytes(
	curve: ECDSACurve,
	bytes: Uint8Array
): ECDSASignature {
	if (bytes.byteLength !== curve.size * 2) {
		throw new Error();
	}
	const r = bigIntFromBytes(bytes.slice(0, curve.size));
	const s = bigIntFromBytes(bytes.slice(curve.size));
	return new ECDSASignature(r, s);
}
