---
title: "decodePKIXECDSAPublicKey()"
---

# decodePKIXECDSAPublicKey()

Decodes an ASN.1 DER encoded public key defined by PKIX ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480)).

Throws an error if the public key is invalid (including implicit and specified domain curve parameters) or if the curve is not included in the allowed curves.

## Definition

```ts
//$ ECDSANamedCurve=/reference/ecdsa/ECDSANamedCurve
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
function decodePKIXECDSAPublicKey(der: Uint8Array, curves: $$ECDSANamedCurve[]): $$ECDSAPublicKey;
```

### Parameters

- `der`
- `curves`: A list of allowed curves.

## Example

```ts
import { decodePKIXECDSAPublicKey, p256, p384 } from "@oslojs/crypto/ecdsa";

const publicKey = decodePKIXECDSAPublicKey(der, [p256, p384]);
if (publicKey.isCurve(p256)) {
	// ...
}
```
