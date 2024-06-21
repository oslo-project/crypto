import { euclideanMod, inverseMod } from "./math.js";

export class ECDSAPoint {
	public x: bigint;
	public y: bigint;

	constructor(x: bigint, y: bigint) {
		this.x = x;
		this.y = y;
	}
}

class JacobianPoint {
	public x: bigint;
	public y: bigint;
	public z: bigint;

	constructor(x: bigint, y: bigint, z: bigint) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public isAtInfinity(): boolean {
		return this.x === 0n && this.y === 1n && this.z === 0n;
	}
}

export class ECDSACurve {
	public g: ECDSAPoint;
	public p: bigint;
	public a: bigint;
	public b: bigint;
	public n: bigint;
	public size: number;

	constructor(p: bigint, a: bigint, b: bigint, g: ECDSAPoint, n: bigint, size: number) {
		this.p = p;
		this.a = a;
		this.b = b;
		this.g = g;
		this.n = n;
		this.size = size;
	}

	public add(point1: ECDSAPoint, point2: ECDSAPoint): ECDSAPoint | null {
		const jacobian1 = this.fromAffine(point1);
		const jacobian2 = this.fromAffine(point2);
		return this.toAffine(this.addJacobian(jacobian1, jacobian2));
	}

	private addJacobian(point1: JacobianPoint, point2: JacobianPoint): JacobianPoint {
		if (point1.isAtInfinity()) {
			return point2;
		}
		if (point2.isAtInfinity()) {
			return point1;
		}
		const point1zz = point1.z ** 2n;
		const point2zz = point2.z ** 2n;
		const u1 = euclideanMod(point1.x * point2zz, this.p);
		const u2 = euclideanMod(point2.x * point1zz, this.p);
		const s1 = euclideanMod(point1.y * point2zz * point2.z, this.p);
		const s2 = euclideanMod(point2.y * point1zz * point1.z, this.p);
		if (u1 === u2) {
			if (s1 !== s2) {
				return pointAtInfinity();
			}
			return this.doubleJacobian(point1);
		}
		const h = u2 - u1;
		const r = s2 - s1;
		const point3x = euclideanMod(r ** 2n - h ** 3n - 2n * u1 * h ** 2n, this.p);
		const point3 = new JacobianPoint(
			point3x,
			euclideanMod(r * (u1 * h ** 2n - point3x) - s1 * h ** 3n, this.p),
			euclideanMod(h * point1.z * point2.z, this.p)
		);
		return point3;
	}

	public double(point: ECDSAPoint): ECDSAPoint | null {
		const jacobian = this.fromAffine(point);
		return this.toAffine(this.doubleJacobian(jacobian));
	}

	private doubleJacobian(point: JacobianPoint): JacobianPoint {
		if (point.isAtInfinity()) {
			return point;
		}
		if (point.y === 0n) {
			return pointAtInfinity();
		}
		const s = euclideanMod(4n * point.x * point.y ** 2n, this.p);
		const m = euclideanMod(3n * point.x ** 2n + this.a * point.z ** 4n, this.p);
		const resultx = euclideanMod(m ** 2n - 2n * s, this.p);
		const result = new JacobianPoint(
			resultx,
			euclideanMod(m * (s - resultx) - 8n * point.y ** 4n, this.p),
			euclideanMod(2n * point.y * point.z, this.p)
		);
		return result;
	}

	public toAffine(point: JacobianPoint): ECDSAPoint | null {
		if (point.isAtInfinity()) {
			return null;
		}
		const inverseZ = inverseMod(point.z, this.p);
		const inverseZ2 = inverseZ ** 2n;
		const affine = new ECDSAPoint(
			euclideanMod(point.x * inverseZ2, this.p),
			euclideanMod(point.y * inverseZ2 * inverseZ, this.p)
		);
		return affine;
	}

	public fromAffine(point: ECDSAPoint): JacobianPoint {
		return new JacobianPoint(point.x, point.y, 1n);
	}

