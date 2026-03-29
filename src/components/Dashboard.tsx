import React from 'react';
import { Users, DollarSign, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { REVENUE_DATA, MOCK_JOBS, MOCK_CUSTOMERS } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export function Dashboard() {
  const activeJobsCount = MOCK_JOBS.filter(j => j.status === 'In Progress' || j.status === 'Scheduled').length;
  const pendingJobsCount = MOCK_JOBS.filter(j => j.status === 'Pending').length;
  const totalRevenue = REVENUE_DATA.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="p-8 space-y-8 h-full overflow-auto bg-slate-50">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Revenue (YTD)</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">${(totalRevenue / 1000).toFixed(1)}k</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Jobs</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{activeJobsCount}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            Across 3 technicians
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Estimates</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{pendingJobsCount}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600 font-medium">
            Requires attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Customers</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{MOCK_CUSTOMERS.length}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            +2 this week
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Jobs</h3>
          <div className="space-y-6">
            {MOCK_JOBS.slice(0, 4).map((job) => {
              const customer = MOCK_CUSTOMERS.find(c => c.id === job.customerId);
              return (
                <div key={job.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full mt-1 ${
                    job.serviceType === 'Plumbing' ? 'bg-blue-100 text-blue-600' :
                    job.serviceType === 'HVAC' ? 'bg-orange-100 text-orange-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{job.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{customer?.name} • {job.status}</p>
                    <p className="text-xs text-slate-400 mt-1">{format(new Date(job.scheduledDate), 'MMM d, h:mm a')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
