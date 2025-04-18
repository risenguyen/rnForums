import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../api/get-user";

function userQueryOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
  });
}

function useUser() {
  const { data: user, ...rest } = useSuspenseQuery({
    ...userQueryOptions(),
  });

  return {
    user,
    ...rest,
  };
}

export { useUser, userQueryOptions };
