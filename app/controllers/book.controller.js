import { } from '../config/db.config.js';
import { Book } from '../model/book.js';

// membuat data buku
const create = async (req, res) => {
    // validasi request
    if (!req.body.judul) {
        res.status(400).send({ message: "judul tidak boleh kosong!" });
        return;
    }

    const books = await Book.insertMany({
        judul: req.body.judul,
        penulis: req.body.penulis,
        tahun: req.body.tahun,
        deskripsi: req.body.deskripsi,
    })
    res.send(books)
}

// menampilkan semua data buku
const findAll = async (req, res) => {
    const books = await Book.find({})
    res.send(books)
}

const findBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            res.status(404).send({ message: `data buku id ${req.params.id} tidak ada` })
        } else res.send(book)
    } catch (error) {
        res.status(500).send({ message: "error menerima data"})
    }
    
}

export { create, findAll, findBookById }