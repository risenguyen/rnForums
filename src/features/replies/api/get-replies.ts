import { api } from "../../../lib/api-client";

async function getReplies(threadId: number) {
  const { data, error } = await api
    .from("replies")
    .select("*, user_id(username)")
    .eq("thread_id", threadId)
    .order("created_at");

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { getReplies };
