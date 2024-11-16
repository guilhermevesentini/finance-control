import jsonServer from "json-server";

const db = jsonServer.router("./_db/usuario/users.json");

export const usuarioLogado = (req, res) => {
  console.log("req.user:", req.user);

  const userId = req.user;

  if (!userId) {
    return res.status(400).json({ error: req.user });
  }

  const despesas = db.db.get("despesas").value();

  console.log("despesas", despesas);

  const despesasUsuario = despesas.filter(
    (despesa) => despesa.customerId === req.user.id
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
