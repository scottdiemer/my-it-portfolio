---
title: "IT Lab Journal: Automated SSH Deployment & Windows AD Configuration"
date: "July 14, 2026"
category: "Systems Administration"
summary: "Successfully resolved deployment pathing issues to launch the Next.js portfolio server via SSH and added core AD roles/users to Windows Server, while troubleshooting ongoing installation blockers with the Windows Desktop Client."
---

# IT Lab Journal

**Date:** July 14, 2026

**Author:** Scott Diemer

**Status:** Mixed Progress (Wins on the server side, still battling the client side)

---

## 1. Automated SSH Deployment Script

* **Task:** Finalize and run the automated deployment script for the Next.js portfolio server via SSH.
* **The Issues:** Ran into a few initial hiccups with permission errors (`Permission denied (publickey)`) and path resolution issues when the script attempted to trigger the build process on the remote server.
* **The Resolution:** Verified the SSH agent was correctly forwarding the keys, updated the script to use absolute paths for the project directory, and ensured the environment variables were sourcing correctly upon login. Executed the script again, and everything cleared up seamlessly: **"Deployment completed successfully!"** The portfolio server is live and stable.

---

## 2. Windows Server Infrastructure

* **Task:** Expand the local lab environment by configuring services and access control.
* **Activity:** Spent time working on the **Windows Server** setup. Successfully added core server roles (including **Active Directory Domain Services**) and built out the directory structure by provisioning new user accounts and assigning appropriate group permissions. The directory hierarchy is looking clean, and authentication is testing out fine internally.

---

## 3. Windows Desktop Client Deployment

* **Task:** Install and configure the desktop client to connect into the environment.
* **The Issues:** Hit a brick wall here. The installation keeps throwing errors and failing to complete or initialize properly.
* **Current Status:** **Unresolved.** I spent a solid block of time troubleshooting dependencies and checking logs, but I haven't figured this one out yet. Leaving it as a known issue to tackle fresh when I log back into the lab.

---

### Summary for the Day

* **Successes:** Portfolio deployment is fully automated and live; Windows Server AD environment is expanded and structured.
* **Blockers:** Windows Desktop Client installation is still completely stuck.