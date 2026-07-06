'use client';

import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
}

export default function JournalArchiveClient({ initialPosts }: { initialPosts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract categories dynamically right out of your real markdown data
  const categories = ['All', ...Array.from(new Set(initialPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? initialPosts 
    : initialPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-blue-500 bg-blue-950/50 px-3 py-1 rounded-full border border-blue-900/50">
          Archive
        </span>
        <h1 className="text-4xl font-extrabold text-white mt-4 tracking-tight">
          The Technical Journal
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl">
          A running history of my hands-on enterprise troubleshooting labs, system configurations, and deep-dives.
        </p>
      </div>

      {/* Interactive Filter Controls */}
      <div className="border-b border-slate-900 pb-6">
        <span className="text-xs font-mono text-slate-500 uppercase block mb-3">Filter by Stream:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = cat === 'All' ? initialPosts.length : initialPosts.filter(p => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-500 text-white border-blue-400 font-bold shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Archives Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <a 
            key={post.slug} 
            href={`/journal/${post.slug}`}
            className="block bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 rounded-xl p-6 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <span className="text-xs font-mono text-blue-500 uppercase">{post.category}</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-600 whitespace-nowrap md:mt-1">{post.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
