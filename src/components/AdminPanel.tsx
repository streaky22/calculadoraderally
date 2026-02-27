import React, { useState } from 'react';
import { Rally } from '../types';
import { AdminParticipants } from './Admin/AdminParticipants';
import { AdminStages } from './Admin/AdminStages';
import { AdminPenalties } from './Admin/AdminPenalties';
import { AdminTimeEntry } from './Admin/AdminTimeEntry';

interface AdminPanelProps {
  rally: Rally;
  setRally: React.Dispatch<React.SetStateAction<Rally>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ rally, setRally }) => {
  const [activeTab, setActiveTab] = useState('INFO');

  const tabs = [
    { id: 'INFO', label: 'Rally & Stages' },
    { id: 'PARTICIPANTS', label: 'Participants' },
    { id: 'PENALTIES', label: 'Penalties' },
    { id: 'TIMES', label: 'Time Entry' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'INFO' && <AdminStages rally={rally} setRally={setRally} />}
        {activeTab === 'PARTICIPANTS' && <AdminParticipants rally={rally} setRally={setRally} />}
        {activeTab === 'PENALTIES' && <AdminPenalties rally={rally} setRally={setRally} />}
        {activeTab === 'TIMES' && <AdminTimeEntry rally={rally} setRally={setRally} />}
      </div>
    </div>
  );
};
