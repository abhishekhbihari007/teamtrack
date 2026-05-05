import React, { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { Button } from '../components/Button.jsx';
import { Input, Textarea } from '../components/Input.jsx';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', members: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resProjects, resUsers] = await Promise.all([
        api.get('projects'),
        api.get('users')
      ]);
      setProjects(resProjects.data);
      setUsers(resUsers.data);
    } catch (err) {
      console.error('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('projects', form);
      setShowModal(false);
      setForm({ name: '', description: '', members: [] });
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Creation failed';
      alert(msg);
    }
  };

  const toggleMember = (userId) => {
    setForm(prev => {
      const isIncluded = prev.members.includes(userId);
      if (isIncluded) {
        return { ...prev, members: prev.members.filter(id => id !== userId) };
      } else {
        return { ...prev, members: [...prev.members, userId] };
      }
    });
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Workspaces</h1>
          <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] mt-1">Project Directories</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-black">
          Add Project
        </Button>
      </div>

      {loading ? (
        <p className="text-zinc-800 font-black italic">Syncing nodes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project._id} className="bg-[#0d0d0d] p-8 rounded-[32px] border border-zinc-900 hover:border-blue-600 transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-white font-black text-xl mb-6 group-hover:bg-blue-600 transition-all">
                {project.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">{project.name}</h3>
              <p className="text-zinc-600 text-sm font-medium mb-8 h-10 overflow-hidden leading-relaxed">{project.description}</p>
              
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-900/50">
                <div className="flex -space-x-3">
                  {project.members.slice(0, 3).map(m => (
                    <div key={m._id} title={m.name} className="h-10 w-10 rounded-full bg-black border-2 border-[#0d0d0d] flex items-center justify-center text-[10px] font-black text-zinc-400">
                      {m.name.charAt(0)}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest ml-2">
                  {project.members.length} Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] p-12 rounded-[40px] border border-zinc-900 max-w-lg w-full shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-10 tracking-tighter">New Workspace</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <Input label="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="bg-black border-zinc-900" />
              <Textarea label="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-black border-zinc-900 h-24" />
              
              <div>
                <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-4">Select Team</label>
                <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto p-3 bg-black rounded-2xl border border-zinc-900">
                  {users.map(user => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => toggleMember(user._id)}
                      className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        form.members.includes(user._id) 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                      }`}
                    >
                      {user.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <Button type="submit" className="flex-1 py-4 bg-blue-600 rounded-xl font-black">Register</Button>
                <button type="button" onClick={() => setShowModal(false)} className="text-zinc-700 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">Abort</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
