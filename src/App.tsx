/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Works } from './pages/Works';
import { AboutPage } from './pages/AboutPage';
import { Contact } from './pages/Contact';
import { CreatorNetwork } from './pages/CreatorNetwork';
import { Admin } from './pages/Admin';
import { FloatingSupport } from './components/FloatingSupport';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><Home /></motion.div>} />
        <Route path="/services" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><Services /></motion.div>} />
        <Route path="/works" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><Works /></motion.div>} />
        <Route path="/about" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><AboutPage /></motion.div>} />
        <Route path="/contact" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><Contact /></motion.div>} />
        <Route path="/creator-network" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><CreatorNetwork /></motion.div>} />
        <Route path="/plexa-secret-control-room-777" element={<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><Admin /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-black font-sans selection:bg-red-500/30">
        <Navbar onOpenDashboard={() => setIsDashboardOpen(true)} />
        <AnimatedRoutes />
        {isDashboardOpen && <Dashboard onClose={() => setIsDashboardOpen(false)} />}
        <FloatingSupport />
      </div>
    </HashRouter>
  );
}

