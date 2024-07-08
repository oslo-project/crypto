---
title: "RSAPublicKey.encodePKIX()"
---

# RSAPublicKey.encodePKIX()

DER encodes the public key as ASN.1 `SubjectPublicKeyInfo` structure with an object identifier `pkcs-1 1` (1.2.840.113549.1.1.1).

## Definition

```ts
function encodePKIX(): Uint8Array;
```
