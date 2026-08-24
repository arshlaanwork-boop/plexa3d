import { ArrowRight, MoveUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-8 pt-12 pb-32 text-white overflow-hidden min-h-[90vh] flex items-center">
      
      {/* 3D Abstract Representation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none perspective-1000"
      >
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s' }}>
           {/* Abstract 3D structures */}
           <div className="w-64 h-64 border border-red-500/30 rounded-full absolute transform rotate-45 shadow-[0_0_50px_rgba(239,68,68,0.2)]"></div>
           <div className="w-80 h-80 border border-white/10 rounded-full absolute transform rotate-12 shadow-[0_0_50px_rgba(255,255,255,0.05)]"></div>
           <div className="w-48 h-48 bg-gradient-to-tr from-red-600/20 to-black rounded-full absolute border border-red-500/20 transform -rotate-12 backdrop-blur-xl"></div>
           {/* Core */}
           <div className="w-24 h-24 bg-red-500 rounded-full absolute blur-[40px] animate-pulse"></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="col-span-1 lg:col-span-7 flex flex-col justify-center"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 w-fit mb-8">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs uppercase tracking-wider text-gray-300">ONLINE + ON-GROUND BUSINESS GROWTH</span>
          </motion.div>
          
          <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl font-bold leading-[1.05] mb-8 tracking-tighter">
            Your Business.<br />
            Built for<br />
            Attention.
          </motion.h1>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gradient-to-b from-red-500 to-transparent mt-1" />
            <p className="text-gray-400 text-xl max-w-md font-light leading-relaxed">
              We create the content, digital presence, marketing and systems that help ambitious businesses grow.
            </p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold tracking-wide flex items-center gap-2">
              Start a Project <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium">
              See What We Do
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
