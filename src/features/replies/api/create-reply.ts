import { z } from "zod";
import { api } from "../../../lib/api-client";

const replyValidationSchema = z.object({
  user_id: z.string(),
  threadId: z.number(),
  replyBody: z
    .string()
    .trim()
    .min(80, "Reply must be at least 80 characters long.")
    .max(1000, "Reply must not exceed 1000 characters.")
    .refine((body) => body.replace(/\s+/g, "").length >= 30, {
      message: "Reply must contain at least 30 meaningful characters.",
    }),
});

type ReplyInput = z.infer<typeof replyValidationSchema>;

async function createReply(data: ReplyInput) {
  const { error } = await api.from("replies").insert({
    user_id: data.user_id,
    thread_id: data.threadId,
    body: data.replyBody,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }
}

export { createReply, replyValidationSchema, type ReplyInput };
