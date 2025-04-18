import { z } from "zod";
import { api } from "../../../lib/api-client";

const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" }),
});

type LoginInput = z.infer<typeof loginValidationSchema>;

async function login({ email, password }: LoginInput) {
  const { data, error } = await api.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { login, loginValidationSchema, type LoginInput };
