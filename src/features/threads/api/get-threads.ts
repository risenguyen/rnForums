import { api } from "../../../lib/api-client";
import { Tables } from "../../../types/api";

type SortOption = {
  column: keyof Tables<"threads">;
  ascending?: boolean;
};

type FilterOptions = {
  sortBy?: SortOption[];
  maxResults?: number;
};

async function getThreads({ sortBy, maxResults }: FilterOptions = {}) {
  let query = api.from("threads").select("*, user_id(username)");

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

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

export { getThreads, type FilterOptions };
