// Count repository interface
export interface CountRepository {
	getCount: () => Promise<number>;
	incrementCount: () => Promise<number>;
}
