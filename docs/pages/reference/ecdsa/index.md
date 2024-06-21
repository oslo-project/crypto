---
title: "@oslojs/crypto/ecdsa"
---

# @oslojs/crypto/ecdsa

Implements the Elliptic Curve Digital Signature Algorithm (ECDSA) over prime fields as specified in [NIST FIPS 186-5](https://csrc.nist.gov/pubs/fips/186-5/final) and [SEC 1](https://www.secg.org/sec1-v2.pdf). Binary fields are not supported.

While efforts have been made, **implementations are not fully constant-time.** As such, only APIs for verifying signatures are provided.

Performance is comparable to any pure-JS implementations but slower than native APIs.

## Functions

- [`decodeIEEEP1363ECDSASignature()`](/reference/ecdsa/decodeIEEEP1363ECDSASignature)
- [`decodeSEC1PublicKey()`](/reference/ecdsa/decodeSEC1PublicKey)
- [`verifyECDSA()`](/reference/ecdsa/verifyECDSA/verifyECDSA)

## Classes

- [`ECDSACurve`](/reference/ecdsa/ECDSACurve)
- [`ECDSAPublicKey`](/reference/ecdsa/ECDSAPublicKey)
- [`ECDSASignature`](/reference/ecdsa/ECDSASignature)

## Variables

- [`p192`](/reference/ecdsa/p192)
- [`p224`](/reference/ecdsa/p224)
- [`p256`](/reference/ecdsa/p256)
- [`p384`](/reference/ecdsa/p384)
- [`p521`](/reference/ecdsa/p521)
- [`secp256k1`](/reference/ecdsa/secp256k1)
