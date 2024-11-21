import { } from '../config/db.config.js';
import { Book } from '../model/book.js';

// membuat data buku
const create = async (req, res) => {
    try {        
        // validasi request
        if (!req.body.judul) {
            res.status(400).send({ message: "judul tidak boleh kosong!" });
            return;
        }
    
        await Book.insertMany({
            judul: req.body.judul,
            penulis: req.body.penulis,
            tahun: req.body.tahun,
            deskripsi: req.body.deskripsi,
        })
        res.send({ message: "berhasil menambah buku" })
    } catch (error) {
        res.status(500).send({ message: "error menerima data" })
    }
}

// menampilkan semua data buku
const findAll = async (req, res) => {
    const books = await Book.find({})
    res.send(books)
}

// menampilkan data buku berdasarkan id
const findBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            res.status(404).send({ message: `data buku id ${req.params.id} tidak ada` })
        } else res.send(book)
    } catch (error) {
        res.status(500).send({ message: "error menerima data" })
    }
    
}

// proses menghapus 1 data buku
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            res.status(404).send({ message: `data buku id ${req.params.id} gagal di hapus, mungkin data tidak ada` })
        } else {
            res.send({ message: 'data buku berhasil dihapus.' })
        }
    } catch (error) {
        res.status(500).send({ message: "data buku tidak bisa dihapus" })
    }
}

// proses menghapus semua data buku
const deleteAll = async (req, res) => {
    try {
        const book = await Book.deleteMany({})
        res.send({ message: `${book.deletedCount} buku berhasil dihapus!` })
    } catch (error) {
        res.status(500).send({ message: error.message || 'gagal menghapus semua data buku' })
    }
}

// proses update data buku berdasarkan id
const updateBook = async (req, res) => {
    try {        
        // validasi data tidak boleh kosong
        if (!req.body) {
            res.status(400).send({ message: "data yang akan diubah tidak boleh kosoong" })
            return;
        }
        
        const book = await Book.findByIdAndUpdate(req.params.id, req.body)
        if (!book) {
            res.status(404).send({ message: "gagal mengubah data buku, mungkin data buku tidak ada" })
        } else res.send({ message: "data buku berhasil diubah" })
    } catch (error) {
        res.status(500).send({ message: "error mengubah data" })
    }
}

export { create, findAll, findBookById, deleteBook, deleteAll, updateBook }