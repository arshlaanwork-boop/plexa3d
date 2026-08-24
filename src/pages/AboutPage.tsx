import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';

// Subcomponent for tilt effect
function TiltCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col gap-4 bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-red-500/30 transition-colors shadow-xl relative group"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{ transform: "translateZ(-10px)" }}
      />
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-32 overflow-hidden">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-8 pb-32">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="max-w-4xl mb-24"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white mb-8 leading-tight"
          >
            Businesses shouldn't have to hire <span className="font-bold text-red-500 inline-block relative"><motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1 }} className="absolute bottom-1 left-0 h-2 bg-red-500/20 -z-10"></motion.span>five different people</span> for five different digital tasks.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-gray-400"
          >
            PLEXA brings all your digital services together under one single relationship. We act as your entire digital department, seamlessly blending production, design, and automation.
          </motion.p>
        </motion.div>

        {/* Visual Timeline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring" }}
          className="w-full bg-[#111] border border-white/5 rounded-[2rem] p-8 md:p-12 mb-32 relative overflow-hidden group hover:border-red-500/30 transition-colors duration-700 shadow-2xl"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center text-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-medium shadow-lg">Business</div>
            </motion.div>
            
            <div className="hidden md:block text-red-500 animate-pulse"><ArrowRight size={24} /></div>
            <div className="md:hidden text-red-500 transform rotate-90 animate-pulse"><ArrowRight size={24} /></div>

            <motion.div whileHover={{ scale: 1.2, rotate: -5 }} className="flex flex-col items-center text-center gap-4 flex-1 z-10">
              <div className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xl shadow-[0_0_40px_rgba(239,68,68,0.5)]">PLEXA</div>
            </motion.div>

            <div className="hidden md:block text-red-500 animate-pulse"><ArrowRight size={24} /></div>
            <div className="md:hidden text-red-500 transform rotate-90 animate-pulse"><ArrowRight size={24} /></div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center gap-4 flex-[2]">
              <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300 shadow-lg backdrop-blur-sm">
                Content + Website + Marketing + Automation
              </div>
            </motion.div>

            <div className="hidden md:block text-red-500 animate-pulse"><ArrowRight size={24} /></div>
            <div className="md:hidden text-red-500 transform rotate-90 animate-pulse"><ArrowRight size={24} /></div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center gap-4 flex-1">
              <div className="w-full bg-white/5 border border-red-500/30 rounded-xl p-4 text-sm text-white font-medium shadow-[0_0_20px_rgba(239,68,68,0.1)] backdrop-blur-sm">
                Consistent Presence
              </div>
            </motion.div>

            <div className="hidden md:block text-red-500 animate-pulse"><ArrowRight size={24} /></div>
            <div className="md:hidden text-red-500 transform rotate-90 animate-pulse"><ArrowRight size={24} /></div>

            <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex flex-col items-center text-center gap-4 flex-1">
              <div className="w-full bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 text-sm font-bold shadow-[0_10px_30px_rgba(239,68,68,0.4)]">
                Growth
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Detailed Sections with Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 perspective-1000">
          <TiltCard delay={0}>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">Why We Exist</h3>
            <h4 className="text-3xl font-bold text-white mb-2">The Fragmented Market</h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              Most businesses struggle because they hire a videographer for shoots, a web developer for their site, and a marketing agency for ads. The result? A disconnected brand image and wasted budget. We exist to fix this by handling the entire digital side of your business under one roof.
            </p>
          </TiltCard>

          <TiltCard delay={0.2}>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">Our Approach to Technology</h3>
            <h4 className="text-3xl font-bold text-white mb-2">AI as a Tool, Not a Gimmick</h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              We leverage modern Artificial Intelligence and automation not to replace human creativity, but to enhance it. AI allows us to generate rapid visual concepts, automate tedious customer interactions, and scale your content faster than traditional agencies.
            </p>
          </TiltCard>

          <TiltCard delay={0}>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">How We Work</h3>
            <h4 className="text-3xl font-bold text-white mb-2">Systematic Execution</h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              We don't just guess. We analyze your local market, build a strategy, produce the high-end assets you need, and deploy them through automated systems. It is a calculated, repeatable process designed to turn attention into revenue.
            </p>
          </TiltCard>

          <TiltCard delay={0.2}>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">Our Focus</h3>
            <h4 className="text-3xl font-bold text-white mb-2">Long-Term Relationships</h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              We are not looking for quick gigs. We partner with businesses that want a serious, long-term digital presence. When you grow, we grow. We invest in understanding your product deeply so we can represent it perfectly online.
            </p>
          </TiltCard>
        </div>
      </div>
      <Footer />
    </div>
  );
}
