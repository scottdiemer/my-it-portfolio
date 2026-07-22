---
title: "Deploying and Hardening a Self-Hosted Mailcow Mail Server"
date: "July 21, 2026"
category: "Systems Administration"
summary: "Documented the deployment of a containerized Mailcow mail server (Postfix, Dovecot, Rspamd) on an Ubuntu VPS, including osTicket integration, Postfix IPv4 routing adjustments, and full DNS authentication hardening (SPF, DKIM, DMARC, and PTR) to achieve a 10/10 mail deliverability score."
---

# Technical Lab Journal
Date: July 21, 2026

Project: Mailcow Docker Stack Deployment & Mail Deliverability Hardening

Target Domain: scottdiemer.com | IP: 107.173.164.131

## 1. Core Infrastructure & Deployment
Deployed containerized Mailcow mail server stack (Postfix, Dovecot, Rspamd) via Docker Compose on an Ubuntu VPS host.

* Configured primary service endpoints for inbound and outbound mail handling.

* Connected the mail infrastructure to an internal osTicket deployment by mapping database backends to resolve API authentication failures and enable automated helpdesk operations.

![Mailcow Admin Dashboard UI](/images/posts/2026-07-21/mailcow-admin-dashboard.png)

## 2. DNS Security & Domain Authentication Hardening
Established end-to-end cryptographic and identity verification protocols across DNS:

* **PTR (Reverse DNS)**: Configured IPv4 PTR record mapping `107.173.164.131` directly to `mail.scottdiemer.com` to pass reverse lookup verification.

* **DKIM**: Generated and published public DKIM keys via DNS TXT records to digitally sign outgoing messages and prevent header tampering.

* **DMARC**: Authored policy TXT records to specify enforcement actions and establish domain alignment rules.

* **SPF Syntax Correction**: Resolved an initial syntax failure caused by literal square brackets around the IP address (`ip4:[107.173.164.131]`). Corrected the record to standard SPF format (`v=spf1 ip4:107.173.164.131 ~all`), establishing full identity authorization for outbound mail.

![DNS TXT Records with DKIM and SPF](/images/posts/2026-07-21/dns-authentication-records.png)

## 3. Network Routing & Deliverability Optimization
* Configured Postfix explicitly to prefer IPv4 outbound routing (`smtp_address_preference = ipv4` and `inet_protocols = ipv4`) to avoid container networking conflicts with unrouted IPv6 subnets.

* Performed deliverability and spam heuristic checks through Mail-Tester, successfully validating complete protocol alignment and achieving a 10/10 score.

![Mail-Tester 10 out of 10 Score Result](/images/posts/2026-07-21/mail-tester-10-out-of-10.png)

## 4. Client Configuration & Account Setup
* Provisioned standard service mailboxes (support@scottdiemer.com and scott@scottdiemer.com).

* Successfully integrated mail accounts across desktop (Thunderbird) and mobile (Gmail App via IMAP/SMTP) clients using TLS encryption.