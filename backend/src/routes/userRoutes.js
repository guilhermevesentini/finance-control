import express from "express";
import {
  register,
  login,
  getUserByUsername,
} from "../controllers/userController.js";

const router = express.Router();

// Rota para registrar um usuário
router.post("/register", register);

// Rota para fazer login
router.post("/login", login);

// Rota para buscar um usuário pelo username
router.get("/:username", getUserByUsername);

export default router;
