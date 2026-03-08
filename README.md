# GoNotes

**GoNotes** adalah ekstensi pencatatan untuk Visual Studio Code yang memungkinkan Anda membuat, mengelola, dan mengorganisir catatan berbasis Markdown langsung dari dalam editor tanpa perlu membuka aplikasi lain.

> Dokumentasi tersedia dalam: **Bahasa Indonesia** | [English](./README_EN.md)

---

## Pratinjau

<img alt="GoNotes Preview" align="center" width="100%" src="https://raw.githubusercontent.com/alhifnywahid/dummy/master/gonotes-video.gif" />

---

## Fitur

- **Pilih Lokasi Penyimpanan** - Tentukan sendiri folder tempat semua catatan disimpan.
- **Catatan Baru** - Buat catatan baru dengan format ekstensi yang dapat dikonfigurasi (default: `.md`).
- **Folder Baru** - Organisir catatan ke dalam folder-folder sesuai kebutuhan.
- **Edit Catatan** - Buka catatan dalam mode edit dengan pratinjau Markdown secara berdampingan.
- **Ubah Nama** - Ubah nama catatan atau folder kapan saja.
- **Hapus** - Hapus catatan atau folder yang sudah tidak diperlukan.
- **Refresh** - Perbarui tampilan daftar catatan secara manual.
- **Dukungan Multi Ekstensi** - Tampilkan file berekstensi `md`, `markdown`, `txt`, atau ekstensi lain yang Anda tentukan.
- **Ikon Tema Terang & Gelap** - Tampilan ikon menyesuaikan dengan tema VSCode yang sedang aktif.

---

## Persyaratan

- Visual Studio Code versi `1.92.0` atau lebih baru.

---

## Instalasi

### Melalui Visual Studio Marketplace

1. Buka VSCode.
2. Pergi ke tab **Extensions** (`Ctrl+Shift+X`).
3. Cari **"GoNotes"**.
4. Klik **Install**.

### Melalui VSIX (Manual)

1. Unduh file `.vsix` dari halaman [Releases](https://github.com/alhifnywahid/gonotes/releases).
2. Di VSCode, buka **Command Palette** (`Ctrl+Shift+P`).
3. Jalankan perintah `Extensions: Install from VSIX...`.
4. Pilih file `.vsix` yang sudah diunduh.

---

## Cara Penggunaan

### 1. Pilih Lokasi Penyimpanan

Setelah instalasi, GoNotes belum memiliki lokasi penyimpanan. Langkah pertama:

- Klik ikon **GoNotes** di **Activity Bar** (panel kiri VSCode).
- Klik tombol **Pilih Lokasi Penyimpanan** (ikon pengaturan di toolbar panel).
- Pilih folder yang ingin dijadikan direktori penyimpanan catatan.
- Klik **Reload** saat diminta untuk memuat ulang jendela.

### 2. Membuat Catatan Baru

- Klik tombol **Catatan Baru** (ikon file) di toolbar panel GoNotes.
- Masukkan nama catatan pada input box yang muncul.
- Catatan akan langsung dibuka dengan pratinjau Markdown.

### 3. Membuat Folder Baru

- Pilih folder tujuan di panel GoNotes (opsional). Jika tidak ada yang dipilih, folder dibuat di direktori root.
- Klik tombol **Folder Baru** (ikon folder) di toolbar panel.
- Masukkan nama folder yang diinginkan.

### 4. Mengedit Catatan

- Klik ikon **Edit** di samping nama catatan untuk membuka file dalam mode edit dengan pratinjau Markdown berdampingan.
- Atau klik nama catatan untuk langsung membuka pratinjau.

### 5. Mengubah Nama Catatan

- Arahkan kursor ke catatan yang ingin diubah namanya.
- Klik ikon **Ubah Nama** yang muncul di samping catatan.
- Masukkan nama baru, lalu tekan Enter.

### 6. Menghapus Catatan

- Arahkan kursor ke catatan yang ingin dihapus.
- Klik ikon **Hapus** (ikon tempat sampah) di samping catatan.
- Konfirmasi penghapusan pada dialog peringatan yang muncul.

---

## Konfigurasi

Pengaturan GoNotes dapat diubah melalui **Settings** VSCode (`Ctrl+,`) atau langsung di file `settings.json`:

```json
{
  "GoNotes.notesLocation": "/path/ke/folder/catatan",
  "GoNotes.notesDefaultNoteExtension": "md",
  "GoNotes.notesExtensions": "md,markdown,txt"
}
```

| Pengaturan | Tipe | Default | Keterangan |
|---|---|---|---|
| `GoNotes.notesLocation` | `string` | `""` | Path absolut ke folder penyimpanan catatan. |
| `GoNotes.notesDefaultNoteExtension` | `string` | `"md"` | Ekstensi file default untuk catatan baru. Jangan sertakan tanda titik. |
| `GoNotes.notesExtensions` | `string` | `"md,markdown,txt"` | Daftar ekstensi file yang ditampilkan di panel, dipisahkan koma. Jangan sertakan tanda titik atau spasi. |

---

## Struktur Proyek

```
gonotes/
├── extension.js        # Titik masuk ekstensi, pendaftaran semua perintah
├── NotesProvider.js    # TreeDataProvider untuk panel catatan di Activity Bar
├── Note.js             # Model TreeItem untuk merepresentasikan catatan dan folder
├── resources/          # Aset ikon (SVG dan PNG) untuk tema terang dan gelap
└── package.json        # Manifest ekstensi VSCode
```

---

## Kontribusi

Kontribusi sangat disambut baik. Silakan ikuti langkah berikut:

1. **Fork** repositori ini.
2. Buat **branch** baru: `git checkout -b fitur/nama-fitur`.
3. Lakukan perubahan dan **commit**: `git commit -m "feat: tambahkan nama fitur"`.
4. **Push** ke branch Anda: `git push origin fitur/nama-fitur`.
5. Buat **Pull Request** ke branch `main`.

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](./LICENSE) untuk detail selengkapnya.

---

## Tautan

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=alhifnywahid.gonotes)
- [Repositori GitHub](https://github.com/alhifnywahid/gonotes)
- [Laporkan Masalah](https://github.com/alhifnywahid/gonotes/issues)
