---
title: "generateRandomString()"
---

# `generateRandomString()`

Generates a random string of given length using the provided characters (`alphabet`). Uses cryptographically strong random values.

## Definition

```ts
//$ RandomReader=/reference/random/RandomReader
function generateRandomString(random: $$RandomReader, alphabet: string, length: number): string;
```

### Parameters

- `random`
- `alphabet`: A string with all possible characters

## Example

```ts
import { generateRandomString } from "@oslojs/crypto/random";

import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes) {
		crypto.getRandomValues(bytes);
	}
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 10-characters long string consisting of the upper case letters
const s = generateRandomString(random, alphabet, 10);
```
