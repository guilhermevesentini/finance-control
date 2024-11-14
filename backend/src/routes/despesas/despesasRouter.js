import express from "express";
import { obterDespesas } from "../../controllers/despesas/despesasController.js";

const despesasRouter = express.Router();

despesasRouter.get("/", obterDespesas);

export default despesasRouter;
