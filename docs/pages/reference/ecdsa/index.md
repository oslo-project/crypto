---
title: "@oslojs/crypto/ecdsa"
---

# @oslojs/crypto/ecdsa

Implements ECDSA over prime fields as specified in [NIST FIPS 186-5](https://csrc.nist.gov/pubs/fips/186-5/final) and [SEC 1](https://www.secg.org/sec1-v2.pdf). Binary fields are not supported. It also includes APIs for working with X.509/PKIX formats. All curves defined in [SEC 2](https://www.secg.org/sec2-v2.pdf) are provided out of the box.

While efforts have been made, **implementations are not fully constant-time.** As such, only APIs for verifying signatures and parsing data are provided. Performance is comparable to any pure-JS implementations but slower than native APIs.

## Functions

- [`decodeIEEEP1363ECDSASignature()`](/reference/ecdsa/decodeIEEEP1363ECDSASignature)
- [`decodeSEC1PublicKey()`](/reference/ecdsa/decodeSEC1PublicKey)
- [`decodePKIXECDSAPublicKey()`](/reference/ecdsa/decodePKIXECDSAPublicKey)
- [`decodePKIXECDSASignature()`](/reference/ecdsa/decodePKIXECDSASignature)
- [`verifyECDSASignature()`](/reference/ecdsa/verifyECDSASignature)

## Classes

- [`ECDSANamedCurve`](/reference/ecdsa/ECDSANamedCurve)
- [`ECDSAPublicKey`](/reference/ecdsa/ECDSAPublicKey)
- [`ECDSASignature`](/reference/ecdsa/ECDSASignature)

## Variables

- [`p192`](/reference/ecdsa/p192)
- [`p224`](/reference/ecdsa/p224)
- [`p256`](/reference/ecdsa/p256)
- [`p384`](/reference/ecdsa/p384)
- [`p521`](/reference/ecdsa/p521)
- [`secp192k1`](/reference/ecdsa/secp192k1)
- [`secp192r1`](/reference/ecdsa/secp192r1)
- [`secp224k1`](/reference/ecdsa/secp224k1)
- [`secp224r1`](/reference/ecdsa/secp224r1)
- [`secp256k1`](/reference/ecdsa/secp256k1)
- [`secp256r1`](/reference/ecdsa/secp256r1)
- [`secp384r1`](/reference/ecdsa/secp384r1)
- [`secp521r1`](/reference/ecdsa/secp521r1)
