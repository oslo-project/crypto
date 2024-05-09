---
title: "SHA224"
---

# SHA224

Implements [`hash.Hash`]().

Synchronous implementation of SHA-224 as specified in [NIST FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).

## Methods

- `digest()`
- `update()`

## Properties

```ts
interface Properties {
	blockSize: number;
	size: number;
}
```

- `blockSize`
- `size`
