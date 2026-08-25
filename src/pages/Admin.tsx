import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth, loginWithGoogle, logout } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LogOut, ExternalLink, MessageCircle, FileText, LayoutDashboard, Loader2, User as UserIcon, ClipboardList, AlertCircle } from 'lucide-react';

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const [applications, setApplications] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications'>('inquiries');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/unauthorized-domain') {
        setLoginError('This domain is not authorized in Firebase. Please add "goplexa.in" to your Firebase Console -> Authentication -> Settings -> Authorized domains.');
      } else {
        setLoginError(`Login failed: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (!user || user.email !== 'arshlaanshakil4a.jssp@gmail.com') return;
    
    // Listen to creator applications
    const appsRef = collection(db, 'creator_applications');
    const qApps = query(appsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeApps = onSnapshot(qApps, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(appsData);
    }, (error) => {
      console.error("Error fetching applications:", error);
    });

    // Listen to business inquiries
    const inquiriesRef = collection(db, 'inquiries');
    const qInquiries = query(inquiriesRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeInquiries = onSnapshot(qInquiries, (snapshot) => {
      const inquiriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(inquiriesData);
    }, (error) => {
      console.error("Error fetching inquiries:", error);
    });

    return () => {
      unsubscribeApps();
      unsubscribeInquiries();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== 'arshlaanshakil4a.jssp@gmail.com') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <LayoutDashboard className="text-red-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 mb-8 text-sm">
            {user && user.email !== 'arshlaanshakil4a.jssp@gmail.com' 
              ? `You are logged in as ${user.email}, but this account does not have Admin access.` 
              : "Please sign in with your authorized Google account to access applications and inquiries."}
          </p>

          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{loginError}</p>
            </div>
          )}
          
          {!user || user.email !== 'arshlaanshakil4a.jssp@gmail.com' ? (
            <button 
              onClick={handleLogin}
              className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 mb-4"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 52.749 L -8.284 52.749 C -8.574 53.879 -9.214 54.819 -10.144 55.439 L -10.144 57.709 L -6.244 57.709 C -3.964 55.609 -3.264 52.549 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.844 60.279 L -10.144 58.009 C -11.204 58.719 -12.574 59.139 -14.754 59.139 C -18.964 59.139 -22.534 56.289 -23.794 52.479 L -27.814 52.479 L -27.814 55.599 C -25.824 59.559 -20.634 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -23.794 52.479 C -24.114 51.529 -24.294 50.539 -24.294 49.499 C -24.294 48.459 -24.114 47.469 -23.794 46.519 L -23.794 43.399 L -27.814 43.399 C -28.644 45.059 -29.114 46.929 -29.114 48.889 C -29.114 50.849 -28.644 52.719 -27.814 54.379 L -23.794 52.479 Z"/><path fill="#EA4335" d="M -14.754 39.839 C -12.984 39.839 -11.394 40.449 -10.144 41.649 L -6.144 37.649 C -8.804 35.159 -11.514 34.079 -14.754 34.079 C -20.634 34.079 -25.824 37.759 -27.814 41.719 L -23.794 44.839 C -22.534 41.029 -18.964 39.839 -14.754 39.839 Z"/></g></svg>
              Sign in with Google
            </button>
          ) : null}

          {user && (
            <button 
              onClick={() => logout()}
              className="w-full bg-red-500/10 text-red-500 border border-red-500/20 px-8 py-4 rounded-xl font-bold hover:bg-red-500/20 transition-colors"
            >
              Sign Out from {user.email}
            </button>
          )}
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
            <UserIcon size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-300">{user.email}</span>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <button 
              onClick={() => logout()}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-sm font-bold"
            >
              <LogOut size={14} /> Logout
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
                            {app.primaryRole}
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
