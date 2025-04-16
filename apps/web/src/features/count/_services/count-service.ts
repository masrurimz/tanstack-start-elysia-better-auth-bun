import { elysiaCountRepository } from "../_lib/count-elysia-api-repo";
import { tanStackCountRepository } from "../_lib/count-tanstack-serverFn-repo";

class CountService {
	// TanStack implementation
	getTanStackCount = async (): Promise<number> => {
		return tanStackCountRepository.getCount();
	};

	incrementTanStackCount = async (): Promise<number> => {
		return tanStackCountRepository.incrementCount();
	};

	// Elysia implementation
	getElysiaCount = async (): Promise<number> => {
		return elysiaCountRepository.getCount();
	};

	incrementElysiaCount = async (): Promise<number> => {
		return elysiaCountRepository.incrementCount();
	};
}

export const countService = new CountService();
