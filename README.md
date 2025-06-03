[![Netlify Status](https://api.netlify.com/api/v1/badges/2cab4f73-0867-449d-94ba-da6692809327/deploy-status)](https://app.netlify.com/projects/book-api-express-mongodb/deploys)

Project ini adalah contoh implementasi REST API sederhana untuk manajemen data buku menggunakan **Express.js** dan **MongoDB**, serta dideploy ke **Netlify Functions**.

## Fitur

- CRUD (Create, Read, Update, Delete) data buku
- Middleware validasi API Key
- Struktur folder mengikuti format yang kompatibel dengan Netlify Functions
    

## Struktur Proyek

```
.
├── config
│   └── db.config.js           # Konfigurasi koneksi ke MongoDB
├── controllers
│   └── book.controller.js     # Logika utama untuk CRUD buku
├── index.js                   # Entry point saat dijalankan lokal (tidak dipakai Netlify)
├── middleware
│   └── validate.js            # Middleware validasi API Key
├── models
│   └── book.js                # Schema model Book
├── netlify
│   └── functions
│       └── api.js             # Entry point untuk Netlify Functions
├── netlify.toml               # Konfigurasi build Netlify
├── package.json
├── package-lock.json
├── public
│   └── index.html             # Halaman statis (opsional)
└── routes
    └── book.router.js         # Definisi rute API
```

## Penjelasan Teknis

- **Netlify menjalankan aplikasi melalui file `netlify/functions/api.js`**, bukan `index.js`.
    
- File `index.js` digunakan saat testing lokal. Untuk itu, baris `app.listen()` perlu diaktifkan secara manual (lihat bagian di bawah).
    
- Routing API didefinisikan di `routes/book.router.js`, lalu digunakan di `api.js` dengan middleware validasi API key:
    

```js
app.use("/api/books", validateApiKey, router);
```

Dengan rute-rute berikut:

|Method|Endpoint|Deskripsi|
|---|---|---|
|POST|`/api/books`|Menambahkan buku baru|
|GET|`/api/books`|Mengambil semua buku|
|GET|`/api/books/:id`|Mengambil satu buku|
|PUT|`/api/books/:id`|Memperbarui buku|
|DELETE|`/api/books/:id`|Menghapus satu buku|
|DELETE|`/api/books`|Menghapus semua buku|

## Testing Lokal

Untuk menjalankan secara lokal (tidak melalui Netlify):

1. Buka file `index.js`, lalu **hapus komentar** pada baris `app.listen()` seperti ini:
    

```js
 const PORT = process.env.PORT;
 app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
```

2. Jalankan server dengan:
    

```bash
npm start
```

Jika kamu menggunakan [Netlify CLI](https://docs.netlify.com/cli/get-started/) dan ingin mensimulasikan fungsi serverless secara lokal:

```bash
netlify dev
```

## Deployment

Aplikasi ini dideploy ke [Netlify](https://netlify.com) dengan konfigurasi berikut di `netlify.toml`:

```toml
[build]
  publish = "public"
  functions = "netlify/functions"

[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
  force = true
```

## Validasi API Key

Setiap request ke endpoint `/api/books` harus menyertakan header berikut:

```
x-api-key: YOUR_API_KEY
```

Jika tidak menyertakan API key atau menggunakan key yang salah, maka request akan ditolak dengan status **401** atau **403**.
