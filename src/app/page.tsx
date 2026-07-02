import TechCard from '@/components/TechCard';
import journalData from '../../_journal/journal.json'; // Import the centralized data feed

export default function HomePage() {
  // Pull the top 3 items cleanly straight from the isolated data layer
  const recentPosts = journalData.slice(0, 3);
  
  // ... Keep all of your existing skillSets array and layout UI blocks identical down below ...
  const skillSets = [
    {
  title: "Core Infrastructure & OS",
  description: "Years of native experience utilizing Linux as a primary desktop environment alongside professional endpoint management frameworks.",
  tags: ["Linux (Daily Driver)", "Bash Scripting", "Windows 10/11", "Virtualization", "SysInternals"]
},
    {
      title: "Networking & Troubleshooting",
      description: "Understanding network architecture, routing protocols, and tools required to resolve connectivity faults.",
      tags: ["TCP/IP", "DNS/DHCP", "IPv4/IPv6 Subnetting", "Wireshark", "Ping/Traceroute"]
    },
    {
      title: "Operations & Client Success",
      description: "Leveraging 30+ years of operational service to offer premium technical communication and ticket management.",
      tags: ["SLA Compliance", "Incident Management", "Technical Documentation", "De-escalation"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-24">
     {/* Hero Section */}
	<section id="about" className="py-8 max-w-3xl">
  		<span className="text-xs font-mono tracking-widest uppercase text-blue-500 bg-blue-950/50 px-3 py-1 rounded-full border border-blue-900/50">
    Career Pivot // IT Support
  		</span>
  		<h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
    Combining Decades of Human Connection with <span className="text-blue-400">Technical Execution.</span>
  		</h1>
  			<p className="mt-6 text-lg text-slate-400 leading-relaxed">
    After a robust 35-year foundation driving client satisfaction and cross-functional operations, I am formalizing my technical capabilities via the <strong>Grow With Google IT Support Specialist Certificate</strong>. Backed by years of hands-on experience utilizing Linux as my sole daily desktop operating system, I engineer secure, documentation-first technical solutions for enterprise environments.
  			</p>
	</section>

      {/* Skills Section */}
      <section id="skills" className="space-y-6 scroll-mt-20">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Technical & Professional Competency</h2>
          <p className="text-sm text-slate-400 mt-1">Core competencies built via enterprise experience and specialized IT coursework.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {skillSets.map((skill, index) => (
            <TechCard key={index} title={skill.title} description={skill.description} tags={skill.tags} />
          ))}
        </div>
      </section>

      {/* Learning Journal Preview Section */}
      <section id="journal" className="space-y-6 scroll-mt-20">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Documentation Logs</h2>
            <p className="text-sm text-slate-400 mt-1">Real-time snapshots of my ongoing technical configurations and training modules.</p>
          </div>
          <a 
            href="/journal" 
            className="text-xs font-mono text-blue-400 hover:text-blue-300 border border-blue-900/60 bg-blue-950/20 px-3 py-2 rounded-lg hover:border-blue-500/50 transition-all hidden sm:block"
          >
            View All Archives &rarr;
          </a>
        </div>

        {recentPosts.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-8 text-center text-slate-500 font-mono text-sm">
            No logs added yet. Add a .md file to the _journal folder to populate this automatically.
          </div>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <a 
                key={post.slug} 
                href={`/journal/${post.slug}`}
                className="block bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 rounded-xl p-6 transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-mono text-blue-500 uppercase">{post.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-600 whitespace-nowrap mt-1">{post.date}</span>
                </div>
              </a>
            ))}
            
            <div className="sm:hidden pt-2">
              <a 
                href="/journal" 
                className="block text-center text-xs font-mono text-blue-400 border border-blue-900/60 bg-blue-950/20 py-3 rounded-lg"
              >
                View All Archives &rarr;
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
