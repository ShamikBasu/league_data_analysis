// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import LinePlot from './LinePlot';
import { fetchDataFirstInnings200,fetchDataSecondInnings200 } from '../../pages/api/fetchData';

export default function LinePlotBase() {
  const [dataFirstInnings, setDataFirstInnings] = useState({});
  const [dataSecondInnings, setDataSecondInnings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstInnings = await fetchDataFirstInnings200();
        const secondInnings= await fetchDataSecondInnings200();
        setDataFirstInnings(firstInnings);
        setDataSecondInnings(secondInnings);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-8">
      <Head>
        <title>3D Line Graph Visualization</title>
        <meta name="description" content="3D Line Graph using React Three Fiber and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-white mb-12">200 Scored - First Innings v Second Innings </h1>
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <LinePlot data1={dataFirstInnings} data2={dataSecondInnings} colors={['red', 'blue']}/>
        )}
      </main>
    </div>
  );
}
