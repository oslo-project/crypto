---
title: "shake256()"
---

# shake256()

Synchronously hashes data with SHAKE256 as specified in [NIST FIPS 202](https://csrc.nist.gov/pubs/fips/202/final).

## Definition

```ts
function shake256(size: number, data: Uint8Array): Uint8Array;
```

### Parameters

- `size`: Digest size in bytes.
- `data`
