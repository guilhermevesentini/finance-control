const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const router = jsonServer.router(path.join(__dirname, "db.json"));

const customMiddleware = (req, res, next) => {
  // Verifica se a requisição é para deletar um mês específico
  if (
    req.method === "DELETE" &&
    req.url.match(/^\/despesas\/\d+\/meses\/\w+/)
  ) {
    // Extrai o ID da despesa e o despesaId do mês
    const matches = req.url.match(/^\/despesas\/(\d+)\/meses\/(\w+)/);
    const despesaId = matches[1];
    const mesId = matches[2];

    // Carrega os dados do arquivo `db.json`
    const dbPath = path.join(__dirname, "db.json");
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Busca a despesa
    const despesa = dbData.despesas.find((d) => d.id === despesaId);

    if (!despesa) {
      res.status(404).json({ error: "Despesa não encontrada" });
      return;
    }

    // Filtra e remove o mês pelo `despesaId`
    const mesesAtualizados = despesa.meses.filter(
      (mes) => mes.despesaId !== mesId
    );

    if (mesesAtualizados.length === despesa.meses.length) {
      res.status(404).json({ error: "Mês não encontrado" });
      return;
    }

    // Atualiza o array de meses na despesa
    despesa.meses = mesesAtualizados;

    // Salva as alterações no arquivo `db.json`
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    // Responde com sucesso
    res.status(200).json({ message: "Mês removido com sucesso" });
    return;
  }

  // Passa para o próximo middleware se não for uma rota DELETE específica
  next();
};

module.exports = customMiddleware;
