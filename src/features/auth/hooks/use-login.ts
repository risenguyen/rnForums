import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { userQueryOptions } from "./use-user";

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    async onSuccess() {
      await queryClient.resetQueries(userQueryOptions());
    },
  });
}

export { useLogin };
