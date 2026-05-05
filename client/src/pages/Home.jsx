import React, { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { Button } from '../components/Button.jsx';
import { Input, Select, Textarea } from '../components/Input.jsx';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Form state for new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    assignedUser: '',
    priority: 'medium'
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resTasks, resProjects, resUsers] = await Promise.all([
        api.get('tasks'),
        api.get('projects'),
        api.get('users')
      ]);
      
      setTasks(resTasks.data);
      setProjects(resProjects.data);
      setUsers(resUsers.data);
    } catch (err) {
      console.error('Error fetching data');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('tasks', newTask);
      setShowModal(false);
      fetchData(); // Refresh the list
      
      // Reset form
      setNewTask({
        title: '',
        description: '',
        project: '',
        assignedUser: '',
        priority: 'medium'
      });
    } catch (err) {
      alert('Could not create task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`tasks/${taskId}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error('Update failed');
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Delete this task permanently?')) {
      try {
        await api.delete(`tasks/${taskId}`);
        fetchData();
      } catch (err) {
        console.error('Delete failed');
      }
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-zinc-100">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">TeamTrack Board</h1>
          <p className="text-zinc-500 font-bold mt-1 uppercase tracking-widest text-xs">Workflow Management</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-xl font-black transition-all"
        >
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* TODO COLUMN */}
        <div className="bg-[#0d0d0d] p-6 rounded-3xl border border-zinc-900">
          <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
            <div className="h-2 w-2 rounded-full bg-zinc-700" />
            <h2 className="font-black text-sm uppercase tracking-widest text-zinc-400">To Do</h2>
          </div>
          <div className="space-y-4">
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task._id} className="bg-black p-6 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all">
                <h3 className="font-black text-white mb-2">{task.title}</h3>
                <p className="text-sm text-zinc-500 mb-6 font-medium leading-relaxed">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black bg-zinc-900 text-zinc-400 px-2 py-1 rounded">
                    {task.priority}
                  </span>
                  <button onClick={() => updateTaskStatus(task._id, 'in-progress')} className="text-xs font-black text-blue-500 hover:text-blue-400">
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS COLUMN */}
        <div className="bg-[#0d0d0d] p-6 rounded-3xl border border-zinc-900">
          <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <h2 className="font-black text-sm uppercase tracking-widest text-white">In Progress</h2>
          </div>
          <div className="space-y-4">
            {tasks.filter(t => t.status === 'in-progress').map(task => (
              <div key={task._id} className="bg-black p-6 rounded-2xl border-l-4 border-blue-600 border-r border-y border-zinc-900">
                <h3 className="font-black text-white mb-2">{task.title}</h3>
                <p className="text-sm text-zinc-500 mb-6 font-medium">{task.description}</p>
                <div className="flex justify-between">
                  <button onClick={() => updateTaskStatus(task._id, 'todo')} className="text-xs font-black text-zinc-600 hover:text-zinc-500">
                    ← Back
                  </button>
                  <button onClick={() => updateTaskStatus(task._id, 'done')} className="text-xs font-black text-green-500 hover:text-green-400">
                    Done →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONE COLUMN */}
        <div className="bg-[#0d0d0d] p-6 rounded-3xl border border-zinc-900">
          <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
            <div className="h-2 w-2 rounded-full bg-green-600" />
            <h2 className="font-black text-sm uppercase tracking-widest text-green-600">Finished</h2>
          </div>
          <div className="space-y-4">
            {tasks.filter(t => t.status === 'done').map(task => (
              <div key={task._id} className="bg-black p-6 rounded-2xl border border-zinc-900/50 opacity-60">
                <h3 className="font-black text-zinc-400 line-through mb-2">{task.title}</h3>
                <p className="text-sm text-zinc-700 mb-6 font-medium">{task.description}</p>
                <button onClick={() => deleteTask(task._id)} className="text-xs font-black text-red-900 hover:text-red-500 transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] p-12 rounded-[40px] border border-zinc-900 max-w-md w-full shadow-[0_0_100px_rgba(37,99,235,0.1)]">
            <h2 className="text-3xl font-black text-white mb-8 tracking-tighter">Add Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <Input label="Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required className="bg-black border-zinc-900" />
              <Textarea label="Description" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} className="bg-black border-zinc-900" />
              
              <Select label="Project" value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})} className="bg-black border-zinc-900">
                <option value="">Select Project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </Select>

              <Select label="Assign To" value={newTask.assignedUser} onChange={e => setNewTask({...newTask, assignedUser: e.target.value})} className="bg-black border-zinc-900">
                <option value="">Select User</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </Select>

              <div className="flex gap-4 mt-12">
                <Button type="submit" className="flex-1 py-4 bg-blue-600 rounded-2xl font-black">Create</Button>
                <button type="button" onClick={() => setShowModal(false)} className="text-zinc-600 font-black hover:text-white transition-colors uppercase tracking-widest text-xs">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
