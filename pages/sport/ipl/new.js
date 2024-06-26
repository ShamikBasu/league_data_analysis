import Image from 'next/image'
import { AppLayout } from '../../../components/AppLayout'
import Head from 'next/head';
import ImageDisplay from '../../../components/image';
import ThreeDGraph from '../../../components/ThreeDGraph';
import GraphBase from '../../../components/GraphBase';
import LinePlotBase from '../../../components/LinePlot/LinePlotBase';

const MyData = [
  { x: 1, y: 2, value: 5 },
  { x: 3, y: 4, value: 10 },
  { x: 5, y: 1, value: 7 },
];


export default function IPLData() {
  const apiEndpoint = 'http://localhost:5000/ipl/'; // Update this to your actual API endpoint
  const currentYear = new Date().getFullYear();
  const options = Array.from({ length: currentYear - 2008 + 1 }, (_, i) => {
    const year = (2008 + i).toString();
    return { value: year, label: year };
  });
  return (
    <>
    <div>
      <Head>
        <title>Image Display</title>
        <meta name="description" content="Display an image fetched from an API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-black mb-12">IPL Data Plotting</h1>
        <div className="flex space-x-8">
          <ImageDisplay apiEndpoint={apiEndpoint} options={options} />
          <ImageDisplay apiEndpoint={apiEndpoint} options={options} playerNames = {true}/>
        </div>
      </main>
    </div>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
     {/* <Head>
       <title>3D Graph Visualization</title>
       <meta name="description" content="3D Graph using React Three Fiber and Tailwind CSS" />
       <link rel="icon" href="/favicon.ico" />
     </Head> */}

     <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-8">
       
       <GraphBase/>
     </main>
   </div>

   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
     {/* <Head>
       <title>3D Graph Visualization</title>
       <meta name="description" content="3D Graph using React Three Fiber and Tailwind CSS" />
       <link rel="icon" href="/favicon.ico" />
     </Head> */}

     <main className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-8">
       
       <LinePlotBase/>
     </main>
   </div>
   </>
  );
}

IPLData.getLayout = function getLayout(page, pageProps){
  return <AppLayout{...pageProps}>{page}</AppLayout>
}
