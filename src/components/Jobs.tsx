import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar as CalendarIcon, MapPin, User, Clock, Wrench } from 'lucide-react';
import { MOCK_JOBS, MOCK_CUSTOMERS, JobStatus } from '../data/mockData';
import { format } from 'date-fns';

export function Jobs() {
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const customer = MOCK_CUSTOMERS.find(c => c.id === job.customerId);
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Work Orders</h2>
          <p className="text-slate-500 mt-1">Track and manage all service requests.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by job title, ID, or customer..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1 shadow-sm">
          {['All', 'Pending', 'Scheduled', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filterStatus === status 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
          {filteredJobs.map(job => {
            const customer = MOCK_CUSTOMERS.find(c => c.id === job.customerId);
            return (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400">#{job.id.toUpperCase()}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        job.serviceType === 'Plumbing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        job.serviceType === 'HVAC' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        {job.serviceType}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{job.title}</h3>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    ${job.price}
                  </div>
                </div>
                
                <div className="p-5 space-y-4 flex-1">
                  <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px]">
                    {job.description}
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-900">{customer?.name}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{customer?.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{format(new Date(job.scheduledDate), 'MMM d, yyyy')}</span>
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      <span>{format(new Date(job.scheduledDate), 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                      {job.assignedTech === 'Unassigned' ? '?' : job.assignedTech[0]}
                    </div>
                    <span className={job.assignedTech === 'Unassigned' ? 'text-amber-600 font-medium' : 'text-slate-700 font-medium'}>
                      {job.assignedTech}
                    </span>
                  </div>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
