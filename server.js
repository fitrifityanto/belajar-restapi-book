import express from 'express';
import cors from 'cors';
import { } from './app/config/db.config.js';
import { create, findAll, findBookById } from './app/controllers/book.controller.js';


const app = express();
const router = express.Router()

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "selamaat datang"})
});

router.post('/', create);
router.get('/', findAll)
router.get('/:id', findBookById)

app.use('/api/books', router)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});

