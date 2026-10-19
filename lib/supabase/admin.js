import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Koneksi sesi admin memakai kunci publishable + cookie.
// Dipakai untuk login, logout, ganti password, dan aksi CRUD produk.
export async function buatClientAdmin() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
