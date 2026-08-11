'use client';

import { useState } from 'react';
import { Settings, Shield, User, Bell, Check } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function SettingsPage() {
  const { user, updateProfile } = useUserStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    updateProfile({ name, email, phone });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      setPasswordSuccess(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setPasswordSuccess(false);
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setPasswordError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 font-body">
      <div className="flex items-center justify-between border-b border-cream/15 pb-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-charcoal">Account Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Profile Form (span 7) */}
        <form onSubmit={handleProfileSubmit} className="lg:col-span-7 bg-soft-white border border-cream/20 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-bold text-charcoal flex items-center gap-2">
            <User className="w-5 h-5 text-gold" />
            Personal Details
          </h3>

          {profileSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/15 text-green-600 rounded-xl text-xs flex items-center gap-2 font-body font-semibold">
              <Check className="w-4 h-4" />
              Profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                />
              </div>
              <div>
                <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-cream/15 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Right: Password Form (span 5) */}
        <form onSubmit={handlePasswordSubmit} className="lg:col-span-5 bg-soft-white border border-cream/20 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-bold text-charcoal flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            Security & Password
          </h3>

          {passwordSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/15 text-green-600 rounded-xl text-xs flex items-center gap-2 font-body font-semibold">
              <Check className="w-4 h-4" />
              Password updated successfully!
            </div>
          )}

          {passwordError && (
            <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-500 rounded-xl text-xs font-body text-center">
              {passwordError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold block mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-soft-white border border-cream/45 rounded-xl text-sm focus:outline-none focus:border-gold font-body"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-cream/15 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-charcoal hover:bg-gold hover:text-charcoal text-cream font-semibold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
            >
              Update Password
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
