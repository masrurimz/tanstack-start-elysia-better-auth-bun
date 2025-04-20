export interface CountRepository {
	getCount: () => number;
	increment: () => Promise<number>;
}
