
import React from 'react';

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your dashboard</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
                        <p className="text-2xl font-bold text-indigo-600">R 25,000</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Products</h3>
                        <p className="text-2xl font-bold text-indigo-600">150</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
                        <p className="text-2xl font-bold text-indigo-600">24</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Customers</h3>
                        <p className="text-2xl font-bold text-indigo-600">45</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;