import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDocFromServer, setDoc } from 'firebase/firestore';
import { Send, Loader2, Bot, User as UserIcon } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  createdAt: any;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hardcode chatId for single thread per user for simplicity, or generate one.
  const userId = auth.currentUser?.uid;
  const chatId = 'default'; 

  // Check and create chat document if needed
  useEffect(() => {
    if (!userId) return;
    
    // We should ensure the chat document exists, but for now we'll just listen to messages.
    // In a real app we'd create the chat document first. Let's just create messages.
    // Actually, according to our security rules, we must create a chat doc before messages:
    // "get(/databases/$(database)/documents/chats/$(chatId)).data.userId == request.auth.uid"
    // Let's ensure the chat exists.
    
    // For simplicity, let's use the userId as the chatId
    const currentChatId = userId;

    const messagesRef = collection(db, 'chats', currentChatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `chats/${currentChatId}/messages`);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !userId) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const currentChatId = userId;
    const chatDocRef = doc(db, 'chats', currentChatId);
    const messagesRef = collection(db, 'chats', currentChatId, 'messages');

    try {
      // Ensure chat doc exists
      const chatSnap = await getDocFromServer(chatDocRef);
      if (!chatSnap.exists()) {
        await setDoc(chatDocRef, {
          userId,
          title: 'Main Chat',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Save user message to Firestore
      await addDoc(messagesRef, {
        role: 'user',
        text: userMessage,
        createdAt: serverTimestamp()
      });

      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: userMessage }] });

      // Call our backend API on Cloud Run
      const res = await fetch('https://ais-pre-f2qye7mpnlfxl666a2aiy6-557205741820.asia-southeast1.run.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          systemInstruction: "You are the PLEXA AI Assistant. You help users manage their on-ground and digital marketing strategy. Be concise, professional, and confident."
        })
      });

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();

      // Save model reply to Firestore
      await addDoc(messagesRef, {
        role: 'model',
        text: data.reply,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <Bot size={48} className="mb-4 text-red-500" />
            <h3 className="text-xl font-medium text-white mb-2">PLEXA AI Control</h3>
            <p className="text-sm text-gray-400 max-w-sm">Ask me about your digital strategy, content planning, or on-ground shoots.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 flex-shrink-0">
                <Bot size={16} className="text-red-500" />
              </div>
            )}
            <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 ${
              msg.role === 'user' 
                ? 'bg-red-500 text-white rounded-br-none' 
                : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                <UserIcon size={16} className="text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <Bot size={16} className="text-red-500" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-white/10">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command your AI assistant..."
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-500 transition-colors"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
