import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply } from "../api/create-reply";
import { repliesQueryOptions } from "./use-replies";
import { MutationConfig } from "../../../lib/tanstack-query";

function useCreateReply(
  mutationOptions: MutationConfig<typeof createReply> = {},
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationOptions;

  return useMutation({
    mutationFn: createReply,
    onSuccess(...args) {
      queryClient.invalidateQueries(repliesQueryOptions(args[1].threadId));
      onSuccess?.(...args);
    },
    ...rest,
  });
}

export { useCreateReply };
