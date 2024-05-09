---
title: "@oslojs/crypto documentation"
---

# @oslojs/crypto documentation

A runtime-agnostic JavaScript crypto library by [Oslo](https://crypto.oslojs.dev). Alongside [`@oslojs/encoding`]() and [`@oslojs/binary`](), it aims to provide a basic toolbox for implementing auth and auth-related standards.

## Installation

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
