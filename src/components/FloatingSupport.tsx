import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "918709321770"; // Replace with real number later

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-2"
          >
            <div className="bg-red-500 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">PLEXA Support</h3>
                <p className="text-white/80 text-xs">We typically reply in minutes.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-[#1a1a1a] min-h-[100px] flex flex-col gap-3">
              <div className="bg-[#222] border border-white/5 p-3 rounded-xl rounded-tl-sm text-sm text-gray-200 self-start max-w-[85%]">
                Hi there! 👋 How can we help you today?
              </div>
            </div>
            <div className="p-4 bg-[#111] border-t border-white/5">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi%20PLEXA,%20I%20need%20some%20help!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 transition-transform hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
