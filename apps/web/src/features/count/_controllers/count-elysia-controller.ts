/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  elysiaCountQueryOptions,
  incrementElysiaCountMutationOptions,
} from "../_lib/count-elysia-queries";
import { elysiaCountRepository } from "../_lib/count-elysia-api-repo";

class CountElysiaController {
  // Query hook
  useCount = () => useQuery(elysiaCountQueryOptions());

  // Mutation hook
  useIncrementCount = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation(
      incrementElysiaCountMutationOptions({
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: elysiaCountQueryOptions().queryKey,
          });
        },
      }),
    );

    return { incrementCount: mutate, isPending, error };
  };

  // Route loader method
  getCount = async () => {
    return elysiaCountRepository.getCount();
  };
}

export const countElysiaController = new CountElysiaController();
