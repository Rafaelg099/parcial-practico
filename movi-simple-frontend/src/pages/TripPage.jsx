import { useState, useEffect } from "react";
import axios from "axios";
import GraphMap from "../components/Map/GraphMap";
import ProgressBar from "../components/Map/ProgressBar";

const tarifa = 0.5;
const nodes = ["A", "B", "C", "D", "E", "F"];

function TripPage() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [path, setPath] = useState([]);
  const [progressIndex, setProgressIndex] = useState(-1);
  const [cost, setCost] = useState(null);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/route/graph").then(res => {
      if (res.data.success) setEdges(res.data.edges);
    });
  }, []);

  const getEdgeWeight = (u, v) => {
    const edge = edges.find(([a, b]) => (a === u && b === v) || (a === v && b === u));
    return edge ? edge[2] : 1;
  };

  const handleCalculate = async () => {
    try {
      const res = await axios.post("http://localhost:3001/route/calculate", {
        start: source,
        end: target,
      });
      if (res.data.success) {
        setPath(res.data.path);
        setCost(res.data.costo);
        setProgressIndex(0);
      }
    } catch (err) {
      console.error("Error al calcular la ruta:", err);
    }
  };

  useEffect(() => {
    if (progressIndex >= 0 && progressIndex < path.length - 1) {
      const from = path[progressIndex];
      const to = path[progressIndex + 1];
      const weight = getEdgeWeight(from, to);
      const delay = weight * 1000;
      const timer = setTimeout(() => setProgressIndex(progressIndex + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [progressIndex]);

  const reset = () => {
    setSource("");
    setTarget("");
    setPath([]);
    setProgressIndex(-1);
    setCost(null);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="border shadow-md p-6 w-[400px] rounded bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">Trip Request</h2>

        <GraphMap
          nodes={nodes}
          edges={edges}
          path={path}
          source={source}
          target={target}
          progressIndex={progressIndex}
        />

        <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full mb-2 border p-1">
          <option value="">Origin</option>
          {nodes.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full mb-4 border p-1">
          <option value="">Destination</option>
          {nodes.map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <button onClick={handleCalculate} disabled={!source || !target} className="w-full bg-blue-600 text-white py-2 mb-2">
          Calculate Route
        </button>

        {progressIndex >= 0 && <ProgressBar progress={progressIndex} total={path.length} />}

        {progressIndex >= path.length - 1 && cost !== null && (
          <div className="mt-4 text-center">
            <p>Tiempo total: {path.length - 1} segundos</p>
            <p>Costo del viaje: ${cost.toFixed(2)}</p>
            <button onClick={reset} className="mt-2 bg-gray-600 text-white px-4 py-1">Finalizar viaje</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripPage;