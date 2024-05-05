export interface Hash {
	blockSize: number;
	size: number;

	update: (data: Uint8Array) => void;
	digest: () => Uint8Array;
}

export type HashAlgorithm = {
	new (): Hash;
};
