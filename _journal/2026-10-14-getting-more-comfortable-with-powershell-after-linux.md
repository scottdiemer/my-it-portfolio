---
title: "Getting More Comfortable with PowerShell After Years of Linux"
date: "October 14, 2026"
category:
  - Windows
  - PowerShell
  - IT Support
summary: "Working through Windows administration after years of Linux has meant retraining some familiar command-line habits. This entry looks at what has started to click for me with PowerShell and how the concepts compare with the Linux tools I already know."
---

I have used Linux for a long time, so one of the more interesting parts of learning Windows administration has been getting used to PowerShell.

The command line itself is not unfamiliar to me. I am comfortable working in a terminal, navigating a filesystem, managing services, troubleshooting networking, editing configuration files, and using command-line tools.

What has been different is the way PowerShell approaches many of those same tasks.

The more I work with it, the more the pieces of the puzzle are starting to come together.

## The Biggest Adjustment: Objects Instead of Text

One of the biggest differences between Linux shells and PowerShell is how information moves between commands.

In Linux, I am used to commands returning text.

That text can then be filtered, searched, or manipulated with tools such as:

```bash
grep
awk
sed
cut
```

PowerShell takes a different approach.

Instead of passing plain text between commands, PowerShell usually passes objects.

That means the output contains structured properties that can be selected, filtered, sorted, and manipulated directly.

For example:

```powershell
Get-Service
```

returns service objects rather than just lines of text.

Those objects have properties such as the service name, display name, and current status.

A command like:

```powershell
Get-Service | Where-Object Status -eq "Running"
```

filters the results based on the actual `Status` property.

Conceptually, the idea is similar to piping commands together in Linux, but the data flowing through the pipeline is different.

That distinction is starting to make more sense the more I use it.

## PowerShell Cmdlets Are Starting to Feel More Predictable

PowerShell uses a consistent Verb-Noun naming structure.

Examples include:

```powershell
Get-Service
Get-Process
Get-ChildItem
Set-Location
Test-NetConnection
```

Coming from Linux, some of these initially feel unnecessarily long.

I am used to commands like:

```bash
ls
cd
ps
ping
```

But there is an advantage to the PowerShell naming system.

Once I know the general pattern, I can often make a reasonable guess at what a command might be called.

The built-in discovery tools also help:

```powershell
Get-Command
Get-Help
```

That makes PowerShell feel less like memorizing a random collection of commands and more like learning a consistent language.

## Package Management Was Another Familiar Concept

My recent coursework covered package management in both Windows and Linux.

On Debian-based Linux systems, I am already familiar with tools such as:

```bash
sudo apt update
sudo apt install package-name
sudo apt remove package-name
```

APT handles repositories and dependencies so that software installation does not require manually tracking down every required library.

Windows has historically relied more heavily on downloading installers directly, but PowerShell can also work with package-management tools.

Some of the commands covered in the course included:

```powershell
Find-Package
Install-Package
Get-Package
Uninstall-Package
```

The course also introduced Chocolatey as a third-party Windows package manager.

The syntax is different, but the underlying idea is familiar: use a package manager to locate software, install it, manage dependencies, and remove it when necessary.

That is one of the areas where my Linux background makes the Windows concepts easier to understand.

## Networking Commands Feel Familiar Even When the Names Change

Networking has probably been one of the easier areas to translate between Linux and Windows.

The tools are different, but the troubleshooting process is mostly the same.

For example, I might use:

```powershell
Test-NetConnection
```

on Windows where I might normally reach for tools such as:

```bash
ping
traceroute
dig
```

on Linux.

The names change, but the questions remain familiar:

1. Does the system have an IP address?
2. Can it reach the default gateway?
3. Is DNS resolving correctly?
4. Can it reach the destination host?
5. Is the required port actually open?

That troubleshooting process matters more than memorizing which command belongs to which operating system.

## My Linux Experience Still Helps

One thing I have realized during this transition is that I am not starting over.

I may be learning Windows administration more deeply now, but many of the underlying concepts are the same ones I have already worked with on Linux.

Users and groups still exist.

Permissions still matter.

Services still need to start, stop, fail, and recover.

Networks still depend on IP addresses, DNS, routing, and ports.

Software still has dependencies.

Logs still need to be read.

Problems still need to be broken into smaller pieces and tested logically.

The tools change, but the troubleshooting mindset carries over.

## Continuing to Build the Windows Side

My current focus is finishing the Google IT Support Professional Certificate while continuing to build more hands-on Windows experience.

I have already been working with:

- Windows 11 Enterprise
- Windows Server 2022
- Active Directory
- Group Policy
- AppLocker
- PowerShell
- File permissions
- Networking and connectivity troubleshooting
- Virtual machines using QEMU/KVM

The goal is not to replace the Linux experience I already have.

It is to become comfortable working on both sides.

That is especially important as I move toward an IT support role, where the environment may include Windows desktops, Microsoft services, Linux infrastructure, cloud systems, or some combination of all of them.

## Final Thoughts

PowerShell still does not feel as natural to me as a Linux shell.

That is changing.

The more I use it, the more I stop trying to force Linux habits onto Windows and start understanding PowerShell on its own terms.

That has probably been the biggest lesson so far.

Sometimes learning a new tool is not about forgetting what you already know.

It is about figuring out where the old knowledge still applies, where it does not, and how the new pieces fit into the same larger puzzle.
