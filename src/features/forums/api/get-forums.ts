import { api } from "../../../lib/api-client";
import { Tables } from "../../../types/api";

type SortOption = {
  column: keyof Tables<"forums">;
  ascending?: boolean;
};

type FilterOptions = {
  sortBy?: SortOption[];
  maxResults?: number;
};

async function getForums({ sortBy, maxResults }: FilterOptions = {}) {
  let query = api
    .from("forums")
    .select(`*, latest_thread(created_at, user_id(username))`);

  if (sortBy) {
    sortBy.forEach(({ column, ascending }) => {
      query = query.order(column, {
        ascending: ascending === undefined ? true : ascending,
      });
    });
  }

  if (maxResults) {
    query.limit(maxResults);
  }

  const { data, error } = await query;
  console.log(data);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { getForums, type FilterOptions };
