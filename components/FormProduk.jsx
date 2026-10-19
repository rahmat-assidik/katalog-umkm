"use client";

import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { useActionState } from "react";
import { useState } from "react";
import { buatDeskripsiAI } from "@/app/admin/actions";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09). Keduanya bonus di jalur offline.
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [state, formAction] = useActionState(action, null);
  const [nama, setNama] = useState(produk.nama ?? "");
  const [kategori, setKategori] = useState(produk.kategori ?? "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi ?? "");
  const [aiState, setAiState] = useState(null);

  async function buatDeskripsi() {
    setAiState({ loading: true });
    setAiState(await buatDeskripsiAI(nama, kategori));
  }

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}
      <Input label="Nama produk" name="nama" value={nama} onChange={(event) => setNama(event.target.value)} required />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input label="Kategori" name="kategori" value={kategori} onChange={(event) => setKategori(event.target.value)} />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input label="Deskripsi" name="deskripsi" textarea value={deskripsi} onChange={(event) => setDeskripsi(event.target.value)} />
      <button type="button" onClick={buatDeskripsi} disabled={aiState?.loading} className="self-start rounded-lg border border-utama px-4 py-2 text-sm font-semibold text-utama disabled:opacity-50">{aiState?.loading ? "Membuat..." : "Buat deskripsi dengan AI"}</button>
      {aiState?.error && <p className="text-sm text-bahaya">{aiState.error}</p>}
      {aiState?.deskripsi && <button type="button" onClick={() => setDeskripsi(aiState.deskripsi)} className="self-start text-sm text-utama underline">Gunakan deskripsi AI</button>}
      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
      {state?.error && <p className="text-sm text-bahaya">{state.error}</p>}
    </form>
  );
}
