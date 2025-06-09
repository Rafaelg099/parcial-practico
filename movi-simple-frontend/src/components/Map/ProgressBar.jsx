import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ path = [], weights = {}, onFinish = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (path.length === 0) return; // No hay nada que mostrar

    if (currentIndex < path.length - 1) {
      const from = path[currentIndex];
      const to = path[currentIndex + 1];
      const delay =
        (weights[from]?.[to] ?? weights[to]?.[from] ?? 1) * 1000; // 1s por defecto

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (path.length > 1) {
      onFinish();
    }
  }, [currentIndex, path, weights, onFinish]);

  return (
    <div className="progress-map">
      {path.map((node, index) => (
        <div
          key={index}
          className={`progress-node ${index <= currentIndex ? 'active' : ''}`}
        >
          {node}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
