# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:** Baca `AGENTS.md` dan `docs/user-stories.md` bagian US-01. Ubah `app/page.jsx` agar daftar produk diambil dari tabel `produk` di Supabase pada sisi server, gunakan koneksi server di `lib/supabase`, tampilkan dengan `KartuProduk`, tampilkan pesan error atau "Belum ada produk", dan hapus `CatatanBelumAktif`.

**Hasil:** Dibuat `lib/supabase/server.js` menggunakan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`. Halaman katalog mengambil produk dari Supabase dan menangani kondisi error/kosong.

**Perbaikan:** Ditambahkan `dynamic = "force-dynamic"` agar perubahan data Supabase langsung terlihat saat halaman dimuat ulang.

## US-02 Detail produk

**Prompt:** Baca `docs/user-stories.md` bagian US-02. Ubah `app/produk/[id]/page.jsx` agar mengambil satu produk dari Supabase berdasarkan id URL, panggil `notFound()` jika tidak ditemukan, pertahankan tampilan dan tombol WhatsApp, lalu hapus `CatatanBelumAktif`.

**Hasil:** Detail produk mengambil data server-side dari tabel `produk` dan menampilkan halaman tidak ditemukan untuk produk yang tidak ada.

**Perbaikan:** Ditambahkan `dynamic = "force-dynamic"` agar detail selalu membaca data terbaru.

## US-03 Pesan via WhatsApp

**Prompt:** Baca bagian Pesan WhatsApp (US-03). Ubah `TombolWhatsApp.jsx` menjadi tautan `wa.me` dengan nomor dari `lib/toko.js`, pesan nama dan harga rupiah, `encodeURIComponent`, serta tab baru.

**Hasil:** Tombol membuka WhatsApp dengan pesan otomatis berisi nama dan harga produk.

**Perbaikan:** Tampilan tombol dipertahankan.

## US-04 Login admin

**Prompt:** Baca aturan keamanan dan US-04. Buat login admin menggunakan Supabase Auth, `@supabase/ssr`, cookie, dan Server Action; sambungkan form login serta tombol keluar.

**Hasil:** Dibuat `lib/supabase/admin.js` dan `app/admin/actions.js`; login, error login, logout, dan redirect sudah berfungsi.

**Perbaikan:** `CatatanBelumAktif` dihapus dari halaman login.

## US-05 Ganti password

**Prompt:** Baca US-05. Buat Server Action ganti password untuk admin login, validasi minimal 8 karakter dan konfirmasi, tampilkan pesan sukses/error, sambungkan form, dan hapus `CatatanBelumAktif`.

**Hasil:** Password diperbarui dengan Supabase Auth setelah sesi admin diverifikasi; pesan sukses dan error ditampilkan di halaman.

**Perbaikan:** Validasi dilakukan di server dan sesi diperiksa dengan `supabase.auth.getUser()`.

## US-06 Proteksi halaman admin

**Prompt:** Baca aturan keamanan nomor 3 dan 4 serta US-06. Buat `proxy.js` untuk melindungi semua rute `/admin` kecuali `/admin/login`, pastikan Server Action mengubah data memeriksa login, dan hapus `CatatanBelumAktif` dari halaman admin.

**Hasil:** `proxy.js` memeriksa sesi Supabase Auth dan mengalihkan pengguna tanpa sesi ke `/admin/login`.

**Perbaikan:** `gantiPassword` memeriksa sesi admin di server sebelum memperbarui password; build produksi berhasil.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
