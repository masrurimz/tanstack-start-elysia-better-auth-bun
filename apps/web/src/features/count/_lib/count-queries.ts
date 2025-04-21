import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { tanStackCountRepository } from "./count-tanstack-serverFn-repo";

// Query keys
export const countKeys = {
  count: ["count"] as const,
  detail: ["count", "detail"] as const,
};

// Query options
export const countQueryOptions = queryOptions({
  queryKey: countKeys.count,
  queryFn: async ({ signal }) => {
    const count = await tanStackCountRepository.getCount({ signal });
    return { count };
  },
});

// Mutation options
export const incrementCountMutationOptions: MutationOptions<
  { count: number },
  Error,
  void
> = {
  mutationKey: [...countKeys.count, "increment"],
  mutationFn: async () => {
    const { count } = await tanStackCountRepository.incrementCount();
    return { count };
  },
};
