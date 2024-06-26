import Image from 'next/image'
import { AppLayout } from '../../../components/AppLayout'
import { useState } from 'react';
import Head from 'next/head';
import ImageDisplay from '../../../components/image';
import ThreeDGraph from '../../../components/ThreeDGraph';
import GraphBase from '../../../components/GraphBase';
import LinePlotBase from '../../../components/LinePlot/LinePlotBase';
import EplTeamDropdown from '../../../components/epl_components/DropDown/EplTeamDropDown';
import EplBarPlot from '../../../components/epl_components/BarPlot/EplBarPlot';

const MyData = [
  { x: 1, y: 2, value: 5 },
  { x: 3, y: 4, value: 10 },
  { x: 5, y: 1, value: 7 },
];


export default function EPLData() {
    const [selectedTeam, setSelectedTeam] = useState('');
//   const apiEndpoint = 'http://localhost:5000/epl/'; // Update this to your actual API endpoint
//   const currentYear = new Date().getFullYear();
//   const options = Array.from({ length: currentYear - 2008 + 1 }, (_, i) => {
//     const year = (2008 + i).toString();
//     return { value: year, label: year };
//   });
  return (
    <>

    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-4">3D Bar Plot of Team Seasons</h1>
      <div className="mb-4">
        <EplTeamDropdown onSelect={setSelectedTeam} />
      </div>
      <div className="w-full h-96">
        {selectedTeam && <EplBarPlot team={selectedTeam} />}
      </div>
    </div>
   </>
  );
}

EPLData.getLayout = function getLayout(page, pageProps){
  return <AppLayout{...pageProps}>{page}</AppLayout>
}
