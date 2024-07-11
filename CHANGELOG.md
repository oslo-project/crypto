# @oslojs/crypto

## next

- [Breaking] Update `generateRandomInteger()`, `generateRandomIntegerNumber()`, and `generateRandomString()` parameters.
- [Breaking] Remove `alphabet()` and `random()` from `random` module.

## 0.5.3

- Add SHA-3 hash and extended hash functions.

## 0.5.2

- Fix `ECDSASignature.encodeIEEEP1363()`

## 0.5.1

- Add SHA-512/224 and SHA-512/256

## 0.5.0

- [Breaking] Rename `decodeX509ECDSAPublicKey()`, `decodeX509ECDSASignature()`, `ECDSAPublicKey.encodeX509Compressed()`, `ECDSAPublicKey.encodeX509Uncompressed()`, and `ECDSASignature.encodeX509()` to `decodePKIXECDSAPublicKey()`, `decodePKIXECDSASignature()`, `ECDSAPublicKey.encodePKIXCompressed()`, `ECDSAPublicKey.encodePKIXUncompressed()`, and `ECDSASignature.encodePKIX()`
- Add `@oslojs/crypto/rsa`

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
