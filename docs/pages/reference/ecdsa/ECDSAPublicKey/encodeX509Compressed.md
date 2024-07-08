---
title: "ECDSAPublicKey.encodeX509Compressed()"
---

# ECDSAPublicKey.encodeX509Compressed()

Encodes the public key with ASN.1 DER as specified in X.509 ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480)). The public key is compressed when using this API.

## Definition

```ts
function encodeX509Compressed(): Uint8Array;
```
