import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, ArrowRight, CheckCircle2, Shield, Loader2 } from 'lucide-react';
import { loginWithGoogle } from '../lib/firebase';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    // Simulate API call for OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setLoading(true);
    // Simulate Verification
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onClose();
        loginWithGoogle(); // Fallback to Google Auth for preview environment to maintain auth state
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="text-red-500" size={24} /> PLEXA Portal
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {step === 'phone' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                    <p className="text-gray-400 text-sm">Enter your phone number to receive a secure login code.</p>
                  </div>
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</div>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        placeholder="Phone Number" 
                        className="w-full bg-black border border-white/10 rounded-xl py-4 pl-14 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={phone.length < 10 || loading}
                      className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? <Loader2 size={20} className="animate-spin" /> : <>Send Code <ArrowRight size={18} /></>}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Verify Phone</h3>
                    <p className="text-gray-400 text-sm">We've sent a 6-digit code to <span className="text-white font-bold">+91 {phone}</span></p>
                  </div>
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      maxLength={6}
                      placeholder="Enter 6-digit OTP" 
                      className="w-full bg-black border border-white/10 rounded-xl py-4 px-4 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={otp.length < 4 || loading}
                      className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify & Login'}
                    </button>
                  </form>
                  <button 
                    onClick={() => setStep('phone')}
                    className="w-full text-center text-sm text-gray-500 hover:text-white mt-4 transition-colors"
                  >
                    Use a different number
                  </button>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Verified!</h3>
                  <p className="text-gray-400 text-sm">Logging you in...</p>
                </motion.div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
              <p className="text-xs text-gray-500">By logging in, you agree to PLEXA's Terms of Service and Privacy Policy.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
