
import { Outlet } from 'react-router-dom';
import { Bell, User, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateTicketModal } from './CreateTicketModal';

export const Layout = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary font-sans text-text-primary flex flex-col">
      
      {/* Subtle Grid Background ("lining") */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Top Navigation Bar */}
      <header className="flex-none h-[72px] bg-bg-surface border-b border-border-subtle border-t-4 border-t-primary-600 z-30 shadow-sm relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          
          {/* Left Side: Logo & Page Title */}
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="DeskPro Logo" className="h-10 w-auto object-contain" />
            <div className="hidden md:block border-l border-border-subtle pl-6">
              <h1 className="text-base font-bold text-text-primary leading-tight tracking-tight">Dashboard</h1>
              <p className="text-xs text-text-secondary mt-0.5">Good morning. Here's what's happening.</p>
            </div>
          </div>
          
          {/* Right Side: Actions & Profile */}
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="enterprise-button-primary h-9 px-4 text-sm whitespace-nowrap shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Ticket
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <Outlet />
      </main>
      
      {/* Global Modals */}
      <CreateTicketModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};
