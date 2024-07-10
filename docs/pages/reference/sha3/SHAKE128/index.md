---
title: "SHAKE128"
---

# SHAKE128

Implements [`hash.Hash`](/reference/hash/Hash).

Synchronous implementation of SHAKE128 as specified in [NIST FIPS 202](https://csrc.nist.gov/pubs/fips/202/final).

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
