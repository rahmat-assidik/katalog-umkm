"use server";

import { redirect } from "next/navigation";
import { buatClientAdmin } from "@/lib/supabase/admin";

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatClientAdmin();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await buatClientAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const passwordBaru = formData.get("password_baru");
  const konfirmasi = formData.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasi) {
    return { error: "Semua kolom wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasi) {
    return { error: "Konfirmasi password tidak sama." };
  }

  const supabase = await buatClientAdmin();

  // Wajib periksa bahwa admin sudah login sebelum menjalankan aksi
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan masuk kembali." };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return { error: "Gagal mengganti password. Silakan coba lagi." };
  }

  return { sukses: "Password berhasil diganti." };
}

async function pastikanAdmin(supabase) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

function ambilDataProduk(formData) {
  return {
    nama: String(formData.get("nama") || "").trim(),
    harga: Number(formData.get("harga")),
    kategori: String(formData.get("kategori") || "").trim() || null,
    foto_url: String(formData.get("foto_url") || "").trim() || null,
    deskripsi: String(formData.get("deskripsi") || "").trim() || null,
  };
}

function validasiProduk(produk) {
  if (!produk.nama) return "Nama produk wajib diisi.";
  if (!Number.isInteger(produk.harga) || produk.harga < 0) {
    return "Harga harus berupa angka nol atau lebih.";
  }
  return null;
}

export async function tambahProduk(prevState, formData) {
  const produk = ambilDataProduk(formData);
  const errorValidasi = validasiProduk(produk);
  if (errorValidasi) return { error: errorValidasi };

  const supabase = await buatClientAdmin();
  if (!(await pastikanAdmin(supabase))) {
    return { error: "Sesi telah berakhir. Silakan masuk kembali." };
  }

  const { error } = await supabase.from("produk").insert(produk);
  if (error) return { error: "Gagal menyimpan produk. Silakan coba lagi." };
  redirect("/admin");
}

export async function ubahProduk(prevState, formData) {
  const id = formData.get("id");
  const produk = ambilDataProduk(formData);
  const errorValidasi = validasiProduk(produk);
  if (errorValidasi) return { error: errorValidasi };

  const supabase = await buatClientAdmin();
  if (!(await pastikanAdmin(supabase))) {
    return { error: "Sesi telah berakhir. Silakan masuk kembali." };
  }

  const { error } = await supabase.from("produk").update(produk).eq("id", id);
  if (error) return { error: "Gagal mengubah produk. Silakan coba lagi." };
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const supabase = await buatClientAdmin();
  if (!(await pastikanAdmin(supabase))) {
    return { error: "Sesi telah berakhir. Silakan masuk kembali." };
  }

  const { error } = await supabase.from("produk").delete().eq("id", formData.get("id"));
  if (error) return { error: "Gagal menghapus produk. Silakan coba lagi." };
  return { sukses: true };
}

export async function buatDeskripsiAI(nama, kategori) {
  const supabase = await buatClientAdmin();
  if (!(await pastikanAdmin(supabase))) return { error: "Sesi telah berakhir." };
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { error: "GEMINI_API_KEY belum dikonfigurasi di server." };
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: `Tulis deskripsi produk singkat dalam bahasa Indonesia, 2 kalimat, persuasif tetapi tidak berlebihan. Nama: ${nama}. Kategori: ${kategori || "umum"}.` }] }] }),
  });
  if (!response.ok) return { error: "Gagal membuat deskripsi AI." };
  const data = await response.json();
  return { deskripsi: data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "" };
}
