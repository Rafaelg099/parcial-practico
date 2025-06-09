const Graph = require('../utils/graph');

const calcularRuta = (req, res) => {
  try {
    const { start, end } = req.body;
    console.log("Ruta solicitada:", start, "→", end); // DEBUG

    const graph = new Graph();

    // Definir las conexiones del grafo
    graph.addEdge('A', 'B', 5);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'D', 3);
    graph.addEdge('C', 'D', 8);
    graph.addEdge('C', 'E', 10);
    graph.addEdge('D', 'E', 2);
    graph.addEdge('D', 'F', 6);
    graph.addEdge('E', 'F', 2);

    const path = graph.getShortestPath(start, end);
    const { distances } = graph.dijkstra(start);

    if (!path || distances[end] === Infinity) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    const tiempo = distances[end];
    const tarifa = 0.5;
    const costo = tiempo * tarifa;

    res.json({ path, tiempo, costo });
  } catch (error) {
    console.error('Error en calcularRuta:', error);
    res.status(500).json({ error: 'Error interno al calcular la ruta' });
  }
};

module.exports = { calcularRuta };
