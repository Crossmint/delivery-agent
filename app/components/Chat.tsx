'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[600px] max-h-[80vh] w-full max-w-3xl mx-auto border-2 border-gray-200 rounded-xl shadow-lg bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`
                relative
                inline-block
                px-6
                py-3
                max-w-[80%]
                rounded-2xl
                shadow-sm
                transform
                transition-all
                duration-200
                ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }
              `}
            >
              <p className="whitespace-pre-wrap font-['Comic_Sans_MS'] text-[15px] leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="relative bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
              <p className="font-['Comic_Sans_MS'] text-[15px]">
                <span className="inline-block animate-bounce">•</span>
                <span className="inline-block animate-bounce delay-100">•</span>
                <span className="inline-block animate-bounce delay-200">•</span>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Container */}
      <div className="border-t-2 border-gray-100 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-['Comic_Sans_MS'] text-[15px] transition-colors duration-200 resize-none min-h-[44px] max-h-[200px] overflow-y-auto"
            disabled={isLoading}
            rows={1}
            style={{ height: 'auto' }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 font-['Comic_Sans_MS'] text-[15px] transition-colors duration-200 whitespace-nowrap h-fit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 