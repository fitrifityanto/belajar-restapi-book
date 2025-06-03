import express from "express";
import {
  create,
  findAll,
  findBookById,
  deleteBook,
  deleteAll,
  updateBook,
} from "../controllers/book.controller.js";

export const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findBookById);
router.delete("/:id", deleteBook);
router.delete("/", deleteAll);
router.put("/:id", updateBook);
