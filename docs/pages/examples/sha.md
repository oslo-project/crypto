---
title: "Secure hash algorithms"
---

# Secure hash algorithms

This package supports: SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, SHA-512/256, SHA3-224, SHA3-256, SHA3-384, SHA3-512, SHAKE128, and SHAKE256.

```ts
import { sha1 } from "@oslojs/crypto/sha1";
import { sha224, sha256, sha384, sha512, sha512_224, sha512_256 } from "@oslojs/crypto/sha2";
import { sha3_224, sha3_256, sha3_384, sha3_512, shake128, shake256 } from "@oslojs/sha3";

const hash = sha256(message);
```

An alternative API is also available.

```ts
import { SHA1 } from "@oslojs/crypto/sha1";
import { SHA224, SHA256, SHA384, SHA512, SHA512_224, SHA512_256 } from "@oslojs/crypto/sha2";
import { SHA3_224, SHA3_256, SHA3_384, SHA3_512, SHAKE128, SHAKE256 } from "@oslojs/sha3";

const hash = new SHA256();
hash.update(data1);
hash.update(data2);
const digest = hash.digest();
```
