import serverless from "serverless-http";

import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "../../routes/book.router.js";
import { validateApiKey } from "../../middleware/validate.js";

const app = express();

const corsOptions = {
  origin: "*", // atau sesuaikan dengan Netlify domain kamu
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", validateApiKey, router);

app.use("*", (req, res) => {
  res.status(404).json({ message: "halaman tidak ditemukan" });
});

export const handler = serverless(app);
