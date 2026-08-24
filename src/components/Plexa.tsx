import { motion } from 'motion/react';

export function Plexa() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
          PLEXA. <br/>
          <span className="text-gray-500 font-light">Digital + On-Ground.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
          We don't just manage your business online. <br/>
          <span className="text-white">We show up in the real world too.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
        {/* Digital */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111] border border-white/5 rounded-[2rem] p-12 hover:border-red-500/30 transition-colors"
        >
            <h3 className="text-sm font-bold tracking-widest text-red-500 uppercase mb-8">Digital</h3>
            <ul className="space-y-4 text-xl md:text-2xl font-light text-gray-300">
                <li>Website</li>
                <li>Social Media</li>
                <li>Marketing</li>
                <li>Google Business</li>
                <li>AI Content</li>
                <li>AI Automation</li>
                <li>Customer Communication</li>
            </ul>
        </motion.div>
        
        {/* On-Ground */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#111] border border-white/5 rounded-[2rem] p-12 hover:border-red-500/30 transition-colors"
        >
            <h3 className="text-sm font-bold tracking-widest text-red-500 uppercase mb-8">On-Ground</h3>
            <ul className="space-y-4 text-xl md:text-2xl font-light text-gray-300">
                <li>Photography</li>
                <li>Videography</li>
                <li>Product Shoots</li>
                <li>Reels Shooting</li>
                <li>Store Content</li>
                <li>Content Production</li>
            </ul>
        </motion.div>
      </div>
    </section>
  );
}
