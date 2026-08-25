import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { LogOut, ExternalLink, MessageCircle, FileText, LayoutDashboard, Loader2, ClipboardList, Lock, AlertCircle } from 'lucide-react';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [applications, setApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications'>('inquiries');

  useEffect(() => {
    // Check local storage for session
    const session = localStorage.getItem('plexa_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'plexa2024') {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem('plexa_admin_auth', 'true');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    localStorage.removeItem('plexa_admin_auth');
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Listen to creator applications
    const appsRef = collection(db, 'creator_applications');
    
    const unsubscribeApps = onSnapshot(appsRef, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort in memory to prevent documents with missing fields from being dropped
      appsData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.submittedAt?.toMillis ? a.submittedAt.toMillis() : 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.submittedAt?.toMillis ? b.submittedAt.toMillis() : 0);
        return timeB - timeA;
      });
      setApplications(appsData);
    });

    // Listen to business inquiries
    const inquiriesRef = collection(db, 'inquiries');
    
    const unsubscribeInquiries = onSnapshot(inquiriesRef, (snapshot) => {
      const inquiriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort in memory
      inquiriesData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      setInquiries(inquiriesData);
    });

    return () => {
      unsubscribeApps();
      unsubscribeInquiries();
    };
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Lock className="text-red-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 mb-8 text-sm">
            Enter your secret admin passcode to view leads.
          </p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors text-center text-lg tracking-widest"
            />
            {loginError && (
              <div className="text-red-500 text-sm flex items-center justify-center gap-2">
                <AlertCircle size={16} /> Incorrect passcode
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Calculate Analytics
  const totalRevenue = inquiries.reduce((sum, inq) => sum + (Number(inq.finalPrice) || 0), 0);
  const totalDiscountGiven = inquiries.reduce((sum, inq) => sum + (Number(inq.luckyDiscount) || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              <LayoutDashboard className="text-red-500" />
              PLEXA Admin
            </h1>
            <p className="text-gray-400 mt-1">Manage your incoming leads and applications</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-400">Authenticated</span>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-sm font-bold"
            >
              <LogOut size={14} /> Lock Dashboard
            </button>
          </div>
        </header>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 text-sm font-medium mb-1">Total Leads</div>
            <div className="text-3xl font-black text-white">{inquiries.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 text-sm font-medium mb-1">Creator Apps</div>
            <div className="text-3xl font-black text-white">{applications.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-gray-400 text-sm font-medium mb-1 relative z-10">Total Pipeline Value</div>
            <div className="text-3xl font-black text-green-400 relative z-10">₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 text-sm font-medium mb-1">Total Discounts Given</div>
            <div className="text-3xl font-black text-red-400">₹{totalDiscountGiven.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button 
             className={`px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'inquiries' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <ClipboardList size={16} /> Business Inquiries ({inquiries.length})
          </button>
          <button 
             className={`px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'applications' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            onClick={() => setActiveTab('applications')}
          >
            <FileText size={16} /> Creator Applications ({applications.length})
          </button>
        </div>

        {activeTab === 'inquiries' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {inquiries.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <ClipboardList size={48} className="mx-auto mb-4 opacity-20" />
                <p>No business inquiries found yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Business Details</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Package Selected</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Financials</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries.map(inq => (
                      <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-sm text-gray-400">
                          {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">{inq.businessName}</div>
                          <div className="text-sm text-gray-400">{inq.phone}</div>
                          {inq.goals && <div className="text-xs text-gray-500 mt-1 italic">Goal: {inq.goals}</div>}
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide">
                            {inq.packageName}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <span className="text-gray-400">Discount Given:</span> <span className="text-green-400 font-mono">-₹{inq.luckyDiscount?.toLocaleString('en-IN') || 0}</span>
                          </div>
                          <div className="text-sm font-bold text-white">
                            Final Price: ₹{inq.finalPrice?.toLocaleString('en-IN') || 0}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {inq.phone && (
                              <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.businessName)},%20we%20saw%20you%20unlocked%20a%20discount%20for%20the%20${inq.packageName}%20package%20at%20PLEXA!`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors" title="Message on WhatsApp">
                                <MessageCircle size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>No creator applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Applicant</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-sm text-gray-400">
                          {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">{app.name}</div>
                          <div className="text-sm text-gray-400">{app.email}</div>
                          <div className="text-sm text-gray-500">{app.whatsapp}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide">
                            {app.primary_role || app.primaryRole || 'UNKNOWN ROLE'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-300">
                          {app.location || 'N/A'}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {app.portfolioLink && (
                              <a href={app.portfolioLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors" title="View Portfolio">
                                <ExternalLink size={16} />
                              </a>
                            )}
                            {app.whatsapp && (
                              <a href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(app.name)},%20we%20saw%20your%20application%20for%20the%20${app.primaryRole}%20role%20at%20PLEXA!`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors" title="Message on WhatsApp">
                                <MessageCircle size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
