---
title: "HMAC"
---

# HMAC

This packages supports HMAC with the included secure hash algorithms: SHA-1, SHA-224, SHA-256, SHA_384, SHA-512.

```ts
import { hmac } from "@oslojs/crypto/hmac";
import { SHA256 } from "@oslojs/crypto/sha2";

const mac = hmac(SHA256, key, message);
```

An alternative API is also available.

```ts
import { HMAC } from "@oslojs/crypto/hmac";
import { SHA512 } from "@oslojs/crypto/sha2";

const mac = new HMAC(SHA256, key);
mac.update(data1);
mac.update(data2);
const digest = mac.digest();
```
