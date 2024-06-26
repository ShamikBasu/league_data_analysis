// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ThreeDGraph from './ThreeDGraph';
import fetchData from '../pages/api/fetchData';

const GraphBase = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const teams = [
    { value: 'Kolkata Knight Riders', label: 'Kolkata Knight Riders' },
    { value: 'Chennai Super Kings', label: 'Chennai Super Kings' },
    { value: 'Delhi Daredevils', label: 'Delhi Daredevils' },
    { value: 'Royal Challengers Bangalore', label: 'Royal Challengers Bangalore' },
    { value: 'Rajasthan Royals', label: 'Rajasthan Royals' },
    { value: 'Kings XI Punjab', label: 'Kings XI Punjab' },
    { value: 'Deccan Chargers', label: 'Deccan Chargers' },
    { value: 'Mumbai Indians', label: 'Mumbai Indians' },
  ];

  const colors = {
    "Kolkata Knight Riders": ['purple'],
    "Chennai Super Kings": ['yellow'],
    'Delhi Daredevils': ['blue'],
    'Royal Challengers Bangalore' : ['red'],
    'Rajasthan Royals' : ['pink'],
    'Kings XI Punjab' : ['red'],
    'Deccan Chargers' : ['#152238'],
    'Mumbai Indians' : ['blue'],



  };

  useEffect(() => {
    if (selectedTeam) {
      setLoading(true);
      setError(null);
      fetchData(selectedTeam)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    }
  }, [selectedTeam]);

  const handleDropdownChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-8">
      <Head>
        <title>Wins by teams Visualization</title>
        <meta name="description" content="3D Graph using React Three Fiber and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-white mb-12">Wins by teams Visualization</h1>
        <div className="mb-8">
          <select
            value={selectedTeam}
            onChange={handleDropdownChange}
            className="p-2 border rounded bg-white text-black"
          >
            <option value="" disabled>
              Select a team
            </option>
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && data && (
          <ThreeDGraph data={data} colors={colors[selectedTeam] || []} />
        )}
      </main>
    </div>
  );
}
export default GraphBase;
