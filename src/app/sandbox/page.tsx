'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Using standard characters if Lucide isn't fully set up, but feel free to swap icons!

type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export default function SandboxPage() {
  const router = useRouter();
  
  // --- EXISTING STATE ---
  const starterCode = `# Welcome to CodeMentor AI Sandbox! 🚀
# Write your code below...
print("Loading...")`;

  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("Ready to run...");
  const [isSuccess, setIsSuccess] = useState(false);

  // --- NEW CHAT STATE ---
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your AI Mentor. Stuck? Ask me anything about your code!" }
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // 1. Load Code from Storage
  useEffect(() => {
    const saved = localStorage.getItem("currentModuleCode");
    if (saved) setCode(saved);
  }, []);

  // 2. Auto-save
  useEffect(() => {
    localStorage.setItem("currentModuleCode", code);
  }, [code]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  // 3. Mock Run Function
  const handleRun = () => {
    setOutput(`> Initializing environment...\n> Running script...\n\n✅ Code executed successfully!`);
    setIsSuccess(true); 
  };

  // 4. Update Progress
  const handleComplete = () => {
    const savedRoadmap = localStorage.getItem('userRoadmap');
    if (savedRoadmap) {
      let currentProgress = parseInt(localStorage.getItem('modulesCompleted') || '2');
      localStorage.setItem('modulesCompleted', (currentProgress + 1).toString());
      const currentXP = parseInt(localStorage.getItem('userXP') || '2450');
      localStorage.setItem('userXP', (currentXP + 500).toString());
    }
    router.push('/dashboard');
  };

  // 5. NEW: Handle AI Chat
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    // Add user message
    const newUserMsg: Message = { role: 'user', content: chatInput };
    setMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, newUserMsg], 
          code: code // WE SEND THE CURRENT CODE CONTEXT!
        }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Connection error. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center justify-between bg-gray-900 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Coding Sandbox</h1>
        </div>
        
        <div className="flex gap-3">
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition font-medium text-sm flex items-center border border-gray-700"
            >
              ← Back
            </Link>

            {/* NEW AI BUTTON */}
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`px-4 py-2 rounded-lg transition font-medium text-sm flex items-center border ${showChat ? 'bg-purple-900/50 border-purple-500 text-purple-200' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
            >
              🤖 AI Mentor
            </button>

            {!isSuccess ? (
              <button 
                onClick={handleRun}
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
              >
                <span>▶</span> Run Code
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2 animate-pulse"
              >
                <span>🎉</span> Complete (+500 XP)
              </button>
            )}
        </div>
      </div>
      
      {/* Main Layout */}
      <div className="flex-1 flex relative">
        
        {/* Code & Output Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 transition-all duration-300">
          <div className="border-r border-gray-800 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-950 text-green-400 font-mono text-base p-6 outline-none resize-none"
              spellCheck={false}
            />
          </div>
          <div className="bg-gray-900 p-6 font-mono text-sm hidden lg:block">
            <p className="text-gray-500 mb-2 uppercase text-xs font-bold tracking-wider">Terminal Output</p>
            <div className="bg-black rounded-lg p-4 border border-gray-800 min-h-[200px]">
              <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </div>

        {/* --- CHAT SIDEBAR --- */}
        <div 
          className={`fixed inset-y-0 right-0 w-full md:w-96 bg-gray-900 border-l border-gray-800 transform transition-transform duration-300 ease-in-out z-20 flex flex-col shadow-2xl ${showChat ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: '73px' }} // Below header
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
            <h3 className="font-bold text-purple-400 flex items-center gap-2">
              <span>🤖</span> AI Mentor
            </h3>
            <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your code..."
                className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isChatLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg disabled:opacity-50 transition"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}