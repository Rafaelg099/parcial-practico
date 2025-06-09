import React, { useEffect, useState } from 'react';
import './GraphMap.css';

const ProgressMapAnimator = ({ path, weights, onFinish }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!path || path.length === 0) return;

    if (activeIndex < path.length - 1) {
      const from = path[activeIndex];
      const to = path[activeIndex + 1];
      const delay = (weights[from][to] || weights[to][from]) * 1000;

      const timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      onFinish?.();
    }
  }, [activeIndex, path, weights, onFinish]);

  return (
    <div className="progress-animated">
      {path.map((nodeId, index) => (
        <div
          key={index}
          className={`graph-node animated ${
            index === activeIndex ? 'current' : index < activeIndex ? 'done' : ''
          }`}
          style={{
            position: 'absolute',
            left: nodeCoordinates[nodeId].x,
            top: nodeCoordinates[nodeId].y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {nodeId}
        </div>
      ))}
    </div>
  );
};

// Coordenadas globales de los nodos
const nodeCoordinates = {
  A: { x: 50, y: 100 },
  B: { x: 200, y: 50 },
  C: { x: 350, y: 100 },
  D: { x: 100, y: 250 },
  E: { x: 250, y: 250 },
  F: { x: 180, y: 380 },
};

export default ProgressMapAnimator;
