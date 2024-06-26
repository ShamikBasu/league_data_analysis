// // components/LineGraph.js
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Html, Text } from '@react-three/drei';
// import { useEffect, useState, useRef } from 'react';

// const Line = ({ points, color }) => (
//   <line>
//     <bufferGeometry>
//       <bufferAttribute
//         attach="attributes-position"
//         count={points.length}
//         array={new Float32Array(points.flat())}
//         itemSize={3}
//       />
//     </bufferGeometry>
//     <lineBasicMaterial attach="material" color={color} linewidth={5} />
//   </line>
// );

// const LinePlot = ({ data1, data2, colors }) => {
//   const [points1, setPoints1] = useState([]);
//   const [points2, setPoints2] = useState([]);
//   const [hoveredPoint, setHoveredPoint] = useState(null);

//   useEffect(() => {
//     const processData = (data) => {
//       const years = Object.keys(data);
//       const minYear = Math.min(...years.map(Number));
//       return years.map((year) => [(year - minYear) * 2, Number(data[year]), 0]);
//     };

//     setPoints1(processData(data1));
//     setPoints2(processData(data2));
//   }, [data1, data2]);

//   const handlePointerOver = (point) => {
//     setHoveredPoint(point);
//   };

//   const handlePointerOut = () => {
//     setHoveredPoint(null);
//   };

//   const years = Object.keys(data1);
//   const minYear = Math.min(...years.map(Number));
//   const maxYValue = Math.max(...Object.values(data1).map(Number), ...Object.values(data2).map(Number));
//   console.log()

//   return (
//     <div className="w-full h-96 bg-gray-800 rounded-lg shadow-lg">
//       <Canvas camera={{ position: [10, maxYValue * 1, maxYValue * 1], fov: 50 }}>
//         <ambientLight intensity={1.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls autoRotate />
//         {points1.length > 0 && (
//           <Line points={points1} color={colors[0]} />
//         )}
//         {points2.length > 0 && (
//           <Line points={points2} color={colors[1]} />
//         )}
//         {points1.map((point, index) => (
//           <mesh
//             key={index}
//             position={point}
//             onPointerOver={() => handlePointerOver({ point, value: Object.values(data1)[index] })}
//             onPointerOut={handlePointerOut}
//           >
//             <sphereGeometry args={[0.1, 16, 16]} />
//             <meshBasicMaterial color={colors[0]} />
//           </mesh>
//         ))}
//         {points2.map((point, index) => (
//           <mesh
//             key={index}
//             position={point}
//             onPointerOver={() => handlePointerOver({ point, value: Object.values(data2)[index] })}
//             onPointerOut={handlePointerOut}
//           >
//             <sphereGeometry args={[0.1, 16, 16]} />
//             <meshBasicMaterial color={colors[1]} />
//           </mesh>
//         ))}
//         {hoveredPoint && (
//           <Html position={hoveredPoint.point} center>
//             <div className="bg-white text-black p-1 rounded">
//               {hoveredPoint.value}
//             </div>
//           </Html>
//         )}
//         {/* X-axis labels */}
//         {years.map((year, index) => (
//           <Text key={year} position={[(year - minYear) * 2, -1, 0]} color="white" fontSize={0.5}>
//             {year}
//           </Text>
//         ))}
//         {/* Y-axis labels */}
//         {Array.from({ length: maxYValue + 1 }, (_, i) => (
//           <Text key={i} position={[-1, i, 0]} color="white" fontSize={0.5}>
//             {i}
//           </Text>
//         ))}
//         <Legend />
//       </Canvas>
//     </div>
//   );
// };

// const Legend = () => (
//   <group position={[10, 10, 0]}>
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="red" />
//     </mesh>
//     <Text position={[1.5, 0, 0]} color="white" fontSize={0.5}>
//       API 1
//     </Text>
//     <mesh position={[0, -1.5, 0]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="blue" />
//     </mesh>
//     <Text position={[1.5, -1.5, 0]} color="white" fontSize={0.5}>
//       API 2
//     </Text>
//   </group>
// );

