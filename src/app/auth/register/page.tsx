'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useUserStore((s) => s.register);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate register API call
    setTimeout(() => {
      const success = register(name, email, password);
      if (success) {
        router.push('/account');
      } else {
        setError('Registration failed. Please try again.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const getPasswordStrength = () => {
    if (!password) return 'none';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const strength = getPasswordStrength();

  return (
    <div className="py-20 md:py-32 bg-soft-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[90px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brown/5 blur-[80px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md px-4 relative z-10">
        
        {/* Card wrapper */}
        <div className="bg-soft-white border border-cream/25 rounded-3xl p-8 md:p-10 shadow-xl space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block">
              Join Chishti
            </span>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Create an Account
            </h1>
            <p className="text-xs text-charcoal/50 font-body">
              Register now to track orders, save items, and earn points.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-red-500 font-body text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="•••••••• (Min 6 chars)"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body disabled:opacity-50"
                />
              </div>

              {/* Password strength indicators */}
              {password && (
                <div className="pt-1.5 flex gap-1 items-center">
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      strength === 'weak' || strength === 'medium' || strength === 'strong'
                        ? strength === 'weak'
                          ? 'bg-red-500'
                          : strength === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-cream'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      strength === 'medium' || strength === 'strong'
                        ? strength === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-cream'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      strength === 'strong' ? 'bg-green-500' : 'bg-cream'
                    }`}
                  />
                  <span className="text-[9px] text-charcoal/40 font-bold uppercase font-body ml-2">
                    {strength}
                  </span>
                </div>
              )}
            </div>

            {/* Terms agreements */}
            <p className="text-[10px] text-charcoal/40 font-body leading-relaxed">
              By registering, you agree to our{' '}
              <a href="#" className="text-gold hover:underline">
                Terms of Service
              </a>{' '}
              &{' '}
              <a href="#" className="text-gold hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !name || !email || !password}
              className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="text-center pt-2 border-t border-cream/15">
            <p className="text-xs text-charcoal/50 font-body">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-gold font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
