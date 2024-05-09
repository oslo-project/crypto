---
title: "Generating random values"
---

# Generating random values

Since this package attempts to reduce the biases involved, APIs can be comparatively slow.

## Random integers

Use [`generateRandomInteger()`](/reference/random/generateRandomInteger) to generate random integers between 0 (inclusive) and maximum (exclusive).

```ts
import { generateRandomInteger } from "oslo/crypto";

// random number from 0 to 9
generateRandomInteger(10);
```

## Random strings

Use [`generateRandomString()`](/reference/random/generateRandomString) to generate random strings with a predefined set of characters.

```ts
import { generateRandomString, alphabet } from "oslo/crypto";

// 10-characters long string consisting of the lowercase alphabet and numbers
generateRandomString(10, alphabet("a-z", "0-9"));
```
