'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blog';

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { slug } = React.use(params);
  const router = useRouter();

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="py-20 text-center min-h-screen flex flex-col items-center justify-center bg-soft-white">
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Article Not Found</h2>
        <p className="text-charcoal/60 mb-6 font-body">The blog post you are looking for does not exist or has been removed.</p>
        <Link href="/blog" className="px-6 py-2.5 bg-gold text-charcoal font-semibold rounded-xl text-sm transition-colors font-body">
          Back to Journal
        </Link>
      </div>
    );
  }

  // Parse markdown headings and content blocks for premium formatting
  const formattedContent = post.content.split('\n\n').map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={index} className="font-heading text-xl md:text-2xl font-bold text-charcoal pt-6 pb-2">
          {trimmed.replace('## ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={index} className="font-heading text-lg font-bold text-charcoal pt-4 pb-2">
          {trimmed.replace('### ', '')}
        </h4>
      );
    }
    if (trimmed.startsWith('- ')) {
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 text-sm text-charcoal/70 font-body my-4">
          {trimmed.split('\n').map((li, i) => (
            <li key={i}>{li.replace('- ', '')}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="text-sm md:text-base text-charcoal/70 leading-relaxed font-body">
        {trimmed}
      </p>
    );
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="bg-soft-white min-h-screen pb-16 md:pb-24">
      {/* Cover Image & Header */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        
        {/* Back and Share buttons */}
        <div className="absolute top-6 left-6 md:left-12 z-20 flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-charcoal/50 backdrop-blur-md text-cream hover:bg-charcoal transition-colors px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-body cursor-pointer border border-cream/15"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="absolute top-6 right-6 md:right-12 z-20">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-charcoal/50 backdrop-blur-md text-cream hover:bg-charcoal transition-colors px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-body cursor-pointer border border-cream/15"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Article Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10 text-cream max-w-5xl mx-auto w-full">
          <span className="px-3 py-1 bg-gold text-charcoal text-[9px] font-bold tracking-wider rounded-full shadow-md uppercase mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-cream/70 font-body">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold" />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold" />
              Published by {post.author.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Article Text (span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {formattedContent}
          
          {/* Tags */}
          <div className="pt-8 border-t border-cream/20 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 bg-cream/10 border border-cream/20 text-charcoal/60 rounded-full text-xs font-semibold font-body"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Side Card (span 4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
          <div className="bg-cream/10 border border-cream/20 rounded-2xl p-6 space-y-6">
            <h4 className="font-heading text-sm uppercase tracking-wider font-bold text-gold">
              About the Author
            </h4>
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-charcoal">{post.author.name}</p>
                <p className="text-xs text-charcoal/40 font-body">Senior Design Consultant</p>
              </div>
            </div>
            <p className="text-xs text-charcoal/60 leading-relaxed font-body">
              {post.author.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 border-t border-cream/20 pt-16">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-10 text-center">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/blog/${rPost.slug}`}
                className="group flex flex-col h-full bg-soft-white border border-cream/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={rPost.image}
                    alt={rPost.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-wider">
                      {rPost.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
                      {rPost.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-charcoal/40 font-body border-t border-cream/10 pt-3">
                    <span>{rPost.publishedAt}</span>
                    <span>{rPost.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
