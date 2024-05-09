import { xor } from "@oslojs/binary";

import type { Hash, HashAlgorithm } from "../hash/index.js";

export class HMAC {
	private k0: Uint8Array;
	private inner: Hash;
	private outer: Hash;

	constructor(Algorithm: HashAlgorithm, key: Uint8Array) {
		const keyHash = new Algorithm();
		if (key.byteLength === keyHash.blockSize) {
			this.k0 = key;
		} else if (key.byteLength > keyHash.blockSize) {
			this.k0 = new Uint8Array(keyHash.blockSize);
			keyHash.update(key);
			this.k0.set(keyHash.digest());
		} else {
			this.k0 = new Uint8Array(keyHash.blockSize);
			this.k0.set(key);
		}

		this.inner = new Algorithm();

		const ipad = new Uint8Array(this.k0.byteLength).fill(0x36);
		xor(ipad, this.k0);
		this.inner.update(ipad);

		this.outer = new Algorithm();
		const opad = new Uint8Array(this.k0.byteLength).fill(0x5c);
		xor(opad, this.k0);
		this.outer.update(opad);
	}

	public update(message: Uint8Array): void {
		this.inner.update(message);
	}

	public digest(): Uint8Array {
		this.outer.update(this.inner.digest());
		return this.outer.digest();
	}
}

export function hmac(Algorithm: HashAlgorithm, key: Uint8Array, message: Uint8Array): Uint8Array {
	const mac = new HMAC(Algorithm, key);
	mac.update(message);
	return mac.digest();
}
