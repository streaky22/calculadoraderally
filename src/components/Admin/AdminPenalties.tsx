import React, { useState } from 'react';
import { Rally, PenaltyConfig, PenaltyType } from '../../types';

export const AdminPenalties: React.FC<{ rally: Rally; setRally: React.Dispatch<React.SetStateAction<Rally>> }> = ({ rally, setRally }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<PenaltyType>('TIME');
  const [timeValueStr, setTimeValueStr] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !timeValueStr) return;
    
    const timeValueMs = parseFloat(timeValueStr) * 1000;

    const newPenalty: PenaltyConfig = {
      id: Date.now().toString(),
      name,
      type,
      timeValueMs
    };

    setRally(prev => ({ ...prev, penaltyConfigs: [...prev.penaltyConfigs, newPenalty] }));
    setName('');
    setTimeValueStr('');
    setType('TIME');
  };

  const handleRemove = (id: string) => {
    setRally(prev => ({ ...prev, penaltyConfigs: prev.penaltyConfigs.filter(p => p.id !== id) }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Manage Penalties</h3>
      
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Penalty Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jump Start" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select value={type} onChange={e => setType(e.target.value as PenaltyType)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
            <option value="TIME">Fixed Time</option>
            <option value="SUPER_RALLY">Super Rally (SR+)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time (Seconds)</label>
          <input type="number" step="0.1" value={timeValueStr} onChange={e => setTimeValueStr(e.target.value)} placeholder="e.g. 10" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">Add Penalty</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rally.penaltyConfigs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No penalties defined.</td></tr>
            )}
            {rally.penaltyConfigs.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${p.type === 'TIME' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {p.type === 'TIME' ? 'Fixed Time' : 'Super Rally'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 font-mono text-sm">
                  {p.type === 'TIME' ? `+${p.timeValueMs / 1000}s` : `Base +${p.timeValueMs / 1000}s`}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleRemove(p.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
