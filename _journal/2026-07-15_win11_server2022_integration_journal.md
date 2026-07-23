---
title: "Systems Administration Journal: Windows Server 2022 & Windows 11 Enterprise Lab Integration"
date: "July 15, 2026"
category: "Systems Administatrion"
summary: "A hands-on guide resolving modern user-space software installation loopholes (Firefox AppData) by joining a Windows 11 Enterprise VM to a Windows Server 2022 domain controller, organizing the Active Directory OU structure, and enforcing kernel-level block policies using AppLocker."
---

**Environment**: QEMU/KVM Hypervisor, Windows Server 2022 Datacenter (Domain Controller), Windows 11 Enterprise (Client Workstation).

**Domain Infrastructure**: `home.lab` (NetBIOS: `HOME`)

## 1. Provisioning the Workstation & OS Bypass
The initial phase required spinning up a brand-new Windows 11 Enterprise virtual machine within the QEMU/KVM hypervisor. During the out-of-box experience (OOBE), Microsoft aggressively mandates a cloud-based Microsoft Account sign-in. To circumvent this requirement and establish a clean local account for enterprise evaluation, the network requirement was bypassed using the command line (`OOBE\BYPASSNRO`), triggering a system reboot and allowing the creation of a baseline local administrative profile.

## 2. Network Handshake & DNS Configuration
To bridge the client to the existing Windows Server 2022 Domain Controller, proper network routing had to be established.

* Ran `ipconfig` on the Server VM to determine its static internal IP address.

* Navigated to the Windows 11 client Network & Internet Settings and manually pointed its primary DNS server directly to the Windows Server's IP address.

* _Why this mattered_: Active Directory relies entirely on DNS to locate domain resources. Without this manual override, the client would query public DNS servers and fail to locate the internal domain.

## 3. Domain Join & Active Directory Integration
With DNS properly aligned, the workstation was joined to the corporate identity framework.

* Opened System Properties on the Windows 11 VM, navigated to the Computer Name tab, and changed the membership from Workgroup to Domain using `home.lab`.

* Authenticated the join request using the domain’s root administrator credentials (`HOME\Administrator`).

* Received the official "Welcome to the home.lab domain" dialog box and triggered a system reboot to initialize the machine's domain security identifier (SID).

## 4. Active Directory Organization & OU Structure Cleanup
Once the client machine registered on the domain, management moved to the server side via **Active Directory Users and Computers (ADUC)**.

* Located the Windows 11 computer object in the default `Computers` container.

* Encountered an architectural duplicate when attempting to delete accidentally misplaced Organizational Units (OUs) outside of the main root structure, triggering an AD restriction error ("_insufficient privileges or object is protected from accidental deletion_").

* Enabled Advanced Features under the ADUC View menu, navigated to the Object Properties of the stray OUs, unchecked Protect object from accidental deletion, and successfully removed them.

* Finalized a clean, nested structure under the Corporate-HQ site OU by creating two sub-OUs: `HQ_Computers` and `HQ_Users`.

Moved the Windows 11 computer object into `Corporate-HQ > HQ_Computers`.

## 5. Identity Lifecycle Management (Standard User Creation)
To enforce the principle of least privilege, a dedicated standard user account was provisioned for daily workstation tasks.

* Created a new user profile (e.g., John Smith / `jsmith`) directly inside the departmental OUs under `Corporate-HQ`.

* Configured the profile security flags to force "**User must change password at next logon.**"

* Successfully logged into the Windows 11 client using the new standard network credentials, verifying that local administrative permissions were blocked by User Account Control (UAC).

## 6. The "Shadow IT" Security Loophole (Firefox Installation)
During permission verification, a specific vulnerability regarding user-space execution was identified. When attempting to install Firefox, the installer requested administrative rights. When denied, the application automatically shifted to a per-user installation layout, installing directly into the user's local `AppData` directory (`C:\Users\username\AppData\Local\Mozilla Firefox\`).

* **The Problem**: Because standard users retain full read/write privileges over their own user profiles, the app successfully installed and launched, bypassing standard Windows local group controls.

## 7. Remediation via Group Policy & AppLocker Enforcement
To mitigate this user-space execution vulnerability, an enterprise-grade restriction policy was developed.

* Opened the Group Policy Management Console (GPMC) on Windows Server 2022 and created a new GPO named `Block_Unapproved_Software_GPO`.

* Attempted a Software Restriction Policy (SRP) under User Configuration, which initially failed to apply. This provided a critical lesson in GPO Scope and Inheritance: settings built under Computer Configuration or User Configuration must align with the corresponding objects in the target OU. Because the Windows 11 computer object lived in `HQ_Computers`, a user-targeted policy was not binding effectively to the machine.

* **The Final Solution**: Switched to the modern AppLocker framework under `Computer Configuration > Policies > Windows Settings > Security Settings > Application Control Policies > AppLocker`.

* Created an Executable Deny Rule utilizing a path wildcard (`*firefox.exe`) targeting the entire environment.

* Generated the mandatory **Default Rules** to ensure core Windows system binaries remained unblocked.

* Flipped the master AppLocker switch in the GPO properties to **Enforce Rules**.

* Linked `Block_Unapproved_Software_GPO directly` to the `HQ_Computers` OU.

* Started the Application Identity service on the Windows 11 client and executed a manual policy refresh (`gpupdate /force`).

**Result**: The restriction loop successfully closed. Attempting to execute Firefox on the client workstation now results in a hard kernel-level block: "This app has been blocked by your system administrator."

### Next Milestones:
* Establish a Centralized File Server and configure automated Network Share Drive Mapping via GPO.

* Explore MSI package deployment to automatically push approved software down to endpoint OUs.
