import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonServer from "json-server";

const db = jsonServer.router("./_db/db.json");

// Criar adaptador para o banco de dados
// const adapter = new FileSync("db.json");
// const db = low(adapter);

// Secret para JWT
const SECRET_KEY = "mysecretkey";

// Função para criar o token JWT
const createToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
};

// Função de login
export const login = (req, res) => {
  console.log("testetabdi login");

  const { username, password } = req.body;

  const users = db.db.get("users").value(); // Obtendo a lista de usuários
  const user = users.find((u) => u.username === username); // Procurando o usuário

  if (!user) {
    return res.status(200).json({
      status: 400,
      result: null,
      error: "Usuário não encontrado",
    });
  }

  // const isPasswordValid = bcrypt.compareSync(password, user.password);
  // if (!isPasswordValid) {
  //   return res.status(401).json({ error: "Senha incorreta" });
  // }

  const token = createToken(username);
  res.json({ token });
};

// Função de registro
export const register = (req, res) => {
  const { username, password } = req.body;

  const users = db.db.get("users").value(); // Obtendo a lista de usuários
  const existingUser = users.find((u) => u.username === username); // Procurando o usuário

  if (existingUser) {
    return res.status(200).json({
      status: 400,
      result: null,
      error: "Usuário já existe",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.get("users").push({ username, password: hashedPassword }).write();

  const token = createToken(username);
  res.status(201).json({ token });
};

// Função para obter usuário pelo nome
export const getUserByUsername = (req, res) => {
  const { username } = req.params;

  const users = db.db.get("users").value(); // Obtendo a lista de usuários
  const user = users.find((u) => u.username === username); // Procurando o usuário

  if (!user) {
    return res.status(200).json({
      status: 400,
      result: null,
      error: "Usuário não encontrado",
    });
  }

  return res.status(200).json({
    statusCode: 200,
    result: {
      id: user.id,
      username: user.username,
      _id: user._id,
    },
    error: null,
  });
};
