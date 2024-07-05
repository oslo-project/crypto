---
title: "verifyECDSASignature()"
---

# verifyECDSASignature()

Verifies an ECDSA signature against a hash.

## Definition

```ts
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
//$ ECDSASignature=/reference/ecdsa/ECDSASignature
function verifyECDSA(publicKey: $$ECDSAPublicKey, hash: Uint8Array, signature: $$ECDSASignature): boolean;
```

### Parameters

- `publicKey`
- `hash`: The hash should be of a size similar to that of the curve (e.g. SHA-256 for P-256, SHA-512 for SHA-521).
- `signature`

## Example

```ts
import { verifyECDSA, p256, ECDSAPublicKey } from "@oslojs/crypto/ecdsa";
import { sha256 } from "@oslojs/crypto/sha2";

const hash = sha256(new TextEncoder().encode("hello"));
const publicKey = new ECDSAPublicKey(p256, x, y);
const valid = verifyECDSA(publicKey, hash, r, s);
```
