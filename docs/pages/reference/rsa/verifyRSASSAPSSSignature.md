---
title: "verifyRSASSAPSSSignature()"
---

# verifyRSASSAPSSSignature()

Verifies an RSASSA-PSS signature using MGF1.

## Definition

```ts
//$ RSAPublicKey=/reference/rsa/RSAPublicKey
//$ HashAlgorithm=/reference/hash/HashAlgorithm
function verifyRSASSAPSSSignature(
	publicKey: $$RSAPublicKey,
	MessageHashAlgorithm: $$HashAlgorithm,
	MGF1HashAlgorithm: $$HashAlgorithm,
	saltLength: number,
	hashed: Uint8Array,
	signature: Uint8Array
): boolean;
```

### Parameters

- `publicKey`
- `MessageHashAlgorithm`: The hash algorithm used for hashing the message.
- `MGF1HashAlgorithm`: The hash algorithm used for MGF1 (usually the same as `MessageHashAlgorithm`).
- `saltLength`: The salt length in bytes.
- `hashed`
- `message`
