import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Video as VideoIcon, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { ChatBot } from './ChatBot';
import { VideoGenerator } from './VideoGenerator';

export function Dashboard({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'video'>('chat');

  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">AI Control Center</h2>
            <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full p-1 ml-4 border border-white/10">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeTab === 'chat' ? 'bg-red-500 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
              >
                <MessageSquare size={14} /> Chat
              </button>
              <button 
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeTab === 'video' ? 'bg-red-500 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
              >
                <VideoIcon size={14} /> Generate Video
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-300 mr-4">
              <img src={user.photoURL || ''} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
              <span className="hidden md:inline">{user.email}</span>
            </div>
            <button 
              onClick={() => { logout(); onClose(); }}
              className="text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <div className="w-[1px] h-6 bg-white/20 mx-2"></div>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        {/* Mobile Tabs */}
        <div className="md:hidden flex items-center justify-center gap-2 bg-black border-b border-white/10 p-4">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'chat' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'text-gray-400 bg-white/5 border border-white/5'}`}
            >
              <MessageSquare size={16} /> Chat
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'video' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'text-gray-400 bg-white/5 border border-white/5'}`}
            >
              <VideoIcon size={16} /> Video
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
           {activeTab === 'chat' ? <ChatBot /> : <VideoGenerator />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
