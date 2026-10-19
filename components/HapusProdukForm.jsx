"use client";

import { hapusProduk } from "@/app/admin/actions";
import Tombol from "@/components/Tombol";

export default function HapusProdukForm({ id, nama }) {
  function konfirmasi(event) {
    if (!window.confirm(`Hapus produk ${nama}?`)) {
      event.preventDefault();
    }
  }

  return (
    <form action={hapusProduk} onSubmit={konfirmasi}>
      <input type="hidden" name="id" value={id} />
      <Tombol type="submit" varian="bahaya">
        Hapus
      </Tombol>
    </form>
  );
}
