import { elysiaCountRepository } from "../_lib/count-elysia-api-repo";
import { tanStackCountRepository } from "../_lib/count-tanstack-serverFn-repo";

class CountService {
  // TanStack implementation
  getTanStackCount = async (): Promise<number> => {
    const { count } = await tanStackCountRepository.getCount({ signal: undefined });
    return count;
  };

  incrementTanStackCount = async (): Promise<number> => {
    const { count } = await tanStackCountRepository.incrementCount();
    return count;
  };

  // Elysia implementation
  getElysiaCount = async (): Promise<number> => {
    const { count } = await elysiaCountRepository.getCount();
    return count;
  };

  incrementElysiaCount = async (): Promise<number> => {
    const { count } = await elysiaCountRepository.incrementCount();
    return count;
  };
}

export const countService = new CountService();
