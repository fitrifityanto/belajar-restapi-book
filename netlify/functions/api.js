import serverless from "serverless-http";

import express from "express";
import cors from "cors";
import "dotenv/config";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import path from "path";

import { router } from "../../routes/book.router.js";
import { validateApiKey } from "../../middleware/validate.js";

const swaggerPath = path.join(process.cwd(), "netlify/functions/swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Book API Documentation",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.22.0/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.22.0/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.22.0/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.22.0/swagger-ui.css",
    ],
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

app.use("/api/books", validateApiKey, router);

app.use("*", (req, res) => {
  res.status(404).json({ message: "halaman tidak ditemukan" });
});

export const handler = serverless(app);
