---
title: "Notes: The Network Layer"
date: "July 29, 2026"
category: ["Networking", "Notes"]
summary: "Notes on section 'The Network Layer' on 'The Bits and Bytes of Computer Networking' course at Coursera/Grow with Google."
---

1. Class E IP addresses are reserved for experimental purposes, research, and future development. They are not assigned for general public use or normal internet routing.

   Key Details:

   - **Address Range**: Covers from 240.0.0.0 to 255.255.255.255
   - **Standard Status**: Not routable on the public internet and ignored by many default network configurations

2. The protocol that communicates data between the edges of autonomous systems is BGP also known as the Border Gateway Protocol

3. Quality of Service (QoS) details are found in the service type field (also known as the Type of Service or ToS field) of the IPv4 header. This 8-bit field allows routers to read packet priority and manage network traffic.

   Header Field Details:
   - **Name**: Service type field/Type of Service (TOS)
   - **Size**: 8 bites (1 byte)
   - **Sub-components**: Includes IP Precedence and Differentiated Services (DSCP) values

4. The Address Resolution Protocol (ARP) links an IPv4 address to a physical MAC address on a local network. It uses an ARP request, an ARP reply, and an ARP cache to route local data.

   How ARP Works: * **ARP Request**: A sender broadcasts a message to the entire local network asking which device owns a specific IP address. * **ARP Reply**: The matching device sends a direct unicast message back with it's physical MAC address. * **ARP Cache**: The sender stores this IP-to-MAC mapping in a temporary local table to speed up future messages.

5. CIDR (Classless Inter-Domain Routing) uses flexible subnet masks to define exactly which part of an IP address identifies the network and which identifies the specific device. It replaces rigid class-based systems with a slash notation (e.g., 192.168.1.0/24) to specify block size, preventing wasted IP addresses.

   The notation consists of two parts:
   - **The IP Prefix**: The starting address of the block.
   - **The Suffix**: The number after the slash represents how many binary bites are fixed for the network.

   A smaller suffix creates a larger block of IP addresses, while a larger suffix creates a smaller block:
   - **/24**: Represents 256 IP addresses (used for standard local networks).
   - **/16**: Represents 65,536 IP addresses.
   - **/32**: Represents exactly 1 IP address (typeically used for a specific host).

6. When a router performs basic routing, it processes data packets through three main steps: receiving the data packet, examining the destination IP address, and looking up the destination network in its routing table before finally forwarding the packet.

   The Routing Process:
   - **Receive Packet**: The router gets a data packet on one of it's active network ports.
   - **Examine IP**: The router looks at the destination IP address written on the packet.
   - **Consult Table**: The router checks it's routing table to find the best path to the target network.
   - **Forward Data**: The router sends the packet out through the correct exit interface toward it's destination.

7. A link-state routing protocol is a type of dynamic routing used in packet-switching networks where every router builds a complete map of the network topology. Key protocols in this category include Open Shortest Path First (OSPF) and Intermediate System to Intermediate System (IS-IS).

   Core Principles:
   - **Topology Map**: Every router shares data about it's directly connected links and costs to form an identical graph of the entire network across all nodes.
   - **Reliable Flooding**: Nodes broadcast link-state packets (LSPs) or link-state advertisements (LSAs) to ensure every router receives updates.
   - **Shortest Path Calculations**: Each router independently runs Dijkstra's algorithm on it's local topology databse to compute the optimal path to every distination.

   Key Advantages:
   - **Fast Convergence**: Changes in the network trigger immediate, localized updates that allow routers to recalculate paths quickly.
   - **Loop-Free Operation**: Because every router builds a consistent graph from the same data, routing loops are largely avoided.
   - **Scalability**: Well-suited for large, complex enterprise and internet service provider networks.

8. An exterior gateway protocol is a routing tool used to share network path data between different independend networks, known as autonomous systems. The main type used today is the **Border Gateway Protocol (BGP)**, while the older specific protocol name Exterior Gateway Protocol (EGP) is now obsolete.

   Key Concepts:

   - **Autonomous Systems**: Seperate networks managed by different groups or companies (like two different phone or internet companies).
   - **Border Gateway Protocol (BGP)**: The current standard protocol that lets these independent networks talk to each other and pass data acress the global internet.
   - **Path Vector Routing**: The method BGP uses to pack the best path for data by looking at a list of autonomous system paths.

   Comparison with Interior Gateways

   - **Interior Gateway Protocols (IGP)**: Used to route traffic inside a single private network or organization (such as OSPF or RIP).
   - **Exterior Gateway Protocols (EGP)**: Used to route traffic safely betwe Aden completely separate organization networks or across the public internet.

9. Non-routable address space consists of reserved IP blocks like `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16` that are used inside private networks and ignored by public internet routers.

   ## IP Address Ranges
   - **10.0.0.0 to 10.255.255.255** (`10.0.0.0/8`): Used for large private networks and corporate setups.
   - **172.16.0.0 to 172.31.255.255** (`172.16.0.0/12`): Used for medium-sized or segmented internal networks.
   - **192.168.0.0 to 192.168.255.255** (`192.168.0.0/16`): Used for home networks and small offices.

   ## Key Features and Uses
   - **No Internet Access**: Public routers drop any data packets containing these addresses.
   - **Reuse Allowed**: Any home or business can use these exact same numbers internally without causing conflicts.
   - **Network Address Translation (NAT)**: Local devices use NAT on a router to share one public IP address when connecting to the wider internet.
