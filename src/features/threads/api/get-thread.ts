import { api } from "../../../lib/api-client";

async function getThread(threadId: number) {
  const { data, error } = await api
    .from("threads")
    .select("*, user_id(username)")
    .eq("id", threadId)
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { getThread };
