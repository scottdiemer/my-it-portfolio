import Link from 'next/link';
import TerminalName from '@/components/TerminalName';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-12 text-slate-800 dark:text-slate-200">
      
      {/* Header Section */}
      <header className="space-y-4">
        {/* Animated Terminal Title */}
        <TerminalName />
        
        <p className="text-xl font-medium text-blue-600 dark:text-blue-400">
          IT Support Specialist | Systems & Infrastructure Troubleshooting
        </p>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Welcome to my technical portfolio. I am a systems-focused IT professional who combines an extensive background in operational leadership with a modern, hands-on technical toolkit. My career has been defined by complex problem-solving, managing operational efficiency, and translating technical issues into clear solutions.
        </p>
      </header>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Technical Stack Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Technical Core
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Operating Systems</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Linux (Ubuntu Server/Desktop)</li>
              <li>Neovim Customization</li>
              <li>Windows Ecosystem</li>
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Infrastructure & Web</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Nginx Web Server</li>
              <li>Next.js Framework</li>
              <li>Markdown Documentation</li>
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Support Methodology</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Troubleshooting Frameworks</li>
              <li>SLA & Escalation Care</li>
              <li>Technical Documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Highlighted Project/Journal Logs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Featured Milestones
          </h2>
          <Link href="/journal" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View all entries →
          </Link>
        </div>
        
        <div className="space-y-4 pt-2">
          {/* Milestone 1 */}
          <Link 
            href="/journal/it-support-fundamentals-complete" 
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Certification
              </span>
              <span className="text-xs text-slate-400">July 2026</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Completed: IT Support Fundamentals & Troubleshooting Module
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Passed the core troubleshooting module covering best practices, customer handling, documentation standards, and technical interview frameworks.
            </p>
          </Link>

          {/* Milestone 2 */}
          <Link 
            href="/journal/portfolio-infrastructure-setup" 
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                Infrastructure
              </span>
              <span className="text-xs text-slate-400">June 2026</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Deploying scottdiemer.com on Ubuntu & Nginx
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              A deep dive into setting up our Next.js environment production build, managing local SSH keys, and serving static assets securely via an Nginx reverse proxy.
            </p>
          </Link>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Context Quote / Close */}
      <section className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4 my-4 italic text-lg text-slate-700 dark:text-slate-300">
          "Many entry-level IT candidates can configure a setting, but few understand how technical downtime impacts an organization's bottom line."
        </div>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Throughout my professional journey, I have managed high-stakes operations, led teams, and served as the default technical point person for hardware, software, and POS deployments. I built this portfolio—from the underlying Nginx configuration to the Markdown-driven journal—to document my continuous upskilling and to showcase my approach to real-world technical challenges.
        </p>
      </section>

    </div>
  );
}
