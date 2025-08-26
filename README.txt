
=================================
WEBSITE UMKM ANDA TELAH SIAP!
=================================

Terima kasih telah menggunakan UMKM AI Website Generator.
Berikut adalah panduan singkat untuk menggunakan file-file ini.

1. BUKA WEBSITE ANDA
   Cukup buka file 'index.html' di browser Anda untuk melihat hasilnya.

2. UPLOAD KE HOSTING
   Upload semua file di dalam folder ini ke penyedia hosting Anda (misalnya Netlify, Vercel, atau cPanel hosting biasa). Pastikan semua file berada di folder yang sama.

=================================
LEVEL: DASAR (TOKEN)
=================================

Admin panel Anda menggunakan sistem keamanan sederhana berbasis token.

- ADMIN PANEL: Buka file 'admin.html' di browser Anda.
- TOKEN ANDA: a2xlusns
- DATA HASH: -1949364791 (Simpan ini, digunakan untuk verifikasi)

CARA MENGGANTI TOKEN:
1. Buka file 'admin.html' dengan editor teks.
2. Cari variabel 'ADMIN_TOKEN_HASH' dan ganti nilainya dengan hash baru.
3. Untuk membuat hash baru: buka browser, tekan F12 (Developer Tools), pergi ke tab 'Console', lalu ketik:
   'GantiTokenBaru'.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
   Ganti 'GantiTokenBaru' dengan token yang Anda inginkan, lalu salin hasilnya.
