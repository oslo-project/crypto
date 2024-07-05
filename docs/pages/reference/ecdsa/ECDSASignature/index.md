---
title: "ECDSASignature"
---

# ECDSASignature

Represents an ECDSA signature.

## Constructor

```ts
function constructor(r: bigint, s: bigint): this;
```

### Parameters

- `r`: Must be a positive integer over 0
- `s`: Must be a positive integer over 0

## Methods

- [`encodeIEEEP1363()`](/reference/ecdsa/ECDSASignature/encodeIEEEP1363)
- [`encodeX509()`](/reference/ecdsa/ECDSASignature/encodeX509)

## Properties

```ts
interface Properties {
	r: bigint;
	s: bigint;
}
```

- `r`
- `s`
