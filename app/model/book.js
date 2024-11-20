import mongoose, { Schema } from "mongoose"

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

const Book = mongoose.model('Book', schema)

export { Book }