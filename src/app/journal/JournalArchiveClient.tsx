"use client";

import { useState } from "react";
import Link from "next/link";

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string[];
  summary: string;
  content?: string;
}

interface JournalArchiveClientProps {
  initialPosts: Post[];
}

export default function JournalArchiveClient({
  initialPosts,
}: JournalArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Flatten all category arrays and extract unique names
  const allCategories = [
    "All",
    ...Array.from(new Set(initialPosts.flatMap((post) => post.category))),
  ];

  // Calculate matching posts for category badges/counts
  const getCategoryCount = (catName: string) => {
    if (catName === "All") return initialPosts.length;
    return initialPosts.filter((post) => post.category.includes(catName))
      .length;
  };

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? initialPosts
      : initialPosts.filter((post) => post.category.includes(selectedCategory));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center pb-6 border-b border-zinc-800">
        {allCategories.map((cat, index) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={`${cat}-${index}`}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-500 text-white border-blue-400 font-bold shadow-md shadow-blue-500/20"
                  : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {cat} ({getCategoryCount(cat)})
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-xl hover:border-zinc-700/80 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono text-zinc-500">
                {post.date}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.category.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/40 border border-blue-900/50 px-2 py-0.5 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors mb-2">
              <Link href={`/journal/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {post.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
