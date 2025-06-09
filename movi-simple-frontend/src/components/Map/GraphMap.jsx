import React, { useState } from 'react';
import './GraphMap.css';

const nodes = [
  { id: 'A', x: 50, y: 100 },
  { id: 'B', x: 200, y: 50 },
  { id: 'C', x: 350, y: 100 },
  { id: 'D', x: 100, y: 250 },
  { id: 'E', x: 250, y: 250 },
  { id: 'F', x: 180, y: 380 }
];

// Aristas para dibujar líneas
const edges = [
  ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['C', 'D'],
  ['C', 'E'], ['D', 'E'], ['D', 'F'], ['E', 'F']
];

const GraphMap = ({ path = [], onSelect }) => {
  const [selected, setSelected] = useState({ from: null, to: null });

  const handleClick = (nodeId) => {
    if (!selected.from) {
      setSelected({ from: nodeId, to: null });
      onSelect({ from: nodeId, to: null });
    } else if (!selected.to && nodeId !== selected.from) {
      setSelected({ ...selected, to: nodeId });
      onSelect({ from: selected.from, to: nodeId });
    } else {
      setSelected({ from: nodeId, to: null });
      onSelect({ from: nodeId, to: null });
    }
  };

  const isPathNode = (id) => path.includes(id);

  return (
    <div className="graph-map">
      <svg className="edges-svg">
        {edges.map(([from, to], i) => {
          const a = nodes.find(n => n.id === from);
          const b = nodes.find(n => n.id === to);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#aaa"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className={`graph-node 
            ${selected.from === node.id ? 'from' : ''} 
            ${selected.to === node.id ? 'to' : ''} 
            ${isPathNode(node.id) ? 'in-path' : ''}`
          }
          style={{ left: node.x, top: node.y }}
          onClick={() => handleClick(node.id)}
        >
          {node.id}
        </div>
      ))}
    </div>
  );
};

export default GraphMap;
