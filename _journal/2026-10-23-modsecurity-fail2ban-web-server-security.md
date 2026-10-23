---
title: "ModSecurity and Fail2Ban Web Server Security"
date: "October 23, 2026"
category: "IT / Server Administration"
summary: "Installed and configured ModSecurity with the OWASP Core Rule Set on the Farm City Nginx web server, tuned a GraphQL false positive and integrated Fail2Ban to temporarily ban repeat offenders."
---

## Server Environment

- Ubuntu Server
- Nginx
- Frontend: `farmcityfeed.com`
- Backend: `admin.farmcityfeed.com`
- Fail2Ban already installed and running
- No IPv6 configured on the server

## Package Updates

Before making any changes, I updated the server packages:

```bash
sudo apt update
sudo apt upgrade
```

No reboot was required afterward.

I verified that Nginx was still running normally before continuing.

## Installing ModSecurity and OWASP CRS

Installed the Nginx ModSecurity module and the OWASP Core Rule Set:

```bash
sudo apt install libnginx-mod-http-modsecurity modsecurity-crs
```

The ModSecurity Nginx module was automatically enabled under:

```text
/etc/nginx/modules-enabled/50-mod-http-modsecurity.conf
```

The OWASP CRS rules were installed under:

```text
/usr/share/modsecurity-crs/rules/
```

The main ModSecurity configuration was located at:

```text
/etc/nginx/modsecurity.conf
```

## Loading the OWASP Core Rule Set

The packaged OWASP loader contained `IncludeOptional` directives that the Nginx ModSecurity parser did not accept.

Instead, I configured:

```text
/etc/nginx/modsecurity_includes.conf
```

to load the files directly:

```text
include modsecurity.conf
include /etc/modsecurity/crs/crs-setup.conf
include /etc/modsecurity/crs/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf
include /usr/share/modsecurity-crs/rules/*.conf
```

Nginx successfully loaded **921 ModSecurity rules**.

## Enabling ModSecurity on the Websites

I enabled ModSecurity on both HTTPS server blocks.

The frontend is proxied to:

```text
localhost:3000
```

The backend is proxied to:

```text
localhost:5000
```

The following directives were added inside the HTTPS `server` blocks:

```nginx
modsecurity on;
modsecurity_rules_file /etc/nginx/modsecurity_includes.conf;
```

The HTTP-only redirect blocks were left alone.

## Detection-Only Testing

I initially left ModSecurity in detection-only mode:

```text
SecRuleEngine DetectionOnly
```

This allowed the OWASP rules to inspect traffic without blocking anything.

The audit log was configured at:

```text
/var/log/nginx/modsec_audit.log
```

I tested SQL injection detection with:

```bash
curl -k "https://farmcityfeed.com/?test=%27%20OR%20%271%27%3D%271"
```

ModSecurity correctly detected the request using OWASP CRS rule:

```text
942100 - SQL Injection Attack Detected via libinjection
```

The anomaly score reached 5, which is the normal blocking threshold.

## Real Scanner Traffic Detected

Almost immediately, ModSecurity started detecting real automated probes against the website.

Some of the requested paths included:

```text
/.env
/.env.local
/.env.production
/.env.staging
/.env.old
/.env.bak
/.env.backup
/api/.env
/public/.env
/storage/.env
/.git/config
/.git/HEAD
```

Rule `930130` identified these as restricted file access attempts.

Rule `920440` also detected requests using restricted extensions such as:

```text
.backup
.old
.bak
```

I verified that sensitive files were not publicly accessible.

Requests to the frontend returned `404`, and the backend redirected unauthorized requests to the sign-in page.

## Enabling Blocking

After verifying detection worked, I changed:

```text
SecRuleEngine DetectionOnly
```

to:

```text
SecRuleEngine On
```

After testing and reloading Nginx, malicious requests began returning:

```text
HTTP/1.1 403 Forbidden
```

Both the SQL injection test and `/.env` probe were successfully blocked.

## GraphQL False Positive

After enabling blocking, I found an important false positive.

Normal users browsing the Products page were generating requests to:

```text
POST /api/graphql
```

