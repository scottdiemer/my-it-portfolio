---
title: "Automating Deployments, Restoring GitHub SSH Access, and System Administration Training"
date: "July 2, 2026"
category: "System Administration"
summary: "Troubleshooting a custom deployment bash script, resolving sudden git authentication failures caused by inactive SSH key pruning, and advancing through core IT infrastructure and software modules."
---

# Tech Journal: July 2, 2026

**Author:** Scott Diemer  
**Project Destination:** scottdiemer.com  

## Today's Highlights
- Web Deployment Automation: Troubleshot and resolved a bash script error impacting live site deployment.

- Security & Access Control: Investigated a sudden SSH authentication failure and provisioned new deployment keys.

- Professional Development: Completed the Operating Systems and You: Becoming a Power User (Software Module) and advanced into the System Administration and IT Infrastructure Services coursework.

## Technical Problem Solving
### 1. Automated Website Deployment via Bash
- **The Problem**: The automated deployment bash script failed mid-execution, preventing the latest site build from pushing to production correctly. The script was hitting a permissions/pathing block during the build-and-sync phase.

- **The Solution**: Isolated the breakdown point by running the script with verbose logging enabled. Corrected the directory execution path context and updated the target directory permissions within the script to ensure a smooth, end-to-end deployment loop.

### 2. GitHub SSH Key Expiration & Access Restoration
- **The Problem**: Attempting to pull updates on the production server resulted in a sudden ```Permission denied (publickey)``` error.

- **The Discovery**: Discovered that GitHub automatically deletes SSH deployment keys if they remain inactive for an extended period. Because the keys hadn't been utilized recently, they were scrubbed from the repository profile.

- **The Solution**: Generated fresh, secure SSH key pairs on both my local development machine and the remote production server. Linked the new public keys back to GitHub, verified the secure connections, and successfully restored seamless git access.

## Training & Certifications
### Grow with Google IT Support Professional Certificate
- **Completed**: _Fundamentals – Software Module_  
Wrapped up the core software foundations, focusing on package management, installation pipelines, and managing system software states.

- **In Progress**: _Troubleshooting & System Administration Module_  
Dived straight into active troubleshooting methodologies, learning how to isolate root causes systematically and identify underlying infrastructure dependencies.

**Takeaway for the Day**: Automation scripts are only as stable as the access controls underlying them. Keeping an eye on automated security lifetimes (like SSH key inactivity policies) is just as critical as writing clean deployment logic.