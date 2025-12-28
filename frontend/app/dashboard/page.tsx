'use client';
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";

const data = [
    { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
    { name: 'May', uv: 189, pv: 4800, amt: 2181 },
];

const Dashboard = () => {
    const [innerWidth, setInnerWidth] = useState(0);

    useEffect(() => {
        // Set the innerWidth on the client side
        setInnerWidth(window.innerWidth);

        // Optional: Add a resize listener to update the width dynamically
        const handleResize = () => setInnerWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-200 max-w-7xl p-4 md:p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Nossas métricas</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
                {/* Card 1: Line Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Performance</h2>
                    <div className="w-full overflow-x-auto">
                        {innerWidth > 0 && (
                            <LineChart width={Math.min(400, innerWidth - 40)} height={200} data={data}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        )}
                    </div>
                </div>

                {/* Card 2: Bar Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">User Engagement</h2>
                    <div className="w-full overflow-x-auto">
                        {innerWidth > 0 && (
                            <BarChart width={Math.min(400, innerWidth - 40)} height={200} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        )}
                    </div>
                </div>

                {/* Card 3: Metrics */}
                <div className="bg-white shadow-md rounded-lg p-4 col-span-1 md:col-span-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">Key Metrics</h2>
                    <div className="flex flex-wrap justify-around gap-4">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-gray-800">120</p>
                            <p className="text-sm md:text-base text-gray-600">New Users</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;