---
title: "decodePKCS1RSAPublicKey()"
---

# decodePKCS1RSAPublicKey()

Decodes a PKCS#1 ASN.1 DER encoded public key as specified in [RFC 8017](https://datatracker.ietf.org/doc/html/rfc8017).

Throws an `Error` if the public key is invalid.

## Definition

```ts
//$ RSAPublicKey=/reference/rsa/RSAPublicKey
function decodePKCS1RSAPublicKey(pkcs1: Uint8Array): $$RSAPublicKey
```
