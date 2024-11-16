import express from "express";
import cors from "cors";
import { createServer } from "http";
import routes from "./routes/router.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3001;
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
