---
title: "Secure hash algorithms"
---

# Secure hash algorithms

This package currently supports: SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512.

```ts
import { sha1 } from "@oslojs/crypto/sha1";
import { sha256, sha224, sha384, sha512 } from "@oslojs/crypto/sha2";

const hash = sha1(message);
const hash = sha256(message);
```

An alternative API is also available.

```ts
import { SHA512 } from "@oslojs/crypto/sha2";

const hash = new SHA512();
hash.update(data1);
hash.update(data2);
const digest = hash.digest();
```
