/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { PublicView } from './components/PublicView';
import { Rally } from './types';
import { Download, Upload } from 'lucide-react';

const INITIAL_RALLY: Rally = {
  id: 'r1',
  name: 'New Rally',
  participants: [],
  stages: [],
  penaltyConfigs: [],
  stageTimes: []
};

export default function App() {
  const [view, setView] = useState<'PUBLIC' | 'ADMIN'>('ADMIN');
  const [rally, setRally] = useState<Rally>(() => {
    const saved = localStorage.getItem('rally_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading from localStorage', e);
      }
    }
    return INITIAL_RALLY;
  });

  React.useEffect(() => {
    localStorage.setItem('rally_data', JSON.stringify(rally));
  }, [rally]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(rally, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${rally.name.replace(/\s+/g, '_').toLowerCase()}_backup.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedRally = JSON.parse(content) as Rally;
        
        // Basic validation
        if (parsedRally && parsedRally.id && Array.isArray(parsedRally.participants)) {
          setRally(parsedRally);
          alert('Rally loaded successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch (error) {
        alert('Error parsing the file.');
        console.error(error);
      }
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight">Calculadora de Rally</h1>
            <span className="hidden sm:inline-block text-slate-400 text-sm border-l border-slate-700 pl-3 ml-1">
              {rally.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {view === 'ADMIN' && (
              <div className="flex items-center gap-2 mr-4 border-r border-slate-700 pr-4">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                  title="Export Rally Data"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                  title="Import Rally Data"
                >
                  <Upload size={16} />
                  <span className="hidden sm:inline">Import</span>
                </button>
                <input 
                  type="file" 
                  accept=".json" 
                  ref={fileInputRef} 
                  onChange={handleImport} 
                  className="hidden" 
                />
              </div>
            )}
            <nav className="flex gap-2">
              <button 
                onClick={() => setView('PUBLIC')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'PUBLIC' ? 'bg-white/20 text-white' : 'text-slate-300 hover:bg-white/10'}`}
              >
                Public View
              </button>
              <button 
                onClick={() => setView('ADMIN')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'ADMIN' ? 'bg-white/20 text-white' : 'text-slate-300 hover:bg-white/10'}`}
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'ADMIN' ? (
          <AdminPanel rally={rally} setRally={setRally} />
        ) : (
          <PublicView rally={rally} />
        )}
      </main>
    </div>
  );
}
