import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_journal'); // Verify this matches your markdown folder name (e.g., 'posts' or 'journal')

// 1. Get a single post by its slug (used to render the article)
export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const processedContent = remark()
      .use(html)
      .processSync(content);
      
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      title: data.title,
      date: data.date,
      category: data.category,
      summary: data.summary,
    };
  } catch (error) {
    return null;
  }
}

// 2. Get all posts (used by generateStaticParams to know what routes to build)
export function getJournalPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: data.date,
          category: data.category,
          summary: data.summary,
        };
      });
  } catch (error) {
    return [];
  }
}
