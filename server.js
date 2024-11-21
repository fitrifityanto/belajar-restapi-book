import express from 'express';
import cors from 'cors';
import { } from './app/config/db.config.js';
import { router } from './app/routes/book.router.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "selamaat datang" })
});

app.use('/api/books', router)

app.use('/', (req, res) => {
    res.status(404).json({ message: "halaman tidak ditemukan" })
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});