# Librofy

Aplikasi web untuk mencari, membaca, dan menyimpan buku favorit secara online.  
Memanfaatkan **Google Books API** untuk pencarian dan detail buku, serta **Web Speech API** untuk fitur text-to-speech (TTS).

![Screenshot Librofy](./public/image.png)

## Teknologi

- Next.js
- React
- TailwindCSS
- React Hot Toast
- Lucide React Icons
- Google Books API
- Web Speech API

## Fitur

- Cari buku berdasarkan judul atau penulis.
- Lihat detail buku termasuk cover, judul, penulis, dan deskripsi.
- Bookmark buku favorit untuk dibaca nanti.
- Bacakan buku menggunakan TTS (Web Speech API).
- Tombol baca di web atau Google Books preview.

## Kekurangan

- Hanya menggunakan **Google Books API**, sehingga banyak buku **tidak tersedia untuk dibaca online**.
- Fitur TTS hanya bekerja di browser yang mendukung **Web Speech API**.

## Instalasi

```bash
git clone https://github.com/Japar12/Librofy.git
cd Librofy
npm install
npm run dev
```

Buka browser dan akses:

```
http://localhost:3000
```
