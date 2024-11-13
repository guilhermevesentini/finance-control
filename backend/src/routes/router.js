import express from "express";
import usuarioRouter from "./usuario/usuarioRouter.js"; // Importando o roteador de usuário

const router = express.Router();

// Registrar o grupo de rotas de usuário com prefixo
router.use("/users", usuarioRouter);

export default router;
