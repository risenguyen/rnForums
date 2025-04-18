import { useNavigate, Link } from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/use-login";
import { loginValidationSchema, LoginInput } from "../api/login";
import { useCallback } from "react";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginValidationSchema),
  });

  const login = useLogin();

  const onSubmit = useCallback(
    (data: LoginInput) =>
      login.mutate(data, {
        onSuccess() {
          navigate({
            to: "/app",
          });
          reset();
        },
      }),
    [login, navigate, reset],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-100 flex-col gap-3 pb-16"
    >
      <div className="flex flex-col gap-2">
        <label className="text-neutral-150" htmlFor="loginEmail">
          Email
        </label>
        <input
          {...register("email")}
          className="text-neutral-150 w-full rounded-md border border-neutral-700 px-3 py-2 focus:outline-none"
          id="loginEmail"
          autoComplete="email"
        />
        {errors?.email?.message && (
          <div className="text-error mt-1 text-sm">{errors.email.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-neutral-150" htmlFor="loginPassword">
          Password
        </label>
        <input
          {...register("password")}
          className="text-neutral-150 w-full rounded-md border border-neutral-700 px-3 py-2 focus:outline-none"
          id="loginPassword"
          type="password"
        />
        {errors?.password?.message && (
          <div className="text-error mt-1 text-sm">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="mt-2 flex">
        <button
          className="text-neutral-850 w-full cursor-pointer rounded-md bg-neutral-200 px-2.5 py-3 text-base transition-all duration-200 hover:bg-neutral-200/70"
          type="submit"
        >
          Log In
        </button>
      </div>
      <Link className="mt-2 text-end text-neutral-200" to="/signup">
        Don't have an account?
      </Link>
    </form>
  );
}

export default LoginForm;
