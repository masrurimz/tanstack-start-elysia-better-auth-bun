import { api } from "backend-client";
import type { ElysiaCountResponse } from "../_domain/count-model";
import type { CountRepository } from "../_domain/count-repository";

// Extract Elysia count from response safely
const extractElysiaCount = (response: ElysiaCountResponse): { count: number } => {
  if (typeof response.data === "object" && response.data !== null) {
    if ("count" in response.data) {
      return { count: response.data.count };
    }
    return { count: 0 };
  }
  return { count: response.data ?? 0 };
};

// Elysia Implementation
export class ElysiaCountApiRepo implements CountRepository {
  getCount = async ({ signal }: { signal?: AbortSignal } = {}): Promise<{
    count: number;
  }> => {
    try {
      const response = await api.count.index
        .get()
        .catch(() => ({ data: { count: 0 } }) as ElysiaCountResponse);

      return extractElysiaCount(response);
    } catch (error) {
      console.error("Failed to load count:", error);
      return { count: 0 };
    }
  };

  incrementCount = async (): Promise<{ count: number }> => {
    try {
      await api.count.increment.post();
      return this.getCount();
    } catch (error) {
      console.error("Failed to increment count:", error);
      return { count: 0 };
    }
  };
}

export const elysiaCountRepository = new ElysiaCountApiRepo();
