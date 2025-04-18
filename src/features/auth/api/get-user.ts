import { api } from "../../../lib/api-client";

async function getUser() {
  const {
    data: { session },
  } = await api.auth.getSession();

  if (!session) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await api.auth.getUser();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return user;
}

export { getUser };
