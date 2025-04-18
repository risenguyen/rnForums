import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getThreads, FilterOptions } from "../api/get-threads";

function threadsQueryOptions(options: FilterOptions = {}) {
  return queryOptions({
    queryFn: () => getThreads(options),
    queryKey:
      Object.keys(options).length > 0 ? ["threads", options] : ["threads"],
  });
}

function useThreads(options: FilterOptions = {}) {
  const { data: threads, ...rest } = useSuspenseQuery({
    ...threadsQueryOptions(options),
  });

  return {
    threads,
    ...rest,
  };
}

export { useThreads, threadsQueryOptions };
