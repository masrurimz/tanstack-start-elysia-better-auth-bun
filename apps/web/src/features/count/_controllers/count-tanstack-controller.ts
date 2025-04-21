/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { countQueryOptions, incrementCountMutationOptions } from "../_lib/count-queries";
import { tanStackCountRepository } from "../_lib/count-tanstack-serverFn-repo";

class CountTanStackController {
  // Query hook
  useCount = () => {
    return useQuery(countQueryOptions);
  };

  // Mutation hook
  useIncrementCount = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
      ...incrementCountMutationOptions,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: countQueryOptions.queryKey });
      },
    });

    return { incrementCount: mutate, isPending, error };
  };

  // Route loader method
  getCount = async () => {
    return tanStackCountRepository.getCount({ signal: undefined });
  };
}

export const countTanStackController = new CountTanStackController();
