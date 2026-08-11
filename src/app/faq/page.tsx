'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = ['All', 'Ordering', 'Delivery', 'Custom Commissions', 'Warranty & Care'];

  const faqs: FAQItem[] = [
    {
      q: 'Do you offer custom dimensions on your tables and beds?',
      a: 'Yes, absolutely. Custom commissions are a core part of Chishti Furniture Mart. If you need a specific dining table length or custom headboard height, choose "Custom Commissions" on our contact form or visit our showroom to speak with an engineer. We will draft CAD designs for your approval before building.',
      cat: 'Custom Commissions',
    },
    {
      q: 'What is the shipping cost for large furniture items?',
      a: 'We offer free White Glove Shipping and in-home installation for all orders over $500. For orders under $500, a flat shipping fee of $49 is applied. This includes unpacking, assembly in your room of choice, and complete removal of all packaging materials.',
      cat: 'Delivery',
    },
    {
      q: 'What woods do you use in your furniture?',
      a: 'We work almost exclusively with solid, sustainably-sourced hardwoods. Our primary lumber selections include kiln-dried American Walnut, European Ash, White Oak, and premium plantation-grown Teak for outdoor pieces. We never use particleboard or low-grade veneers in our premium collections.',
      cat: 'Warranty & Care',
    },
    {
      q: 'How long will it take to receive my order?',
      a: 'Standard catalog items typically deliver within 7-10 business days. Custom joinery and bespoke upholstered sofas require between 4-6 weeks for design, building, and finishing. We will send you regular photo updates of your furniture in progress from our workshops.',
      cat: 'Delivery',
    },
    {
      q: 'Do you offer a warranty on your joinery?',
      a: 'Yes. We offer a Lifetime Frame & Joinery Warranty on all solid wood frames. We guarantee that the mortise-and-tenon joints, structural frames, and solid joinery will not warp, break, or crack under normal residential use. Upholstery fabrics, foam cushions, and hardware are covered under a 3-year warranty.',
      cat: 'Warranty & Care',
    },
    {
      q: 'What is your return policy?',
      a: 'We want you to love your space. If a piece doesn\'t look right in your home, you can initiate a return within 30 days of delivery. We will arrange a pickup. Return shipping is free, but please note that custom-made bespoke items are non-refundable unless they arrive damaged.',
      cat: 'Ordering',
    },
    {
      q: 'How do I care for my solid wood table top?',
      a: 'For daily cleaning, use a damp lint-free cloth. Avoid abrasive chemical cleaners. We finish our dining tables with a premium water-resistant matte oil. We recommend reapplying a coat of furniture wax or natural oil once a year to keep the timber hydrated and protected against spills.',
      cat: 'Warranty & Care',
    },
    {
      q: 'Do you accept cash on delivery (COD)?',
      a: 'For orders under $1,000, we support Cash on Delivery (COD) in select major metropolitan areas. For orders above $1,000 or custom commissions, we require a 50% deposit via bank transfer or credit card to begin production, with the remaining 50% balance due upon delivery.',
      cat: 'Ordering',
    },
  ];

  // Filter FAQs by search and category
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.cat === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-soft-white min-h-screen pb-16 md:pb-24">
      {/* Header Banner */}
      <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80"
          alt="Luxury home library bookshelf"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center text-cream px-4 max-w-3xl space-y-4">
          <nav className="text-xs uppercase tracking-widest text-cream/70 font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">Support & FAQ</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search questions or terms..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setExpandedIndex(null);
            }}
            className="w-full px-5 py-4 pl-12 bg-white border border-cream/35 rounded-2xl text-sm font-body shadow-sm focus:outline-none focus:border-gold transition-colors"
          />
          <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 mb-10 scrollbar-thin border-b border-cream/20 justify-start md:justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-body cursor-pointer flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gold text-charcoal shadow-md font-bold'
                  : 'bg-cream/10 border border-cream/20 text-charcoal/70 hover:border-gold hover:text-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-cream/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors duration-300 hover:bg-cream/5"
                  >
                    <span className="font-heading font-bold text-sm md:text-base text-charcoal pr-6">
                      {faq.q}
                    </span>
                    <div className="text-gold flex-shrink-0">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-charcoal/75 leading-relaxed font-body border-t border-cream/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-cream/10 border border-dashed border-cream/30 rounded-2xl">
              <p className="text-lg text-charcoal/50 font-heading font-medium">
                No matching questions found.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
                className="mt-4 px-6 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors font-body"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
