import { motion } from 'motion/react';
import { Play, ArrowRight, Image as ImageIcon, Sparkles, MessageCircle, Globe, BarChart3, Workflow, Users, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export function Services() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 overflow-hidden">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-8 pb-32 space-y-32">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Capabilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-gray-400"
          >
            Comprehensive digital solutions designed to replace multiple disconnected agencies.
          </motion.p>
        </motion.div>

        {/* A. CONTENT & PRODUCTION */}
        <motion.section 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <Play size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Content & Production</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl">High-end visual assets that demand attention.</h2>
            </div>
            <p className="text-gray-400 max-w-sm">From commercial product photography to viral short-form reels, we script, shoot, and edit everything in-house.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Phone Reel Mockup */}
             <div className="col-span-1 md:col-span-1 bg-[#111] border border-white/5 rounded-[2rem] p-8 flex justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-[280px] h-[580px] bg-black border-[8px] border-[#222] rounded-[3rem] relative overflow-hidden shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222] rounded-b-3xl z-20"></div>
                  {/* Code-based 3D Animation */}
                  <div className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                       <motion.div
                         animate={{ rotateX: [360, 0], rotateZ: [0, 360] }}
                         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                         className="w-full h-full rounded-full border border-red-500/40 absolute inset-0"
                       />
                       <motion.div
                         animate={{ rotateY: [0, 360], rotateZ: [360, 0] }}
                         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                         className="w-full h-full rounded-full border-2 border-white/5 absolute inset-0"
                       />
                    </motion.div>
                    {/* Scanning laser line */}
                    <motion.div 
                      animate={{ y: ["-200%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
                    />
                  </div>
                  {/* Fake UI */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col gap-2">
                     <div className="w-3/4 h-4 bg-white/20 rounded-full"></div>
                     <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
                  </div>
                </div>
             </div>
             {/* Info Cards */}
             <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="relative bg-[#111] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-end min-h-[250px] group hover:border-red-500/30 transition-colors overflow-hidden">
                  {/* Code 3D Effect */}
                  <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden flex gap-3 p-4 pt-12">
                     <motion.div animate={{ y: [0, -200] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-1/2 flex flex-col gap-3">
                       <div className="h-32 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-48 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-32 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-48 bg-white/5 rounded-xl border border-white/10"></div>
                     </motion.div>
                     <motion.div animate={{ y: [-200, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-1/2 flex flex-col gap-3">
                       <div className="h-48 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-32 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-48 bg-white/5 rounded-xl border border-white/10"></div>
                       <div className="h-32 bg-white/5 rounded-xl border border-white/10"></div>
                     </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Short-Form Reels</h3>
                    <p className="text-gray-400 text-sm">Fast-paced, highly engaging vertical videos optimized for Instagram and TikTok algorithms.</p>
                  </div>
               </div>
               <div className="relative bg-[#111] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-end min-h-[250px] group hover:border-red-500/30 transition-colors overflow-hidden">
                  {/* Code 3D Effect */}
                  <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center overflow-hidden perspective-1000">
                     <motion.div animate={{ rotateY: 360, rotateX: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-24 h-24 relative" style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'translateZ(48px)' }}></div>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'translateZ(-48px)' }}></div>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}></div>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'rotateY(90deg) translateZ(-48px)' }}></div>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}></div>
                        <div className="absolute inset-0 border border-white/20 bg-white/5" style={{ transform: 'rotateX(90deg) translateZ(-48px)' }}></div>
                     </motion.div>
                     <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full scale-150"></div>
                     {/* Laser scanning */}
                     <motion.div animate={{ top: ["-10%", "110%", "-10%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] z-10" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Product Shooting</h3>
                    <p className="text-gray-400 text-sm">Studio-quality commercial photography that elevates your product presentation.</p>
                  </div>
               </div>
               <div className="relative bg-[#111] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-end min-h-[250px] group hover:border-red-500/30 transition-colors overflow-hidden">
                  {/* Code 3D Effect */}
                  <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center overflow-hidden">
                     {/* Cinema bars */}
                     <div className="absolute top-0 left-0 right-0 h-8 bg-black z-10 shadow-lg border-b border-white/5"></div>
                     <div className="absolute bottom-0 left-0 right-0 h-8 bg-black z-10 shadow-lg border-t border-white/5"></div>
                     <div className="flex items-center gap-1.5 z-0">
                       {[...Array(16)].map((_, i) => (
                         <motion.div key={i} animate={{ height: [10, Math.random() * 80 + 20, 10] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }} className="w-1.5 bg-red-500/80 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                       ))}
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Promotional Videos</h3>
                    <p className="text-gray-400 text-sm">Cinematic brand stories and horizontal video content for websites and YouTube.</p>
                  </div>
               </div>
               <div className="relative bg-[#111] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-end min-h-[250px] group hover:border-red-500/30 transition-colors overflow-hidden">
                  {/* Code 3D Effect */}
                  <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center overflow-hidden p-8">
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                     <motion.div animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></motion.div>
                     
                     <div className="relative z-10 flex flex-col gap-3 w-full">
                       <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="h-1 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></motion.div>
                       <motion.div animate={{ width: ['0%', '75%'] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.2 }} className="h-1 bg-white/20 rounded-full"></motion.div>
                       <motion.div animate={{ width: ['0%', '40%'] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.4 }} className="h-1 bg-white/20 rounded-full"></motion.div>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Scripting & Planning</h3>
                    <p className="text-gray-400 text-sm">We don't just shoot; we architect the hooks, scripts, and storyboards beforehand.</p>
                  </div>
               </div>
             </div>
          </div>
        </motion.section>

        {/* C. SOCIAL MEDIA & AUTOMATION */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <MessageCircle size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Social Media & Automation</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl">Turn your DMs into an automated sales engine.</h2>
            </div>
            <p className="text-gray-400 max-w-sm">We handle the posting, while our custom AI workflows instantly respond to customers and capture leads 24/7.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* IG DM Mockup */}
            <div className="bg-[#111] rounded-[2rem] border border-white/5 p-6 md:p-10 flex justify-center">
              <div className="w-full max-w-[400px] bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]">
                 {/* Header */}
                 <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">PX</div>
                       <span className="font-semibold text-white text-sm">plexa.studio</span>
                    </div>
                 </div>
                 {/* Chat */}
                 <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-black flex flex-col">
                    {/* User Msg */}
                    <div className="self-end bg-white/10 text-white rounded-2xl rounded-br-sm px-4 py-2 text-sm max-w-[80%]">
                      Hi, what's the price for the premium package?
                    </div>
                    {/* Bot Msg */}
                    <div className="self-start bg-[#1a1a1a] border border-white/5 text-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-[85%] shadow-lg">
                      Hey! 👋 Thanks for contacting us. Our Premium Package starts at $999/mo and includes full content production + automation.
                      <div className="mt-3 flex flex-col gap-2">
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-red-400 font-medium transition-colors">View Details</button>
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-red-400 font-medium transition-colors">Talk to Human</button>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                   <MessageCircle size={20} className="text-red-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Instant Engagement</h3>
                   <p className="text-gray-400">Never lose a lead because you replied too late. Our systems answer FAQs and capture data instantly.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                   <Workflow size={20} className="text-red-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Custom Workflows</h3>
                   <p className="text-gray-400">We build branching logic specific to your business—routing support questions to your team and sales queries to your CRM.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                   <Users size={20} className="text-red-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Full Management</h3>
                   <p className="text-gray-400">Beyond automation, we schedule posts, manage the grid, and ensure consistent brand voice across all platforms.</p>
                 </div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* D. WEBSITE & DIGITAL */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <Globe size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Website & Digital</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl">Digital storefronts that actually convert.</h2>
            </div>
            <p className="text-gray-400 max-w-sm">From simple 2D landing pages to complex E-commerce and immersive 3D web experiences.</p>
          </div>

          <div className="relative bg-[#111] rounded-[2rem] border border-white/5 p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
               <div className="bg-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4">
                  <div className="w-full aspect-video bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                     {/* Fake 2D Web UI */}
                     <div className="absolute top-2 left-2 right-2 flex justify-between items-center opacity-50">
                        <div className="w-8 h-2 bg-white/20 rounded-full"></div>
                        <div className="flex gap-2">
                           <div className="w-4 h-2 bg-white/20 rounded-full"></div>
                           <div className="w-4 h-2 bg-white/20 rounded-full"></div>
                        </div>
                     </div>
                     <div className="w-24 h-4 bg-white/10 rounded-full mb-2"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white">2D Websites</h3>
                  <p className="text-sm text-gray-500">Clean, lightning-fast landing pages for local businesses.</p>
               </div>
               
               <div className="bg-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 transform md:-translate-y-4 shadow-2xl border-b-red-500/30">
                  <div className="w-full aspect-video bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                     {/* Fake Ecom UI */}
                     <div className="grid grid-cols-2 gap-2 w-full px-4 opacity-50">
                        <div className="aspect-square bg-white/10 rounded-lg"></div>
                        <div className="flex flex-col gap-2 justify-center">
                           <div className="w-full h-3 bg-white/20 rounded-full"></div>
                           <div className="w-1/2 h-2 bg-red-500/50 rounded-full"></div>
                           <div className="w-full h-6 bg-white/10 rounded-md mt-2"></div>
                        </div>
                     </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">E-Commerce</h3>
                  <p className="text-sm text-gray-500">High-conversion product pages with seamless checkout flows.</p>
               </div>

               <div className="bg-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4">
                  <div className="w-full aspect-video bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                     {/* Fake 3D UI */}
                     <div className="w-16 h-16 rounded-full border border-red-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-8 h-8 rounded-full border border-red-500"></div>
                     </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">3D Experiences</h3>
                  <p className="text-sm text-gray-500">Interactive webgl elements that create premium brand perception.</p>
               </div>
            </div>
            {/* Visual connecting line */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent z-0"></div>
          </div>
        </motion.section>

        {/* E. MARKETING & DASHBOARD */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <BarChart3 size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Marketing & Growth</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl">Data-driven campaigns that scale.</h2>
            </div>
          </div>

          <div className="bg-[#111] rounded-[2rem] border border-white/5 p-8 overflow-hidden relative">
             <div className="absolute top-4 right-8 bg-black/50 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-500 backdrop-blur-sm z-20">Sample Dashboard</div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Metrics */}
                <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Total Reach</p>
                  <p className="text-3xl font-bold text-white mb-2">124.5K</p>
                  <div className="flex items-center gap-2 text-xs text-[#25D366]">
                    <ArrowRight size={12} className="-rotate-45" />
                    <span>+12.4% this month</span>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Leads Generated</p>
                  <p className="text-3xl font-bold text-white mb-2">342</p>
                  <div className="flex items-center gap-2 text-xs text-[#25D366]">
                    <ArrowRight size={12} className="-rotate-45" />
                    <span>+5.2% this month</span>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Conversion Rate</p>
                  <p className="text-3xl font-bold text-white mb-2">4.8%</p>
                  <div className="flex items-center gap-2 text-xs text-red-500">
                    <ArrowRight size={12} className="rotate-45" />
                    <span>-0.4% this month</span>
                  </div>
                </div>

                {/* Chart Mockup */}
                <div className="col-span-1 md:col-span-3 bg-black/40 border border-white/5 p-6 rounded-xl h-64 flex items-end gap-2 pt-12 relative">
                   <div className="absolute top-6 left-6 text-sm font-medium text-gray-400">Campaign Performance</div>
                   {/* Fake Bars */}
                   {[40, 60, 45, 80, 55, 90, 75, 100, 85, 95, 60, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-red-500/20 hover:bg-red-500/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none">
                            {h * 12}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </motion.section>

        {/* F. AUTOMATION WORKFLOW */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How Our Automation Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We build invisible systems that capture leads while you sleep.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
             <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center w-full lg:w-48 z-10">
                <MessageCircle size={24} className="text-white mb-4" />
                <h4 className="text-sm font-bold text-white mb-1">Customer Enquiry</h4>
                <p className="text-xs text-gray-500">DMs your Instagram/WhatsApp</p>
             </div>
             
             <div className="text-red-500 transform rotate-90 lg:rotate-0"><ArrowRight size={24} /></div>
             
             <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-center text-center w-full lg:w-48 z-10 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <Sparkles size={24} className="text-red-500 mb-4" />
                <h4 className="text-sm font-bold text-red-500 mb-1">AI Response</h4>
                <p className="text-xs text-red-500/70">Answers questions instantly</p>
             </div>
             
             <div className="text-red-500 transform rotate-90 lg:rotate-0"><ArrowRight size={24} /></div>
             
             <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center w-full lg:w-48 z-10">
                <CheckCircle2 size={24} className="text-white mb-4" />
                <h4 className="text-sm font-bold text-white mb-1">Lead Captured</h4>
                <p className="text-xs text-gray-500">Details saved to CRM</p>
             </div>

             <div className="text-red-500 transform rotate-90 lg:rotate-0"><ArrowRight size={24} /></div>
             
             <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center w-full lg:w-48 z-10">
                <Users size={24} className="text-white mb-4" />
                <h4 className="text-sm font-bold text-white mb-1">Sales Team</h4>
                <p className="text-xs text-gray-500">Notified to close the deal</p>
             </div>
          </div>
        </motion.section>

      </div>
      <Footer />
    </div>
  );
}
