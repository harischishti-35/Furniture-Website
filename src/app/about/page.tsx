'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Heart, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '25+', label: 'Years of Craftsmanship' },
    { value: '10k+', label: 'Homes Transformed' },
    { value: '100%', label: 'Solid Wood Guarantee' },
    { value: '15+', label: 'Design Awards Won' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Uncompromising Quality',
      desc: 'We select only the finest grade hardwoods, leather, and premium fabrics, warranting every piece for generations.',
    },
    {
      icon: Sparkles,
      title: 'Modern Craftsmanship',
      desc: 'Merging traditional woodworking joinery techniques with state-of-the-art Italian finishes for lasting luxury.',
    },
    {
      icon: Heart,
      title: 'Ethical Sourcing',
      desc: 'All timber is sustainably harvested from certified managed forests. We care deeply about the environment.',
    },
    {
      icon: Award,
      title: 'Design Excellence',
      desc: 'Our collections are hand-sketched and refined by award-winning designers to capture timeless residential luxury.',
    },
  ];

  return (
    <div className="bg-soft-white min-h-screen pb-16 md:pb-24">
      {/* Hero Banner Section */}
      <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80"
          alt="Luxury furniture showroom banner"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center text-cream px-4 max-w-3xl space-y-4">
          <nav className="text-xs uppercase tracking-widest text-cream/70 font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">Our Story</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            Crafting Legacy Spaces
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-cream/10 border border-cream/20 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80"
                alt="Woodworking craftsmanship details"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay detail */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-charcoal text-cream p-6 rounded-2xl border border-cream/10 shadow-xl max-w-[220px] text-left">
              <p className="text-2xl font-bold text-gold font-heading">Est. 2001</p>
              <p className="text-[10px] text-cream/60 leading-relaxed font-body mt-1">
                Founded as a bespoke furniture workshop in Lahore, growing into a national standard of furniture luxury.
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs text-gold uppercase tracking-[0.2em] font-semibold">
              Chishti Furniture Mart
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              A Passion for Heritage Joinery & Modern Design
            </h2>
            <div className="w-12 h-0.5 bg-gold" />
            <div className="space-y-4 text-sm md:text-base text-charcoal/70 leading-relaxed font-body">
              <p>
                Chishti Furniture Mart was founded with a singular, clear vision: to create furniture pieces that are not merely functional, but are timeless works of art designed to pass down through generations.
              </p>
              <p>
                What began as a small boutique workshop specializing in solid oak and walnut joinery has evolved into Pakistan’s premier luxury furniture e-commerce experience. Throughout our growth, our commitment to slow-made, premium craftsmanship has never wavered.
              </p>
              <p>
                Each collection represents a dialogue between structural functionality and sculptural form. We work alongside master craftsmen, engineers, and designers to ensure that every table, headboard, and sofa bearing the Chishti name is a testament to quality, longevity, and design excellence.
              </p>
            </div>
            
            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-all duration-300 shadow-md font-body"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-charcoal text-cream py-16 mt-20 md:mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-heading text-3xl md:text-5xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-cream/60 uppercase tracking-widest font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-heading text-3xl font-bold text-charcoal">Our Core Values</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="text-sm text-charcoal/60 leading-relaxed font-body">
            These four foundational values guide every sketch, choice of lumber, and customer interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="bg-cream/5 border border-cream/20 rounded-2xl p-6 hover:shadow-md transition-shadow text-left space-y-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-charcoal">{v.title}</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed font-body">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
