---
title: "Verify ECDSA signatures"
---

# Verify ECDSA signatures

Oslo provides a low-level API for verifying ECDSA signatures. While it should be fine for most cases, APIs are NOT constant time (hence only we only provide verification).

The code below extracts the public key from subject public key info and verifies an ASN.1 DER encoded signature using the P-256 curve with SHA-256.

```ts
import { verifyECDSA, p256 } from "@oslojs/crypto/ecdsa";
import { sha256 } from "@oslojs/crypto/sha2";
import { parseASN1 } from "@oslojs/asn1";

const hash = sha256(new TextEncoder().encode("hello world"));

// subject public key info
const parsedSPKI = parseASN1(spki);
// decode compressed/uncompressed public key
const publicKey = decodeSEC1PublicKey(p256, parsedSPKI.sequence().at(1).bitString().bytes);

const parsedSignature = parseASN1(derSignature);
const r = parsedSignature.sequence().at(0).integer().value;
const s = parsedSignature.sequence().at(1).integer().value;

const valid = verifyECDSA(publicKey, hash, r, s);
```

You can also decode the (r,s) values from the "raw" format, where the byte array is just a concatenation of r and s.

```ts
import { decodeIEEEP1363ECDSASignature, p256 } from "@oslojs/crypto/ecdsa";

const signature = decodeIEEEP1363ECDSASignature(p256, bytes);
const valid = verifyECDSA(publicKey, hash, signature.r, signature.s);
```
