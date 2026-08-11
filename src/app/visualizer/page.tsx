'use client';

import Link from 'next/link';
import RoomVisualizer from '@/components/features/RoomVisualizer';

export default function VisualizerPage() {
  return (
    <div className="py-16 md:py-24 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <nav className="text-xs text-charcoal/40 uppercase tracking-widest font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal/70">Room Visualizer</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Design & Arrange
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-sm text-charcoal/60 leading-relaxed font-body">
            Arrange our signature solid wood dining tables, sofas, and leather chairs virtually to check sizing fit, aesthetics, and layout coordinates before placing an order.
          </p>
        </div>

        {/* Room Visualizer Component */}
        <div className="max-w-5xl mx-auto">
          <RoomVisualizer />
        </div>

      </div>
    </div>
  );
}
