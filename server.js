const express = require("express");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(express.json());
server.use(cors()); // Adicione essa linha antes de todas as rotas

const SECRET_KEY = "mysecretkey";

function createToken(username) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

server.post("http://localhost:8081/#/api/login", (req, res) => {
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

server.use(router);

server.listen(8081, () => {
  console.log("Servidor iniciado na porta 8081");
});
