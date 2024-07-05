---
title: "ECDSANamedCurve"
---

# ECDSANamedCurve

Represents an ECDSA curve over a prime field.

**Methods and properties of this class are not considered public APIs.** They are not subject to semantic versioning and may change anytime. Only use this class to create custom prime curves to pass to other APIs in this package.

## Constructor

```ts
function constructor(
	p: bigint,
	a: bigint,
	b: bigint,
	gx: bigint,
	gy: bigint,
	n: bigint,
	h: bigint,
	size: number,
	objectIdentifier: string
): this;
```

### Parameters

- `p`: This must be a prime. Setting this to non-primes can cause unexpected behaviors, including infinite loops.
- `a`: The coefficient of the elliptic curve.
- `b`: The coefficient of the elliptic curve.
- `gx`: The x coordinate of the base point (affine).
- `gy`: The y coordinate of the base point (affine).
- `n`: The order of G.
- `h`: The co-factor.
- `size`: The bit size of the curve in bytes (e.g. 32 for P-256).
- `objectIdentifier`: The dot notation object identifier. This must be unique to the curve.

## Example

```ts
// secp256r1 (p-256)
const p256 = new ECDSANamedCurve(
	0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn,
	0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn,
	0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn,
	0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
	0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n,
	0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n,
	1n,
	32,
	"1.2.840.10045.3.1.7"
);
```
