---
title: "Building an Active Directory Domain Controller and Mock Help Desk Environment"
date: "July 8, 2026"
category: "System Administration"
summary: "Configured a Windows Server 2022 virtual machine in KVM to establish an Active Directory Domain Controller baseline, implemented static network routing, resolved host-to-guest clipboard isolation, and provisioned a structured mock help desk directory."
---

### Project Overview
Configured a Windows Server 2022 virtual machine running inside a KVM/QEMU hypervisor on a Manjaro Linux host to serve as a primary Active Directory Domain Controller (DC). This configuration establishes the foundational network infrastructure and user directory for an enterprise-level home laboratory sandbox designed to simulate real-world Tier-1 IT Support scenarios.

### Technical Milestone Summary

1. **Hypervisor Guest Integration:** Resolved a KVM-to-Windows guest clipboard isolation barrier by installing the Red Hat VirtIO driver bundle and SPICE guest tools (`virtio-win-guest-tools.exe`) inside the VM to allow seamless cross-platform management. 


2. **Network Interface Configuration:** Bypassed the modern Windows Settings GUI layout using PowerShell to bind static networking architecture directly to the virtual network adapter interface (`ifIndex 6`).

3. **Enterprise Directory Deployment:** Unpacked Active Directory Domain Services (AD DS) binaries via Server Manager, designated a new standalone forest root domain, and promoted the server to a fully functional Domain Controller.

4. **Mock Help Desk Environment:** Built out a realistic corporate directory structure and mock technician accounts to follow enterprise security and user access management best practices.

---

### Command Log & Configurations

#### 1. Network Interface Discovery
Queried active IPv4 interfaces via PowerShell to isolate the exact index mapping for the primary virtual network adapter:

```powershell

Get-NetIPInterface -AddressFamily IPv4
```

#### 2. Static IP and Local Loopback DNS Binding
Executed network provisioning commands to isolate the machine from dynamic DHCP addressing and bind the DNS routing locally to self-resolve Active Directory security policies:


```powershell
# Assign static IP, subnet mask prefix length, and KVM hypervisor gateway
New-NetIPAddress -InterfaceIndex 6 -IPAddress 192.168.122.10 -PrefixLength 24 -DefaultGateway 192.168.122.1

# Configure primary network interface to look inward for DNS resolution
Set-DnsClientServerAddress -InterfaceIndex 6 -ServerAddresses 127.0.0.1
``` 


#### 3. Active Directory Promotion Specifications
- Deployment Operation: Add a new forest

- Functional Level Baseline: Windows Server 2016 (Retained standard enterprise baseline; core AD DS database schema structural integrity remains unchanged from 2016 through Server 2022/2025).

- DNS Delegation: Disabled public internet delegation prompt; local DNS authority scoped explicitly within the private internal sandbox.

### Directory Infrastructure & User Management
To transition the server from a blank template into a functional help desk sandbox, the directory environment was populated with standard corporate structural units and a dedicated, elevated technician account.

#### 1. Organizational Unit (OU) Architecture
Constructed a logical hierarchy within Active Directory Users and Computers (ADUC) to mimic standard department partitioning. This structure prevents flat-file user chaos and prepares the directory for granular Group Policy Object (GPO) targeting.

* **`Corporate-HQ`** (Root Lab OU)
    * **`Accounting`**
    * **`IT-Support`**
    * **`Sales`**

#### 2. Provisioning & Elevating a Dedicated Tech Account
Following Identity and Access Management (IAM) best practices, a distinct administrative account was created to separate daily work from the default, generic `Administrator` account.

- **Account Created**: Dedicated technician user within the `IT-Support` OU.

- **Privilege Elevation**: Modified account membership attributes to join the `Domain Admins` security group. This provides a clean audit trail for administrative activities performed inside the sandbox environment.

### Verification
A post-promotion network verification via `ipconfig /all` confirms that the server successfully transitioned from a standard workgroup configuration into a permanent authority state (`192.168.122.10`), routing securely through the primary KVM interface.

```
Plaintext

Host Name . . . . . . . . . . . . : DC-01
Primary Dns Suffix  . . . . . . . : home.lab
Node Type . . . . . . . . . . . . : Hybrid
IP Routing Enabled. . . . . . . . : No
WINS Proxy Enabled. . . . . . . . : No
DNS Suffix Search List. . . . . . : home.lab
```
#### Next Steps
Configure external public DNS forwarders (`8.8.8.8 / 1.1.1.1`) inside the Windows DNS Manager console to allow structured external WAN navigation.

Generate a batch of mock employee user objects across the Accounting and Sales OUs to simulate incoming ticketing scenarios (e.g., password resets, account lockouts).

Set up an automated PowerShell script to quickly spin up, lock down, or modify user accounts for rapid testing cycles.
