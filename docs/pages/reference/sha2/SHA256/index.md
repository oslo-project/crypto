---
title: "SHA256"
---

# SHA256

Implements [`hash.Hash`](/reference/hash/Hash).

Synchronous implementation of SHA-256 as specified in [NIST FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).

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
