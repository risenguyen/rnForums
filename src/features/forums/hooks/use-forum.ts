import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getForum } from "../api/get-forum";

function forumQueryOptions(forumId: number) {
  return queryOptions({
    queryKey: ["forum", forumId],
    queryFn: () => getForum(forumId),
  });
}

function useForum(forumId: number) {
  const { data: forum, ...rest } = useSuspenseQuery({
    ...forumQueryOptions(forumId),
  });

  return { forum, ...rest };
}

export { useForum, forumQueryOptions };
