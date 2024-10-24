---
title: "generateRandomInteger()"
---

# `generateRandomInteger()`

Generates a random integer between 0 (inclusive) and a positive integer (exclusive).

## Definition

```ts
//$ RandomReader=/reference/random/RandomReader
function generateRandomInteger(random: $$RandomReader, max: bigint): bigint;
```

### Parameters

- `random`
- `max`: Must be greater than 1

## Example

```ts
import { generateRandomInteger } from "@oslojs/crypto/random";

import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes) {
		crypto.getRandomValues(bytes);
	}
};

// random number from 0 to 9
const i = generateRandomInteger(random, 10n);
```
