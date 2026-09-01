import React from 'react';

export default function SpiderWebBackground() {
  return (
    <div className="spider-web-watermark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        className="spider-web-svg"
      >
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" fill="none">
          {/* Radial lines */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x2 = 500 + 1000 * Math.cos(angle);
            const y2 = 500 + 1000 * Math.sin(angle);
            return <line key={`radial-${i}`} x1="500" y1="500" x2={x2} y2={y2} />;
          })}

          {/* Concentric rings */}
          {[...Array(25)].map((_, ringIndex) => {
            const radius = 40 + ringIndex * 40;
            const points = [...Array(16)].map((_, i) => {
              const angle = (i * Math.PI) / 8;
              // Add slight bezier curve / offset to make it look organic like a web
              const offset = Math.sin(angle * 4) * (radius * 0.05); 
              const x = 500 + (radius - offset) * Math.cos(angle);
              const y = 500 + (radius - offset) * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');
            return <polygon key={`ring-${ringIndex}`} points={points} />;
          })}
        </g>
      </svg>
    </div>
  );
}
