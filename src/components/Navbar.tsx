import { Menu, LogIn, LayoutDashboard, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { useState } from 'react';
import { LoginModal } from './LoginModal';

export function Navbar({ onOpenDashboard }: { onOpenDashboard?: () => void }) {
  const { user, login } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Works', path: '/works' },
    { name: 'About', path: '/about' },
    { name: 'Creator Network', path: '/creator-network' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-8 py-4 md:py-6 w-full max-w-[1400px] mx-auto text-white z-[100] bg-black/50 backdrop-blur-md border-b border-white/5"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-transparent relative flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <span className="font-semibold text-xl tracking-tight">PLEXA</span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          {links.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path} 
              className={({isActive}) => `px-6 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {user ? (
            <button 
              onClick={onOpenDashboard}
              className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/20"
            >
              Dashboard <LayoutDashboard size={16} />
            </button>
          ) : (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/20"
            >
              Login <LogIn size={16} />
            </button>
          )}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center gap-2 bg-red-500/20 text-red-500 w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-full text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-500/30 lg:hidden"
          >
            <span className="hidden md:inline">Menu</span> 
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[70px] md:top-[90px] left-4 right-4 z-[90] bg-[#111] border border-white/10 rounded-2xl p-4 lg:hidden shadow-2xl flex flex-col gap-2"
          >
            {links.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({isActive}) => `px-6 py-4 rounded-xl text-base font-bold transition-colors ${isActive ? 'bg-red-500 text-white' : 'hover:bg-white/5 text-gray-300'}`}
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="h-px bg-white/10 my-2"></div>
            
            {user ? (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenDashboard) onOpenDashboard();
                }}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-4 rounded-xl text-base font-bold transition-colors text-white"
              >
                AI Dashboard <LayoutDashboard size={18} />
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-4 rounded-xl text-base font-bold transition-colors text-white"
              >
                Login <LogIn size={18} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
