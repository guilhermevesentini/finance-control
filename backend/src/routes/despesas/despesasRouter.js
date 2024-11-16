import express from "express";
import {
  obterDespesas,
  obterDespesasPorMes,
} from "../../controllers/despesas/despesasController.js";

const despesasRouter = express.Router();

despesasRouter.get("/despesas", obterDespesas);
despesasRouter.get("/despesasPorMes", obterDespesasPorMes);

export default despesasRouter;
