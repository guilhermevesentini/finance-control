import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { createServer } from "http";

const app = express();

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Definir rotas
app.use("/user", userRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
