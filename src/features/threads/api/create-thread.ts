import { z } from "zod";

import { api } from "../../../lib/api-client";

const threadValidationSchema = z.object({
  userId: z.string(),
  forumId: z.number(),
  threadTitle: z
    .string()
    .min(1, "Thread title is required.")
    .max(128, "Thread title must not exceed 128 characters.")
    .regex(
      /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]+$/u,
      "Thread title can contain letters, numbers, punctuation, symbols, and spaces.",
    ),
  threadBody: z
    .string()
    .min(100, "Thread body must be at least 100 characters long.")
    .max(1000, "Thread body must not exceed 1000 characters.")
    .refine(
      (body) => {
        const trimmedContent = body.trim();
        return trimmedContent.length >= 80;
      },
      {
        message:
          "Thread body must contain at least 80 characters of actual content.",
      },
    ),
});

type ThreadInput = z.infer<typeof threadValidationSchema>;

async function createThread(data: ThreadInput) {
  const { error } = await api.from("threads").insert({
    user_id: data.userId.toString(),
    forum_id: data.forumId,
    title: data.threadTitle,
    body: data.threadBody,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }
}

export { createThread, threadValidationSchema, type ThreadInput };
