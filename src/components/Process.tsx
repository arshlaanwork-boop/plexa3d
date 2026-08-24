import { motion } from 'motion/react';

export function Process() {
  const steps = [
    { num: "01", title: "DISCOVER", desc: "Understand your business." },
    { num: "02", title: "PLAN", desc: "Build your content + growth plan." },
    { num: "03", title: "CREATE", desc: "We come on-ground and shoot." },
    { num: "04", title: "BUILD", desc: "Edit, publish, manage and automate." },
    { num: "05", title: "GROW", desc: "Review, improve and repeat." },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-24"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 justify-between relative">
        {/* Connection Line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10 z-0 origin-left"
        ></motion.div>

        {steps.map((step, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            whileHover={{ y: -5, scale: 1.05 }}
            key={step.num} 
            className="relative z-10 flex flex-col items-start bg-black w-full pt-4 md:pt-0 group cursor-default"
          >
             <div className="text-xs font-bold text-red-500 mb-6 bg-black pr-4 inline-block group-hover:text-red-400 transition-colors">
               {step.num} — {step.title}
             </div>
             <p className="text-xl font-light text-gray-400 max-w-[200px] leading-relaxed group-hover:text-gray-200 transition-colors">
               {step.desc}
             </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
