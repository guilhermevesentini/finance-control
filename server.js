const express = require("express");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(express.json());
server.use(cors());

const SECRET_KEY = "mysecretkey";

function createToken(username) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Endpoint de login
server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = router.db.get("users").find({ username }).value();

  if (!user) {
    res.status(401).json({ error: "Usuário não encontrado." });
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ error: "Senha incorreta." });
    return;
  }

  const token = createToken(username);
  res.json({ token });
});

server.post("/delete-despesa", (req, res) => {
  console.log("/despesas/:despesaId/meses/:mesId");
  const { despesaId, mesId } = req.body; // Mudança aqui: Use req.body ao invés de req.params.
  const dbPath = path.join(__dirname, "db.json");
  const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  const despesa = dbData.despesas.find((d) => d.id === despesaId);

  if (!despesa) {
    res.status(404).json({ error: "Despesa não encontrada." });
    return;
  }

  const mesesAtualizados = despesa.meses.filter((mes) => mes.id !== mesId);

  if (mesesAtualizados.length === despesa.meses.length) {
    res.status(404).json({ error: "Mês não encontrado." });
    return;
  }

  despesa.meses = mesesAtualizados;

  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  res.status(200).json({ message: "Mês removido com sucesso." });
});

// Middleware de autenticação
server.use((req, res, next) => {
  if (req.originalUrl === "/api/login") {
    next();
    return;
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded.username;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido." });
  }
});

// Usar o roteador JSON Server
server.use(router);

// Iniciar o servidor
server.listen(3001, () => {
  console.log("Servidor iniciado na porta 3001");
});
