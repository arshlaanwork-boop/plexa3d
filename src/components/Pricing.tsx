import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Gift, ArrowRight, ClipboardList, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface PackageDetails {
  id: string;
  name: string;
  normalPrice: number;
  minDiscount: number;
  maxDiscount: number;
}

export function Pricing() {
  const [selectedPkg, setSelectedPkg] = useState<PackageDetails | null>(null);
  
  // Modal states
  const [step, setStep] = useState<'inquiry' | 'spinning' | 'result'>('inquiry');
  
  // Inquiry form states
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [goals, setGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lucky draw states
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [finalDiscount, setFinalDiscount] = useState(0);

  const handleSelect = (pkg: PackageDetails) => {
    setSelectedPkg(pkg);
    setFinalDiscount(0);
    setStep('inquiry'); // Go directly to inquiry form, NO LOGIN required!
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;

    setIsSubmitting(true);
    try {
      // 1. Calculate the lucky discount beforehand so we can save it
      const range = (selectedPkg.maxDiscount - selectedPkg.minDiscount) / 100;
      const target = selectedPkg.minDiscount + Math.floor(Math.random() * (range + 1)) * 100;
      setFinalDiscount(target);

      // 2. Save inquiry to Firestore directly (No Auth Required)
      await addDoc(collection(db, 'inquiries'), {
        packageId: selectedPkg.id,
        packageName: selectedPkg.name,
        businessName,
        phone,
        goals,
        luckyDiscount: target,
        finalPrice: selectedPkg.normalPrice - target,
        createdAt: serverTimestamp()
      });
      
      // 3. Move to spinning animation
      setStep('spinning');
      startSpinningAnimation(selectedPkg, target);
      
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Failed to submit your details. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startSpinningAnimation = (pkg: PackageDetails, target: number) => {
    let ticks = 0;
    const maxTicks = 40; // ~2 seconds of spinning
    const range = (pkg.maxDiscount - pkg.minDiscount) / 100;
    
    const interval = setInterval(() => {
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setCurrentDiscount(target);
        setStep('result');
      } else {
        const temp = pkg.minDiscount + Math.floor(Math.random() * (range + 1)) * 100;
        setCurrentDiscount(temp);
      }
    }, 50);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-32 text-white border-t border-white/5 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Growth Plans</h2>
        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
          We act as your in-house marketing team, taking care of shooting, editing, and distribution.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Tier 1: Starter */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-colors flex flex-col"
        >
            <h3 className="text-2xl font-light text-gray-400 mb-2">Starter</h3>
            
            <div className="mb-6 flex flex-col gap-2">
                <p className="text-lg font-medium text-gray-500 line-through">Normal: ₹7,999</p>
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                    <Sparkles size={14} /> Lucky Discount: ₹500–₹2,000
                </div>
                <p className="text-3xl lg:text-4xl font-bold mt-2">₹5,999–₹7,499<span className="text-sm font-light text-gray-500">/mo</span></p>
            </div>
            
            <div className="space-y-2 mb-8">
                <p className="text-xl font-medium text-white">3 Reels</p>
                <p className="text-xl font-medium text-white">2 Posts</p>
            </div>
            <ul className="space-y-3 text-sm font-light text-gray-400 mb-12 flex-1">
                <li>• Video Editing</li>
                <li>• Script Writing</li>
                <li>• Instagram Management</li>
                <li>• Content Planning</li>
                <li>• Basic AI Creatives</li>
                <li className="text-white font-medium">• Standard Website</li>
                <li>• Basic Google Business</li>
                <li>• Basic Automation</li>
            </ul>
            <button 
                onClick={() => handleSelect({ id: 'starter', name: 'Starter', normalPrice: 7999, minDiscount: 500, maxDiscount: 2000 })}
                className="w-full py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium mt-auto"
            >
                Select Starter
            </button>
        </motion.div>

        {/* Tier 2: Growth */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white text-black border border-white/10 rounded-[2rem] p-8 relative transform md:-translate-y-4 shadow-2xl flex flex-col mt-8 md:mt-0"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                Most Popular
            </div>
            <h3 className="text-2xl font-light text-gray-600 mb-2">Growth</h3>
            
            <div className="mb-6 flex flex-col gap-2">
                <p className="text-lg font-medium text-gray-500 line-through">Normal: ₹11,999</p>
                <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                    <Sparkles size={14} /> Lucky Discount: ₹1,000–₹3,000
                </div>
                <p className="text-3xl lg:text-4xl font-bold mt-2">₹8,999–₹10,999<span className="text-sm font-light text-gray-500">/mo</span></p>
            </div>
            
            <div className="space-y-2 mb-8">
                <p className="text-xl font-medium text-black">6 Reels</p>
                <p className="text-xl font-medium text-black">4 Posts</p>
            </div>
            <ul className="space-y-3 text-sm font-light text-gray-600 mb-12 flex-1">
                <li>• Shooting & Editing</li>
                <li>• Product Shooting</li>
                <li>• Script Writing</li>
                <li>• AI Photos & Videos</li>
                <li>• AI Product Visuals</li>
                <li>• IG Management & Automation</li>
                <li>• Website + Landing Pages</li>
                <li>• Basic SEO & Ads</li>
                <li>• Lead Generation</li>
            </ul>
            <button 
                onClick={() => handleSelect({ id: 'growth', name: 'Growth', normalPrice: 11999, minDiscount: 1000, maxDiscount: 3000 })}
                className="w-full py-4 rounded-full bg-black text-white hover:bg-gray-900 transition-colors font-medium mt-auto"
            >
                Select Growth
            </button>
        </motion.div>

        {/* Tier 3: Authority */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-colors flex flex-col"
        >
            <h3 className="text-2xl font-light text-gray-400 mb-2">Authority</h3>
            
            <div className="mb-6 flex flex-col gap-2">
                <p className="text-lg font-medium text-gray-500 line-through">Normal: ₹18,999</p>
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                    <Sparkles size={14} /> Lucky Discount: ₹2,000–₹5,000
                </div>
                <p className="text-3xl lg:text-4xl font-bold mt-2">₹13,999–₹16,999<span className="text-sm font-light text-gray-500">/mo</span></p>
            </div>
            
            <div className="space-y-2 mb-8">
                <p className="text-xl font-medium text-white">10 Reels</p>
                <p className="text-xl font-medium text-white">6 Posts</p>
            </div>
            <ul className="space-y-3 text-sm font-light text-gray-400 mb-12 flex-1">
                <li className="text-white font-medium">• Everything in Growth</li>
                <li>• Creative Direction</li>
                <li>• Advanced AI Creatives</li>
                <li className="text-red-400 font-medium">• E-Commerce / 3D Website</li>
                <li>• Advanced Automation</li>
                <li>• Marketing Strategy</li>
                <li>• Social Media Paid Ads</li>
                <li>• Lead Management</li>
                <li>• Performance Tracking</li>
            </ul>
            <button 
                onClick={() => handleSelect({ id: 'authority', name: 'Authority', normalPrice: 18999, minDiscount: 2000, maxDiscount: 5000 })}
                className="w-full py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium mt-auto"
            >
                Select Authority
            </button>
        </motion.div>

        {/* Tier 4: Growth Pro (Most Complete) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-red-500/50 rounded-[2rem] p-8 relative shadow-[0_0_50px_rgba(239,68,68,0.1)] transform md:-translate-y-4 flex flex-col mt-8 md:mt-0"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap">
                Growth Pro
            </div>
            <h3 className="text-2xl font-light text-red-400 mb-2">Growth Pro</h3>
            <p className="text-xs text-gray-400 mb-4">For local businesses ready for consistent content and customer enquiries.</p>
            
            <div className="mb-6 flex flex-col gap-2">
                <p className="text-lg font-medium text-red-400/60 line-through">Normal: ₹29,999</p>
                <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full w-fit border border-green-500/20">
                    <Sparkles size={14} /> Lucky Discount: ₹3,000–₹5,000
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mt-2">₹24,999–₹26,999<span className="text-sm font-light text-gray-400">/mo</span></p>
            </div>
            
            <div className="space-y-2 mb-8">
                <p className="text-2xl font-medium text-white">16 Reels</p>
                <p className="text-2xl font-medium text-white">8 Posts / Carousels</p>
                <p className="text-lg font-medium text-red-400">2 On-Location Shoots</p>
            </div>
            <ul className="space-y-3 text-xs font-light text-gray-300 mb-12 flex-1">
                <li>• 20–30 edited business photographs</li>
                <li>• Monthly content strategy</li>
                <li>• Script ideas and shot planning</li>
                <li>• Instagram and Facebook management</li>
                <li>• Google Business Profile optimization</li>
                <li>• Review-generation system</li>
                <li>• WhatsApp enquiry setup</li>
                <li className="text-red-400 font-medium">• Conversion-focused Landing Page</li>
                <li className="text-red-400 font-medium">• E-Commerce / 3D Website included</li>
                <li>• Basic lead tracking</li>
                <li>• Monthly performance report</li>
                <li>• One monthly strategy call</li>
            </ul>
            <button 
                onClick={() => handleSelect({ id: 'growth-pro', name: 'Growth Pro', normalPrice: 29999, minDiscount: 3000, maxDiscount: 5000 })}
                className="w-full py-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] mt-auto"
            >
                Select Growth Pro
            </button>
        </motion.div>

      </div>

      {/* Terms and Conditions */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-20 max-w-4xl mx-auto bg-black/50 border border-white/5 rounded-2xl p-8"
      >
        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-center">Service Terms & Conditions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-400 font-light">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Commitment:</strong> Minimum 3 months required for all packages to ensure measurable growth.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Travel:</strong> Included only within a fixed radius. Additional travel will be billed separately.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Extras:</strong> Models, actors, studio rental and special equipment are not included in base pricing.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Client Responsibilities:</strong> Client must provide products, staff, and location access for shoots.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Scheduling & Limits:</strong> Shoot dates must be booked in advance. Up to two 3-hour shoots included per month.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <p><strong className="text-white">Ad Spend:</strong> Marketing packages do not include direct social media ad budgets (billed to client directly).</p>
          </div>
        </div>
      </motion.div>

      {/* Lucky Draw Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg relative overflow-hidden flex flex-col items-center text-center p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedPkg(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-red-500 rounded-full p-2 transition-colors z-50"
              >
                <X size={20} />
              </button>

              {step === 'inquiry' && (
                <div className="w-full text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <ClipboardList className="text-red-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                        Project Details
                      </h3>
                      <p className="text-sm text-gray-400">Tell us a bit about your business</p>
                    </div>
                  </div>
                  
                  <form onSubmit={submitInquiry} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Business Name</label>
                      <input 
                        required
                        type="text"
                        value={businessName}
                        onChange={e => setBusinessName(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="e.g. Acme Studio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number / WhatsApp</label>
                      <input 
                        required
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Main Goal (Optional)</label>
                      <input 
                        type="text"
                        value={goals}
                        onChange={e => setGoals(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="e.g. More sales, brand awareness"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 mt-4 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save & Spin for Discount!'}
                    </button>
                  </form>
                </div>
              )}

              {step === 'spinning' && (
                <div className="w-full text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 mx-auto border border-red-500/20">
                    <Gift className="text-red-500 animate-pulse" size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
                    Spinning...
                  </h3>
                  <p className="text-gray-400 mb-8">Finding your lucky discount for {selectedPkg.name}</p>
                  
                  <div className="bg-black/50 border border-white/10 rounded-2xl w-full py-8 mb-4">
                    <motion.div 
                      key={currentDiscount}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.1 }}
                      className="text-5xl md:text-6xl font-bold text-green-400 font-mono tracking-tighter"
                    >
                      ₹{currentDiscount.toLocaleString('en-IN')}
                    </motion.div>
                  </div>
                </div>
              )}
              
              {step === 'result' && (
                <div className="w-full text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 mx-auto border border-red-500/20">
                    <Gift className="text-red-500" size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
                    Congratulations!
                  </h3>
                  <p className="text-gray-400 mb-8">You unlocked a massive discount for {selectedPkg.name}</p>
                  
                  <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-2xl w-full p-6 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400/20 via-transparent to-transparent opacity-50 blur-xl"></div>
                    <p className="text-sm text-green-400 font-bold uppercase tracking-widest mb-2 relative z-10">Your Discount</p>
                    <div className="text-5xl font-bold text-white mb-4 relative z-10">
                      -₹{finalDiscount.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                      <span className="text-gray-400 line-through">₹{selectedPkg.normalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-2xl font-bold text-green-400">₹{(selectedPkg.normalPrice - finalDiscount).toLocaleString('en-IN')}<span className="text-sm font-light text-gray-500">/mo</span></span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/919999999999?text=Hi%20PLEXA!%20I%20just%20spun%20the%20Lucky%20Draw%20and%20got%20the%20${selectedPkg.name}%20Package%20for%20a%20final%20price%20of%20₹${(selectedPkg.normalPrice - finalDiscount).toLocaleString('en-IN')}!%20My%20Business:%20${businessName}.%20How%20do%20I%20complete%20my%20payment?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] transition-colors font-bold text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2"
                  >
                    Claim Offer via WhatsApp <ArrowRight size={18} />
                  </a>
                  <p className="text-xs text-gray-500 mt-4">We will send you a Razorpay link securely on WhatsApp.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
