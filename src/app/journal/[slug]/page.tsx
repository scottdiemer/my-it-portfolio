import { getPostBySlug, getJournalPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// 1. THIS IS THE FIXED CODE: This tells Next.js what pages to build at compile time
export async function generateStaticParams() {
  const posts = getJournalPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function JournalPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-8 border-b border-slate-900 pb-8">
        <div className="flex gap-4 text-xs font-mono text-slate-500 mb-2">
          <span>{post.date}</span>
          <span>•</span>
          <span className="text-blue-400 uppercase">{post.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {post.title}
        </h1>
      </header>

      {/* Styled Markdown Output */}
      <div 
        className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 
                   prose-headings:text-white prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                   prose-h1:text-2xl prose-h2:text-xl prose-code:font-mono prose-code:bg-slate-900 
                   prose-code:text-blue-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className="mt-12 pt-6 border-t border-slate-900">
        <a href="/" className="text-sm font-mono text-blue-500 hover:text-blue-400">
          &larr; Back to Dashboard
        </a>
      </div>
    </article>
  );
}
