import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/api";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const api = createClient<Database>(url, key);

export { api };
