# GoNotes




**GoNotes** adalah sebuah ekstensi pencatatan untuk VSCode. Dengan GoNotes, Anda dapat membuat, mengedit, menghapus, dan mengelola catatan langsung dari dalam VSCode.

## Priview

<img alt="Go Notes Priview" align="center" width="100%" src="https://raw.githubusercontent.com/alhifnywahid/dummy/master/gonotes-video.gif" />

## Fitur

- **Pilih Lokasi Penyimpanan**: Tentukan lokasi penyimpanan untuk semua catatan Anda.
- **Folder Baru**: Buat folder baru untuk mengorganisir catatan Anda.
- **Refresh**: Segarkan tampilan catatan Anda.
- **Ubah Nama**: Ubah nama catatan atau folder.
- **Hapus**: Hapus catatan atau folder yang tidak diperlukan lagi.
- **Edit Catatan**: Buka dan edit catatan langsung di VSCode.
- **Catatan Baru**: Buat catatan baru dengan ekstensi default yang dapat dikonfigurasi.

## Instalasi

1. Buka VSCode.
2. Pergi ke Extensions (`Ctrl+Shift+X`).
3. Cari "GoNotes".
4. Klik "Install".

## Penggunaan

1. **Pilih Lokasi Penyimpanan**:
   - Klik pada ikon GoNotes di Activity Bar.
   - Klik "Pilih Lokasi Penyimpanan".
   - Pilih folder tempat Anda ingin menyimpan catatan.

2. **Buat Folder Baru**:
   - Klik kanan di dalam tampilan GoNotes.
   - Pilih "Folder Baru".
   - Masukkan nama folder.

3. **Buat Catatan Baru**:
   - Klik kanan di dalam tampilan GoNotes.
   - Pilih "Catatan Baru".
   - Masukkan nama catatan.

4. **Edit Catatan**:
   - Klik dua kali pada catatan untuk membukanya di editor.

5. **Hapus Catatan**:
   - Klik kanan pada catatan.
   - Pilih "Hapus".

## Konfigurasi

Anda dapat mengubah konfigurasi GoNotes di `settings.json`:

```json
{
  "GoNotes.notesLocation": "path/to/notes",
  "GoNotes.notesDefaultNoteExtension": "md",
  "GoNotes.notesExtensions": "md,markdown,txt"
}
