---
title: "generateRandomIntegerNumber()"
---

# `generateRandomIntegerNumber()`

Generates a random integer between 0 (inclusive) and a positive integer (exclusive). Uses cryptographically strong random values.

## Definition

```ts
//$ RandomReader=/reference/random/RandomReader
function generateRandomIntegerNumber(random: $$RandomReader, max: number): number;
```

### Parameters

- `random`
- `max`: Must be greater than 1 and less than or equal to `Number.MAX_SAFE_INTEGER`

## Example

```ts
import { generateRandomInteger } from "oslo/crypto";

// random number from 0 to 9
generateRandomInteger(random, 10);
```
