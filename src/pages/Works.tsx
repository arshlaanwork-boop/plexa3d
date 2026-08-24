import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../components/Footer';
import { ExternalLink, Play, Sparkles, ShoppingCart, Bot, ArrowRight, MessageCircle, X } from 'lucide-react';

type Category = 'All' | 'Websites' | 'Content' | 'Social' | 'Automation' | 'Marketing' | 'E-commerce' | 'AI';
type VisualType = 'image' | 'ig-dm' | 'wa-dm' | 'dashboard' | 'flow' | 'ai-split' | 'ecommerce-ui' | '3d-web';

type Project = {
  id: number;
  title: string;
  category: Category;
  industry: string;
  service: string;
  label?: string;
  visualType: VisualType;
  image?: string;
};

const projects: Project[] = [
  // 1. 2D WEBSITE
  { id: 1, title: 'Tech Startup Launch', category: 'Websites', industry: 'Technology', service: '2D Website + Branding', label: 'Sample Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, title: 'Premium Restaurant Platform', category: 'Websites', industry: 'Hospitality', service: '2D Website + Reservation System', label: 'Concept Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, title: 'Legal Service Business', category: 'Websites', industry: 'Corporate', service: 'Modern Business Website', label: 'Sample Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000' },

  // 2. 3D WEBSITE
  { id: 4, title: 'Luxury Real Estate Platform', category: 'Websites', industry: 'Real Estate', service: '3D Interactive Experience', label: 'Sample Project', visualType: '3d-web', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, title: '3D Automotive Showcase', category: 'Websites', industry: 'Automotive', service: '3D Web Design + Configurator', label: 'Concept Project', visualType: '3d-web', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000' },
  { id: 6, title: 'Luxury Watch Configurator', category: 'Websites', industry: 'Retail', service: '3D Product Showcase', label: 'Demo', visualType: '3d-web', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000' },

  // 3. REELS / VIDEO
  { id: 7, title: 'Automotive Showcase', category: 'Content', industry: 'Automotive', service: 'Commercial Reel', label: 'Sample Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000' },
  { id: 8, title: 'Resort Walkthrough', category: 'Content', industry: 'Hospitality', service: 'Cinematic Business Video', label: 'Demo', visualType: 'image', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b8fc8?auto=format&fit=crop&q=80&w=1000' },
  { id: 9, title: 'Clothing Brand Drop', category: 'Content', industry: 'Fashion', service: 'Promotional Reel', label: 'Concept Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000' },

  // 4. SOCIAL MEDIA
  { id: 10, title: 'Streetwear Drop Campaign', category: 'Social', industry: 'Fashion', service: 'Content + Social Media Creative', label: 'Concept Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000' },
  { id: 11, title: 'Festival Brand Launch', category: 'Social', industry: 'Events', service: 'Instagram Grid Design', label: 'Sample Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000' },
  { id: 12, title: 'Organic Product Campaign', category: 'Social', industry: 'F&B', service: 'Social Media Content System', label: 'Concept Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000' },

  // 5. INSTAGRAM / WHATSAPP AUTOMATION
  { id: 13, title: 'E-commerce Support Bot', category: 'Automation', industry: 'Retail', service: 'Instagram DM Automation', label: 'Demo', visualType: 'ig-dm' },
  { id: 14, title: 'Clinic Lead Generation', category: 'Automation', industry: 'Medical', service: 'WhatsApp & CRM Workflow', label: 'Sample Project', visualType: 'wa-dm' },

  // 6. MARKETING / LEAD GENERATION
  { id: 15, title: 'Local Service Scale', category: 'Marketing', industry: 'Services', service: 'Meta Ads + Lead Generation', label: 'Sample Dashboard', visualType: 'dashboard' },
  { id: 16, title: 'Customer Acquisition Engine', category: 'Marketing', industry: 'B2B', service: 'Full Marketing Workflow', label: 'Concept Project', visualType: 'flow' },

  // 7. E-COMMERCE / PRODUCT
  { id: 17, title: 'Minimalist Clothing Store', category: 'E-commerce', industry: 'Fashion', service: 'E-commerce Website + Product Presentation', label: 'Sample Project', visualType: 'ecommerce-ui', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500' },
  { id: 18, title: 'Premium Jewellery Boutique', category: 'E-commerce', industry: 'Luxury', service: 'Online Ordering Experience', label: 'Concept Project', visualType: 'image', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000' },
  { id: 19, title: 'Cosmetics Brand Hub', category: 'E-commerce', industry: 'Beauty', service: 'Product Catalogue + Checkout', label: 'Demo', visualType: 'image', image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=1000' },

  // 8. AI CREATIVE
  { id: 20, title: 'Beverage Campaign', category: 'AI', industry: 'F&B', service: 'AI Product Photography', label: 'Demo', visualType: 'ai-split', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=500' },
  { id: 21, title: 'Fitness App Promo', category: 'AI', industry: 'Health & Fitness', service: 'AI-Generated Video', label: 'Demo', visualType: 'image', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000' },
  { id: 22, title: 'Concept Car Launch', category: 'AI', industry: 'Automotive', service: 'AI Product Presentation', label: 'Concept Project', visualType: 'ai-split', image: 'https://images.unsplash.com/photo-1503376710915-18db0a614d38?auto=format&fit=crop&q=80&w=500' }
];

export function Works() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories: Category[] = ['All', 'Websites', 'Content', 'Social', 'Automation', 'Marketing', 'E-commerce', 'AI'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const renderVisual = (project: Project) => {
    switch(project.visualType) {
      case 'ig-dm':
        return (
          <div className="w-full h-full bg-[#111] p-6 flex flex-col font-sans group-hover:bg-[#151515] transition-colors">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">PX</div>
              <span className="text-sm text-white font-bold">plexa.studio</span>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="self-end bg-white/10 text-white text-xs p-3 rounded-2xl rounded-br-sm max-w-[85%]">Hi, what's the price?</div>
              <div className="self-start bg-[#222] border border-white/5 text-gray-200 text-xs p-3 rounded-2xl rounded-bl-sm max-w-[90%] shadow-lg">
                Hey! 👋 Thanks for contacting us. What would you like to know?
                <div className="mt-3 flex flex-col gap-2">
                  <div className="bg-white/5 text-center py-2 rounded-lg text-red-400 border border-white/5 font-medium text-[10px]">View Products</div>
                  <div className="bg-white/5 text-center py-2 rounded-lg text-red-400 border border-white/5 font-medium text-[10px]">Get Pricing</div>
                  <div className="bg-white/5 text-center py-2 rounded-lg text-red-400 border border-white/5 font-medium text-[10px]">Talk to Team</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'wa-dm':
        return (
          <div className="w-full h-full bg-[#0b141a] p-6 flex flex-col font-sans relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 opacity-5 bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png')]"></div>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center"><Bot size={16} className="text-white"/></div>
              <span className="text-sm text-white font-bold">Business Assistant</span>
            </div>
            <div className="flex-1 flex flex-col gap-3 relative z-10">
              <div className="self-end bg-[#005c4b] text-white text-xs p-3 rounded-xl rounded-tr-none max-w-[85%] shadow-md">I need to book a service.</div>
              <div className="self-start bg-[#202c33] text-white text-xs p-3 rounded-xl rounded-tl-none max-w-[90%] shadow-md">
                Hello! I can help with that. Which service are you interested in?
                <div className="mt-3 pt-3 border-t border-white/10 text-[#53bdeb] font-medium leading-relaxed">
                  1. Product Inquiry<br/>2. Booking & Reservations<br/>3. Customer Support
                </div>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full h-full bg-[#0a0a0a] p-6 flex flex-col font-sans border border-white/5 group-hover:bg-[#111] transition-colors">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Campaign Overview</span>
              <span className="text-[10px] font-bold px-2 py-1 bg-red-500/20 text-red-500 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-gray-500 mb-1">Reach</div>
                <div className="text-lg font-bold text-white leading-none mb-1.5">145.2K</div>
                <div className="text-[9px] text-[#25D366] font-medium">+12.4%</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-gray-500 mb-1">Conversions</div>
                <div className="text-lg font-bold text-white leading-none mb-1.5">842</div>
                <div className="text-[9px] text-[#25D366] font-medium">+5.1%</div>
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-3 flex items-end gap-1.5 overflow-hidden">
              {[40, 70, 45, 90, 60, 100, 80, 50, 85].map((h, i) => (
                 <div key={i} className="flex-1 bg-red-500/50 rounded-t-sm group-hover:bg-red-500/80 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        );
      case 'flow':
        return (
          <div className="w-full h-full bg-[#050505] p-6 flex flex-col items-center justify-center font-sans gap-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="bg-white/10 px-4 py-2.5 rounded-lg text-xs text-white font-bold border border-white/10 z-10 w-36 text-center shadow-lg">AD / CAMPAIGN</div>
            <ArrowRight size={16} className="text-red-500 transform rotate-90 z-10" />
            <div className="bg-white/10 px-4 py-2.5 rounded-lg text-xs text-white font-bold border border-white/10 z-10 w-36 text-center shadow-lg">LANDING PAGE</div>
            <ArrowRight size={16} className="text-red-500 transform rotate-90 z-10" />
            <div className="bg-white/10 px-4 py-2.5 rounded-lg text-xs text-white font-bold border border-white/10 z-10 w-36 text-center shadow-lg">LEAD CAPTURED</div>
            <ArrowRight size={16} className="text-red-500 transform rotate-90 z-10" />
            <div className="bg-red-500/20 px-4 py-2.5 rounded-lg text-xs text-red-500 font-bold border border-red-500/30 z-10 w-36 text-center shadow-lg shadow-red-500/10">SALES TEAM</div>
          </div>
        );
      case 'ecommerce-ui':
        return (
          <div className="w-full h-full bg-white p-6 flex flex-col font-sans group-hover:scale-105 transition-transform duration-700">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
              <div className="text-black font-bold text-sm tracking-widest">STORE</div>
              <ShoppingCart size={16} className="text-black" />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative shadow-inner">
                <img src={project.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500"} className="w-full h-full object-cover mix-blend-multiply" alt="Product" />
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="text-xs font-bold text-gray-900 mb-1">Premium Product</div>
                <div className="text-xs text-gray-500 mb-3">$145.00</div>
                <div className="text-[10px] font-bold text-gray-400 mb-2">COLORS</div>
                <div className="flex gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-black border-2 border-gray-300"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-red-900"></div>
                </div>
                <div className="mt-auto bg-black hover:bg-gray-900 transition-colors text-white text-[10px] font-bold text-center py-2.5 rounded cursor-pointer">ADD TO CART</div>
              </div>
            </div>
          </div>
        );
      case 'ai-split':
        return (
          <div className="w-full h-full bg-[#111] flex font-sans relative group-hover:scale-105 transition-transform duration-700">
            <div className="w-1/2 h-full bg-[#1a1a1a] border-r border-red-500 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute top-3 left-3 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur">REAL PRODUCT</div>
              <div className="w-16 h-24 bg-white/5 rounded-lg border border-white/10 mb-3 flex items-center justify-center">
                 <div className="w-8 h-12 bg-white/10 rounded-sm"></div>
              </div>
              <span className="text-[10px] text-gray-500">Raw Studio Shot</span>
            </div>
            <div className="w-1/2 h-full bg-black relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute top-3 right-3 bg-red-500/90 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur z-10">AI CREATIVE</div>
              <img src={project.image} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="AI Generated" />
              <Sparkles size={24} className="text-white z-10 drop-shadow-2xl" />
            </div>
          </div>
        );
      case '3d-web':
        return (
          <div className="w-full h-full relative overflow-hidden bg-black group-hover:scale-105 transition-transform duration-700">
            <img src={project.image} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="3D Website" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center perspective-1000">
              <motion.div animate={{ rotateY: 360, rotateX: 180 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-24 h-24 rounded-full border border-red-500/40 relative shadow-[0_0_30px_rgba(239,68,68,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 rounded-full border border-white/20" style={{ transform: 'rotateX(90deg)' }}></div>
                <div className="absolute inset-0 rounded-full border border-white/20" style={{ transform: 'rotateY(90deg)' }}></div>
              </motion.div>
            </div>
          </div>
        );
      case 'image':
      default:
        return (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        );
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-32">
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">What We Build</h1>
          <p className="text-xl text-gray-400 max-w-2xl">From digital presence to growth systems — we build the tools, content and technology businesses need to grow.</p>
        </motion.div>

        {/* The Equation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-start gap-2.5 text-xs md:text-sm font-bold text-gray-400 mb-16 uppercase tracking-wider"
        >
          <span className="text-white">Websites</span>
          <span className="text-red-500">+</span>
          <span className="text-white">Content</span>
          <span className="text-red-500">+</span>
          <span className="text-white">Social Media</span>
          <span className="text-red-500">+</span>
          <span className="text-white">Automation</span>
          <span className="text-red-500">+</span>
          <span className="text-white">Marketing</span>
          <span className="text-red-500">+</span>
          <span className="text-white">E-commerce</span>
          <span className="text-red-500">+</span>
          <span className="text-white">AI</span>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111] border border-white/10 group-hover:border-red-500/50 transition-colors mb-4 flex-shrink-0 shadow-lg hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)]">
                   
                   {project.label && (
                     <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-lg">
                       {project.label}
                     </div>
                   )}

                   {renderVisual(project)}
                   
                   {/* Hover Overlay Link */}
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col justify-end p-6 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-red-500/20">
                        {project.category === 'Content' ? <Play size={18} fill="currentColor" /> : <ExternalLink size={18} />}
                      </div>
                      <p className="text-sm font-bold text-red-500 mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 uppercase tracking-wide">View Project</p>
                   </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded text-gray-300 flex-shrink-0 border border-white/5 uppercase tracking-wider">{project.industry}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{project.service}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-red-500 border border-white/10 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative w-full aspect-video md:aspect-[21/9] bg-black overflow-hidden flex-shrink-0">
                 {renderVisual(selectedProject)}
              </div>
              
              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-red-500/10 text-red-500 rounded-full uppercase tracking-wider border border-red-500/20">{selectedProject.category}</span>
                  <span className="text-xs font-bold px-3 py-1 bg-white/5 text-gray-400 rounded-full uppercase tracking-wider border border-white/5">{selectedProject.industry}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-xl text-gray-400 mb-8">{selectedProject.service}</p>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <ExternalLink size={20} />
                    View Live Project
                  </button>
                  <button onClick={() => setSelectedProject(null)} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/5 hover:scale-105 active:scale-95">
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
