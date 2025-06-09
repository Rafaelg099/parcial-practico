const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "../data/users.txt");

const register = (req, res) => {
  const { name, email, password } = req.body;
  const line = `${name},${email},${password}\n`;

  fs.appendFileSync(usersPath, line);
  res.status(201).json({ message: "Usuario registrado correctamente" });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const data = fs.readFileSync(usersPath, "utf-8");
  const users = data.trim().split("\n").map(line => line.split(","));

  const user = users.find(u => u[1] === email && u[2] === password);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  res.json({
    token: "fake-token",
    user: { name: user[0], email: user[1] }
  });
};

module.exports = { register, login };
