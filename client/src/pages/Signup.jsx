import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components/Button.jsx';
import { Input } from '../components/Input.jsx';
import { useAuth } from '../context/Auth.jsx';
import { apiErrorMessage } from '../utils/formatters.js';
import { Kanban } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="flex w-full max-w-4xl bg-[#0d0d0d] rounded-3xl border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* LEFT SIDE: Info */}
        <div className="hidden md:flex w-[45%] bg-[#111111] p-12 flex-col justify-center text-white border-r border-zinc-900 relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10">
                <Kanban className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">TeamTrack</h1>
            </div>
            
            <h2 className="text-4xl font-black leading-[1.1] mb-8">Start your journey today.</h2>
            <p className="text-zinc-500 font-bold mb-8">Simple project management for teams that ship fast.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-400 font-bold text-sm">
                <div className="h-1 w-4 bg-blue-600 rounded-full" />
                Organize team tasks easily
              </div>
              <div className="flex items-center gap-3 text-zinc-400 font-bold text-sm">
                <div className="h-1 w-4 bg-blue-600 rounded-full" />
                Track progress in real-time
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                  Created by <span className="text-zinc-400">Abhishekh Bihari</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Signup Area */}
        <div className="flex-1 p-10 md:p-20 bg-[#0d0d0d]">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-4xl font-black text-white tracking-tight">Register</h3>
            <p className="text-zinc-500 mt-2 font-medium">Join the community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-black border-zinc-800 py-3.5 rounded-xl focus:border-blue-600 text-white"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-black border-zinc-800 py-3.5 rounded-xl focus:border-blue-600 text-white"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-black border-zinc-800 py-3.5 rounded-xl focus:border-blue-600 text-white"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-xl shadow-blue-600/5"
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-900 text-center">
            <p className="text-sm text-zinc-500 font-bold">
              Got an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Signup;