	public multiply(k: Uint8Array, point: ECDSAPoint): ECDSAPoint | null {
		// montgomery ladder
		const r = [pointAtInfinity(), new JacobianPoint(point.x, point.y, 1n)];
		for (let i = 0; i < k.byteLength * 8; i++) {
			const byte = k[Math.floor(i / 8)];
			const bit = (byte >> (7 - (i % 8))) & 0x01;
			const notBit = bit ^ 1;
			r[notBit] = this.addJacobian(r[notBit], r[bit]);
			r[bit] = this.doubleJacobian(r[bit]);
		}
		return this.toAffine(r[0]);
	}

	public isOnCurve(point: ECDSAPoint): boolean {
		return (
			euclideanMod(point.y ** 2n, this.p) ===
			euclideanMod(point.x ** 3n + this.a * point.x + this.b, this.p)
		);
	}
}

function pointAtInfinity(): JacobianPoint {
	return new JacobianPoint(0n, 1n, 0n);
}

const P192_P = 0xfffffffffffffffffffffffffffffffeffffffffffffffffn;
const P192_A = 0xfffffffffffffffffffffffffffffffefffffffffffffffcn;
const P192_B = 0x64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1n;
const P192_G = new ECDSAPoint(
	0x188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012n,
	0x07192b95ffc8da78631011ed6b24cdd573f977a11e794811n
);
const P192_N = 0xffffffffffffffffffffffff99def836146bc9b1b4d22831n;
const P192_SIZE = 24;
export const p192 = new ECDSACurve(P192_P, P192_A, P192_B, P192_G, P192_N, P192_SIZE);

const P224_P = 0xffffffffffffffffffffffffffffffff000000000000000000000001n;
const P224_A = 0xfffffffffffffffffffffffffffffffefffffffffffffffffffffffen;
const P224_B = 0xb4050a850c04b3abf54132565044b0b7d7bfd8ba270b39432355ffb4n;
const P224_G = new ECDSAPoint(
	0xb70e0cbd6bb4bf7f321390b94a03c1d356c21122343280d6115c1d21n,
	0xbd376388b5f723fb4c22dfe6cd4375a05a07476444d5819985007e34n
);
const P224_N = 0xffffffffffffffffffffffffffff16a2e0b8f03e13dd29455c5c2a3dn;
const P224_SIZE = 28;
export const p224 = new ECDSACurve(P224_P, P224_A, P224_B, P224_G, P224_N, P224_SIZE);

const P256_P = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn;
const P256_A = 0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn;
const P256_B = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn;
const P256_G = new ECDSAPoint(
	0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
	0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n
);
const P256_N = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
const P256_SIZE = 32;
export const p256 = new ECDSACurve(P256_P, P256_A, P256_B, P256_G, P256_N, P256_SIZE);

const P384_P =
	0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffffn;
const P384_A =
	0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffcn;
const P384_B =
	0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aefn;
const P384_G = new ECDSAPoint(
	0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7n,
	0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5fn
);
const P384_N =
	0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973n;
const P384_SIZE = 48;
export const p384 = new ECDSACurve(P384_P, P384_A, P384_B, P384_G, P384_N, P384_SIZE);

const P521_P =
	0x01ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
const P521_A =
	0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcn;
const P521_B =
	0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00n;
const P521_G = new ECDSAPoint(
	0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66n,
	0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
);
const P521_N =
	0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409n;
const P521_SIZE = 66;
export const p521 = new ECDSACurve(P521_P, P521_A, P521_B, P521_G, P521_N, P521_SIZE);

const SECP256K1_P = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn;
const SECP256K1_A = 0x0000000000000000000000000000000000000000000000000000000000000000n;
const SECP256K1_B = 0x0000000000000000000000000000000000000000000000000000000000000007n;
const SECP256K1_G = new ECDSAPoint(
	0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
	0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
);
const SECP256K1_N = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
const SECP256K1_SIZE = 32;
export const secp256k1 = new ECDSACurve(
	SECP256K1_P,
	SECP256K1_A,
	SECP256K1_B,
	SECP256K1_G,
	SECP256K1_N,
	SECP256K1_SIZE
);
