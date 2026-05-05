import React, { useState, useEffect } from 'react';
import api from '../api/axios.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('tasks/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error loading stats');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter">Overview</h1>
        <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] mt-1">Global Statistics</p>
      </div>

      {loading ? (
        <p className="text-zinc-800 font-black animate-pulse">Scanning...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0d0d0d] p-10 rounded-[32px] border border-zinc-900 shadow-2xl">
            <h3 className="text-zinc-600 text-xs font-black uppercase tracking-[0.2em] mb-4">Total Tasks</h3>
            <p className="text-6xl font-black text-white tracking-tighter">{stats.totalTasks}</p>
          </div>

          <div className="bg-[#0d0d0d] p-10 rounded-[32px] border border-zinc-900 shadow-2xl">
            <h3 className="text-zinc-600 text-xs font-black uppercase tracking-[0.2em] mb-4">Completed</h3>
            <p className="text-6xl font-black text-green-600 tracking-tighter">{stats.completedTasks}</p>
          </div>

          <div className="bg-[#0d0d0d] p-10 rounded-[32px] border border-zinc-900 shadow-2xl">
            <h3 className="text-zinc-600 text-xs font-black uppercase tracking-[0.2em] mb-4">In Queue</h3>
            <p className="text-6xl font-black text-blue-600 tracking-tighter">{stats.pendingTasks}</p>
          </div>
        </div>
      )}

      <div className="mt-16 bg-[#0d0d0d] p-12 rounded-[40px] border border-zinc-900 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2 tracking-tight">System Health</h2>
          <p className="text-zinc-600 font-bold mb-10 text-sm">Overall completion efficiency is at {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%.</p>
          
          <div className="w-full bg-black h-5 rounded-full overflow-hidden border border-zinc-900 p-1">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              style={{ width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="mt-20 py-8 border-t border-zinc-900 flex justify-between items-center text-zinc-500">
        <p className="text-xs font-bold uppercase tracking-widest">TeamTrack v1.0</p>
        <p className="text-xs font-bold">
          Designed & Developed by <span className="text-zinc-300">Abhishekh Bihari</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
