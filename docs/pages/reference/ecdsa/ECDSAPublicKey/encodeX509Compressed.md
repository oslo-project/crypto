---
title: "ECDSAPublicKey.encodePKIXCompressed()"
---

# ECDSAPublicKey.encodePKIXCompressed()

Encodes the public key with ASN.1 DER as specified in PKIX ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480)). The public key is compressed when using this API.

## Definition

```ts
function encodePKIXCompressed(): Uint8Array;
```
