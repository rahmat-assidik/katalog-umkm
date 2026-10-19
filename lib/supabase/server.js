import { createClient } from "@supabase/supabase-js";

// Koneksi server memakai kunci rahasia (melewati RLS).
// Hanya dipakai untuk membaca data publik di Server Component.
export function buatClientServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diisi di .env.local"
    );
  }

  return createClient(url, key);
}
