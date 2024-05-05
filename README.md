# @oslojs/crypto

A runtime-agnostic TypeScript library for basic cryptography, including APIs for:

- SHA-1
- SHA-2
- HMAC
- Cryptographically-secure random generator

Alongside [`@oslojs/encoding`]() and [`@oslojs/binary`](), it aims to provide a basic toolbox for implementing auth and auth-related standards.

```
npm i @oslojs/crypto
```

## Prerequisites

This package requires the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). This is available in most modern runtimes, including Node.js 20+, Deno, Bun, and Cloudflare Workers. The big exception is Node.js 16 and 18. Make sure to polyfill it using `webcrypto`.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when executing files.

```
node --experimental-global-webcrypto index.js
```

## Modules

### @oslojs/crypto/hmac

Synchronous implementation of HMAC.

```ts
import { hmac } from "@oslojs/crypto/hmac";
import { SHA256 } from "@oslojs/crypto/sha2";

const data: Uint8Array = new TextEncoder().encode("hello world");
const mac = hmac(SHA256, key, data);
```

### @oslojs/crypto/random

Cryptographically-secure random generators for generating random integers and strings.

```ts
import { generateRandomInteger, generateRandomString, alphabet } from "@oslojs/crypto/random";

const randomInt = generateRandomInteger(10);
const randomString = generateRandomString(10, alphabet("a-z", "A-Z"));
```

### @oslojs/crypto/sha1

Synchronous implementation of SHA-1.

```ts
import { sha1 } from "@oslojs/crypto/hash";

const data: Uint8Array = new TextEncoder().encode("hello world");
const hash = sha1(data);
```

### @oslojs/crypto/sha2

Synchronous implementation of SHA-2, including SHA-256, SHA-384, and SHA-512.

```ts
import { sha224, sha256, sha384, sha512 } from "@oslojs/crypto/sha2";

const data: Uint8Array = new TextEncoder().encode("hello world");
const hash = sha224(data);
const hash = sha256(data);
const hash = sha384(data);
const hash = sha512(data);
```

```ts
import { SHA256 } from "@oslojs/crypto/sha2";

const data: Uint8Array = new TextEncoder().encode("hello world");
const hash = new SHA256();
hash.update(data);
const result = hash.digest();
```

### @oslojs/crypto/subtle

Basic cryptography utilities.

```ts
import { constantTimeEqual } from "@oslojs/crypto/subtle";

const equal = constantTimeEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 0, 3]));
```
