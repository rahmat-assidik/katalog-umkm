"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/format";
import { toko } from "@/lib/toko";

export default function PilihanPesanan({ produk }) {
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");
  const pesan = `Halo, saya mau pesan ${produk.nama} (${formatRupiah(produk.harga)}). Jumlah: ${jumlah}${varian ? `. Varian: ${varian}` : ""}`;
  const url = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold">Jumlah<input type="number" min="1" value={jumlah} onChange={(event) => setJumlah(Math.max(1, Number(event.target.value) || 1))} className="mt-1 w-full rounded-lg border border-garis px-3 py-2.5" /></label>
      <label className="text-sm font-semibold">Varian (opsional)<input value={varian} onChange={(event) => setVarian(event.target.value)} placeholder="Contoh: warna krem, ukuran 2 m" className="mt-1 w-full rounded-lg border border-garis px-3 py-2.5" /></label>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto">Pesan via WhatsApp</a>
    </div>
  );
}
