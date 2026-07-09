import type { Metadata } from "next";
import Script from "next/script"; // <-- 1. Import the Script component

export const metadata: Metadata = {
  title: "Scott Diemer | IT Support Specialist",
  description: "Technical portfolio and IT journey journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 2. Paste your Umami Cloud Script here */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="7420e08c-9fdc-47dd-9452-d683df642cb4"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
}
