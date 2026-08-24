import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { Footer } from '../components/Footer';

export function Contact() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-32">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Let's build your digital presence.</h1>
          <p className="text-xl text-gray-400 mb-12">Whether you need an ecosystem of tools or a high-end commercial shoot, PLEXA brings your ideas to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input type="text" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Business Name</label>
                  <input type="text" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="Acme Corp" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Phone Number</label>
                  <input type="tel" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">WhatsApp Number</label>
                  <input type="tel" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Business Category</label>
                  <select className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                    <option value="">Select an industry...</option>
                    <option value="fashion">Fashion & Retail</option>
                    <option value="real-estate">Real Estate & Construction</option>
                    <option value="corporate">Corporate & Tech</option>
                    <option value="events">Events & Entertainment</option>
                    <option value="medical">Medical & Clinics</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Preferred Plan</label>
                  <select className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                    <option value="">Select a tier...</option>
                    <option value="a-tier">A-Tier</option>
                    <option value="b-tier">B-Tier</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400">What do you need?</label>
                <input type="text" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="e.g. Website revamp and social media management" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400">Message (Optional)</label>
                <textarea rows={4} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none" placeholder="Tell us more about your vision..."></textarea>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button type="button" className="flex-1 bg-red-500 text-white rounded-xl px-8 py-4 font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <Send size={18} /> Book a Consultation
                </button>
                <button type="button" className="flex-1 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-xl px-8 py-4 font-semibold hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} /> Contact on WhatsApp
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Why Book a Consultation?</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <p>Get a custom-tailored strategy for your specific business goals.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <p>Understand the exact ROI and metrics we track for your industry.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <p>Discover how our AI and automation systems can save you hours every week.</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
