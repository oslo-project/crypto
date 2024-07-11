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
