import React, { useState } from 'react';
import { Rally, Participant } from '../../types';

export const AdminParticipants: React.FC<{ rally: Rally; setRally: React.Dispatch<React.SetStateAction<Rally>> }> = ({ rally, setRally }) => {
  const [driverName, setDriverName] = useState('');
  const [hasCoDriver, setHasCoDriver] = useState(false);
  const [coDriverName, setCoDriverName] = useState('');
  const [car, setCar] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !car) return;
    
    const newParticipant: Participant = {
      id: Date.now().toString(),
      driverName,
      hasCoDriver,
      coDriverName: hasCoDriver ? coDriverName : undefined,
      car
    };

    setRally(prev => ({ ...prev, participants: [...prev.participants, newParticipant] }));
    setDriverName('');
    setHasCoDriver(false);
    setCoDriverName('');
    setCar('');
  };

  const handleRemove = (id: string) => {
    setRally(prev => ({ ...prev, participants: prev.participants.filter(p => p.id !== id) }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Manage Participants</h3>
      
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
          <input type="text" value={driverName} onChange={e => setDriverName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Car</label>
          <input type="text" value={car} onChange={e => setCar(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="hasCoDriver" checked={hasCoDriver} onChange={e => setHasCoDriver(e.target.checked)} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
          <label htmlFor="hasCoDriver" className="text-sm font-medium text-gray-700">Add Co-Driver</label>
        </div>
        {hasCoDriver && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Co-Driver Name</label>
            <input type="text" value={coDriverName} onChange={e => setCoDriverName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required={hasCoDriver} />
          </div>
        )}
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">Add Participant</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Co-Driver</th>
              <th className="px-4 py-3 font-medium">Car</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rally.participants.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No participants added yet.</td></tr>
            )}
            {rally.participants.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{p.driverName}</td>
                <td className="px-4 py-3 text-gray-600">{p.hasCoDriver ? p.coDriverName : '-'}</td>
                <td className="px-4 py-3 text-gray-600">{p.car}</td>
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
