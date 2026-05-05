import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth.jsx';
import { Menu, X, LayoutDashboard, ListTodo, FolderKanban, LogOut, User, Kanban } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/projects', label: 'Workspaces', icon: FolderKanban },
    { to: '/tasks', label: 'Tasks', icon: ListTodo }
  ];

  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden font-sans">
      
      {/* STEALTH SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0d0d0d] border-r border-zinc-900 shadow-2xl">
        <div className="p-10 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Kanban size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">TeamTrack</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/10' 
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                }`
              }
            >
              <link.icon size={20} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer - Designer Credits */}
        <div className="px-8 py-6 border-t border-zinc-900 bg-black/20">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] mb-1">
            Product Design
          </p>
          <p className="text-xs text-zinc-400 font-bold">
            Abhishekh Bihari
          </p>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-blue-500 font-black border border-zinc-800">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-black text-white leading-none mb-1">{user?.name}</p>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-red-900 hover:bg-red-500/5 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            Exit
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* MOBILE HEADER */}
        <header className="lg:hidden flex items-center justify-between p-6 bg-[#0d0d0d] border-b border-zinc-900">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">T</div>
             <span className="font-black tracking-tighter">TeamTrack</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="text-white" />
          </button>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-0">
           <div className="max-w-6xl mx-auto py-12">
              <Outlet />
           </div>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black p-10 lg:hidden animate-fade-in">
          <div className="flex justify-between items-center mb-16">
             <span className="text-3xl font-black tracking-tighter">TeamTrack</span>
             <button onClick={() => setMobileMenuOpen(false)}>
                <X size={40} />
             </button>
          </div>
          <div className="space-y-6">
             {navLinks.map(link => (
               <NavLink
                 key={link.to}
                 to={link.to}
                 onClick={() => setMobileMenuOpen(false)}
                 className="flex items-center gap-6 text-4xl font-black text-zinc-700"
               >
                 <link.icon size={36} />
                 {link.label}
               </NavLink>
             ))}
             <button onClick={logout} className="flex items-center gap-6 text-4xl font-black text-red-900 mt-16">
                <LogOut size={36} />
                Logout
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
