import { motion } from 'motion/react';

export function Experience() {
  const steps = [
    "Business", "Strategy", "Shoot", "Edit", "Publish", "Grow"
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-500 whitespace-nowrap">
          The Experience
        </h2>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full">
          {steps.map((step, index) => (
            <motion.div 
              key={step} 
              className="flex items-center gap-4 md:gap-8"
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl md:text-4xl font-bold tracking-tight text-white hover:text-red-500 transition-colors cursor-default">
                {step}
              </span>
              {index !== steps.length - 1 && (
                <span className="text-red-500 text-2xl md:text-4xl font-light">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
