import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 2500,
        pv: 3600,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 2000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 3500,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 1500,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 3500,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 3000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 2600,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 3000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page A',
        uv: 2600,
        pv: 2400,
        amt: 2400,
    },

    // ... rest of the data ...
];

function Example() {
    return (
        <div className='h-full mx-auto block mt-5 bg-white px-10 pt-12 pb-7 '>
            <BarChart
                width={900}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}

export default Example;
