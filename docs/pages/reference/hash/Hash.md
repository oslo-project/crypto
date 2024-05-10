---
title: "Hash"
---

# Hash

## Definition

```ts
interface Hash {
	blockSize: number;
	size: number;

	update: (data: Uint8Array) => void;
	digest: () => Uint8Array;
}
```

## Methods

- `update()`: Writes to the current hash data
- `digest()`: Returns a hash

## Properties

- `blockSize`
- `size`
