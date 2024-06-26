// components/ThreeDBarPlot.jshttp://localhost:5000/epl/season_data/${team}
// components/ThreeDBarPlot.js

import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Text } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Bar = ({ position, args, color, label, onPointerOver, onPointerOut, scale }) => (
  <group position={position} scale={scale}>
    <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
    {label && (
      <Html position={[0, args[1] / 2, 0]} center>
        <div className="bg-white text-black p-2 rounded text-md">
          {label}
        </div>
      </Html>
    )}
  </group>
);

const EplBarPlot = ({ team }) => {
  const [data, setData] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    if (team) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/epl/season_data/${team}`); 
        const result = await response.json();
        setData(result);
      };

      fetchData();
    }
  }, [team]);

  if (!data.length) return null;

  const maxPlayed = Math.max(...data.map((d) => d.played));
  const spacing = 6;
  const barThickness = 2;

  return (
    <div className="w-full h-96 "> {/*className="w-full h-96 bg-gray-800 rounded-lg shadow-lg" */}
      <Canvas camera={{ position: [0, maxPlayed * 1.5, maxPlayed * 1.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {data.map((season, index) => {
          const yWins = season.wins;
          const yLosses = season.losses;
          const yDraws = season.draws;
          const totalHeight = yWins + yLosses + yDraws;

          const isHovered = (part) => hoveredBar === `${part}-${index}`;
          const hoverScale = isHovered('wins') || isHovered('losses') || isHovered('draws') ? [1.5, 1.5, 1.5] : [1, 1, 1];

          return (
            <group key={season.Season} position={[index * spacing - data.length / 2, 0, 0]}>
              <Bar
                position={[0, yWins / 2, 0]}
                args={[barThickness, yWins, barThickness]}
                color={'#4CAF50'}
                label={isHovered('wins') ? `Wins: ${yWins}` : ''}
                onPointerOver={() => setHoveredBar(`wins-${index}`)}
                onPointerOut={() => setHoveredBar(null)}
                scale={isHovered('wins') ? hoverScale : [1, 1, 1]}
              />
              <Bar
                position={[0, yWins + yLosses / 2, 0]}
                args={[barThickness, yLosses, barThickness]}
                color={'#F44336'}
                label={isHovered('losses') ? `Losses: ${yLosses}` : ''}
                onPointerOver={() => setHoveredBar(`losses-${index}`)}
                onPointerOut={() => setHoveredBar(null)}
                scale={isHovered('losses') ? hoverScale : [1, 1, 1]}
              />
              <Bar
                position={[0, yWins + yLosses + yDraws / 2, 0]}
                args={[barThickness, yDraws, barThickness]}
                color={'#FFEB3B'}
                label={isHovered('draws') ? `Draws: ${yDraws}` : ''}
                onPointerOver={() => setHoveredBar(`draws-${index}`)}
                onPointerOut={() => setHoveredBar(null)}
                scale={isHovered('draws') ? hoverScale : [1, 1, 1]}
              />
            </group>
          );
        })}

        {/* X-axis labels */}
        {data.map((season, index) => (
          <Text key={season.Season} position={[index * spacing - data.length / 2, -2, 0]} color="black" fontSize={1.2}>
            {season.Season}
          </Text>
        ))}

        {/* Y-axis labels */}
        {/* {Array.from({ length: maxPlayed + 1 }, (_, i) => (
          <Text key={i} position={[-2, i, 0]} color="white" fontSize={1}>
            {i}
          </Text>
        ))} */}
      </Canvas>
    </div>
  );
};



export default EplBarPlot;
