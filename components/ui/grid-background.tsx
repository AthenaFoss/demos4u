import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Smaller grid pattern */}
        <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e5ec" strokeWidth="0.5" />
        </pattern>

        {/* Larger grid pattern */}
        <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#smallGrid)" />
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#0002" strokeWidth="1" />
        </pattern>

        {/* Soft drop shadow for the circles */}
        <filter id="softDropShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
          <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Mask to remove grid lines from the header and footer */}
        <mask id="maskTopAndBottom">
        
          {/* Block the top (header) area */}
          <rect x="0" y="0" width="100%" height="600px" fill="white" />
          
        </mask>
      </defs>

      {/* Light blue background */}
      <rect width="100%" height="100%" fill="#C3DEFF" />

      {/* Apply the larger grid pattern and mask top/bottom areas */}
      <rect width="100%" height="100%" fill="url(#grid)" mask="url(#maskTopAndBottom)" />

      {/* Circles placed at grid intersection points */}
      {[
        [160, 160, 8],
        [320, 320, 6],
        [480, 160, 10],
        [640, 320, 7],
        [800, 480, 9],
        [960, 160, 8],
        [1120, 320, 6],
        [1280, 480, 7],
        [1440, 160, 9],
        [1600, 320, 8],
      ].map(([cx, cy, r], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#ffffff"
          filter="url(#softDropShadow)"
          opacity="0.8"
        />
      ))}
    </svg>
  );
};

export default GridBackground;
