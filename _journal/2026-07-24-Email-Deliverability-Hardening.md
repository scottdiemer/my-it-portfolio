---
title: "Email Deliverability Hardening: SPF, DKIM, DMARC Quarantine & Google Verification"
date: "July 24, 2026"
category: ["Systems Administration", "Email Infrastructure"]
summary: "Hardening a Dockerized Mailcow mail server on VPS by configuring strict SPF, DKIM alignment, DMARC quarantine enforcement, and Google Postmaster/Site Verification to achieve 100% deliverability and primary inbox placement."
---

## Executive Summary

After successfully deploying a Dockerized Mailcow mail server instance, initial deliverability tests revealed that outbound messages were occasionally being flagged or routed to spam folders—particularly by major providers like Gmail. 

To resolve this and achieve primary inbox placement, I executed a complete deliverability audit, Google domain verification, and security hardening sprint across my DNS records and mail transfer agent (MTA) configuration. This entry documents the authentication mechanisms implemented, alignment checks, Google verification steps, and final validation metrics.

---

## Technical Problem Analysis

While basic SMTP sending was functional, automated filters evaluate inbound mail based on primary security pillars: **Identity, Authentication, Policy Enforcement, and Domain Ownership**. 

The root causes of the deliverability flags were:
1. **Misaligned Return Paths:** The envelope sender (`MAIL FROM`) did not perfectly align with the header address (`From:`).
2. **Permissive DMARC Policy:** Operating under a monitoring-only policy (`p=none`) provided no explicit instructions to receiving gateways on how to handle unauthenticated mail, leading to lower reputation scores.
3. **Lack of Domain Ownership Verification:** Major mailbox providers like Google require verified domain identity via Google Search Console / Postmaster Tools DNS TXT challenge records to track sender reputation accurately.

---

## Implementation & Hardening Steps

### 1. Google Site & Domain Verification
To establish verified identity with Google postmaster services, a site ownership verification TXT record was published to the primary domain DNS zone:
* **Record Type:** TXT
* **Host:** @
* **Value:** google-site-verification=<unique_hash_string>
* **Status:** Verified successfully, enabling domain health tracking and sender reputation reporting directly through Google Postmaster Tools.

### 2. DNS Record Audit & Authentication Realignment
Updated and hardened the DNS records hosted on Namecheap DNS to guarantee full alignment with the Mailcow server host (107.173.164.131):

* **SPF (Sender Policy Framework):** Configured strict authorized senders, specifying the VPS IPv4 address and Mailcow hostname to prevent unauthorized relaying:
  v=spf1 mx ip4:107.173.164.131 ~all
* **DKIM (DomainKeys Identified Mail):** Verified that Mailcow’s 2048-bit RSA cryptographic public key was correctly published as a dkim._domainkey TXT record on Namecheap, enabling receiving servers to verify payload integrity via DKIM signature headers.

### 3. DMARC Hardening (p=quarantine)
To move from passive monitoring to active protection against domain spoofing, I updated the _dmarc TXT policy:

  Record: _dmarc.scottdiemer.com
  Value:  v=DMARC1; p=quarantine; rua=mailto:dmarc@scottdiemer.com; ruf=mailto:dmarc@scottdiemer.com; pct=100;

* **Policy Enforcement (p=quarantine):** Instructs receivers like Google, Yahoo, and Outlook to quarantine non-compliant mail rather than letting spoofed messages pass through.
* **Reporting Endpoint (rua):** Directed aggregate XML feedback reports to a dedicated administrative inbox (dmarc@scottdiemer.com) for continuous monitoring.

### 4. Reverse DNS & BIMI Verification
* Confirmed reverse DNS (PTR record) resolution for 107.173.164.131 matching mail.scottdiemer.com.
* Published a BIMI DNS record (default._bimi) pointing to the domain SVG icon asset for prospective brand verification.

---

## Verification & Key Results

To confirm full system compliance, end-to-end deliverability was tested using external header analysis tools and direct inbox pings:

* **Google Verification Status:** Confirmed active site ownership and domain reputation tracking.
* **MXToolbox Deep Header Analysis:**
  * **DMARC Compliance:** Passed (p=quarantine enforced)
  * **SPF Alignment & Authentication:** Passed
  * **DKIM Alignment & Authentication:** Passed
  * **Relay Delay:** ~1 second
  * **Blacklist Status:** 0 listings found across all major blocklists
* **Gmail Primary Inbox Validation:** Sent a test payload directly to Gmail endpoints; confirmed 100% bypass of spam filters directly into the Primary Inbox without security banners or transport flags.

---

## Key Takeaways

Proper email deliverability is not just about having a working SMTP server; it requires strict adherence to modern authentication standards and sender reputation tools. Enforcing strict SPF, DKIM alignment, an active DMARC policy, and Google domain verification signals trust to receiving MTAs, eliminating spam flags and securing domain reputation.

![MXToolbox Header Analysis Results](/images/posts/2026-07-24/mxtoolbox.png)
*Figure 1: Final MXToolbox analysis verifying 100% SPF/DKIM alignment, DMARC `p=quarantine` enforcement, and zero blacklist flags.*