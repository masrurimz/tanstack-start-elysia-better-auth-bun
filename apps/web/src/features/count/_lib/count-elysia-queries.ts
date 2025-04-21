import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { elysiaCountRepository } from "./count-elysia-api-repo";

// Query keys
export const elysiaCountKeys = {
  count: ["elysia-count"] as const,
  detail: ["elysia-count", "detail"] as const,
};

// Query options
export const elysiaCountQueryOptions = () =>
  queryOptions({
    queryKey: elysiaCountKeys.count,
    queryFn: async ({ signal }) => {
      return elysiaCountRepository.getCount({ signal });
    },
  });

// Mutation options
export const incrementElysiaCountMutationOptions = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => ({
  mutationKey: [...elysiaCountKeys.count, "increment"],
  mutationFn: async () => {
    return elysiaCountRepository.incrementCount();
  },
  onSuccess,
});
