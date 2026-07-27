import Link from "next/link";
import TerminalName from "@/components/TerminalName";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-slate-800 dark:text-slate-200">
      {/* Header Section */}
      <header id="about" className="space-y-6">
        {/* Animated Terminal Title (Includes Name & Title Response) */}
        <TerminalName />

        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Welcome to my technical portfolio. I am a systems-focused IT
          professional combining 10+ years of operational leadership with
          hands-on infrastructure engineering. Experienced in deploying
          virtualized Active Directory environments, self-hosting production
          help desks, and securing Linux mail infrastructure.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="#labs"
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Explore Live Infrastructure ↓
          </a>
          <a
            href="/Scott_Diemer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Download Resume (PDF)
          </a>
        </div>
      </header>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Featured Production Stacks & Labs */}
      <section id="labs" className="space-y-6 scroll-mt-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Production Services & Lab Deployments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real infrastructure built, secured, and maintained in production and
            home lab environments[cite: 1].
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lab 1: Active Directory */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                SysAdmin / Security
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                Active Directory & AppLocker
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Windows Server 2022 • QEMU/KVM • Win 11 Enterprise
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Deployed Domain Controller with structured OUs, user
                provisioning, and kernel-level AppLocker execution
                policies[cite: 1].
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900">
              <Link
                href="/journal/2026-07-15_win11_server2022_integration_journal"
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Read Journal Entry →
              </Link>
            </div>
          </div>

          {/* Lab 2: osTicket */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                Live Production Stack
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                osTicket Support Portal
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ubuntu • Nginx • MariaDB • SSL
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hardened production help desk ticketing system with Let's
                Encrypt SSL, custom SLA rules, and database optimization[cite:
                1].
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
              <a
                href="https://tickets.scottdiemer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                tickets.scottdiemer.com ↗
              </a>
            </div>
          </div>

          {/* Lab 3: Mailcow Docker */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                Containerized Mail
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                Mailcow Mail Server
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Docker • Postfix • DNS Auth
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Architected Docker-based Mailcow server[cite: 1]. Configured
                full DNS security protocols (SPF, DKIM, DMARC, rDNS)[cite: 1].
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
              <a
                href="https://mail.scottdiemer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                mail.scottdiemer.com ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Technical Core Section */}
      <section id="skills" className="space-y-4 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Technical Core
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Systems Administration
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Windows Server 2022 & AD[cite: 1]</li>
              <li>Group Policy & AppLocker[cite: 1]</li>
              <li>Ubuntu Server Administration[cite: 1]</li>
              <li>QEMU / KVM Virtualization[cite: 1]</li>
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Networking & Security
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>TCP/IP & IPv4 Subnetting[cite: 1]</li>
              <li>DNS (SPF, DKIM, DMARC, PTR)[cite: 1]</li>
              <li>Nginx Reverse Proxy & SSL[cite: 1]</li>
              <li>SSH Key Management & Firewalls</li>
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Help Desk & Web Stack
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>osTicket Administration[cite: 1]</li>
              <li>Docker Containerization[cite: 1]</li>
              <li>Git / GitHub Version Control[cite: 1]</li>
              <li>SLA & Root-Cause Analysis[cite: 1]</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Featured Milestones & Journal */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Recent Milestones & Technical Notes
          </h2>
          <Link
            href="/journal"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all entries →
          </Link>
        </div>

        <div className="space-y-4 pt-2">
          {/* Milestone 1 */}
          <Link
            href="/journal/2026-06-29-technical-review-and-completing-os-fundamentals"
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Certification Milestone
              </span>
              <span className="text-xs text-slate-400">July 2026</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Google IT Support Certificate: Technical Support Fundamentals
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Completed core coursework focusing on hardware diagnostics,
              operating system maintenance, networking fundamentals, and
              customer escalation frameworks[cite: 1].
            </p>
          </Link>

          {/* Milestone 2 */}
          <Link
            href="/journal/2026-06-26-building-and-deploying-decoupled-nextjs-portfolio"
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
              Configured a production Next.js application served securely behind
              an Nginx reverse proxy with SSL termination and SSH access
              controls[cite: 1].
            </p>
          </Link>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Context Quote / Close */}
      <section className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4 my-4 italic text-lg text-slate-700 dark:text-slate-300">
          "Technical downtime directly impacts business operations. My
          background bridges hands-on system administration with operational
          accountability[cite: 1]."
        </div>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Over 10+ years managing daily operations, I served as the primary
          technical contact for hardware, software, and workflow
          deployments[cite: 1]. I built this site and my live lab subdomains to
          showcase my commitment to modern enterprise infrastructure, security
          practices, and continuous technical growth[cite: 1].
        </p>
      </section>
    </div>
  );
}
