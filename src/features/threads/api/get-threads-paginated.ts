import { api } from "../../../lib/api-client";

type PaginationOptions = {
  page: number;
  pageSize: number;
};

async function getThreadsPaginated(
  forumId: number,
  { page, pageSize }: PaginationOptions,
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await api
    .from("threads")
    .select("*, user_id(username)")
    .eq("forum_id", forumId)
    .order("updated_at", {
      ascending: false,
    })
    .range(from, to);
  console.log(data);
  if (error) {
    console.error(error.message);
    throw error;
  }

  return {
    data,
    nextCursor: data.length === pageSize ? page + 1 : undefined,
    prevCursor: page > 1 ? page - 1 : undefined,
  };
}

export { getThreadsPaginated };
