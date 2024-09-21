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
import { generateRandomString, alphabet } from "oslo/crypto";

// 10-characters long string consisting of the upper case letters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
generateRandomString(crypto.getRandomValues, alphabet, 10);
```
