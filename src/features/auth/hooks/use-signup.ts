import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../api/signup";
import { userQueryOptions } from "./use-user";

function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    async onSuccess() {
      await queryClient.resetQueries(userQueryOptions());
    },
  });
}

export { useSignup };
