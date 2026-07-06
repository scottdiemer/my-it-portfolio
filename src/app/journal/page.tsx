import { getJournalPosts } from '@/lib/markdown';
import JournalArchiveClient from './JournalArchiveClient';

export default async function JournalPage() {
  // Fetch data directly from your src/_journal directory markdown files
  const posts = await getJournalPosts();
  
  // Sort posts by date descending so the newest post is on top
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <JournalArchiveClient initialPosts={sortedPosts} />;
}
