# Dayat Developer Portfolio — GitHub Pages Ready

Website statis (HTML/CSS/JavaScript) yang bisa langsung di-hosting gratis di GitHub Pages.

## Cara menjalankan di laptop
1. Extract ZIP.
2. Buka folder `dayat-portfolio-github`.
3. Cara paling sederhana: klik `index.html`.
4. Lebih baik gunakan VS Code + Live Server bila tersedia.

## Cara menambah project
1. Buka `admin.html`.
2. Klik **+ Tambah Project**.
3. Isi nama project, kategori, deskripsi, fitur, teknologi, gambar, dan link.
4. Klik **Simpan Project**.
5. Cek hasil melalui `index.html`.

Perubahan dari `admin.html` langsung tersimpan di browser (localStorage).

## Agar perubahan tampil untuk semua orang di GitHub Pages
GitHub Pages bersifat statis, jadi browser tidak boleh menulis langsung ke repository.

1. Setelah selesai edit di `admin.html`, klik **Download portfolio-data.js**.
2. Di repository GitHub, buka `assets/js/portfolio-data.js`.
3. Upload/ganti file tersebut dengan hasil download terbaru.
4. Commit perubahan.
5. GitHub Pages otomatis memperbarui website.

## Menambahkan gambar project
- Taruh gambar di: `assets/img/projects/`
- Contoh: `assets/img/projects/project-baru.jpg`
- Isi kolom Gambar pada admin dengan path tersebut.
- Saat upload ke GitHub, jangan lupa upload file gambarnya juga.

## Hosting di GitHub Pages
1. Buat repository baru, misalnya `portfolio`.
2. Upload seluruh isi folder ini ke repository.
3. Buka **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder `/ (root)`.
6. Save.
7. Tunggu beberapa menit sampai URL GitHub Pages muncul.

## Data awal
Sudah berisi:
- SILEYA CAFFE POS
- Selayar Virtual Run 2026
- Sistem Machine Learning BK
- Museum Nekara Selayar

## Kontak awal
- WhatsApp: 085657000690
- Instagram: bang_dayat55

Semua data dapat diubah lewat `admin.html`.
