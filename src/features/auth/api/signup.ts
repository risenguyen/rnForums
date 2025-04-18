import { z } from "zod";
import { api } from "../../../lib/api-client";

const signupValidationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    })
    .transform((val) => val.trim()),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password is too long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

type SignupInput = z.infer<typeof signupValidationSchema>;

async function signup({ username, email, password }: SignupInput) {
  const { data, error: authError } = await api.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (authError || !data.user) {
    console.error(authError?.message);
    throw authError;
  }

  const { error: insertError } = await api.from("profiles").insert({
    id: data.user.id,
    username,
  });

  if (insertError) {
    console.error(insertError.message);
    throw insertError;
  }

  return data;
}

export { signup, signupValidationSchema, type SignupInput };
