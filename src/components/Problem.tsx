import { motion } from 'motion/react';

export function Problem() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      >
        <div className="col-span-1 md:col-span-4">
          <p className="text-sm text-gray-500 uppercase tracking-widest">The Problem</p>
        </div>
        <div className="col-span-1 md:col-span-8">
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-gray-300">
            Businesses shouldn't need <span className="text-white font-medium">five different vendors</span> to build their website, shoot their content, manage their socials, and run their ads.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
