---
title: "ECDSA"
---

# ECDSA

Oslo provides a low-level API for verifying ECDSA signatures. While it should be fine for most cases, APIs are NOT constant time (hence we only provide verification).

## Signature verification

**Implementations are not fully constant time.** This is fine for verification since both the signature and public key is intended to be public.

The API expects the message to be hashed before verification. For example, for ECDSA with P-256, the data is usually hashed with SHA-256.

Also see [Public key encoding](#public-key-encoding) and [Signature encoding](#signature-encoding) for commonly used encoding formats.

```ts
import { ECDSAPublicKey, ECDSASignature, p256, verifyECDSASignature } from "@oslojs/crypto/ecdsa";
import { sha256 } from "@oslojs/crypto/sha2";

const publicKey = new ECDSAPublicKey(p256, x, y);
const signature = new ECDSASignature(r, s);
const data = new TextEncoder().encode("hello world");
const hash = sha256(data);

const valid = verifyECDSASignature(publicKey, hash, signature);
```

This package provides all curves defined by NIST and SEC 2.

## Public key encoding

ECDSA public keys are a point on the elliptic curve, represented using the x and y coordinate.

### SEC 1

SEC 1 encodes the public key by concatenating the x and y coordinate in the uncompressed form, or just the x coordinate in the compressed form. Compressed keys are around 50% smaller but are much more computationally expensive to decode (relatively).

```ts
import { ECDSAPublicKey, p256 } from "@oslojs/ecdsa";

const publicKey = new ECDSAPublicKey(p256, x, y);
const uncompressed = publicKey.encodeSEC1Uncompressed();
const compressed = publicKey.encodeSEC1Compressed();
```

```ts
import { decodeSEC1ECDSAPublicKey } from "@oslojs/ecdsa";

try {
	const publicKey = decodeSEC1ECDSAPublicKey(p256, sec1);
} catch {
	// Invalid key
}
```

### X.509

X.509 elliptic curve public keys are encoded with ASN.1 DER. They hold the algorithm (ECDSA), curve, and the SEC encoded public key (either uncompressed or compressed).

```ts
import { ECDSAPublicKey, p256 } from "@oslojs/ecdsa";

const publicKey = new ECDSAPublicKey(p256, x, y);
const x509Uncompressed = publicKey.encodeX509Uncompressed();
const x509Compressed = publicKey.encodeX509Compressed();
```

```ts
import { decodeX509ECDSAPublicKey, p256 } from "@oslojs/ecdsa";

try {
	// Can be compressed or uncompressed.
	const publicKey = decodeX509ECDSAPublicKey(der, [p256]);
} catch {
	// Invalid key
}
```

You can pass multiple curves to `decodeX509ECDSAPublicKey()` if you accept multiple curves. Use `PublicKey.isCurve()` to compare curves.

```ts
import { decodeX509ECDSAPublicKey, p256, p384 } from "@oslojs/ecdsa";

try {
	// Can be compressed or uncompressed.
	const publicKey = decodeX509ECDSAPublicKey(der, [p256, p384]);
	if (publicKey.isCurve(p256)) {
		// ...
	}
} catch {
	// Invalid key
}
```

## Signature encoding

ECDSA signature is a pair of integers (r, s).

### IEEE P1363

Sometimes called the "raw" format, this just concatenates the r and s values.

```ts
import { ECDSASignature, p256 } from "@oslojs/p256";

const signature = new ECDSASignature(r, s);
const raw = signature.encodeIEEEP1363(p256);
```

```ts
import { decodeIEEEP1363ECDSASignature, p256 } from "@oslojs/p256";

try {
	const signature = decodeIEEEP1363ECDSASignature(p256, raw);
} catch {
	// Invalid signature
}
```

### X.509

ECDSA signatures in X.509 are ASN.1 DER encoded sequences.

```ts
import { ECDSASignature } from "@oslojs/p256";

const signature = new ECDSASignature(r, s);
const der = signature.encodeX509();
```

```ts
import { decodeX509ECDSASignature } from "@oslojs/p256";

try {
	const signature = decodeX509ECDSASignature(der);
} catch {
	// Invalid signature
}
```
