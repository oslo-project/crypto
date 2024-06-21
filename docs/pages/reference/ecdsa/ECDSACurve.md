---
title: "ECDSACurve"
---

# ECDSACurve

Represents an ECDSA curve over a prime field.

**Methods and properties of this class are not considered public APIs.** They are not subject to semantic versioning and may change anytime. Only use this class to create custom prime curves to pass to other ECDSA APIs.

## Constructor

```ts
//$ ECDSAPoint=/reference/ecdsa/ECDSAPoint
function constructor(
	p: bigint,
	a: bigint,
	b: bigint,
	g: $$ECDSAPoint,
	n: bigint,
	size: number
): this;
```

### Parameters

- `p`: This must be a prime. Setting this to non-primes can cause unexpected behaviors, including infinite loops.
- `a`: Coefficient of the elliptic curve
- `b`: Coefficient of the elliptic curve
- `g`: The base point
- `n`: Order of G
- `size`: Bit size of the curve in bytes (e.g. 32 for P-256)

## Example

```ts
// secp256r1 (p-256)
const P = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn;
const A = 0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn;
const B = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn;
const G = new ECDSAPoint(
	0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
	0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n
);
const N = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
const SIZE = 32;
const p256 = new ECDSACurve(P, A, B, G, N, SIZE);
```
