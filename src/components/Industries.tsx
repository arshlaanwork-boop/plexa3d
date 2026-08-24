import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const industries = [
  { category: "Fashion", items: ["Women's Clothing", "Clothing Brands", "Streetwear"] },
  { category: "Lifestyle", items: ["Watches", "Jewellery", "Perfumes"] },
  { category: "Beauty", items: ["Salons"] },
  { category: "Home", items: ["Furniture", "Interior Products"] },
  { category: "Education", items: ["Coaching Centres"] },
  { category: "Local Business", items: ["Retail & Service Businesses"] },
];

export function Industries() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 0.5;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="w-full py-32 text-white border-t border-white/5 overflow-hidden bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-8 mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">We Work With</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full"
      >
        {/* Fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={scrollRef}
          className="flex gap-16 overflow-hidden whitespace-nowrap px-32"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          {/* Double the array for seamless looping */}
          {[...industries, ...industries].map((ind, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col gap-6 flex-shrink-0 cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-red-500 uppercase tracking-widest">{ind.category}</h3>
              <div className="flex flex-col gap-2">
                {ind.items.map((item, j) => (
                  <span key={j} className="text-4xl md:text-6xl font-light text-gray-300 tracking-tighter hover:text-white transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
