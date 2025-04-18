import { api } from "../../../lib/api-client";

async function logout() {
  const { error } = await api.auth.signOut();

  if (error) {
    console.error(error.message);
    throw error;
  }
}

export { logout };
