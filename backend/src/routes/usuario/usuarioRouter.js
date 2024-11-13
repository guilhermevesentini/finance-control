import express from "express";
import {
  register,
  login,
  getUserByUsername,
} from "../../controllers/usuario/userController.js";

const usuarioRouter = express.Router();

// Rota para registrar um usuário
usuarioRouter.post("/register", register);

// Rota para fazer login
usuarioRouter.post("/login", login);

// Rota para buscar um usuário pelo username
usuarioRouter.get("/:username", getUserByUsername);

export default usuarioRouter;
