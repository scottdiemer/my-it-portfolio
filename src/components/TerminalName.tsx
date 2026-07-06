'use client';

import { useState, useEffect } from 'react';

export default function TerminalName() {
  const [name, setName] = useState('');
  const fullName = 'scott_diemer';
  
  useEffect(() => {
    if (name.length < fullName.length) {
      const timer = setTimeout(() => {
        setName(fullName.slice(0, name.length + 1));
      }, 150); // Speed of typing in milliseconds
      return () => clearTimeout(timer);
    }
  }, [name]);

  return (
    <div className="flex items-center space-x-2 font-mono h-[60px]">
      <span className="text-slate-400 dark:text-slate-500 font-bold text-3xl sm:text-4xl select-none">$</span>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        {name}
        <span className="text-blue-600 dark:text-blue-400 animate-pulse font-bold">_</span>
      </h1>
    </div>
  );
}
