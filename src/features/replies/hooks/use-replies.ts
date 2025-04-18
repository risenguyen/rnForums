import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getReplies } from "../api/get-replies";

function repliesQueryOptions(threadId: number) {
  return queryOptions({
    queryKey: ["replies", threadId],
    queryFn: () => getReplies(threadId),
  });
}

function useReplies(threadId: number) {
  const { data: replies, ...rest } = useSuspenseQuery({
    ...repliesQueryOptions(threadId),
  });

  return {
    replies,
    ...rest,
  };
}

export { useReplies, repliesQueryOptions };
