import React from 'react';

interface TechCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function TechCard({ title, description, tags }: TechCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="text-xs font-mono bg-blue-950/40 text-blue-400 px-2.5 py-1 rounded-md border border-blue-900/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
