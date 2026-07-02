---
title: "Building and Deploying a Decoupled Next.js Technical Portfolio via Nginx and SSH"
date: "June 26, 2026"
category: "System Administration"
summary: "An end-to-end breakdown of engineering a Markdown-driven portfolio, optimizing state-managed client routing, isolating content via JSON, and resolving enterprise web-server directory traversal constraints."
---

# Building and Deploying a Decoupled Next.js Technical Portfolio via Nginx and SSH

**Author:** Scott Patrick Diemer  
**Project Destination:** scottdiemer.com  

### System Architecture Overview
...
The objective of this project was to engineer a high-performance, secure portfolio platform capable of showcasing hands-on engineering documentation and enterprise lab logs. The system is split into three decoupled operational layers:

1. **The Data Layer:** Isolated Markdown files (`.md`) and a centralized JSON index feed to completely separate content from application logic.
2. **The Frontend Layer:** Next.js and React components utilizing interactive client-side hooks (`'use client'`) for live category filtering.
3. **The Web Server Hosting Layer:** A remote Linux instance running Nginx to securely process compiled static files, assets, and route parameters.

---

## Phase 1: Frontend Architecture & Data Isolation

### 1. Managing Component Bloat via Multi-Page Separation

Initially, a single-page portfolio layout risked massive page lengths and heavy browser loading times as the volume of technical documentation scaled. To resolve this, the architecture was refactored to separate the landing dashboard from a dedicated, multi-page archive layout located at the `/journal/` sub-route.

To maintain clean performance and visual spacing on the homepage landing view, the main dashboard was optimized to fetch only the three most recent journal entries out of the complete history array using standard array slicing:

```typescript
// Slicing the metadata array down to a preview dashboard size inside src/app/page.tsx
const recentPosts = journalData.slice(0, 3);

```

### 2. Decoupling Content via Local JSON Databases

To prevent modifications to production React source code whenever a new log entry is written, all post metadata properties were isolated into a standalone index database file located at `_journal/journal.json`. This completely separates the application layer from the content layer, allowing the index file to act as the single source of truth for post discovery:

```json
[
  {
    "slug": "2026-06-25-dhcp-dns-troubleshooting",
    "title": "Troubleshooting Core Services: Diagnosing a Rogue DHCP Server",
    "date": "June 25, 2026",
    "category": "Networking",
    "summary": "Isolating an IP addressing conflict on a local subnet using Wireshark packets and resolving standard lease allocation issues."
  },
  {
    "slug": "2026-06-22-linux-permissions-scripting",
    "title": "Securing Log Directories via Linux CLI Permissions",
    "date": "June 22, 2026",
    "category": "System Administration",
    "summary": "Auditing file systems, defining explicit user/group owners, and restricting sensitive execution paths using the bash shell."
  },
  {
    "slug": "2026-06-19-malware-incident-isolation",
    "title": "Help Desk Incident Response: Isolating a Phishing Payload",
    "date": "June 19, 2026",
    "category": "Security",
    "summary": "Responding to a Tier-1 alert, analyzing suspicious background processes via Sysinternals, and applying local host isolation hooks."
  },
  {
    "slug": "2026-06-26-nextjs-nginx-deployment",
    "title": "Building and Deploying a Decoupled Next.js Technical Portfolio via Nginx and SSH",
    "date": "June 26, 2026",
    "category": "System Administration",
    "summary": "An end-to-end breakdown of engineering a Markdown-driven portfolio, optimizing state-managed client routing, isolating content via JSON, and resolving enterprise web-server directory traversal constraints."
  }
]

```

### 3. State-Managed Client Routing

Because static HTML exports block backend Node.js server engines from performing dynamic computations on runtime requests, interactive UI elements must run inside the browser. The journal archive interface was shifted to client-side runtime management (`'use client'`), leveraging React state memory hooks (`useState`) to compute and filter categories instantly on the user's viewport:

```tsx
'use client';

import { useState } from 'react';
import journalData from '../../../_journal/journal.json';

export default function JournalArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamically extract unique categories directly from the isolated JSON database
  const categories = ['All', ...Array.from(new Set(journalData.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? journalData 
    : journalData.filter(post => post.category === selectedCategory);

  return (
    // Component layout logic rendering filteredPosts maps...
  );
}

```

### 4. Global Layout Link Standardization

When shifting from a single-page application to a multi-page routing framework, standard relative anchor links (like `href="#skills"` or `href="#about"`) fail when executed from sub-routes like `/journal/` because those specific element IDs do not exist on the secondary page viewport.

