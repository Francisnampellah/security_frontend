import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
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

            {/* Recent Activity Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <span className="text-indigo-600">N</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">New order received</p>
                                    <p className="text-sm text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-green-600">S</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">Stock updated</p>
                                    <p className="text-sm text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;