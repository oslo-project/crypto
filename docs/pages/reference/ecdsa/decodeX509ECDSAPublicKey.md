---
title: "decodeX509ECDSAPublicKey()"
---

# decodeX509ECDSAPublicKey()

Decodes an ASN.1 DER encoded public key defined by X.509 ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480)).

Throws an error if the public key is invalid (including implicit and specified domain curve parameters) or if the curve is not included in the allowed curves.

## Definition

```ts
//$ ECDSANamedCurve=/reference/ecdsa/ECDSANamedCurve
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
function decodeX509ECDSAPublicKey(der: Uint8Array, curves: $$ECDSANamedCurve[]): $$ECDSAPublicKey;
```

### Parameters

- `der`
- `curves`: A list of allowed curves.

## Example

```ts
import { decodeX509ECDSAPublicKey, p256, p384 } from "@oslojs/crypto/ecdsa";

const publicKey = decodeX509ECDSAPublicKey(der, [p256, p384]);
if (publicKey.isCurve(p256)) {
	// ...
}
```
