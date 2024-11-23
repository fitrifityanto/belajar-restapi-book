import mongoose, { Schema } from "mongoose";
import { conn } from '../config/db.config.js';

const schema = new Schema( {
    judul: {
        type: String,
        required: true,
    },
    penulis: {
        type: String,
        required: true,
    },
    tahun: String,
    deskripsi: String,
})

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

  const Book = mongoose.model('Book', schema)
   
export { Book }