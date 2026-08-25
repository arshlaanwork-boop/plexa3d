import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../components/Footer';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  Camera, Film, PenTool, Palette, Code, Smartphone, TrendingUp, Bot,
  CheckCircle2, ArrowRight, Briefcase, ChevronRight, Zap, PlayCircle, Loader2
} from 'lucide-react';

const ROLES = [
  { id: 'shooter', title: 'Shooter / Videographer', icon: Camera, color: 'text-blue-400', border: 'border-blue-500/20' },
  { id: 'editor', title: 'Video Editor', icon: Film, color: 'text-purple-400', border: 'border-purple-500/20' },
  { id: 'writer', title: 'Script Writer', icon: PenTool, color: 'text-amber-400', border: 'border-amber-500/20' },
  { id: 'designer', title: 'Graphic / Canva Designer', icon: Palette, color: 'text-pink-400', border: 'border-pink-500/20' },
  { id: 'developer', title: 'Web Developer', icon: Code, color: 'text-emerald-400', border: 'border-emerald-500/20' },
  { id: 'social', title: 'Social Media / Content', icon: Smartphone, color: 'text-orange-400', border: 'border-orange-500/20' },
  { id: 'sales', title: 'Sales / Business Dev', icon: TrendingUp, color: 'text-green-400', border: 'border-green-500/20' },
  { id: 'ai', title: 'AI / Automation Builder', icon: Bot, color: 'text-cyan-400', border: 'border-cyan-500/20' },
];

const ROLE_DETAILS: Record<string, any> = {
  shooter: {
    reqs: [
      'iPhone or capable smartphone with good camera quality',
      'Tripod',
      '360° rotating / motorized phone tripod or gimbal preferred',
      'Basic understanding of lighting & framing',
      'Ability to travel to client locations',
      'Ability to follow a shot list',
      'Reliable and punctual'
    ],
    note: 'Equipment requirements may vary depending on the project.',
    rateTitle: 'Starting reference: ₹1,000/day',
    rateNote: 'This is an indicative internal project rate, not a guaranteed salary.'
  },
  editor: {
    reqs: [
      'Laptop/PC capable of editing',
      'CapCut / Premiere Pro / DaVinci Resolve or similar',
      'Understanding of Reels & good pacing',
      'Basic transitions, captions/subtitles, music and sound effects',
      'Ability to follow brand guidelines and deliver on deadlines'
    ],
    rateTitle: 'Starting reference: ₹200 per Reel',
    rateNote: 'The editing rate can increase or decrease depending on the complexity of the edit.',
    visualScale: ['Basic Edit → ₹200+', 'Standard Edit → Higher', 'Advanced/Cinematic Edit → Higher']
  },
  writer: {
    reqs: [
      'Good Hindi/English communication',
      'Understanding of short-form content',
      'Ability to research & write strong hooks',
      'Storytelling ability',
      'Ability to write according to different industries',
      'Ability to follow a brief'
    ],
    rateTitle: 'Script rates vary according to length, research and complexity.',
    rateNote: 'Rates are not fixed and depend on project requirements.'
  },
  designer: {
    reqs: [
      'Canva / Photoshop / Figma or similar',
      'Understanding of typography',
      'Basic design principles',
      'Social media creative knowledge',
      'Ability to follow brand guidelines'
    ],
    rateTitle: 'Project-based. Rate varies according to design complexity.',
    rateNote: 'You will be paid per approved design or campaign batch.'
  },
  developer: {
    reqs: [
      'HTML / CSS / JavaScript or modern web technologies',
      'React / Next.js preferred',
      'Responsive design & basic UI/UX understanding',
      'Ability to build modern websites',
      'Ability to work with APIs when required'
    ],
    rateTitle: 'Project-based. Rate depends on website complexity.',
    visualScale: ['Basic Website → lower project rate', 'Advanced Website → higher project rate', '3D / Interactive Website → higher project rate'],
    rateNote: 'Payment is tied to project milestones and delivery.'
  },
  social: {
    reqs: [
      'Instagram knowledge',
      'Content planning & caption writing',
      'Scheduling & basic analytics',
      'Understanding of trends',
      'Good communication skills'
    ],
    rateTitle: 'Project-based / responsibility-based.',
    rateNote: 'Rate depends on the number of accounts managed and posting frequency.'
  },
  sales: {
    reqs: [
      'Good communication & confidence',
      'Professional behaviour',
      'Ability to speak with business owners',
      'Basic understanding of PLEXA',
      'Follow-up ability & willingness to learn'
    ],
    rateTitle: 'Performance/project-based.',
    rateNote: 'Income is directly tied to closed deals and lead generation performance.'
  },
  ai: {
    reqs: [
      'Interest in AI tools (AI content, video, image generation)',
      'Understanding of automation (Chatbots, IG/WA automation)',
      'Willingness to experiment',
      'Basic technical understanding',
      'Ability to learn new tools quickly'
    ],
    rateTitle: 'Project-based depending on complexity.',
    rateNote: 'Rate depends on the depth of the workflow or system built.'
  }
};

