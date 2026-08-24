import { motion } from 'motion/react';
import { Problem } from '../components/Problem';
import { Plexa } from '../components/Plexa';
import { WhatWeDo } from '../components/WhatWeDo';
import { Industries } from '../components/Industries';
import { Experience } from '../components/Experience';
import { PlexaAI } from '../components/PlexaAI';
import { Pricing } from '../components/Pricing';
import { Process } from '../components/Process';
import { About } from '../components/About';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col w-full"
    >
      <PlexaAI />
      <Problem />
      <Plexa />
      <WhatWeDo />
      <Industries />
      <Experience />
      <Pricing />
      <Process />
      <About />
      <CTA />
      <Footer />
    </motion.div>
  );
}
