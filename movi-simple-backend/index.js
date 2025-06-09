const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');// Ajusta la ruta si es distinta
const fs = require('fs');

app.use(express.json()); // Para poder recibir JSON en los requests

// Rutas de autenticación bajo /auth
app.use('/auth', authRoutes);

// Ruta para calcular la ruta (como la que mostraste)
app.post("/route/calculate", (req, res) => {
  const { source, target } = req.body;

  if (!source || !target) {
    return res.status(400).json({ success: false, message: "source y target requeridos" });
  }

  try {
    const content = fs.readFileSync("./edges.txt", "utf-8")
      .split("\n")
      .filter(line => line.trim())
      .map(line => {
        const [u, v, w] = line.split(",");
        return [u, v, parseInt(w)];
      });

    const nodes = [...new Set(content.flatMap(([u, v]) => [u, v]))];

    // Algoritmo de Dijkstra
    const dist = {}, prev = {}, Q = new Set();
    nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; Q.add(n); });
    dist[source] = 0;

    while (Q.size) {
      const u = [...Q].reduce((a, b) => dist[a] < dist[b] ? a : b);
      Q.delete(u);
      content.filter(([x, y]) => x === u || y === u).forEach(([a, b, w]) => {
        const v = a === u ? b : a;
        if (Q.has(v)) {
          const alt = dist[u] + w;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      });
    }

    const path = [];
    let curr = target;
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }

    res.json({
      success: true,
      path,
      time: dist[target]
    });
  } catch (err) {
    console.error("Error en cálculo de ruta:", err);
    res.status(500).json({ success: false, message: "Error interno al calcular ruta" });
  }
});

// Levantar servidor en puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

