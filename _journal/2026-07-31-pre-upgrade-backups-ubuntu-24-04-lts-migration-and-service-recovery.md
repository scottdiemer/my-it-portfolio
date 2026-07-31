---
title: "Technical Update: Pre-Upgrade Backups, Ubuntu 24.04 LTS Migration & Service Recovery"
date: "July 31, 2026"
category: ["Systems Administration", "Linux"]
summary: "Upgraded main VPS infrastructure from Ubuntu 22.04 to 24.04 LTS (Noble Numbat). Created manual tarball archives and MySQL dumps for Mailcow, osTicket, and Nginx configurations prior to the migration. Restored full osTicket functionality by installing PHP 8.1-FPM via the Ondřej Surý PPA to resolve PHP 8.3 incompatibilities, re-initialized Docker stacks, and updated UFW and Fail2ban whitelists."
---

**Date:** July 31, 2026

**Category:** Systems Administration / Linux

---

### Overview

Today’s maintenance focus was upgrading the main VPS infrastructure from Ubuntu 22.04 LTS to **Ubuntu 24.04 LTS (Noble Numbat)** on Linux kernel 6.8. The goal was to modernize the base operating system while ensuring zero data loss and restoring full functionality for self-hosted services—specifically **Mailcow** and **osTicket**.

---

### Execution & Key Steps

- **Pre-Upgrade Safeguards & Manual Backups:**
  Before running the OS upgrade, we created local archive dumps to ensure a complete rollback point:
  - Stopped the Mailcow Docker containers and ran a direct `tar -czvf` archive on the entire `/opt/mailcow-dockerized` directory to capture all persistent volume mounts, environment configurations, and Docker Compose files.Upgraded main VPS infrastructure from Ubuntu 22.04 to 24.04 LTS (Noble Numbat). Created manual tarball archives and MySQL dumps for Mailcow, osTicket, and Nginx configurations prior to the migration. Restored full osTicket functionality by installing PHP 8.1-FPM via the Ondřej Surý PPA to resolve PHP 8.3 incompatibilities, re-initialized Docker stacks, and updated UFW and Fail2ban whitelists.
  - Executed a `mysqldump` for the osTicket database to preserve all ticket schemas and user data.
  - Created tarball archives of `/var/www/` and the Nginx site-available configuration files (`/etc/nginx/`).

- **Base System Upgrade:**
  Executed the distribution upgrade to Ubuntu 24.04.4 LTS.
- **Mailcow Restoration:**
  Re-initialized the container stack using Docker Compose. Verified persistent volumes mounted cleanly with zero mailbox data loss.
- **osTicket Dependency Fix:**
  Ubuntu 24.04 ships with PHP 8.3 by default, which breaks compatibility with osTicket (which requires PHP 8.1/8.2).
  - Installed `software-properties-common` to manage software repositories.
  - Added the Ondřej Surý PHP PPA (`ppa:ondrej/php`) to pull PHP 8.1 packages alongside base OS packages.
  - Configured `php8.1-fpm` and linked it back into Nginx FastCGI pass handlers. Verified web dashboard accessibility.

- **Security & Whitelisting:**
  Updated host security rules by explicitly adding trusted admin IP addresses to `ignoreip` configurations in Fail2ban (`/etc/fail2ban/jail.local`) and updating standard UFW rules to prevent accidental lockout during remote maintenance.

---

### Results & Next Steps

All core applications—including containerized mail delivery and native ticketing web interfaces—are fully operational on the updated LTS kernel.

With manual tarball dumps and database exports successfully protecting today's upgrade, the next phase will focus on building an automated backup script so we don't have to run manual tar commands before future maintenance.
