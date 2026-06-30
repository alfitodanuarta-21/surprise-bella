# Virtual Gift Song — Pixel Polaroid + Pesan

Versi ini sudah mengikuti revisi terbaru:

- Tampilan awal memakai background pixel dan karakter pixel.
- Saat kursor diarahkan ke karakter, karakter berubah ke ekspresi kedua dan sedikit zoom.
- Karakter bisa diklik untuk membuka 3 polaroid.
- Saat kursor diarahkan ke polaroid, tanggal muncul di bagian bawah frame putih.
- Saat salah satu polaroid diklik, muncul tampilan detail berisi:
  - polaroid besar,
  - tanggal sesuai foto yang diklik,
  - pesan personal sesuai foto tersebut,
  - tombol `← Kembali` untuk kembali ke daftar 3 polaroid.
- Tombol `×` di kanan atas dipakai untuk menutup overlay.
- Tombol `Escape` dipakai untuk kembali dari detail ke daftar polaroid, lalu menutup galeri jika ditekan lagi.

## Struktur folder

```text
virtual-gift-song-final-message/
├─ index.html
├─ styles.css
├─ script.js
├─ README.md
└─ assets/
   ├─ background.jpg
   ├─ character.png
   ├─ character_hover.png
   ├─ character_original.png
   ├─ character_hover_original.png
   └─ photos/
```

## Mengubah foto, tanggal, dan pesan

Buka `script.js`, lalu ubah bagian berikut:

```js
const POLAROIDS = [
  {
    title: "Foto 1",
    date: "02 Juni 2023",
    image: "",
    message: "Pesan pertama dari saya untuk kamu."
  },
  {
    title: "Foto 2",
    date: "12 Juni 2023",
    image: "",
    message: "Pesan kedua dari saya untuk kamu."
  },
  {
    title: "Foto 3",
    date: "21 Juni 2025",
    image: "",
    message: "Pesan ketiga dari saya untuk kamu."
  }
];
```

Jika foto asli sudah ada, masukkan file ke folder:

```text
assets/photos/
```

Lalu isi `image` seperti ini:

```js
image: "assets/photos/foto-1.jpg"
```

Jika `image` kosong, kartu akan menampilkan placeholder `Foto 1`, `Foto 2`, dan `Foto 3`.

## Mengubah karakter awal dan karakter hover

File karakter awal ada di:

```text
assets/character.png
```

File karakter saat kursor diarahkan ada di:

```text
assets/character_hover.png
```

Gunakan ukuran gambar yang sama untuk keduanya agar pergantian karakter tetap rapi. Jika karakter masih memiliki background putih, hapus background terlebih dahulu agar menyatu dengan background pixel.

Untuk membuat pesan lebih dari satu baris, gunakan `\n`, contoh:

```js
message: "Baris pesan pertama.\nBaris pesan kedua."
```

## Preview langsung

Buka galeri 3 polaroid langsung:

```text
index.html#gallery
```

Buka detail foto tertentu langsung:

```text
index.html#detail-1
index.html#detail-2
index.html#detail-3
```
