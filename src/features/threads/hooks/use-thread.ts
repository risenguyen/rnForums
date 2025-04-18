import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getThread } from "../api/get-thread";

function threadQueryOptions(threadId: number) {
  return queryOptions({
    queryKey: ["thread", threadId],
    queryFn: () => getThread(threadId),
  });
}

function useThread(threadId: number) {
  const { data: thread, ...rest } = useSuspenseQuery({
    ...threadQueryOptions(threadId),
  });

  return {
    thread,
    ...rest,
  };
}

export { useThread, threadQueryOptions };
