import {
  useSuspenseInfiniteQuery,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import { getThreadsPaginated } from "../api/get-threads-paginated";

function infiniteThreadsQueryOptions(forumId: number) {
  return infiniteQueryOptions({
    queryKey: ["threads-infinite", forumId],
    queryFn: ({ pageParam }) =>
      getThreadsPaginated(forumId, {
        page: pageParam,
        pageSize: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    staleTime: 1000 * 60 * 2,
  });
}

function useInfiniteThreads(forumId: number) {
  const { data: threads, ...rest } = useSuspenseInfiniteQuery({
    ...infiniteThreadsQueryOptions(forumId),
  });

  return {
    threads,
    ...rest,
  };
}

export { useInfiniteThreads, infiniteThreadsQueryOptions };
