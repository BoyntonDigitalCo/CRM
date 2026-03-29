/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Customers } from './components/Customers';
import { Jobs } from './components/Jobs';
import { Schedule } from './components/Schedule';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-full overflow-hidden">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'customers' && <Customers />}
        {activeTab === 'jobs' && <Jobs />}
        {activeTab === 'schedule' && <Schedule />}
        {activeTab === 'settings' && (
          <div className="p-8 h-full flex flex-col bg-slate-50">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Settings</h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex-1">
              <p className="text-slate-500">Settings configuration goes here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
