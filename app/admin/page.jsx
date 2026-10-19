import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { buatClientAdmin } from "@/lib/supabase/admin";

export default async function HalamanAdmin() {
  const supabase = await buatClientAdmin();
  const { data: daftarProduk, error } = await supabase
    .from("produk")
    .select("id, nama, harga, deskripsi, foto_url, kategori, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Gagal memuat daftar produk.");
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      {daftarProduk.length > 0 ? (
        <TabelProduk daftarProduk={daftarProduk} />
      ) : (
        <p className="rounded-2xl border border-garis bg-permukaan p-6 text-teks-lembut">
          Belum ada produk. Tambahkan produk pertama untuk mulai mengisi katalog.
        </p>
      )}
    </div>
  );
}
