import express from "express";
import usuarioRouter from "./usuario/usuarioRouter.js";
import despesasRouter from "./despesas/despesasRouter.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/user", usuarioRouter);

router.use("/despesas", authenticate, despesasRouter);

export default router;
