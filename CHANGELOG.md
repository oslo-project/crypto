# @oslojs/crypto

## 0.4.1

- Update dependencies.

## 0.4.0

- [Breaking] Replace `verifyECDSA()` with `verifyECDSASignature()`.
- [Breaking] Replace `ECDSACurve` with `ECDSANamedCurve`.
- Add all SEC 2 curves.
- Add `decodeX509ECDSASignature()`, `decodeX509PublicKey()`, `ECDSASignature.encodeX509()`, `ECDSAPublicKey.encodeX509Uncompressed()`, and `ECDSAPublicKey.encodeX509Compressed()`

## 0.3.0

- [Breaking] `generateRandomInteger()` takes and returns a `bigint`.
- Add `generateRandomIntegerNumber()`.

## 0.2.1

- Add `@oslojs/crypto/ecdsa`.
- Export `sha224()` and `SHA224`.
