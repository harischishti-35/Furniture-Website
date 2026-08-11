'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Email address is invalid';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Flagship Showroom',
      lines: ['Chishti Furniture Mart Building', '72-B, Main Boulevard Gulberg II', 'Lahore, Pakistan'],
    },
    {
      icon: Phone,
      title: 'Phone & Support',
      lines: ['Toll Free: +92 (42) 111-CHISHTI', 'Support Desk: +92 (300) 123-4567'],
    },
    {
      icon: Mail,
      title: 'Email Queries',
      lines: ['concierge@chishtifurniture.com', 'custom@chishtifurniture.com'],
    },
    {
      icon: Clock,
      title: 'Showroom Hours',
      lines: ['Mon - Sat: 11:00 AM - 09:00 PM', 'Sunday: 02:00 PM - 08:00 PM'],
    },
  ];

  return (
    <div className="bg-soft-white min-h-screen pb-16 md:pb-24">
      {/* Page Header */}
      <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80"
          alt="Luxury office meeting room"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center text-cream px-4 max-w-3xl space-y-4">
          <nav className="text-xs uppercase tracking-widest text-cream/70 font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">Contact Concierge</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            Contact Concierge
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Details & Location (span 5) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4 text-left">
              <span className="text-xs text-gold uppercase tracking-[0.2em] font-semibold">
                Customer Care
              </span>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Visit Us or Get in Touch
              </h2>
              <p className="text-xs text-charcoal/60 leading-relaxed font-body">
                Whether you’re interested in custom modular sofa layouts, bespoke dining sets, or wholesale hotel commissions, our dedicated design concierge team is here to assist.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 text-left">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 font-body text-sm text-charcoal/70">
                      <h4 className="font-bold text-charcoal">{detail.title}</h4>
                      {detail.lines.map((line, i) => (
                        <p key={i} className="text-xs">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form (span 7) */}
          <div className="lg:col-span-7 bg-cream/5 border border-cream/20 rounded-3xl p-8 md:p-10 relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal/70 font-body">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-white dark:bg-charcoal border rounded-xl text-sm font-body transition-colors focus:outline-none focus:border-gold ${
                          errors.name ? 'border-red-500/60' : 'border-cream/40'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal/70 font-body">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-white dark:bg-charcoal border rounded-xl text-sm font-body transition-colors focus:outline-none focus:border-gold ${
                          errors.email ? 'border-red-500/60' : 'border-cream/40'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal/70 font-body">Phone Number</label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white dark:bg-charcoal border border-cream/40 rounded-xl text-sm font-body transition-colors focus:outline-none focus:border-gold"
                        placeholder="+92 (300) 123-4567"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal/70 font-body">Subject *</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full px-4 py-3 bg-white dark:bg-charcoal border rounded-xl text-sm font-body transition-colors focus:outline-none focus:border-gold ${
                          errors.subject ? 'border-red-500/60' : 'border-cream/40'
                        }`}
                        placeholder="Custom Order / Inquiry"
                      />
                      {errors.subject && <p className="text-[10px] text-red-500 font-semibold">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-charcoal/70 font-body">Message *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`w-full px-4 py-3 bg-white dark:bg-charcoal border rounded-xl text-sm font-body transition-colors focus:outline-none focus:border-gold resize-none ${
                        errors.message ? 'border-red-500/60' : 'border-cream/40'
                      }`}
                      placeholder="Tell us about your project or requests..."
                    />
                    {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-charcoal">Message Sent Successfully</h3>
                    <p className="text-sm text-charcoal/60 font-body max-w-md mx-auto">
                      Thank you for contacting Chishti Furniture Mart. Our concierge design consultants will review your request and get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors font-body cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
