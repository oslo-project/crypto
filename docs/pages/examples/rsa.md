---
title: "RSA"
---

# RSA

Oslo provides a low-level API for verifying RSA signatures.

## Signature verification

**Implementations are not fully constant time.** This is fine for verification since both the signature and public key is intended to be public.

Also see [Public key encoding](#public-key-encoding) for commonly used encoding formats.

## RSASSA-PKCS1-v1_5

`verifyRSASSAPKCS1v15Signature()` requires the message hash and the algorithm used for the hash. The package provides OIDs for SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512.

```ts
import {
	RSAPublicKey,
	verifyRSASSAPKCS1v15Signature,
	SHA256ObjectIdentifier
} from "@oslojs/crypto/rsa";
import { sha256 } from "@oslojs/crypto/sha2";

const publicKey = new RSAPublicKey(n, e);
const data = new TextEncoder().encode("hello world");
const hash = sha256(data);

const valid = verifyRSASSAPKCS1v15Signature(publicKey, SHA256ObjectIdentifier, hash, signature);
```

## RSASSA-PSS

`verifyRSASSASignature()` requires the message hash, the hash function used for the hashing the message, the MGF1 function hash (usually the same as the hash function), and the salt length.

```ts
import { RSAPublicKey, verifyRSASSASignature } from "@oslojs/crypto/rsa";
import { sha256, SHA256 } from "@oslojs/crypto/sha2";

const publicKey = new RSAPublicKey(n, e);
const data = new TextEncoder().encode("hello world");
const hash = sha256(data);

const valid = verifyRSASSASignature(publicKey, SHA256, SHA256, 32, hash, signature);
```

## Public key encoding

### PKCS#1

The public key is ASN.1 DER encoded.

```ts
import { RSAPublicKey } from "@oslojs/crypto/rsa";

const publicKey = new RSAPublicKey(n, e);
const pkcs1 = publicKey.encodePKCS1();
```

```ts
import { decodePKCS1RSAPublicKey } from "@oslojs/crypto/ecdsa";

try {
	const publicKey = decodePKCS1RSAPublicKey(pkcs1);
} catch {
	// Invalid key
}
```

### PKIX

The public key is an ASN.1 DER encoding of a `SubjectPublicKeyInfo` structure.

```ts
import { RSAPublicKey } from "@oslojs/crypto/rsa";

const publicKey = new RSAPublicKey(n, e);
const pkix = publicKey.encodePKIX();
```

```ts
import { decodePKIXRSAPublicKey } from "@oslojs/crypto/ecdsa";

try {
	const publicKey = decodePKIXRSAPublicKey(pkix);
} catch {
	// Invalid key
}
```
