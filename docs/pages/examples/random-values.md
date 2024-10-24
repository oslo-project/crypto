---
title: "Generating random values"
---

# Generating random values

Since this package attempts to reduce the biases involved, APIs can be comparatively slow. APIs that require a secure random source require an `RandomReader` implementation as its parameter. See [Defining a RandomReader](#defining-a-randomreader).

## Random integers

Use [`generateRandomInteger()`](/reference/random/generateRandomInteger) or [`generateRandomIntegerNumber()`](/reference/random/generateRandomIntegerNumber) to generate random integers between 0 (inclusive) and maximum (exclusive).

```ts
import { generateRandomInteger, generateRandomIntegerNumber } from "@oslojs/crypto/random";

// random number from 0 to 9
const num: bigint = generateRandomInteger(random, 10n);
const num: number = generateRandomIntegerNumber(random, 10);
```

## Random strings

Use [`generateRandomString()`](/reference/random/generateRandomString) to generate random strings with a predefined set of characters. This also requires a `RandomReader` function.

```ts
import { generateRandomString } from "@oslojs/crypto/random";

// 10-characters long string consisting of upper case letters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
generateRandomString(random, alphabet, 10);
```

## Defining a RandomReader

`RandomReader` should use a cryptographically secure random source.

### Using the global Web Crypto API

The Web Crypto API is globally available in most modern runtimes, including Node.js 20+, Bun, Deno, and Cloudflare Workers.

```ts
import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes: Uint8Array): void {
		crypto.getRandomValues(bytes);
	}
};
```

### Using Node's Crypto module

An implementation of the Web Crypto API can be imported in Node.js 18+.

```ts
import { webcrypto } from "node:crypto";

import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes: Uint8Array): void {
		webcrypto.getRandomValues(bytes);
	}
};
```

```ts
import { getRandomValues } from "node:crypto";

import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes: Uint8Array): void {
		getRandomValues(bytes);
	}
};
```

Use `fillRandomSync()` for older versions of Node.js.

```ts
import { fillRandomSync } from "node:crypto";

import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes: Uint8Array) {
		fillRandomSync(bytes);
	}
};
```
