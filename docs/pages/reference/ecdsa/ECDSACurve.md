---
title: "ECDSACurve"
---

# ECDSACurve

Represents an ECDSA curve over a prime field.

**Methods and properties of this class are not considered public APIs.** They are not subject to semantic versioning and may change anytime. Only use this class to create custom prime curves to pass to other ECDSA APIs.

## Constructor

```ts
//$ Point=/reference/ecdsa/ECDSAPoint
function constructor(p: bigint, a: bigint, b: bigint, g: Point, n: bigint, size: number): this;
```

### Parameters

- `p`: This must be a prime. Setting this to non-primes can cause unexpected behaviors, including infinite loops.
- `a`: Coefficient of the elliptic curve
- `b`: Coefficient of the elliptic curve
- `g`: The base point
- `n`: Order of G
- `size`: Bit size of the curve (e.g. 256 for P-256)
