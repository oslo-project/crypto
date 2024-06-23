import { expect, test } from "vitest";
import { alphabet, generateRandomInteger } from "./index.js";

test("alphabet()", () => {
	expect(alphabet("0-9", "a-z", "A-Z", "-", "_")).toBe(
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
	);
});

test("generateRandomInteger()", () => {
	expect(generateRandomInteger(2n)).toBe(1n);
});
