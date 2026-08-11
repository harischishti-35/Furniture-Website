'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError('');

    // Simulate login API call
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        router.push('/account');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 1200);
  };

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
              Welcome Back
            </span>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
              Sign In to Chishti
            </h1>
            <p className="text-xs text-charcoal/50 font-body">
              Enter your email and password to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-red-500 font-body text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block">
                  Password
                </label>
                <Link
                  href="/auth/forgot"
                  className="text-[10px] text-gold hover:text-gold-dark font-semibold font-body"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body disabled:opacity-50"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 py-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-cream/55 text-gold focus:ring-gold"
              />
              <label htmlFor="remember" className="text-xs text-charcoal/60 font-body cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Submit CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Social login dummy */}
          <div className="space-y-4">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-cream/15"></div>
              <span className="flex-shrink mx-4 text-[10px] text-charcoal/30 uppercase tracking-widest font-bold font-body">Or Connect With</span>
              <div className="flex-grow border-t border-cream/15"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  login('google@domain.com', 'password');
                  router.push('/account');
                }}
                className="py-3 border border-cream/40 rounded-xl text-xs font-semibold font-body text-charcoal/70 hover:border-gold transition-colors cursor-pointer text-center"
              >
                Google Account
              </button>
              <button
                onClick={() => {
                  login('apple@domain.com', 'password');
                  router.push('/account');
                }}
                className="py-3 border border-cream/40 rounded-xl text-xs font-semibold font-body text-charcoal/70 hover:border-gold transition-colors cursor-pointer text-center"
              >
                Apple ID
              </button>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-cream/15">
            <p className="text-xs text-charcoal/50 font-body">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-gold font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
