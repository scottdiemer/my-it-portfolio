import Link from "next/link";
import TerminalName from "@/components/TerminalName";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-slate-800 dark:text-slate-200">
      {/* Header Section */}
      <header id="about" className="space-y-6">
        <TerminalName />

        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Welcome to my technical portfolio. I’m transitioning into IT support
          after a long career in retail operations and management. This site
          documents the hands-on work I’m doing with Linux, Windows Server,
          Active Directory, networking, self-hosted services, troubleshooting,
          and the Google IT Support Professional Certificate.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="#labs"
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Explore Projects ↓
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

      {/* Current Focus */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Current Focus
        </h2>

        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          I’m currently working through the Google IT Support Professional
          Certificate while continuing to build hands-on experience with
          networking, Linux administration, Windows environments, Active
          Directory, troubleshooting, and self-hosted infrastructure.
        </p>

        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Linux has been my primary desktop operating system for years, and I
          currently use Manjaro Linux as my daily driver.
        </p>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Featured Infrastructure & Labs */}
      <section id="labs" className="space-y-6 scroll-mt-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Projects, Services & Labs
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            A mix of live self-hosted services and hands-on lab environments
            built to practice administration, troubleshooting, networking, and
            security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Directory Lab */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Systems Administration Lab
              </span>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                Active Directory & AppLocker
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Windows Server 2022 • QEMU/KVM • Windows 11 Enterprise
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Built a Windows Server 2022 Active Directory lab with structured
                Organizational Units, user provisioning, domain-joined Windows
                11 clients, and AppLocker application-control policies.
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

          {/* osTicket */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                Live Self-Hosted Service
              </span>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                osTicket Support Portal
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Ubuntu • Nginx • MariaDB • SSL
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Deployed and maintain a live osTicket help desk on Ubuntu with
                Nginx, MariaDB, and TLS. After automated bots began submitting
                unwanted tickets, I tightened the public-facing configuration
                and added protections to reduce abusive submissions.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900">
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

          {/* Mailcow */}
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                Live Self-Hosted Service
              </span>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-3 mb-1">
                Mailcow Mail Server
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Docker • Postfix • Dovecot • DNS Authentication
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Deployed and maintain a Docker-based Mailcow mail server with
                SPF, DKIM, DMARC, and reverse DNS configured for authentication
                and deliverability. I also monitor DMARC reports and tightened
                the domain policy after verifying legitimate senders.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900">
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

      {/* Technical Core */}
      <section id="skills" className="space-y-4 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Technical Core
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Systems & Operating Systems
            </h3>

            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Manjaro Linux Daily Administration</li>
              <li>Ubuntu Server Administration</li>
              <li>Windows Server 2022 & Active Directory</li>
              <li>Windows 11 Enterprise</li>
              <li>QEMU/KVM Virtualization</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Networking & Security
            </h3>

            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>TCP/IP, IPv4 & Subnetting</li>
              <li>DNS, DHCP & NAT Fundamentals</li>
              <li>SPF, DKIM, DMARC & PTR</li>
              <li>Nginx Reverse Proxy & TLS</li>
              <li>SSH Keys & Linux Firewall Basics</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Support & Infrastructure
            </h3>

            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Technical Troubleshooting</li>
              <li>osTicket Administration</li>
              <li>PowerShell & Bash</li>
              <li>Docker Containerization</li>
              <li>Git / GitHub Version Control</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Journal */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Troubleshooting Journal
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Notes from projects, labs, upgrades, failures, and the process of
              figuring out what went wrong.
            </p>
          </div>

          <Link
            href="/journal"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
          >
            View all entries →
          </Link>
        </div>

        <div className="space-y-4 pt-2">
          <Link
            href="/journal/2026-07-31-pre-upgrade-backups-ubuntu-24-04-lts-migration-and-service-recovery"
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2 gap-4">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                Linux / Service Recovery
              </span>

              <span className="text-xs text-slate-400">July 2026</span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Ubuntu 24.04 LTS Migration & Service Recovery
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Documented the backup, upgrade, troubleshooting, and recovery
              process while migrating a self-managed Ubuntu server and restoring
              dependent services.
            </p>
          </Link>

          <Link
            href="/journal/2026-07-15_win11_server2022_integration_journal"
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2 gap-4">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Active Directory Lab
              </span>

              <span className="text-xs text-slate-400">July 2026</span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Windows Server 2022 & Windows 11 Domain Integration
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Built and documented an Active Directory environment with domain
              joining, Organizational Units, user and group management, and
              application-control policies.
            </p>
          </Link>

          <Link
            href="/journal/2026-07-24-Email-Deliverability-Hardening/"
            className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2 gap-4">
              <span className="text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                Mail Security
              </span>

              <span className="text-xs text-slate-400">2026</span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              DMARC Monitoring & Email Authentication
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Documented SPF, DKIM, DMARC, reverse DNS, aggregate reporting, and
              policy enforcement while hardening a self-hosted mail environment.
            </p>
          </Link>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Closing */}
      <section className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4 my-4 text-lg text-slate-700 dark:text-slate-300">
          I learn best by building things, troubleshooting what breaks, and
          understanding why the fix worked.
        </div>

        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          My background in retail operations has given me years of experience
          helping people, solving problems, and keeping day-to-day operations
          moving. I’m now combining that experience with hands-on technical work
          as I transition into IT support.
        </p>

        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          This portfolio is where I document that process — including the
          systems I build, the problems I run into, what I tried, and what I
          learned along the way.
        </p>
      </section>
    </div>
  );
}
