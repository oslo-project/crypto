import { expect, test } from "vitest";
import { sha512_224, SHA512_224 } from "./sha512_224.js";

test("SHA512_224", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(5 * 100));
	for (let i = 0; i < randomValues.byteLength / 5; i++) {
		const expected = sha512_224(randomValues.slice(0, i * 5));
		const hash = new SHA512_224();
		for (let j = 0; j < i; j++) {
			hash.update(randomValues.slice(j * 5, (j + 1) * 5));
		}
		expect(hash.digest()).toStrictEqual(expected);
	}
});
