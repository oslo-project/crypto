---
title: "verifyRSASSAPKCS1v15Signature()"
---

# verifyRSASSAPKCS1v15Signature()

Verifies an RSASSA-PKCS1-v1_5 signature.

## Definition

```ts
//$ RSAPublicKey=/reference/rsa/RSAPublicKey
function verifyRSASSAPKCS1v15Signature(
	publicKey: $$RSAPublicKey,
	hashObjectIdentifier: string,
	hashed: Uint8Array,
	message: Uint8Array
): boolean;
```

### Parameters

- `publicKey`
- `hashObjectIdentifier`: The object identifier of the hash algorithm used to hash the message.
- `hashed`
- `message`
