
=================================
TERIMA KASIH TELAH MENGGUNAKAN UMKM AI WEBSITE GENERATOR
=================================

Website Anda telah berhasil dibuat!

Folder ini berisi semua file yang Anda butuhkan untuk mengunggah website Anda ke internet.
- index.html: Halaman utama website Anda.
- style.css: File gaya untuk tampilan website.
- README.txt: File ini, berisi panduan.
- LICENSE.txt: Lisensi penggunaan.

CARA UPLOAD WEBSITE:
Anda bisa mengunggah folder ini ke layanan hosting gratis seperti Netlify, Vercel, GitHub Pages, atau layanan hosting berbayar lainnya.

---------------------------------

VERSI WEBSITE: PROFESIONAL
---------------------------------

Anda memilih versi Profesional. Website ini memiliki halaman admin untuk mengedit konten secara dinamis.

- script.js: Logika untuk menampilkan data di website.
- admin.html: Halaman admin untuk mengedit konten.

PANDUAN SESUAI LEVEL KEAMANAN YANG DIPILIH:

=================================
PANDUAN SETUP (LEVEL DASAR - TOKEN)
=================================

Level keamanan ini adalah yang paling sederhana dan tidak memerlukan server.

1. Token Akses Admin Anda:
   - Token untuk login ke halaman admin adalah: tok-cjn73a
   - JANGAN BAGIKAN TOKEN INI kepada siapapun.

2. Cara Login:
   - Buka file `admin.html` di browser Anda.
   - Masukkan token di atas untuk login.

3. Mengubah Token (Opsional tapi Direkomendasikan):
   - Buka file `admin.html` dengan editor teks.
   - Di bagian bawah, cari baris: const TOKEN_HASH = '...';
   - Di atasnya, ada komentar seperti: // Token untuk admin: tok-xxxxxx
   - Ganti token di komentar tersebut dengan token baru yang Anda inginkan.
   - Untuk menghasilkan hash baru, buka website di browser, buka console (F12), ketik `btoa('token-baru-anda')` dan tekan Enter.
   - Salin hasilnya dan ganti nilai di dalam `const TOKEN_HASH = '...';` dengan hasil yang baru.
   - Simpan file.

PERHATIAN:
- Karena data disimpan di Local Storage browser, perubahan yang Anda buat di admin panel HANYA akan terlihat di browser yang sama.
- Untuk mengupdate data secara permanen, Anda perlu mengedit file `script.js` secara manual dan mengunggahnya kembali.
