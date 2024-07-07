---
title: "RSAPublicKey"
---

# RSAPublicKey

Represents an

## Constructor

```ts
function constructor(n: bigint, e: bigint): this;
```

### Parameters

- `n`: Modulus
- `e`: Public exponent

## Methods

- [`RSAPublicKey.encodePKCS1()`](/reference/rsa/RSAPublicKey/encodePKCS1)
- [`RSAPublicKey.encodePKIX()`](/reference/rsa/RSAPublicKey/encodePKIX)

## Properties

```ts
interface Properties {
	n: bigint;
	e: bigint;
}
```

- `n`
- `e`
