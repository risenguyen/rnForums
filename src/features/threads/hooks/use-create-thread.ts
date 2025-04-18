import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../api/create-thread";
import { infiniteThreadsQueryOptions } from "./use-infinite-threads";
import { MutationConfig } from "../../../lib/tanstack-query";

function useCreateThread(
  mutationConfig: MutationConfig<typeof createThread> = {},
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig;

  return useMutation({
    mutationFn: createThread,
    onSuccess(...args) {
      queryClient.invalidateQueries(
        infiniteThreadsQueryOptions(args[1].forumId),
      );
      onSuccess?.(...args);
    },
    ...rest,
  });
}

export { useCreateThread };
