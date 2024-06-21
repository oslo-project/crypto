---
title: "verifyECDSA()"
---

# verifyECDSA()

Verifies an ECDSA signature (r,s) against an hash.

## Definition

```ts
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
function verifyECDSA(publicKey: $$ECDSAPublicKey, hash: Uint8Array, r: bigint, s: bigint): boolean;
```

### Parameters

- `publicKey`
- `hash`: The hash should be of a size similar to that of the curve (e.g. SHA-256 for P-256, SHA-512 for SHA-521).
- `r`
- `s`

## Example

```ts
import { verifyECDSA, p256, ECDSAPublicKey } from "@oslojs/crypto/ecdsa";
import { sha256 } from "@oslojs/sha2";

const hash = sha256(new TextEncoder().encode("hello"));
const publicKey = new ECDSAPublicKey(p256, x, y);
const valid = verifyECDSA(publicKey, hash, r, s);
```
