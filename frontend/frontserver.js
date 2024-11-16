// Imports usando ESM
import express from "express";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configurações do servidor
const server = express();
const router = jsonServer.router("./_db/db.json");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json());
server.use(cors()); // Adiciona suporte ao CORS

const SECRET_KEY = "mysecretkey";

// Função para criar token
function createToken(username) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
}

// Função para verificar token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Função para gerar o hash da senha
async function generateHashPassword(password) {
  const salt = await bcrypt.genSalt(10); // O número 10 é o "round" de complexidade
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Endpoint de login (sem token)
server.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuário no banco de dados
  const user = router.db.get("users").find({ username }).value();

  //console.log("user", user);

  if (!user) {
    res.status(401).json({ error: "Usuário não encontrado." });
    return;
  }

  // Verificar senha usando bcrypt
  // const isPasswordCorrect = await bcrypt.compare(password, user.password);
  // if (!isPasswordCorrect) {
  //   res.status(401).json({ error: "Senha incorreta." });
  //   return;
  // }

  // Gerar token e retornar
  const token = createToken(username);

  const usuarioInfo = {
    id: user.id,
    password: user.password,
    token: token,
    username: user.username,
    _id: user.id,
  };

  res.json({ ...usuarioInfo });
});

// Endpoint para deletar despesa e mês
server.post("/delete-despesa", (req, res) => {
  const { despesaId, mesId } = req.body;
  const dbPath = path.join(__dirname, "_db.json");

  try {
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
  } catch (error) {
    console.error("Erro ao deletar despesa:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

server.get("/api/users/:username", (req, res) => {
  const { username } = req.params;

  // Buscar usuário no banco de dados
  const user = router.db.get("users").find({ username }).value();

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado." });
    return;
  }

  res.json(user);
});

// Middleware de autenticação para verificar token nas requisições subsequentes
server.use((req, res, next) => {
  if (req.originalUrl === "/api/login") {
    next(); // Não precisa verificar token para a rota de login
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  try {
    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const decoded = verifyToken(token); // Verifica o token
    req.user = decoded.username; // Armazena o usuário no request
    next(); // Continuação do processo
  } catch (err) {
    res.status(401).json({ error: "Token inválido." });
  }
});

// Usar o roteador JSON Server
server.use("/api", router);

// Iniciar o servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

// ** Função para atualizar as senhas com hash no banco de dados (se necessário) **
async function updatePasswordsInDb() {
  const dbPath = path.join(__dirname, "_db.json");
  const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  // Atualiza as senhas com bcrypt hash
  for (let user of dbData.users) {
    const hashedPassword = await generateHashPassword(user.password);
    user.password = hashedPassword; // Substitui a senha por sua versão hash
  }

  // Salva o banco de dados com as senhas atualizadas
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
}

// ** Executando a atualização de senhas, se necessário **
//updatePasswordsInDb();
