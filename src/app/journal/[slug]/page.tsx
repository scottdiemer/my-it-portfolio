import { getPostBySlug, getJournalPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// Next.js 14 Static Generation Hook
export async function generateStaticParams() {
  const posts = getJournalPosts();
  
  // CRITICAL: If no markdown files are found yet, return a temporary fallback 
  // array so the Next.js compiler doesn't crash with a "missing function" error.
  if (posts.length === 0) {
    return [{ slug: 'placeholder' }];
  }
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function JournalPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  // Allow the placeholder or missing files to degrade gracefully to a 404 instead of crashing the site build
  if (!post || params.slug === 'placeholder') {
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
  className="prose prose-invert max-w-none text-slate-300 context-layout
             
             {/* FORCE ELEMENT GAP SPACING */}
             [&>p]:mb-6 [&>p]:leading-relaxed
             [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:tracking-tight
             [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white
             
             {/* FORCE LIST SPACING AND ALIGNMENT */}
             [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-3
             [&_li]:text-slate-300 [&_li]:leading-relaxed
             
             {/* INLINE CODE STYLE */}
             prose-code:font-mono prose-code:bg-slate-900 prose-code:text-blue-400 
             prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
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
