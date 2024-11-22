import mongoose from "mongoose";
import 'dotenv/config';

// jika mengakses mongodb local:
// mongoose.connect('mongodb://127.0.0.1:27017/belajar')

mongoose.connect(process.env.uri, { dbName: 'belajar', family: 4, socketTimeoutMS: 1000 })
.then(() => { console.log('koneksi ke atlas cluster berhasil') })
.catch(err => console.log('koneksi mongodb bermasalah'))