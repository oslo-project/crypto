---
title: "ECDSAPublicKey"
---

# ECDSAPublicKey

Represents an ECDSA public key. It does not validate if the point is on the curve.

## Definition

```ts
//$ ECDSACurve=/reference/ecdsa/ECDSACurve
function constructor(curve: $$ECDSACurve, x: bigint, y: bigint): this;
```

### Parameters

- `curve`
- `x`
- `y`

## Methods

- [`encodeSEC1Compressed()`](/reference/ecdsa/ECDSAPublicKey/encodeSEC1Compressed)
- [`encodeSEC1Uncompressed()`](/reference/ecdsa/ECDSAPublicKey/encodeSEC1Uncompressed)

## Properties

```ts
interface Properties {
	curve: ECDSACurve;
	x: bigint;
	y: bigint;
}
```

- `curve`
- `x`
- `y`
