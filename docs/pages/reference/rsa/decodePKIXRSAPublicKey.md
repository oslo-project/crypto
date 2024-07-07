---
title: "decodePKIXRSAPublicKey()"
---

# decodePKIXRSAPublicKey()

Decodes a DER encoded ASN.1 `SubjectPublicKeyInfo` structure. Only object identifier `pkcs-1 1` (1.2.840.113549.1.1.1) is supported.

Throws an `Error` if the public key is invalid.

## Definition

```ts
//$ RSAPublicKey=/reference/rsa/RSAPublicKey
function decodePKCS1RSAPublicKey(pkcs1: Uint8Array): $$RSAPublicKey
```
