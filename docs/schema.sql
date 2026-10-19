-- Skema database Katalog UMKM
-- Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi file ini > Run.
-- Aman dijalankan ulang.

-- 1. Tabel produk
create table if not exists public.produk (
  id bigint generated always as identity primary key,
  nama text not null,
  harga integer not null check (harga >= 0),
  deskripsi text,
  foto_url text,
  kategori text,
  created_at timestamptz not null default now()
);

-- 2. Row Level Security
-- Tidak ada izin untuk publik: akses langsung ke tabel dari luar aplikasi ditolak.
-- Hanya admin yang sudah login yang boleh membaca dan mengubah data.
alter table public.produk enable row level security;

drop policy if exists "admin_baca_produk" on public.produk;
drop policy if exists "admin_tambah_produk" on public.produk;
drop policy if exists "admin_ubah_produk" on public.produk;
drop policy if exists "admin_hapus_produk" on public.produk;

create policy "admin_baca_produk" on public.produk
  for select to authenticated using (true);

create policy "admin_tambah_produk" on public.produk
  for insert to authenticated with check (true);

create policy "admin_ubah_produk" on public.produk
  for update to authenticated using (true) with check (true);

create policy "admin_hapus_produk" on public.produk
  for delete to authenticated using (true);

-- 3. Data produk awal (hanya diisi jika tabel masih kosong)
insert into public.produk (nama, harga, deskripsi, foto_url, kategori)
select * from (values
  ('Gorden Blackout Premium', 450000, 'Gorden blackout tebal yang membantu mengurangi cahaya dan panas matahari. Cocok untuk kamar tidur dan ruang keluarga.', '/produk/kopi.svg', 'Gorden blackout'),
  ('Gorden Blackout Custom', 650000, 'Gorden blackout yang dibuat sesuai ukuran jendela dan pilihan warna rumahmu.', '/produk/keripik.svg', 'Gorden custom'),
  ('Roller Blind Blackout', 375000, 'Roller blind praktis dengan bahan blackout untuk menjaga privasi dan membuat ruangan lebih nyaman.', '/produk/sambal.svg', 'Roller blind'),
  ('Roman Shade Blackout', 550000, 'Penutup jendela bergaya modern dengan bahan blackout dan tampilan rapi.', '/produk/nastar.svg', 'Penutup jendela'),
  ('Rel Gorden Besi Double', 185000, 'Rel gorden kuat untuk memasang gorden utama dan vitrage secara bersamaan.', '/produk/tas.svg', 'Aksesori gorden'),
  ('Jasa Ukur dan Pasang', 150000, 'Layanan ukur dan pemasangan gorden blackout untuk area Batam dan sekitarnya.', '/produk/batik.svg', 'Layanan')
) as data_awal (nama, harga, deskripsi, foto_url, kategori)
where not exists (select 1 from public.produk);
