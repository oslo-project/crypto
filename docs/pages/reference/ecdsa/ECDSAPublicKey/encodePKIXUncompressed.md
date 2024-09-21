---
title: "ECDSAPublicKey.encodePKIXUncompressed()"
---

# ECDSAPublicKey.encodePKIXUncompressed()

Encodes the public key with ASN.1 DER as specified in PKIX ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480)). The public key is uncompressed when using this API.

## Definition

```ts
function encodePKIXUncompressed(): Uint8Array;
```
