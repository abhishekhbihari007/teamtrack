import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components/Button.jsx';
import { Input } from '../components/Input.jsx';
import { useAuth } from '../context/Auth.jsx';
import { apiErrorMessage } from '../utils/formatters.js';
import { Kanban } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* 
         Stealth Black Layout 
      */}
      <div className="flex w-full max-w-4xl bg-[#0d0d0d] rounded-3xl border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* LEFT SIDE: Stealth Branding */}
        <div className="hidden md:flex w-[45%] bg-[#111111] p-12 flex-col justify-center text-white border-r border-zinc-900 relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10">
                <Kanban className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">TeamTrack</h1>
            </div>
            
            <h2 className="text-4xl font-black leading-[1.1] mb-8">Work faster in the dark.</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                <p className="text-zinc-400 font-medium">Organize team tasks on a simple board.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                <p className="text-zinc-400 font-medium">Track project progress in real-time.</p>
              </div>

              <div className="pt-8 border-t border-zinc-800/50">
                <p className="text-zinc-500 text-sm font-medium">
                  Designed & Developed by <span className="text-zinc-300">Abhishekh Bihari</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Area */}
        <div className="flex-1 p-10 md:p-20 bg-[#0d0d0d]">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-4xl font-black text-white tracking-tight">Sign In</h3>
            <p className="text-zinc-500 mt-2 font-medium">Welcome back.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-black border-zinc-800 py-3.5 rounded-xl focus:border-blue-600 text-white placeholder:text-zinc-700"
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-black border-zinc-800 py-3.5 rounded-xl focus:border-blue-600 text-white placeholder:text-zinc-700"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-xl shadow-blue-600/5"
            >
              {loading ? 'Entering...' : 'Log In'}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
            <p className="text-sm text-zinc-500 font-bold">
              New here?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-400 transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Login;
