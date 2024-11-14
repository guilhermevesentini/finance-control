import express from "express";
import cors from "cors";
import { createServer } from "http";
import routes from "./routes/router.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Definir rotas
app.use("/", routes);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