To fix this across the site-wide navigation bar component, relative paths were updated to fully qualified root anchors (`href="/#skills"` and `href="/#about"`). This structural optimization instructs the browser to cleanly return to the homepage root address first before executing the hardware scroll transition to the targeted section.

---

## Phase 2: Production Compilation & Deployment Operations

### 1. Overcoming the Nginx Sub-Route Wall (403 Forbidden)

During primary distribution testing, navigating directly to `/journal` triggered an **Nginx 403 Forbidden** error. This occurred because Nginx attempts to map incoming clean URLs directly to standard folder paths on disk. When Next.js outputs a default export, it generates a flat file named `journal.html`. Nginx struggles to resolve this clean path directly without explicit configurations, resulting in a directory traversal permissions error.

The permanent engineering resolution required forcing Next.js to export structural directory clusters for every single path by activating trailing slash parameters.

Updated local **`next.config.mjs`**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Forces production build paths to export cleanly as /directory/index.html
  images: { 
    unoptimized: true 
  },
};

export default nextConfig;

```

### 2. Compilation & Secure Copy Transport Protocol (SCP)

With structural trailing slash rules activated, the static production assets were cleared of cache, compiled locally, zipped into an administrative compressed tarball, and pushed directly to the remote server over SSH network pipelines.

```bash
# 1. Clear structural cache and compile production assets locally
rm -rf .next out
npm run build

# 2. Package assets into a tarball while omitting local node_modules folders
tar -czvf portfolio-upload.tar.gz -C out .

# 3. Securely transmit the archive bundle to the remote server home directory folder
scp ./portfolio-upload.tar.gz username@scottdiemer.com:~/

```

### 3. Target File Extraction and Administrative Permissions Overrides

Logged into the destination Linux server instance via an active SSH shell session to move the staging archive into place and unpack it into the web document root:

```bash
# Connect to the destination instance via SSH
ssh username@scottdiemer.com

# Unpack compressed assets straight into the active web server document root directory
sudo tar -xzvf ~/portfolio-upload.tar.gz -C /var/www/html/

```

To resolve potential access blocks caused by file migrations, systemic access masks were applied across the web directory. Nginx requires read access (`644`) on flat assets and execution privileges (`755`) on path networks to traverse directory nodes:

```bash
# Set directories to 755 (traversal) and files to 644 (read-only)
sudo find /var/www/html -type d -exec chmod 755 {} +
sudo find /var/www/html -type f -exec chmod 644 {} +

# Synchronize file group ownership with the native web service daemon profile
sudo chown -R www-data:www-data /var/www/html

```

---

## Phase 3: Nginx Gateway Configuration & Process Lifecycles

### 1. Configuring Nginx Virtual Server Blocks

Modified the main Nginx server block parameters to handle the automated trailing slash compilation matrix, setting up fallback hooks to resolve clean URL parsing without breaking backend index files:

```bash
sudo nano /etc/nginx/sites-available/default

```

Configured the explicit site block to handle the decoupled static infrastructure layout seamlessly:

```nginx
server {
    listen 80;
    server_name scottdiemer.com www.scottdiemer.com;
    root /var/www/html;

    location / {
        # Inspect for explicit files, then directory nodes, falling back to a 404 handler
        try_files $uri $uri/ =404;
        index index.html;
    }
}

```

Validated configuration syntax formatting parameters before committing modifications to live internet production traffic pipelines:

```bash
# Test the configuration syntax for typos or errors
sudo nginx -t

# Re-initialize traffic listeners to apply updates live
sudo systemctl restart nginx

```

### 2. Process Lifecycle Controls via PM2 Daemon Managers

For flat static deployment variations (`output: 'export'`), compilation files are read directly out of storage by Nginx without an active Node.js server loop running background processes. However, to guarantee resilience when scaling future deployment pipelines into active Server-Side Rendering (SSR) or full application instances, background runtime processes are tracked using **PM2 Process Managers**:

```bash
# Initialize application execution loops via persistent process managers
pm2 start npm --name "portfolio-ssr-runtime" -- start

# Save active operational tables to guarantee service persistence during host reboots
pm2 save
pm2 startup

```

---

## Final Post-Mortem Verification

The architecture transition is fully stable and responsive. Forcing consistent folder hierarchies via `trailingSlash: true` bridges the execution gap between custom client-side JavaScript routing hooks and native Linux web server path engines. This setup avoids heavy backend server dependencies, yielding a lightning-fast, highly resilient, and completely secure documentation hub for technical environments.

---
