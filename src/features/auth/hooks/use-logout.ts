import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";
import { userQueryOptions } from "./use-user";

function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    async onSuccess() {
      await queryClient.resetQueries(userQueryOptions());
    },
  });
}

export { useLogout };
