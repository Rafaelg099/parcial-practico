const fs = require("fs");
const path = require("path");

const calcularRuta = (req, res) => {
  const { start, end } = req.body;
  console.log("➡️ Recibido:", start, end);

  try {
    const content = fs.readFileSync(path.join(__dirname, "../data/edges.txt"), "utf-8")
      .split("\n")
      .filter(line => line.trim())
      .map(line => {
        const [u, v, w] = line.split(",");
        return [u, v, parseInt(w)];
      });

    const nodes = [...new Set(content.flatMap(([u, v]) => [u, v]))];
    const dist = {}, prev = {}, Q = new Set();
    nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; Q.add(n); });
    dist[start] = 0;

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

    const pathNodes = [];
    let curr = end;
    while (curr) {
      pathNodes.unshift(curr);
      curr = prev[curr];
    }

    const tarifa = 0.5;
    const costo = dist[end] * tarifa;

    res.json({ success: true, path: pathNodes, tiempo: dist[end], costo });
  } catch (err) {
    console.error("❌ Error en calcularRuta:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

const getGraph = (req, res) => {
  try {
    const content = fs.readFileSync(path.join(__dirname, "../data/edges.txt"), "utf-8")
      .split("\n")
      .filter(line => line.trim())
      .map(line => {
        const [u, v, w] = line.split(",");
        return [u, v, parseInt(w)];
      });
    res.json({ success: true, edges: content });
  } catch (err) {
    console.error("Error al leer el grafo:", err);
    res.status(500).json({ success: false, message: "No se pudo cargar el grafo" });
  }
};

module.exports = { calcularRuta, getGraph };
