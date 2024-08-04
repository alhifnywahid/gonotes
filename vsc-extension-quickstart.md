# Selamat datang di Ekstensi Kode VS Anda


```javascript
console.log("HaloDunia")
```

## Apa yang ada di dalam folder

* Folder ini berisi semua berkas yang diperlukan untuk ekstensi Anda.
* `package.json` - ini adalah file manifes tempat Anda mendeklarasikan ekstensi dan perintah.
  * Contoh plugin mendaftarkan perintah dan mendefinisikan judul dan nama perintah. Dengan informasi ini, VS Code dapat menampilkan perintah di palet perintah. Ia belum perlu memuat plugin.
* `extension.js` - ini adalah file utama di mana Anda akan memberikan implementasi perintah Anda.
  * File ini mengekspor satu fungsi, `activate`, yang akan dipanggil saat pertama kali ekstensi Anda diaktifkan (dalam kasus ini dengan menjalankan perintah). Di dalam fungsi `activate` kita memanggil `registerCommand`.
  * Kita mengoper fungsi yang berisi implementasi perintah sebagai parameter kedua ke `registerCommand`.

## Langsung bangun dan mulai berjalan

* Tekan `F5` untuk membuka jendela baru dengan ekstensi Anda dimuat.
* Jalankan perintah Anda dari palet perintah dengan menekan (`Ctrl+Shift+P` atau `Cmd+Shift+P` pada Mac) dan mengetik `Hello World`.
* Tetapkan breakpoint dalam kode Anda di dalam `extension.js` untuk men-debug ekstensi Anda.
* Temukan keluaran dari ekstensi Anda di konsol debug.

## Membuat perubahan

* Anda dapat meluncurkan ulang ekstensi dari bilah alat debug setelah mengubah kode di `extension.js`.
* Anda juga dapat memuat ulang (`Ctrl+R` atau `Cmd+R` di Mac) jendela VS Code dengan ekstensi Anda untuk memuat perubahan.

## Jelajahi API

* Anda dapat membuka set lengkap API kami ketika Anda membuka file `node_modules/@types/vscode/index.d.ts`.

## Menjalankan tes

* Instal [Extension Test Runner] (https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* Buka tampilan Pengujian dari bilah aktivitas dan klik tombol "Jalankan Pengujian", atau gunakan tombol pintas `Ctrl/Cmd +; A`
* Lihat output dari hasil pengujian di tampilan Hasil Pengujian.
* Membuat perubahan pada `test/extension.test.js` atau membuat file tes baru di dalam folder `test`.
  * Runner pengujian yang disediakan hanya akan mempertimbangkan file yang cocok dengan pola nama `**.test.js`.
  * Anda dapat membuat folder di dalam folder `test` untuk menyusun pengujian sesuai keinginan Anda.

## Melangkah lebih jauh

 * [Ikuti panduan UX] (https://code.visualstudio.com/api/ux-guidelines/overview) untuk membuat ekstensi yang terintegrasi dengan mulus dengan antarmuka dan pola asli VS Code.
 * [Publikasikan ekstensi Anda] (https://code.visualstudio.com/api/working-with-extensions/publishing-extension) di pasar ekstensi VS Code.
 * Mengotomatiskan pembuatan dengan menyiapkan [Integrasi Berkelanjutan](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).

Translated with DeepL.com (free version)