---
title: "ECDSASignature.encodeIEEEP1363()"
---

# ECDSASignature.encodeIEEEP1363()

Encodes the signature into r | s concatenation as specified in IEEE P1363.

Can throw if the (r, s) is larger than what's allowed in the curve.

## Definition

```ts
//$ ECDSANamedCurve=/reference/ecdsa/ECDSANamedCurve
function encodeIEEEP1363(curve: $$ECDSANamedCurve): Uint8Array;
```

### Parameters

- `curve`
