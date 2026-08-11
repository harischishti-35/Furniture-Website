'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: "Welcome to Chishti Furniture Mart. I am your concierge styling agent. How may I assist you with your space planning or custom joinery details today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'Bespoke table quote',
    'Care for oak wood',
    'Lifetime warranty info',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Trigger Typing Indicator
    setIsTyping(true);

    // Operator simulated response
    setTimeout(() => {
      let reply = "Thank you for asking. Our showroom concierge is reviewing your request. Could you leave your email so we can send a custom digital catalog?";
      
      const query = text.toLowerCase();
      if (query.includes('quote') || query.includes('bespoke') || query.includes('custom')) {
        reply = "For bespoke sizing and custom lumber commissions (like extending tables or custom fabric choices), we typically draw CAD blueprints first. Could you specify your preferred dimensions and wood type (e.g. walnut, oak)?";
      } else if (query.includes('care') || query.includes('oak') || query.includes('wood')) {
        reply = "Solid wood pieces are sealed with natural water-resistant oils. Wipe spills immediately with a lint-free damp cloth. We recommend polishing with organic furniture wax once a year.";
      } else if (query.includes('warranty') || query.includes('lifetime')) {
        reply = "We offer a Lifetime Warranty on all solid wood joinery frames. Upholstery, cushioning padding, and hardware mechanisms come with a 3-year warranty.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-charcoal text-gold flex items-center justify-center shadow-2xl border border-gold/40 cursor-pointer relative"
        aria-label="Open support chat"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border border-charcoal animate-pulse" />
      </motion.button>

      {/* Expandable Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-[360px] h-[500px] bg-soft-white border border-cream/25 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-charcoal text-cream p-5 flex items-center justify-between border-b border-cream/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gold/15 border border-gold/30 rounded-xl flex items-center justify-center text-gold">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-cream">Concierge Agent</p>
                  <p className="text-[10px] text-gold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>AI Operator Online</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream/60 hover:text-cream cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-soft-white scrollbar-thin">
              {messages.map((msg, idx) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div
                    key={idx}
                    className={`flex gap-3 max-w-[80%] ${isAgent ? 'mr-auto text-left' : 'ml-auto text-right flex-row-reverse'}`}
                  >
                    {isAgent && (
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 border border-gold/20">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`p-3.5 rounded-2xl text-xs md:text-sm font-body leading-relaxed ${
                          isAgent
                            ? 'bg-cream/15 border border-cream/20 text-charcoal rounded-tl-sm'
                            : 'bg-gold text-charcoal font-semibold rounded-tr-sm shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className="text-[9px] text-charcoal/30 px-1 font-body">{msg.time}</p>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%] mr-auto text-left">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 border border-gold/20">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-cream/15 border border-cream/20 text-charcoal p-3.5 rounded-2xl rounded-tl-sm text-xs flex items-center gap-1 font-body">
                    <span className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-1.5 justify-start">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="px-3 py-1.5 bg-cream/10 border border-cream/20 text-charcoal/70 hover:border-gold hover:text-gold rounded-full text-[10px] font-semibold tracking-wide transition-colors cursor-pointer font-body"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-soft-white border-t border-cream/15 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask our interior designers..."
                className="flex-grow px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-xs md:text-sm font-body text-charcoal focus:outline-none focus:border-gold transition-colors"
              />
              <button
                onClick={() => handleSend(input)}
                className="w-10 h-10 rounded-xl bg-gold text-charcoal hover:bg-gold-light transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
