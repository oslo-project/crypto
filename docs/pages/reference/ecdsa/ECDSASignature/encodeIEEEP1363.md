---
title: "ECDSASignature.encodeIEEEP1363()"
---

# ECDSASignature.encodeIEEEP1363()

Encodes the signature into r | s as specified in IEEE P1363.

Can throw if the (r, s) is larger than what's allowed in the curve.

## Definition

```ts
//$ ECDSACurve=/reference/ecdsa/ECDSACurve
function encodeIEEEP1363(curve: $$ECDSACurve): Uint8Array;
```

- `curve`
