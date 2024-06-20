---
title: "decodeSEC1PublicKey()"
---

# decodeSEC1PublicKey()

Decodes an SEC 1 encoded public key point. Supports both compressed and uncompressed variants. This does not validate that public key is on the curve.

Throws an error if the encoded bytes is invalid.

## Definition

```ts
//$ ECDSACurve=/ecdsa/main/ECDSACurve
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
function decodeSEC1PublicKey(curve: $$ECDSACurve, bytes: Uint8Array): $$ECDSAPublicKey;
```

### Parameters

- `curve`
- `bytes`
