'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = blogPosts.map((p) => p.category);
    return ['All', ...Array.from(new Set(cats))];
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Featured post (the first one)
  const featuredPost = useMemo(() => blogPosts[0], []);

  const remainingPosts = useMemo(() => {
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } },
  };

  return (
    <div className="py-16 md:py-24 bg-soft-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <nav className="text-xs text-charcoal/40 uppercase tracking-widest font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal/70">Design Journal</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Design Journal & Inspiration
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-sm text-charcoal/60 leading-relaxed font-body">
            Stay up to date with the latest interior design trends, styling tips, and home decor guides from our senior design consultants.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-thin border-b border-cream/20 justify-start md:justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-body cursor-pointer flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gold text-charcoal shadow-md font-bold'
                  : 'bg-cream/10 border border-cream/20 text-charcoal/70 hover:border-gold hover:text-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Only when "All" category is selected or category matches featured post's category) */}
        {(activeCategory === 'All' || activeCategory === featuredPost.category) && (
          <div className="mb-16">
            <h2 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-gold mb-6">
              Featured Article
            </h2>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-soft-white border border-cream/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block"
            >
              {/* Image Area (span 7) */}
              <div className="lg:col-span-7 h-[300px] md:h-[400px] overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-gold text-charcoal text-[10px] font-bold tracking-wider rounded-full shadow-md uppercase">
                  {featuredPost.category}
                </span>
              </div>

              {/* Content Area (span 5) */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-charcoal/40 font-body">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {featuredPost.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {featuredPost.readTime} min read
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300 leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm text-charcoal/60 leading-relaxed font-body">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Author & CTA */}
                <div className="pt-8 border-t border-cream/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold/20"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-charcoal">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-charcoal/40 font-body">Writer & Curator</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-gold group-hover:translate-x-1.5 transition-transform duration-300 font-body uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="space-y-6">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-gold">
            Latest Articles
          </h2>
          
          {remainingPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {remainingPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-soft-white border border-cream/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                  >
                    {/* Thumbnail */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-[9px] font-bold tracking-wider rounded-full shadow-md uppercase">
                        {post.category}
                      </span>
                    </div>

                    {/* Meta & Info */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-[10px] text-charcoal/40 font-body">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gold" />
                            {post.publishedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gold" />
                            {post.readTime} min read
                          </span>
                        </div>

                        <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-charcoal/60 leading-relaxed font-body line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Author */}
                      <div className="pt-4 border-t border-cream/15 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-gold/20"
                          />
                          <span className="text-[10px] font-bold text-charcoal">{post.author.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gold group-hover:translate-x-1 transition-transform duration-300 font-body uppercase tracking-wider flex items-center gap-1">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-cream/10 border border-dashed border-cream/30 rounded-2xl">
              <p className="text-lg text-charcoal/50 font-heading font-medium">
                No articles found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 px-6 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl text-sm transition-colors font-body"
              >
                Show All Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
