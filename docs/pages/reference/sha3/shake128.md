---
title: "shake128()"
---

# shake128()

Synchronously hashes data with SHAKE128 as specified in [NIST FIPS 202](https://csrc.nist.gov/pubs/fips/202/final).

## Definition

```ts
function shake128(size: number, data: Uint8Array): Uint8Array;
```

### Parameters

- `size`: Digest size in bytes.
- `data`
