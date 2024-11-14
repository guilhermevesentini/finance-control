import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Pega o token do cabeçalho

  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido ou expirado" });
    }

    // Adiciona o usuário decodificado à requisição
    req.user = decoded;
    next(); // Chama o próximo middleware ou a função da rota
  });
};
