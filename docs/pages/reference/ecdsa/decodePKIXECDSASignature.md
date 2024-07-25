---
title: "decodePKIXECDSASignature()"
---

# decodePKIXECDSASignature()

Decodes an ASN.1 DER encoded signature.

Throws an error if the signature is invalid.

## Definition

```ts
//$ ECDSASignature=/reference/ecdsa/ECDSASignature
function decodePKIXECDSASignature(der: Uint8Array): $$ECDSASignature;
```

### Parameters

- `der`
