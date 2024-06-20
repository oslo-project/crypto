import { describe, test, expect } from "vitest";
import {
	parseIEEEP1363ECDSASignatureBytes,
	verifyECDSA,
	parseSEC1PublicKeyBytes,
	p224,
	p256,
	p384,
	p521,
	secp256k1,
	ECDSAPublicKey,
	p192
} from "./index.js";
import { sha224, sha256, sha384, sha512 } from "../sha2/index.js";
import * as node from "node:crypto";
import { parseASN1NoLeftoverBytes } from "@oslojs/asn1";

describe("verifyECDSA()", () => {
	const data = new TextEncoder().encode("hello world");

	test("P-224 with SHA-224", async () => {
		const keyPair = node.generateKeyPairSync("ec", {
			namedCurve: "secp224r1"
		});
		const spki = keyPair.publicKey.export({
			type: "spki",
			format: "der"
		});
		const decodedSPKI = parseASN1NoLeftoverBytes(spki);
		const publicKey = parseSEC1PublicKeyBytes(p224, decodedSPKI.sequence().at(1).bitString().bytes);
		const signatureBytes = node.sign("SHA-224", data, {
			key: keyPair.privateKey,
			dsaEncoding: "ieee-p1363"
		});
		const signature = parseIEEEP1363ECDSASignatureBytes(p224, signatureBytes);
		expect(verifyECDSA(publicKey, sha224(data), signature.r, signature.s)).toBe(true);
	});

	test("P-256 with SHA-256", async () => {
		const webcryptoKeys = await crypto.subtle.generateKey(
			{
				name: "ECDSA",
				namedCurve: "P-256"
			},
			true,
			["sign", "verify"]
		);
		const signatureBytes = new Uint8Array(
			await crypto.subtle.sign(
				{
					name: "ECDSA",
					hash: "SHA-256"
				},
				webcryptoKeys.privateKey,
				data
			)
		);
		const publicKeyBytes = new Uint8Array(
			await crypto.subtle.exportKey("raw", webcryptoKeys.publicKey)
		);
		const publicKey = parseSEC1PublicKeyBytes(p256, publicKeyBytes);
		const signature = parseIEEEP1363ECDSASignatureBytes(p256, signatureBytes);
		expect(verifyECDSA(publicKey, sha256(data), signature.r, signature.s)).toBe(true);
	});

	test("P-384 with SHA-384", async () => {
		const webcryptoKeys = await crypto.subtle.generateKey(
			{
				name: "ECDSA",
				namedCurve: "P-384"
			},
			true,
			["sign", "verify"]
		);
		const signatureBytes = new Uint8Array(
			await crypto.subtle.sign(
				{
					name: "ECDSA",
					hash: "SHA-384"
				},
				webcryptoKeys.privateKey,
				data
			)
		);
		const publicKeyBytes = new Uint8Array(
			await crypto.subtle.exportKey("raw", webcryptoKeys.publicKey)
		);
		const publicKey = parseSEC1PublicKeyBytes(p384, publicKeyBytes);
		const signature = parseIEEEP1363ECDSASignatureBytes(p384, signatureBytes);
		expect(verifyECDSA(publicKey, sha384(data), signature.r, signature.s)).toBe(true);
	});

	test("P-521 with SHA-512", async () => {
		const webcryptoKeys = await crypto.subtle.generateKey(
			{
				name: "ECDSA",
				namedCurve: "P-521"
			},
			true,
			["sign", "verify"]
		);
		const signatureBytes = new Uint8Array(
			await crypto.subtle.sign(
				{
					name: "ECDSA",
					hash: "SHA-512"
				},
				webcryptoKeys.privateKey,
				data
			)
		);
		const publicKeyBytes = new Uint8Array(
			await crypto.subtle.exportKey("raw", webcryptoKeys.publicKey)
		);
		const publicKey = parseSEC1PublicKeyBytes(p521, publicKeyBytes);
		const signature = parseIEEEP1363ECDSASignatureBytes(p521, signatureBytes);
		expect(verifyECDSA(publicKey, sha512(data), signature.r, signature.s)).toBe(true);
	});

	test("secp256k1 with SHA-256", async () => {
		const keyPair = node.generateKeyPairSync("ec", {
			namedCurve: "secp256k1"
		});
		const spki = keyPair.publicKey.export({
			type: "spki",
			format: "der"
		});
		const decodedSPKI = parseASN1NoLeftoverBytes(spki);
		const publicKey = parseSEC1PublicKeyBytes(
			secp256k1,
			decodedSPKI.sequence().at(1).bitString().bytes
		);
		const signatureBytes = node.sign("SHA-256", data, {
			key: keyPair.privateKey,
			dsaEncoding: "ieee-p1363"
		});
		const signature = parseIEEEP1363ECDSASignatureBytes(secp256k1, signatureBytes);
		expect(verifyECDSA(publicKey, sha256(data), signature.r, signature.s)).toBe(true);
	});
});

test("parseSEC1PublicKeyBytes()", () => {
	let publicKey = new ECDSAPublicKey(p256, p256.g.x, p256.g.y);
	expect(parseSEC1PublicKeyBytes(p256, publicKey.sec1UncompressedBytes())).toStrictEqual(publicKey);

	publicKey = new ECDSAPublicKey(p192, p192.g.x, p192.g.y);
	expect(parseSEC1PublicKeyBytes(p192, publicKey.sec1CompressedBytes())).toStrictEqual(publicKey);

	publicKey = new ECDSAPublicKey(p224, p224.g.x, p224.g.y);
	expect(parseSEC1PublicKeyBytes(p224, publicKey.sec1CompressedBytes())).toStrictEqual(publicKey);

	publicKey = new ECDSAPublicKey(p256, p256.g.x, p256.g.y);
	expect(parseSEC1PublicKeyBytes(p256, publicKey.sec1CompressedBytes())).toStrictEqual(publicKey);

	publicKey = new ECDSAPublicKey(p384, p384.g.x, p384.g.y);
	expect(parseSEC1PublicKeyBytes(p384, publicKey.sec1CompressedBytes())).toStrictEqual(publicKey);

	publicKey = new ECDSAPublicKey(p521, p521.g.x, p521.g.y);
	expect(parseSEC1PublicKeyBytes(p521, publicKey.sec1CompressedBytes())).toStrictEqual(publicKey);
});
