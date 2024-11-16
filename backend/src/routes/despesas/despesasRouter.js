import express from "express";
import {
  obterDespesas,
  obterDespesasPorMes,
  criarDespesa,
} from "../../controllers/despesas/despesasController.js";

const despesasRouter = express.Router();

despesasRouter.get("/despesas", obterDespesas);
despesasRouter.get("/despesasPorMes", obterDespesasPorMes);
despesasRouter.post("/criar", criarDespesa);

export default despesasRouter;
