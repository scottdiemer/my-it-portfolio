import './globals.css'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// This updates the browser tab title and SEO data for scottdiemer.com
export const metadata = {
  title: 'Scott Diemer | IT Support Professional & Learning Journal',
  description: 'Documenting my hands-on journey into Information Technology support, networking, and systems management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100 scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Your name now serves as the branding logo link */}
            <a href="/" className="font-mono text-sm tracking-wider text-blue-400 hover:text-blue-300 font-bold">
              Scott Diemer
            </a>
            <nav className="flex gap-6 text-sm font-medium text-slate-400">
              <a href="/#about" className="hover:text-white transition-colors">About</a>
              <a href="/#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="/journal/" className="hover:text-white transition-colors">Learning Journal</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} - scottdiemer.com
        </footer>
      </body>
    </html>
  );
}
