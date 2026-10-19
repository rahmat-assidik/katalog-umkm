// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Gorden Blackout Premium",
    harga: 450000,
    deskripsi:
      "Gorden blackout tebal yang membantu mengurangi cahaya dan panas matahari. Cocok untuk kamar tidur dan ruang keluarga.",
    foto_url: "/produk/kopi.svg",
    kategori: "Gorden blackout",
  },
  {
    id: 2,
    nama: "Gorden Blackout Custom",
    harga: 650000,
    deskripsi: "Gorden blackout yang dibuat sesuai ukuran jendela dan pilihan warna rumahmu.",
    foto_url: "/produk/keripik.svg",
    kategori: "Gorden custom",
  },
  {
    id: 3,
    nama: "Roller Blind Blackout",
    harga: 375000,
    deskripsi: "Roller blind praktis dengan bahan blackout untuk menjaga privasi dan membuat ruangan lebih nyaman.",
    foto_url: "/produk/sambal.svg",
    kategori: "Roller blind",
  },
  {
    id: 4,
    nama: "Roman Shade Blackout",
    harga: 550000,
    deskripsi: "Penutup jendela bergaya modern dengan bahan blackout dan tampilan rapi.",
    foto_url: "/produk/nastar.svg",
    kategori: "Penutup jendela",
  },
  {
    id: 5,
    nama: "Rel Gorden Besi Double",
    harga: 185000,
    deskripsi: "Rel gorden kuat untuk memasang gorden utama dan vitrage secara bersamaan.",
    foto_url: "/produk/tas.svg",
    kategori: "Aksesori gorden",
  },
  {
    id: 6,
    nama: "Jasa Ukur dan Pasang",
    harga: 150000,
    deskripsi: "Layanan ukur dan pemasangan gorden blackout untuk area Batam dan sekitarnya.",
    foto_url: "/produk/batik.svg",
    kategori: "Layanan",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
