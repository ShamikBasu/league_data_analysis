// components/ThreeDGraph.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef } from 'react';

const Box = ({ position, args, color, label }) => {
  const mesh = useRef();
  return (
    <group>
      <mesh position={position} ref={mesh}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[position[0], position[1] + args[1] / 2 + 0.5, position[2]]} color="white" fontSize={0.5}>
        {label}
      </Text>
    </group>
  );
};

const ThreeDGraph = ({ data, colors }) => {
  const years = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="w-full h-96 bg-gray-800 rounded-lg shadow-lg">
      <Canvas camera={{ position: [0, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={10} maxDistance={50} />
        {years.map((year, index) => (
          <Box
            key={year}
            position={[index * 2 - years.length, values[index] / 2, 0]}
            args={[1, values[index], 1]}
            color={colors[index % colors.length]}
            label={`${year}: ${values[index]}`}
          />
        ))}
        {/* X-axis labels */}
        {years.map((year, index) => (
          <Text key={year} position={[index * 2 - years.length, -1, 0]} color="white" fontSize={0.5}>
            {year}
          </Text>
        ))}
        {/* Y-axis labels */}
        {Array.from({ length: Math.max(...values) + 1 }, (_, i) => (
          <Text key={i} position={[-years.length - 1, i, 0]} color="white" fontSize={0.5}>
            {i}
          </Text>
        ))}
      </Canvas>
    </div>
  );
};

export default ThreeDGraph;
