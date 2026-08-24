import { motion } from 'motion/react';

export function WhatWeDo() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What We Do</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Create */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -10, transition: { duration: 0.3 } }}
          className="bg-gradient-to-b from-[#161616] to-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group shadow-lg"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-red-500/20 transition-colors"></div>
            <h3 className="text-2xl font-bold mb-8">Create</h3>
            <ul className="space-y-3 text-gray-400">
                <li>Shooting</li>
                <li>Photography</li>
                <li>Videography</li>
                <li>Editing</li>
                <li>AI Photos</li>
                <li>AI Videos</li>
                <li>Script Writing</li>
            </ul>
        </motion.div>

        {/* Grow */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -10, transition: { duration: 0.3 } }}
          className="bg-gradient-to-b from-[#161616] to-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group shadow-lg"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-red-500/20 transition-colors"></div>
            <h3 className="text-2xl font-bold mb-8">Grow</h3>
            <ul className="space-y-3 text-gray-400">
                <li>Instagram</li>
                <li>Marketing</li>
                <li>Content Strategy</li>
                <li>Google Business</li>
                <li>Website</li>
                <li>Customer Communication</li>
            </ul>
        </motion.div>

        {/* Automate */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -10, transition: { duration: 0.3 } }}
          className="bg-gradient-to-b from-[#161616] to-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group shadow-lg"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-red-500/20 transition-colors"></div>
            <h3 className="text-2xl font-bold mb-8">Automate</h3>
            <ul className="space-y-3 text-gray-400">
                <li>AI Automation</li>
                <li>Instagram Automation</li>
                <li>Website Automation</li>
                <li>Lead/Customer workflows</li>
            </ul>
        </motion.div>

      </div>
    </section>
  );
}
