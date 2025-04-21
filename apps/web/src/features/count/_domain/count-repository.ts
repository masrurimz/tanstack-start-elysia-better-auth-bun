// Count repository interface
export interface CountRepository {
  getCount: ({ signal }: { signal?: AbortSignal }) => Promise<{ count: number }>;
  incrementCount: () => Promise<{ count: number }>;
}
