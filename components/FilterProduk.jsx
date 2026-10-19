"use client";

import { useMemo, useState } from "react";
import KartuProduk from "@/components/KartuProduk";

export default function FilterProduk({ daftarProduk }) {
  const [pencarian, setPencarian] = useState("");
  const [kategori, setKategori] = useState("");
  const kategoriList = [...new Set(daftarProduk.map((produk) => produk.kategori).filter(Boolean))];
  const hasil = useMemo(() => daftarProduk.filter((produk) => {
    const cocokNama = produk.nama.toLowerCase().includes(pencarian.toLowerCase());
    const cocokKategori = !kategori || produk.kategori === kategori;
    return cocokNama && cocokKategori;
  }), [daftarProduk, pencarian, kategori]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="cari-produk">Cari produk</label>
        <input id="cari-produk" value={pencarian} onChange={(event) => setPencarian(event.target.value)} placeholder="Cari nama produk..." className="rounded-lg border border-garis px-3 py-2.5" />
        <label className="sr-only" htmlFor="filter-kategori">Filter kategori</label>
        <select id="filter-kategori" value={kategori} onChange={(event) => setKategori(event.target.value)} className="rounded-lg border border-garis bg-latar px-3 py-2.5">
          <option value="">Semua kategori</option>
          {kategoriList.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      {hasil.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{hasil.map((produk) => <KartuProduk key={produk.id} produk={produk} />)}</div> : <p className="py-10 text-center text-teks-lembut">Produk tidak ditemukan.</p>}
    </>
  );
}
