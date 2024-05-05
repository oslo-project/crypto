import { expect, test } from "vitest";
import { SHA512 } from "./sha512.js";
import { concatenateBytes } from "@oslojs/binary";

test("SHA512", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(200));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const data = randomValues.slice(0, i);
		const hash = new SHA512();
		hash.update(data);
		const result = hash.digest();
		const expected = new Uint8Array(await crypto.subtle.digest("SHA-512", data));
		expect(result).toStrictEqual(expected);
	}
});

test("SHA512", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(100));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const a = randomValues.slice(0, i);
		for (let j = 0; j < randomValues.byteLength + 1; j++) {
			const b = randomValues.slice(0, j);
			const hash = new SHA512();
			hash.update(a);
			hash.update(b);
			const result = hash.digest();
			const expected = new Uint8Array(
				await crypto.subtle.digest("SHA-512", concatenateBytes(a, b))
			);
			expect(result).toStrictEqual(expected);
		}
	}
});
