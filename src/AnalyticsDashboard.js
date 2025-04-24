import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, XAxis, YAxis, Bar, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell } from 'recharts';
import { Calendar, Clock, Users, Package, MessageSquare, AlertTriangle, Award, TrendingUp } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Sample data - in a real implementation this would come from your API
  const [serviceStatus, setServiceStatus] = useState({
    internet: 'operational',
    voice: 'operational',
    fiber: 'operational',
    mobileData: 'operational',
  });
  
  const [activeIssues, setActiveIssues] = useState([
    {
      id: 'ISS-001',
      service: 'Fiber Network',
      area: 'North Region',
      issue: 'Reduced speeds due to maintenance',
      startTime: '2025-04-07T06:30:00',
      expectedResolution: '2025-04-07T14:00:00',
      status: 'in progress'
    }
  ]);
  
  const userEngagementData = [
    { name: 'Mon', users: 4000, queries: 2400 },
    { name: 'Tue', users: 3000, queries: 1398 },
    { name: 'Wed', users: 2000, queries: 9800 },
    { name: 'Thu', users: 2780, queries: 3908 },
    { name: 'Fri', users: 1890, queries: 4800 },
    { name: 'Sat', users: 2390, queries: 3800 },
    { name: 'Sun', users: 3490, queries: 4300 },
  ];
  
  const packageSalesData = [
    { name: 'Sh5', value: 25 },
    { name: 'Sh9', value: 15 },
    { name: 'Sh13', value: 30 },
    { name: 'Sh29', value: 10 },
    { name: 'Sh40', value: 8 },
    { name: 'Sh50', value: 12 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  const topQueriesData = [
    { query: 'How to check data balance', count: 245 },
    { query: 'Package renewal issues', count: 178 },
    { query: 'Network coverage', count: 155 },
    { query: 'Payment methods', count: 121 },
    { query: 'Speed issues', count: 98 },
  ];
  
  const revenueData = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 74000 },
    { month: 'Mar', revenue: 68000 },
    { month: 'Apr', revenue: 85000 },
  ];
  
  const chatResolutionData = {
    resolved: 78,
    escalated: 22
  };

  // Fetch data
  useEffect(() => {
    
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">IMAZONE Analytics Dashboard</h1>
          <p className="text-gray-500">Real-time insights and performance metrics</p>
        </div>
        
        {/* Service Status */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(serviceStatus).map(([service, status]) => (
              <div key={service} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 capitalize">{service}</p>
                  <p className={`text-sm font-bold ${status === 'operational' ? 'text-green-500' : 'text-red-500'}`}>
                    {status === 'operational' ? 'Operational' : 'Issues Detected'}
                  </p>
                </div>
                <div className={`h-3 w-3 rounded-full ${status === 'operational' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Active Issues */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Active Issues</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {activeIssues.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No active issues</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Resolution</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeIssues.map((issue) => (
                      <tr key={issue.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.area}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{issue.issue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(issue.startTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(issue.expectedResolution).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            issue.status === 'resolved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
         
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} name="Active Users" />
                  <Line type="monotone" dataKey="queries" stroke="#82ca9d" name="AI Queries" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Package Sales Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {packageSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
         
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AI Assistant Performance</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-md p-2 mr-3">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Queries Handled</p>
                    <p className="text-xl font-bold text-gray-900">12,456</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-md p-2 mr-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="text-xl font-bold text-gray-900">1.8s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <div className="w-full h-full rounded-full bg-gray-100"></div>
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-orange-500"
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - chatResolutionData.resolved}%)` 
                  }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{chatResolutionData.resolved}%</p>
                    <p className="text-xs text-gray-500">Resolution Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top AI Assistant Queries</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {topQueriesData.map((item, index) => (
                <li key={index} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-900">{item.query}</span>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-800">{item.count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;