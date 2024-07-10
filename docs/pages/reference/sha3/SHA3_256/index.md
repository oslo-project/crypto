---
title: "SHA3_256"
---

# SHA3_256

Implements [`hash.Hash`](/reference/hash/Hash).

Synchronous implementation of SHA3-256 as specified in [NIST FIPS 202](https://csrc.nist.gov/pubs/fips/202/final).

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
