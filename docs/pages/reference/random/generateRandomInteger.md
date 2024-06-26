---
title: "generateRandomInteger()"
---

# `generateRandomInteger()`

Generates a random integer between 0 (inclusive) and a positive integer (exclusive). Uses cryptographically strong random values.

## Definition

```ts
function generateRandomInteger(max: bigint): bigint;
```

### Parameters

- `max`: Must be greater than 1

## Example

```ts
import { generateRandomInteger } from "oslo/crypto";

// random number from 0 to 9
generateRandomInteger(10n);
```
