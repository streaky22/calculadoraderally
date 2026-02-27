import React, { useState } from 'react';
import { Rally, Stage } from '../../types';

export const AdminStages: React.FC<{ rally: Rally; setRally: React.Dispatch<React.SetStateAction<Rally>> }> = ({ rally, setRally }) => {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !name) return;
    
    const newStage: Stage = {
      id: Date.now().toString(),
      identifier,
      name
    };

    setRally(prev => ({ ...prev, stages: [...prev.stages, newStage] }));
    setIdentifier('');
    setName('');
  };

  const handleRemoveStage = (id: string) => {
    setRally(prev => ({ ...prev, stages: prev.stages.filter(s => s.id !== id) }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rally Information</h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rally Name</label>
          <input 
            type="text" 
            value={rally.name} 
            onChange={e => setRally(prev => ({ ...prev, name: e.target.value }))} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg font-bold" 
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Stages</h3>
        
        <form onSubmit={handleAddStage} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Identifier (e.g. SS1)</label>
            <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
            <div className="flex gap-2">
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md" required />
              <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">Add</button>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-4 py-3 font-medium w-24">ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rally.stages.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">No stages added yet.</td></tr>
              )}
              {rally.stages.map(s => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-bold text-gray-900">{s.identifier}</td>
                  <td className="px-4 py-3 text-gray-600">{s.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleRemoveStage(s.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