// export default LinePlot;

// components/LineGraph.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Line = ({ points, color }) => (
  <line>
    <bufferGeometry>
      <bufferAttribute
        attach="attributes-position"
        count={points.length}
        array={new Float32Array(points.flat())}
        itemSize={3}
      />
    </bufferGeometry>
    <lineBasicMaterial attach="material" color={color} linewidth={5} />
  </line>
);

const LinePlot = ({ data1, data2, colors }) => {
  const [points1, setPoints1] = useState([]);
  const [points2, setPoints2] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSphere, setHoveredSphere] = useState(null);

  useEffect(() => {
    const processData = (data) => {
      const years = Object.keys(data);
      const minYear = Math.min(...years.map(Number));
      return years.map((year) => [(year - minYear) * 2, Number(data[year]), 0]);
    };

    setPoints1(processData(data1));
    setPoints2(processData(data2));
  }, [data1, data2]);

  const handlePointerOver = (event, point, value) => {
    setHoveredPoint({ point, value });
    setHoveredSphere(event.object);
    event.object.scale.set(1.2, 1.2, 1.2);
  };

  const handlePointerOut = (event) => {
    setHoveredPoint(null);
    if (hoveredSphere) {
      hoveredSphere.scale.set(1, 1, 1);
      setHoveredSphere(null);
    }
  };

  const years = Object.keys(data1);
  const minYear = Math.min(...years.map(Number));
  const maxYValue = Math.max(...Object.values(data1).map(Number), ...Object.values(data2).map(Number));
  const totalYears = Math.max(...Object.keys(data1).map(Number), ...Object.keys(data2).map(Number)) - minYear + 1;

  return (
    <div className="w-full h-96 bg-gray-800 rounded-lg shadow-lg">
      <Canvas
        orthographic
        camera={{ zoom: 10, position: [totalYears / 2, maxYValue / 2, 100] }}
        style={{ background: 'black' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom enablePan enableRotate ={false}/>
        {points1.length > 0 && <Line points={points1} color={colors[0]} />}
        {points2.length > 0 && <Line points={points2} color={colors[1]} />}
        {points1.map((point, index) => (
          <mesh
            key={index}
            position={point}
            onPointerOver={(e) => handlePointerOver(e, point, Object.values(data1)[index])}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={colors[0]} />
          </mesh>
        ))}
        {points2.map((point, index) => (
          <mesh
            key={index}
            position={point}
            onPointerOver={(e) => handlePointerOver(e, point, Object.values(data2)[index])}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={colors[1]} />
          </mesh>
        ))}
        {hoveredPoint && (
          <Html position={[hoveredPoint.point[0], hoveredPoint.point[1], hoveredPoint.point[2] + 0.1]}>
            <div className="bg-white text-black p-2 rounded-lg shadow-lg">
              <p>{hoveredPoint.value}</p>
            </div>
          </Html>
        )}
        {/* X-axis labels */}
        {years.map((year) => (
          <Text key={year} position={[(year - minYear) * 2, -1, 0]} color="white" fontSize={0.5}>
            {year}
          </Text>
        ))}
        {/* Y-axis labels */}
        {Array.from({ length: maxYValue + 1 }, (_, i) => (
          <Text key={i} position={[-1, i, 0]} color="white" fontSize={0.5}>
            {i}
          </Text>
        ))}
        <Legend />
      </Canvas>
    </div>
  );
};

const Legend = () => (
  <group position={[0, 0, 0]}>
    <mesh position={[1, 10, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
    <Text position={[3.2, 10, 0]} color="white" fontSize={0.5}>
      First Innings
    </Text>
    <mesh position={[1, 8.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
    <Text position={[3.5, 8.5, 0]} color="white" fontSize={0.5}>
      Second Innings
    </Text>
  </group>
);

export default LinePlot;




