---
title: "SHAKE256"
---

# SHAKE256

Implements [`hash.Hash`](/reference/hash/Hash).

Synchronous implementation of SHAKE256 as specified in [NIST FIPS 202](https://csrc.nist.gov/pubs/fips/202/final).

## Constructor

```ts
function constructor(size: number): this;
```

### Parameters

- `size`: Digest size in bytes.

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
