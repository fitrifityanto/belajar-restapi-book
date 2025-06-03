import "dotenv/config";
import mongoose from "mongoose";

// jika mengakses mongodb local:
// mongoose.connect('mongodb://127.0.0.1:27017/belajar')
const uri = process.env.MONGODB_URI;
export const conn = mongoose
  .connect(uri, { dbName: "belajar", family: 4, socketTimeoutMS: 1000 })
  .then(() => {
    console.log("koneksi ke atlas cluster berhasil");
  })
  .catch((err) => console.log(`error connection: ${err}`));

