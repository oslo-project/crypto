---
title: "decodeIEEEP1363ECDSASignature()"
---

# decodeIEEEP1363ECDSASignature()

Decodes an IEEE P1363 encoded signature, where its the concatenation of r and s.

Throws an error if the encoded bytes is invalid.

## Definition

```ts
//$ ECDSANamedCurve=/reference/ecdsa/ECDSANamedCurve
//$ ECDSAPublicKey=/reference/ecdsa/ECDSAPublicKey
function decodeIEEEP1363ECDSASignature(
	curve: $$ECDSANamedCurve,
	bytes: Uint8Array
): $$ECDSAPublicKey;
```

### Parameters

- `curve`
- `bytes`
