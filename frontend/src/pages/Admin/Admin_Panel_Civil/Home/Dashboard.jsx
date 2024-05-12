import axios from "axios";
import AdminDashCard from "./AdminDashCard";
import { ComposedChart, Line, Area, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis,  CartesianGrid, Tooltip, Legend, } from 'recharts';
import { useEffect, useState } from "react";
import { UnAuth } from "../../../../Auth_Middleware/UnAuth";
import toast from "react-hot-toast";
import { Base_URL } from "../../../../Constant";

const Dashboard = () => {
        
const data = [
  { name: '1', uv: 300, pv: 456 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '12', uv: 43, pv: 45 },
  { name: '1', uv: 300, pv: 456 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '12', uv: 43, pv: 45 },
  { name: '1', uv: 300, pv: 456 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '12', uv: 43, pv: 45 },
  { name: '1', uv: 300, pv: 456 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '12', uv: 43, pv: 45 },
  { name: '19', uv: 222, pv: 366 },
  { name: '20', uv: 372, pv: 486 },
  { name: '21', uv: 182, pv: 512 },
  { name: '22', uv: 164, pv: 302 },
  { name: '23', uv: 316, pv: 425 },
  { name: '24', uv: 131, pv: 467 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
  { name: '22', uv: 164, pv: 302 },
  { name: '23', uv: 316, pv: 425 },
  { name: '24', uv: 131, pv: 467 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
];


const Piedata = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: 'Page G',
    uv: 580,
    pv: 1200,
    amt: 198,
  },
  {
    name: 'Page H',
    uv: 520,
    pv: 1108,
    amt: 900,
  },
  {
    name: 'Page I',
    uv: 1100,
    pv: 680,
    amt: 1300,
  },
  {
    name: 'Page J',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page K',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: 'Page L',
    uv: 580,
    pv: 1200,
    amt: 198,
  },
  {
    name: 'Page M',
    uv: 520,
    pv: 1108,
    amt: 900,
  },
  {
    name: 'Page N',
    uv: 1100,
    pv: 680,
    amt: 1300,
  },
];

const [AllData, setAllData] = useState('')
const [userToken] = useState(localStorage.getItem('DTCAdminToken'));

useEffect(() => {
  const fetchData = async () => {
    try {
      await axios.get(Base_URL+'/api/civil-admin/get-dashboard/', {
        headers: {
          Authorization: "Bearer " + userToken,
          },
        }).then((res) => {
          setAllData(res.data)
        }).catch((e) => {
          UnAuth(e)
        })
      } catch (e) {
        toast.error('Network error!')
      }
    }
  if(userToken) {
    fetchData();
  }
}, [userToken]);

  return (
    <div className=" bg-slate-950  px-10 w-full overflow-y-scroll pb-10 h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 uppercase font-semibold mt-4"> Dashboard </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 mt-8 gap-y-5">
        <AdminDashCard name="Total Orders" value={AllData?.allOrder || 0} />
        <AdminDashCard name="Total Pending Orders" value={AllData?.penOrder || 0} />
        <AdminDashCard name="Total Payment Orders" value={AllData?.payOrder || 0} />
        <AdminDashCard name="Total Working Orders" value={AllData?.worOrder || 0} />
        <AdminDashCard name="Total Complete Orders" value={AllData?.comOrder || 0} />
        <AdminDashCard name="Total Delivery Orders" value={AllData?.delOrder || 0} />
        <AdminDashCard name="Total Cancel Orders" value={AllData?.canOrder || 0} />
        <AdminDashCard name="Total Transaction" value={AllData?.TotalTransaction || 0} />
      </div>
      <div className='block w-full  py-8 lg:flex lg:gap-2'>
        <div className='border-[0.3px] border-slate-400 rounded-md bg-slate-900 text-slate-100 w-full pb-16 lg:w[50%]'>
          <h1 className='font-semibold text-center py-4'>Monthly Report</h1>
          <BarChart width={700} height={400} data={data} margin={{top: 5,right: 30,left: 20,bottom: 10,}} >
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip  />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', linewidth:'10px' }} />
            <ReferenceLine y={0} stroke="#c6c60b" />
            <Brush dataKey="name" height={30} stroke="#c6c60b" />
            <Bar dataKey="pv" barSize={6} fill="#c6c60b" />
            <Bar dataKey="uv" barSize={6} fill="#066dce" />
          </BarChart>
        </div>
        <div className='border-[0.3px] border-slate-400 rounded-md bg-slate-900 text-slate-100 w-full pb-16 lg:w[50%]'>
          <h1 className='font-semibold text-center py-4'>Yearly Report</h1>
          <ComposedChart className='w-full' width={700} height={400} data={Piedata} margin={{ top: 20, right: 20, bottom: 20, left: 20,}} >
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', linewidth:'10px' }} />
            <ReferenceLine y={0} stroke="#eee" />
            <Brush dataKey="name" height={30} stroke="#6f73e4" />
            <Bar dataKey="uv" barSize={5} fill="#066dce" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
