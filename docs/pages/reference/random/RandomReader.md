---
title: "RandomReader"
---

# RandomReader

## Definition

```ts
interface RandomReader {
	read(bytes: Uint8Array): void;
}
```

## Methods

- `read()`: Fills the given byte array with random bytes using a cryptographically secure random source. The function should throw if it fails to fill all the bytes.

## Example

```ts
import type { RandomReader } from "@oslojs/crypto/random";

const random: RandomReader = {
	read(bytes) {
		crypto.getRandomValues(bytes);
	}
};
```
