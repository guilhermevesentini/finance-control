import jsonServer from "json-server";
import { v4 as uuidv4 } from "uuid";
const despesasDb = jsonServer.router("./_db/despesas/despesas.json");
const mesesDb = jsonServer.router("./_db/despesas/meses.json");

export const obterDespesas = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  // Obter todas as despesas e meses
  const despesas = despesasDb.db.get("despesas").value();
  const meses = mesesDb.db.get("meses").value();

  const despesasUsuario = despesas.filter(
    (despesa) => despesa.customerId === userId
  );

  if (!despesasUsuario || despesasUsuario.length === 0) {
    return res.status(404).json({
      status: 404,
      result: null,
      error: "Despesas não encontradas",
    });
  }

  // Fazer o join entre despesas e meses
  const despesasComMeses = despesasUsuario.map((despesa) => {
    const mesesDaDespesa = meses.filter((mes) => mes.despesaId === despesa.id);

    return {
      ...despesa,
      meses: mesesDaDespesa,
    };
  });

  return res.status(200).json({
    statusCode: 200,
    result: despesasComMeses,
    error: null,
  });
};

export const obterDespesasPorMes = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  const { mes, ano } = req.query;

  const despesas = despesasDb.db.get("despesas").value();
  const meses = mesesDb.db.get("meses").value();

  const despesasUsuario = despesas.filter(
    (despesa) => despesa.customerId === userId
  );

  const despesasPorMes = despesasUsuario.map((despesa) => {
    const mesesFiltrados = meses.filter(
      (mesItem) =>
        mesItem.despesaId === despesa.id &&
        mesItem.ano === parseInt(ano) &&
        mesItem.mes === parseInt(mes)
    );

    if (!mesesFiltrados.length) return null;

    return {
      ...despesa,
      meses: mesesFiltrados || [],
    };
  });

  const despesasFiltradas = despesasPorMes.filter((item) => item !== null);

  // Caso não haja despesas encontradas
  if (!despesasFiltradas || despesasFiltradas.length === 0) {
    return res.status(200).json({
      statusCode: 404,
      result: undefined,
      error: "Despesas não encontradas",
    });
  }

  // Retorna despesas encontradas
  return res.status(200).json({
    statusCode: 200,
    result: despesasFiltradas,
    error: null,
  });
};

export const obterDespesasPorId = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  const { id } = req.params;

  const despesas = db.db.get("despesas").value();

  const despesa = despesas.filter((despesa) => despesa.id === id);

  if (!despesa || despesa.length === 0) {
    return res.status(404).json({
      status: 404,
      result: null,
      error: "Despesa não encontrada",
    });
  }

  return res.status(200).json({
    statusCode: 200,
    result: despesa,
    error: null,
  });
};

export const criarDespesa = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  const {
    nome,
    vencimento,
    recorrente,
    frequencia,
    meses,
    customerId,
    replicar,
  } = req.body;

  // Aqui você pode processar esses dados, como salvar no banco de dados
  if (
    !nome ||
    !vencimento ||
    !recorrente ||
    !frequencia ||
    !meses ||
    !customerId
  ) {
    return res.status(400).json({
      error: "Campos obrigatórios ausentes",
    });
  }

  const despesaModel = {
    id: uuidv4(),
    nome: nome,
    recorrente: recorrente || "2",
    vencimento: vencimento | undefined,
    frequencia: frequencia,
    replicar: replicar || false,
    customerId: userId,
  };

  despesasDb.db.get("despesas").push(despesaModel).write();

  meses.forEach((mes) => {
    const model = {
      id: uuidv4(),
      ano: mes.ano,
      mes: mes.mes,
      valor: mes.valor,
      status: mes.status,
      descricao: mes.descricao,
      despesaId: despesaModel.id,
      vencimento: mes.vencimento,
      observacao: mes.observacao,
    };

    mesesDb.db.get("meses").push(model).write();
  });

  return res.status(200).json({
    statusCode: 200,
    result: true,
    error: null,
  });
};
