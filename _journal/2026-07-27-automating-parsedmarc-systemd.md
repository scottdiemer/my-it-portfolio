---
title: "Tech Journal: Automating DMARC Report Parsing with parsedmarc, GNOME Keyring, and Systemd"
date: "2026-07-27"
category: ["Systems Administration", "Mail Security", "Automation"]
summary: "Configured and automated daily DMARC report parsing on Arch Linux using parsedmarc, GNOME Keyring via secret-tool for secure credential injection, and systemd user services/timers."
---

**Date:** July 27, 2026  
**System:** Arch Linux (`scott-predatorph31751`) / `zsh` + `tmux`  
**Author:** Scott Diemer  
**Focus:** Infrastructure / Mail Security / Automation

---

## 1. Objective

Automate the daily ingestion and parsing of incoming DMARC aggregate and forensic reports from `mail.scottdiemer.com` using `parsedmarc`, ensuring secure credential handling via GNOME Keyring without storing plaintext passwords in configuration files or unit definitions.

---

## 2. Infrastructure & Key Components

- **IMAP Mail Server:** `mail.scottdiemer.com`
- **Account:** `dmarc@scottdiemer.com`
- **Credential Vault:** `gnome-keyring` via `secret-tool`
- **Output Path:** `/home/scott/dmarc_reports/parsed/`
- **Automation:** Systemd User Service (`parsedmarc.service`) & Timer (`parsedmarc.timer`)

---

## 3. Configuration Details

### A. Credentials Setup (`gnome-keyring`)

Stored the IMAP authentication secret securely using `secret-tool`:

```bash
secret-tool store --label="DMARC IMAP Password" service dmarc_imap user dmarc@scottdiemer.com
```

### B. Configuration File (`~/.config/parsedmarc/parsedmarc.ini`)

Configured `parsedmarc` to connect over implicit SSL (port 993) and output CSV tables directly to the designated target directory:

```ini
[general]
save_csv = true
output = /home/scott/dmarc_reports/parsed

[imap]
host = mail.scottdiemer.com
port = 993
ssl = true
user = dmarc@scottdiemer.com
read_only = false

[mailbox]
delete = false
```

### C. Wrapper Script (`~/.local/bin/run-parsedmarc.sh`)

Created an executable wrapper script (`chmod +x`) that exports the D-Bus session address (allowing background systemd jobs to interface with GNOME Keyring) and dynamically injects the retrieved secret at runtime:

```bash
#!/usr/bin/env bash

# Required for secret-tool to access GNOME Keyring under systemd
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"

echo "Fetching password from GNOME Keyring..."
IMAP_PASS=$(secret-tool lookup service dmarc_imap user dmarc@scottdiemer.com)

if [ -z "$IMAP_PASS" ]; then
    echo "Error: Could not retrieve password from GNOME Keyring!" >&2
    exit 1
fi

echo "Password retrieved successfully. Executing parsedmarc..."
PARSEDMARC_IMAP_PASSWORD="$IMAP_PASS" /home/scott/.local/bin/parsedmarc -c /home/scott/.config/parsedmarc/parsedmarc.ini
```

### D. Systemd User Units

**Service File (`~/.config/systemd/user/parsedmarc.service`):**

```ini
[Unit]
Description=Fetch and Parse DMARC Reports
After=network-online.target

[Service]
Type=oneshot
ExecStart=/home/scott/.local/bin/run-parsedmarc.sh
```

**Timer File (`~/.config/systemd/user/parsedmarc.timer`):**

```ini
[Unit]
Description=Run parsedmarc daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

---

## 4. Issues Encountered & Resolved

1. **Hanging Network Socket (`Ctrl+C` Non-responsive):**
   - _Cause:_ Generic placeholder host (`your.mailserver.com`) in `parsedmarc.ini` caused network calls to hang indefinitely waiting for a socket response.
   - _Fix:_ Terminated hung process (`pkill -9 -f parsedmarc`) and updated host to `mail.scottdiemer.com`.

2. **Missing Output Files:**
   - _Cause:_ Using `output_directory = ...` in `parsedmarc.ini` instead of the required key `output = ...`. `parsedmarc` fell back to its default path (`~/dmarc_reports/dmarc_parsed/`).
   - _Fix:_ Updated configuration key to `output = /home/scott/dmarc_reports/parsed`.

3. **Systemd Execution Failure (`status=203/EXEC`):**
   - _Cause:_ Missing D-Bus environment session variable in systemd runner environment, relative binary paths, and execution permissions.
   - _Fix:_ Added `DBUS_SESSION_BUS_ADDRESS` export, specified absolute paths (`/home/scott/.local/bin/parsedmarc`), and reset systemd state (`systemctl --user reset-failed`).

---

## 5. Verification & Final Status

- **Manual Service Test:** `systemctl --user start parsedmarc.service` completed with `status=0/SUCCESS`.
- **Output Verification:** Extracted CSV report files verified in `/home/scott/dmarc_reports/parsed/`.
- **Timer Schedule:** `systemctl --user status parsedmarc.timer` confirmed `active (waiting)` and scheduled to run automatically at midnight (`00:00:00 EDT`).

![systemctl status output for parsedmarc service and timer](/images/posts/2026-07-27/parsedmarc-service.png)

_Figure 1: Successful execution of `parsedmarc.service` and active status of `parsedmarc.timer` in `tmux`._

### Log Breakdown

- **Service Execution (`parsedmarc.service`):** Exited cleanly with `status=0/SUCCESS`. The journal logs confirm successful DBus connectivity, secure password retrieval from GNOME Keyring via `secret-tool`, and proper execution of `parsedmarc`.
- **Timer Schedule (`parsedmarc.timer`):** Showing as `active (waiting)` and enabled. The timer is set to trigger automatically at midnight (`00:00:00 EDT`) to execute the service on a daily basis.k
