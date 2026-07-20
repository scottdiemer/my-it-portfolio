---
title: "osTicket Deployment & Infrastructure Hardening"
date: "July 20, 2026"
category: "Systems Administration"
summary: "Deployed a production-ready osTicket instance on a dedicated subdomain (tickets.scottdiemer.com) hosted alongside a portfolio server. Documented full Nginx, MariaDB, and PHP-FPM stack setup, Let's Encrypt SSL provisioning, file permission hardening, setup directory cleanup, and database-level authentication fixes in preparation for Active Directory LDAP integration."
---

# LAB JOURNAL ENTRY: osTicket Deployment & Hardening

**Target Subdomain**: tickets.scottdiemer.com

**Base Domain**: scottdiemer.com


## 1. OBJECTIVE

Deploy a production-ready, open-source help desk system (osTicket) alongside my existing portfolio infrastructure to simulate a real-world enterprise ticketing environment.


## 2. SYSTEM ARCHITECTURE & PREREQUISITES

- Operating System: Ubuntu Server
- Web Server: Nginx (configured with custom server block for subdomain)
- Database: MariaDB (osticket_db / osticket_user)
- Runtime: PHP-FPM with required extensions (mysqli, gd, gettext, mbstring, apcu)
- Transport Security: Let's Encrypt SSL/TLS via Certbot


## 3. IMPLEMENTATION STEPS

### Phase A: DNS & SSL Configuration

- Created a public DNS A-record pointing tickets.scottdiemer.com to the server IP.
- Provisioned an SSL certificate via Certbot to enforce HTTPS traffic across the subdomain.

### Phase B: File Setup & Web Installation

- Staged the osTicket web source in /var/www/osticket/upload.
- Prepared configuration permissions:

    ```sudo cp /var/www/osticket/upload/include/ost-sampleconfig.php /var/www/osticket/upload/include/ost-config.php```

    `sudo chmod 0666 /var/www/osticket/upload/include/ost-config.php`

- Ran through the web installer checklist at https://tickets.scottdiemer.com.
- Configured local system addresses using Gmail plus-addressing (tickets+scottdiemer@gmail.com for Admin, noreply+scottdiemer@gmail.com for System) to bypass initial outbound SMTP requirements and prevent mail loop validation errors.

### Phase C: Post-Install Hardening & Troubleshooting
- Locked down configuration permissions and removed setup files:

    `sudo chmod 0644 /var/www/osticket/upload/include/ost-config.php`

    `sudo rm -rf /var/www/osticket/upload/setup`

- Intercepted local authentication issue via direct MariaDB intervention:

    `mysql -u osticket_user -p osticket_db
    SELECT staff_id, username, email FROM ost_staff;
    UPDATE ost_staff SET passwd=MD5('Password123!') WHERE staff_id=1;`

- Verified successful Staff Control Panel login at https://tickets.scottdiemer.com/scp/ using the primary admin account (scottdiemer).


## 4. CURRENT STATUS & NEXT STEPS

<span style="color: #166534; font-weight: bold;">[COMPLETE]</span> Nginx server block and DNS routing active<br/>
<span style="color: #166534; font-weight: bold;">[COMPLETE]</span> HTTPS provisioned and enforced<br/>
<span style="color: #166534; font-weight: bold;">[COMPLETE]</span> Web installer complete and setup directory pruned<br/>
<span style="color: #166534; font-weight: bold;">[COMPLETE]</span> Local admin authentication verified in /scp/<br/>
<span style="color: #d97706; font-weight: bold;">[NEXT UP]</span>  Integrate LDAP / Active Directory plugin for domain user authentication<br/>
<span style="color: #475569; font-weight: bold;">[FUTURE]</span>   Configure outbound SMTP/IMAP email fetching<br/>