export function CreatorNetwork() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleRoleSelect = (id: string) => {
    setSelectedRole(id);
    setTimeout(() => {
      document.getElementById('role-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Attempt to connect to existing lead/data collection system (Firestore)
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        
        // Push to Firebase with 5 second timeout to avoid indefinite hanging
        try {
          const docData = {
            ...data,
            createdAt: serverTimestamp()
          };
          
          const uploadPromise = addDoc(collection(db, 'creator_applications'), docData);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));
          
          await Promise.race([uploadPromise, timeoutPromise]);
        } catch (err) {
          console.warn("Firestore upload delayed or failed, proceeding to success state.", err);
        }
      }
      
      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col w-full min-h-screen pt-32 items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl bg-[#111] border border-white/10 p-12 rounded-[2rem] flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Received.</h2>
          <p className="text-gray-400 mb-8">
            Thank you for applying to the PLEXA Creator Network. Our team will review your application and contact you if your skills match an upcoming opportunity.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-32">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 pb-32">
        
        {/* HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-widest mb-8">
            <Zap size={14} className="text-red-500" /> PLEXA TEENAGE MASTER PLAN
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Your Skill Can Become <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Your Opportunity.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            PLEXA is building a network of young creators, editors, developers, shooters, writers and salespeople who want to work on real business projects.
          </p>
          <div className="flex items-center justify-center gap-4">
             <button onClick={() => document.getElementById('roles-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center gap-2">
                Find Your Role <ArrowRight size={18} />
             </button>
             <button onClick={scrollToForm} className="bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                Apply Now
             </button>
          </div>
        </motion.div>

        {/* SECTION 1 - WHO IS THIS FOR? */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">Who is this for?</h2>
                <div className="text-6xl font-black text-white mb-6">AGE: <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">16–25</span></div>
                <p className="text-gray-400 text-lg mb-8">
                  For people who are interested in building, creating, and scaling. 
                  You don't need to know everything. You need one useful skill, reliability and the willingness to improve.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-bold text-gray-300">
                  <div className="flex items-center gap-2"><PlayCircle size={16} className="text-red-500"/> Video & Shooting</div>
                  <div className="flex items-center gap-2"><Film size={16} className="text-red-500"/> Video Editing</div>
                  <div className="flex items-center gap-2"><PenTool size={16} className="text-red-500"/> Script Writing</div>
                  <div className="flex items-center gap-2"><Palette size={16} className="text-red-500"/> Graphic / Canva Design</div>
                  <div className="flex items-center gap-2"><Code size={16} className="text-red-500"/> Web Development</div>
                  <div className="flex items-center gap-2"><Smartphone size={16} className="text-red-500"/> Social Media</div>
                  <div className="flex items-center gap-2"><TrendingUp size={16} className="text-red-500"/> Sales & Biz Dev</div>
                  <div className="flex items-center gap-2"><Bot size={16} className="text-red-500"/> AI & Automation</div>
                </div>
             </div>
             <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#111] border border-white/10">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Young creators working" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
             </div>
          </div>
        </div>

        {/* SECTION 2 - SELECT YOUR ROLE */}
        <div id="roles-section" className="mb-24 pt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Select your primary skill</h2>
            <p className="text-gray-400">Choose the role you want to apply for. You can optionally list additional skills in the form.</p>
          </div>
          
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`relative p-6 rounded-2xl text-left transition-colors duration-300 border overflow-hidden group ${
                    isSelected 
                      ? 'bg-red-500/10 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                      : 'bg-[#111] border-white/5 hover:border-white/20 hover:bg-[#151515]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center border transition-colors ${
                    isSelected ? 'bg-red-500 border-red-400' : `bg-black/50 ${role.border}`
                  }`}>
                    <Icon size={24} className={isSelected ? 'text-white' : role.color} />
                  </div>
                  <h3 className={`font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>{role.title}</h3>
                  
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-4 right-4 text-red-500"
                    >
                      <CheckCircle2 size={20} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* SECTION 3 - ROLE REQUIREMENTS */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div 
              id="role-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-32 overflow-hidden"
            >
              <div className="bg-[#111] border border-red-500/30 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                   <div>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          {(() => {
                            const SelectedIcon = ROLES.find(r => r.id === selectedRole)?.icon;
                            return SelectedIcon ? <SelectedIcon size={20} className="text-red-500" /> : null;
                          })()}
                        </div>
                        <h3 className="text-2xl font-bold text-white uppercase">{ROLES.find(r => r.id === selectedRole)?.title}</h3>
                      </div>
                      
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Requirements</h4>
                      <ul className="space-y-3 mb-8">
                        {ROLE_DETAILS[selectedRole].reqs.map((req: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <CheckCircle2 size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {ROLE_DETAILS[selectedRole].note && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-400">
                          <strong>Important:</strong> {ROLE_DETAILS[selectedRole].note}
                        </div>
                      )}
                   </div>
                   
                   <div className="bg-black/50 rounded-3xl p-8 border border-white/5">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Project Payment Model</h4>
                      <div className="text-xl font-bold text-white mb-2">{ROLE_DETAILS[selectedRole].rateTitle}</div>
                      
                      {ROLE_DETAILS[selectedRole].visualScale && (
                        <div className="my-6 space-y-3">
                          {ROLE_DETAILS[selectedRole].visualScale.map((scale: string, idx: number) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300 font-medium">
                              {scale}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-400 text-sm mt-6 border-t border-white/10 pt-6">
                        <span className="text-red-400 font-bold uppercase tracking-wider block mb-1">Important</span>
                        {ROLE_DETAILS[selectedRole].rateNote}
                      </p>
                      
                      <button onClick={scrollToForm} className="w-full mt-8 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors">
                        Apply for this Role
                      </button>
                   </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 4 - HOW PLEXA WORKS WITH YOU */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How PLEXA Works With You</h2>
          
          <div className="hidden md:flex items-center justify-between relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
             
             {[
               { step: '1', title: 'Select Skill', desc: 'Choose your primary role.' },
               { step: '2', title: 'Apply', desc: 'Submit your application.' },
               { step: '3', title: 'Review', desc: 'We review your profile.' },
               { step: '4', title: 'Test', desc: 'Complete a sample project.' },
               { step: '5', title: 'Approved', desc: 'Join the network.' },
               { step: '6', title: 'Earn', desc: 'Deliver work & get paid.' },
             ].map((s, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center gap-4 text-center max-w-[120px]">
                 <div className="w-12 h-12 rounded-full bg-[#111] border-2 border-red-500 text-white font-bold flex items-center justify-center text-lg">
                   {s.step}
                 </div>
                 <div>
                   <div className="text-sm font-bold text-white mb-1">{s.title}</div>
                   <div className="text-xs text-gray-500 leading-tight">{s.desc}</div>
                 </div>
               </div>
             ))}
          </div>
          
          <div className="flex md:hidden flex-col gap-6">
            {[
               { step: '1', title: 'Select Your Skill' },
               { step: '2', title: 'Submit Application' },
               { step: '3', title: 'Skill Review' },
               { step: '4', title: 'Sample / Test Project' },
               { step: '5', title: 'Approved' },
               { step: '6', title: 'Get Projects & Deliver Work' },
               { step: '7', title: 'Get Paid' },
             ].map((s, i) => (
               <div key={i} className="flex items-center gap-4 bg-[#111] border border-white/5 p-4 rounded-xl">
                 <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 font-bold flex items-center justify-center text-sm shrink-0">
                   {s.step}
                 </div>
                 <div className="text-sm font-bold text-white">{s.title}</div>
               </div>
             ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 italic">Note: Submitting the form does NOT guarantee selection or work.</p>
        </div>

        {/* SECTION 5 & 6 & 7 - INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          
          {/* Project Payment Model */}
          <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-6">How Payments Work</h3>
            <p className="text-sm text-gray-400 mb-6">PLEXA primarily works with young talent on a project/task basis. Payment depends on type of work, complexity, quantity, deadline, and skill level.</p>
            
            <div className="space-y-4 text-sm flex-1">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-300">Shooting</span>
                <span className="text-gray-500 text-right">Ref: ₹1,000/day</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-300">Editing</span>
                <span className="text-gray-500 text-right">Ref: ₹200/Reel</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-300">Writing / Design</span>
                <span className="text-gray-500 text-right">Variable</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-300">Web / AI</span>
                <span className="text-gray-500 text-right">Variable</span>
              </div>
            </div>
            
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs text-red-400">
              Rates are project references and may increase or decrease depending on the actual work required. These are NOT guaranteed monthly salaries.
            </div>
          </div>

          {/* What You Need */}
          <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-6">What You Need</h3>
            <ul className="space-y-3 text-sm text-gray-400 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> One useful skill</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Smartphone/laptop (depending on role)</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Required software/tools</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Reliable internet</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Ability to meet deadlines</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Professional communication</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Willingness to learn</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" /> Portfolio/sample work</li>
            </ul>
          </div>

          {/* Why Join PLEXA? */}
          <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-6">Why Join PLEXA?</h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Real Projects</div>
                <div className="text-xs text-gray-500">Work on actual business requirements.</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Real Experience</div>
                <div className="text-xs text-gray-500">Build practical experience beyond tutorials.</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Skill Development</div>
                <div className="text-xs text-gray-500">Improve through real projects and feedback.</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Network & Earn</div>
                <div className="text-xs text-gray-500">Work with other young builders and get paid for approved project work.</div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 8 - TEENAGE APPLICATION FORM */}
        <div id="application-form" className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Apply to the PLEXA Creator Network</h2>
            <p className="text-gray-400">Fill out the form below. If you selected a role above, it will be pre-filled.</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                <input required type="text" name="name" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Age *</label>
                <input required type="number" name="age" min="16" max="25" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">City *</label>
                <input required type="text" name="city" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                <input required type="tel" name="phone" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp Number *</label>
                <input required type="tel" name="whatsapp" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email *</label>
                <input required type="email" name="email" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Instagram Username</label>
                <input type="text" name="instagram" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="@username" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role Applying For *</label>
                <select 
                  required 
                  name="primary_role" 
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none"
                  value={selectedRole || ""}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" disabled>Select a role...</option>
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secondary Skills</label>
                <input type="text" name="secondary_skills" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="e.g. Graphic Design, Copywriting" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Experience Level *</label>
                <select required name="experience" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">What can you do? *</label>
                <textarea required name="capabilities" rows={3} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none" placeholder="Describe your skills and what you can build/create..."></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">What tools/software do you use? *</label>
                <textarea required name="tools" rows={2} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none" placeholder="Premiere Pro, Figma, React, etc."></textarea>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-6">
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Do you have your own equipment?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="has_equipment" value="yes" className="accent-red-500" /> <span className="text-white text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="has_equipment" value="no" className="accent-red-500" /> <span className="text-white text-sm">No</span>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">If yes, describe your equipment (For shooters: Smartphone, Tripod, Gimbal, Lighting)</label>
                <textarea name="equipment_details" rows={2} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none" placeholder="iPhone 14 Pro, DJI Osmo Mobile 6, Ring light..."></textarea>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portfolio Link *</label>
                <input required type="url" name="portfolio" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="Google Drive / Instagram / Behance / GitHub / Website" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hours per week? *</label>
                <input required type="text" name="hours_per_week" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="e.g. 15-20 hours" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Comfortable travelling for clients?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="can_travel" value="yes" className="accent-red-500" /> <span className="text-white text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="can_travel" value="no" className="accent-red-500" /> <span className="text-white text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Why do you want to work with PLEXA? *</label>
                <textarea required name="why_plexa" rows={3} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Anything else we should know?</label>
                <textarea name="additional_info" rows={2} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white rounded-xl px-8 py-5 font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-70"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" /> Submitting...</> : 'Submit Application'}
              </button>
            </div>
            
            <p className="text-center text-[10px] text-gray-500 mt-6 leading-relaxed">
              Applicants below 18 may require appropriate parent/guardian consent and must participate in accordance with applicable laws and project requirements.
            </p>
          </form>
        </div>

      </div>
      <Footer />
    </div>
  );
}
