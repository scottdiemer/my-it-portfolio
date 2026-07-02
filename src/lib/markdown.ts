import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const journalDirectory = path.join(process.cwd(), '_journal');

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
}

export function getJournalPosts(): JournalPost[] {
  if (!fs.existsSync(journalDirectory)) {
    fs.mkdirSync(journalDirectory);
  }
  
  const fileNames = fs.readdirSync(journalDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(journalDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled Log',
        date: data.date || '',
        category: data.category || 'General IT',
        summary: data.summary || '',
        content: marked(content) as string,
      };
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): JournalPost | null {
  try {
    const fullPath = path.join(journalDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled Log',
      date: data.date || '',
      category: data.category || 'General IT',
      summary: data.summary || '',
      content: marked(content) as string,
    };
  } catch {
    return null;
  }
}
