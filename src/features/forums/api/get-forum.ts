import { api } from "../../../lib/api-client";

async function getForum(forumId: number) {
  const { data, error } = await api
    .from("forums")
    .select("*")
    .eq("id", forumId)
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { getForum };