OWASP CRS rule:

```text
932100 - Remote Command Execution: Unix Command Injection
```

was incorrectly identifying the GraphQL query syntax as shell command injection.

This caused legitimate GraphQL requests to return `403`.

The problem specifically involved:

```text
ARGS:json.query
```

Rather than disabling rule `932100` globally, I created a narrow exclusion for only the GraphQL query argument on `/api/graphql`.

The exclusion file is:

```text
/etc/modsecurity/crs/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf
```

The exclusion added was:

```text
# Farm City GraphQL false positive
# CRS 932100 interprets GraphQL query syntax as Unix command injection.
SecRule REQUEST_URI "@streq /api/graphql" \
    "id:1000001,phase:1,pass,nolog,t:none,ctl:ruleRemoveTargetById=932100;ARGS:json.query"
```

After reloading Nginx, legitimate GraphQL traffic returned:

```text
HTTP 200
```

while malicious tests continued to return:

```text
HTTP 403
```

This confirmed that the exclusion fixed the false positive without disabling the underlying security rule globally.

## Fail2Ban Integration

The original plan was to have Fail2Ban read the ModSecurity audit log.

Because the audit log stores the client IP and the `Access denied` message in different sections, this would have required a multiline Fail2Ban filter.

Instead, I found that Nginx already writes ModSecurity blocks to:

```text
/var/log/nginx/error.log
```

with the client IP on the same line.

Example:

```text
[client 107.173.164.148] ModSecurity: Access denied with code 403
```

This made the Fail2Ban configuration much simpler.

## Fail2Ban Filter

Created:

```text
/etc/fail2ban/filter.d/nginx-modsecurity.conf
```

with:

```ini
[Definition]

failregex = ^.*\[client <HOST>\] ModSecurity: Access denied with code 403 .*$
ignoreregex =
```

Tested the filter with:

```bash
sudo fail2ban-regex /var/log/nginx/error.log /etc/fail2ban/filter.d/nginx-modsecurity.conf
```

The test found:

```text
6 matched
1 missed
```

The missed line was only an unrelated Nginx notice, so the filter was working correctly.

## Fail2Ban Jail

Created:

```text
/etc/fail2ban/jail.d/nginx-modsecurity.local
```

with:

```ini
[nginx-modsecurity]

enabled = true
filter = nginx-modsecurity
logpath = /var/log/nginx/error.log

port = http,https
maxretry = 5
findtime = 10m
bantime = 1h
```

This means an IP that triggers five ModSecurity blocks within ten minutes will be banned for one hour.

The Fail2Ban configuration was tested with:

```bash
sudo fail2ban-client -t
```

and passed successfully.

## IPv6 Setting

Because the server does not use IPv6, I explicitly disabled IPv6 support in Fail2Ban.

Created or edited:

```text
/etc/fail2ban/fail2ban.local
```

with:

```ini
[Definition]
allowipv6 = false
```

This also removed the Fail2Ban warning about the `allowipv6` setting.

## Final Verification

The ModSecurity Fail2Ban jail is active:

```bash
sudo fail2ban-client status nginx-modsecurity
```

Current behavior is now:

```text
Internet Request
      ↓
Nginx
      ↓
ModSecurity
      ↓
OWASP Core Rule Set
      ↓
Malicious Request?
   ↙            ↘
 No             Yes
 ↓               ↓
Application     403 Block
                  ↓
               Fail2Ban
                  ↓
        Repeated Offender?
             ↙        ↘
           No          Yes
           ↓            ↓
        Continue     IP Ban
```

## Result

The Farm City web server now has an additional layered security setup.

ModSecurity and OWASP CRS inspect incoming web requests and block suspicious activity such as SQL injection attempts and probes for sensitive files.

Fail2Ban watches the ModSecurity blocks and escalates repeated offenders into temporary firewall bans.

The setup also revealed a legitimate GraphQL false positive during testing, which was corrected with a narrowly scoped rule exclusion instead of weakening the WAF globally.

Overall, the final setup adds meaningful protection while allowing the website and its GraphQL API to continue functioning normally.
