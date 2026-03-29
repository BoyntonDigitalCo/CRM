import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { MOCK_JOBS, MOCK_CUSTOMERS } from '../data/mockData';

export function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-28T00:00:00Z'));
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const today = () => setCurrentDate(new Date('2026-03-28T00:00:00Z'));

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Schedule</h2>
          <p className="text-slate-500 mt-1">Manage technician dispatch and appointments.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={today} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
            Today
          </button>
          <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
            <button onClick={prevWeek} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors border-r border-slate-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 text-sm font-medium text-slate-900 min-w-[140px] text-center">
              {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </div>
            <button onClick={nextWeek} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors border-l border-slate-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
          {weekDays.map((day, i) => {
            const isToday = isSameDay(day, new Date('2026-03-28T00:00:00Z'));
            return (
              <div key={i} className={`p-4 text-center border-r border-slate-200 last:border-r-0 ${isToday ? 'bg-blue-50/50' : ''}`}>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isToday ? 'text-blue-600' : 'text-slate-500'}`}>
                  {format(day, 'EEE')}
                </div>
                <div className={`text-xl font-bold ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 min-h-full divide-x divide-slate-200">
            {weekDays.map((day, i) => {
              const dayJobs = MOCK_JOBS.filter(job => isSameDay(new Date(job.scheduledDate), day));
              const isToday = isSameDay(day, new Date('2026-03-28T00:00:00Z'));
              
              return (
                <div key={i} className={`p-2 space-y-2 ${isToday ? 'bg-blue-50/10' : ''}`}>
                  {dayJobs.length === 0 ? (
                    <div className="h-full min-h-[100px] flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-medium">No jobs</span>
                    </div>
                  ) : (
                    dayJobs.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()).map(job => {
                      const customer = MOCK_CUSTOMERS.find(c => c.id === job.customerId);
                      return (
                        <div 
                          key={job.id} 
                          className={`p-3 rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                            job.serviceType === 'Plumbing' ? 'bg-blue-50 border-blue-200 hover:border-blue-300' :
                            job.serviceType === 'HVAC' ? 'bg-orange-50 border-orange-200 hover:border-orange-300' :
                            'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
                            <Clock className={`w-3.5 h-3.5 ${
                              job.serviceType === 'Plumbing' ? 'text-blue-600' :
                              job.serviceType === 'HVAC' ? 'text-orange-600' :
                              'text-slate-600'
                            }`} />
                            <span className={
                              job.serviceType === 'Plumbing' ? 'text-blue-800' :
                              job.serviceType === 'HVAC' ? 'text-orange-800' :
                              'text-slate-800'
                            }>
                              {format(new Date(job.scheduledDate), 'h:mm a')}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-slate-900 leading-tight mb-1">
                            {job.title}
                          </div>
                          <div className="text-xs text-slate-600 font-medium mb-2 truncate">
                            {customer?.name}
                          </div>
                          
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[60px]">{customer?.address.split(',')[0]}</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-bold shadow-sm border border-black/5" title={job.assignedTech}>
                              {job.assignedTech === 'Unassigned' ? '?' : job.assignedTech[0]}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
