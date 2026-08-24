import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Video, Loader2, Sparkles } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface VideoRecord {
  id: string;
  prompt: string;
  videoBase64: string;
  createdAt: any;
}

export function VideoGenerator() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    
    const videosRef = collection(db, 'videos');
    const q = query(videosRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vids = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoRecord[];
      setVideos(vids);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `videos`);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !userId) return;

    const currentPrompt = prompt.trim();
    setPrompt('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt })
      });

      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();
      
      const videosRef = collection(db, 'videos');
      await addDoc(videosRef, {
        userId,
        prompt: currentPrompt,
        videoBase64: data.videoBase64,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error(error);
      alert("Failed to generate video.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Generate Area */}
      <div className="p-8 border-b border-white/10 bg-[#111]">
         <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <Video size={48} className="mb-4 text-red-500" />
            <h3 className="text-2xl font-semibold text-white mb-2">PLEXA AI Studio</h3>
            <p className="text-gray-400 mb-8 max-w-xl text-sm">Describe a scene and our Veo 3 engine will generate a stunning video for your campaign.</p>
            
            <form onSubmit={handleGenerate} className="w-full relative flex items-center">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A cinematic tracking shot of a luxury watch in neon lights..."
                disabled={isGenerating}
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-8 pr-32 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-colors shadow-xl"
              />
              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-3 px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
              >
                {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> Generate</>}
              </button>
            </form>
         </div>
      </div>

      {/* Gallery Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Your Video Library</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {isGenerating && (
                <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center animate-pulse">
                   <Loader2 size={32} className="text-red-500 animate-spin mb-4" />
                   <p className="text-sm font-medium text-gray-400">Rendering Scene...</p>
                </div>
             )}
             
             {videos.map((vid) => (
               <div key={vid.id} className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors">
                 <video 
                   src={`data:video/mp4;base64,${vid.videoBase64}`} 
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-xs text-white line-clamp-2">{vid.prompt}</p>
                 </div>
               </div>
             ))}
             
             {!isGenerating && videos.length === 0 && (
               <div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-50 border border-dashed border-white/10 rounded-2xl">
                 <Video size={32} className="mb-4 text-gray-500" />
                 <p className="text-sm text-gray-400">No videos generated yet.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
