import jsonServer from "json-server";

const db = jsonServer.router("./_db/db.json");

export const obterDespesas = (req, res) => {
  console.log("req.user:", req.user); // Verifica o conteúdo de req.user

  const userId = req.user.id; // Usando ?. para evitar erro se req.user for undefined

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  const despesas = db.db.get("despesas").value();

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

  return res.status(200).json({
    statusCode: 200,
    result: despesasUsuario,
    error: null,
  });
};