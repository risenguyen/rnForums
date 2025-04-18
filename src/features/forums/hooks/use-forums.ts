import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getForums, FilterOptions } from "../api/get-forums";

function forumsQueryOptions(options: FilterOptions = {}) {
  return queryOptions({
    queryKey:
      Object.keys(options).length > 0 ? ["forums", options] : ["forums"],
    queryFn: () => getForums(options),
  });
}

type UseForumsOptions = {
  options?: FilterOptions;
};

function useForums({ options = {} }: UseForumsOptions = {}) {
  const { data: forums, ...rest } = useSuspenseQuery({
    ...forumsQueryOptions(options),
  });

  return {
    forums,
    ...rest,
  };
}

export { useForums, forumsQueryOptions };
