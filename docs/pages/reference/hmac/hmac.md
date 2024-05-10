---
title: "hmac()"
---

# hmac()

Synchronously hashes data with HMAC, specified in [NIST FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final).

## Definition

```ts
//$ HashAlgorithm=/reference/hash/HashAlgorithm
function hmac(Algorithm: hash.$$HashAlgorithm, key: Uint8Array, message: Uint8Array): Uint8Array;
```

### Parameters

- `Algorithm`
- `key`
- `message`

## Example

```ts
import { hmac } from "@oslojs/crypto/hmac";
import { SHA256 } from "@oslojs/crypto/sha2";

const hash = hmac(SHA256, key, message);
```
