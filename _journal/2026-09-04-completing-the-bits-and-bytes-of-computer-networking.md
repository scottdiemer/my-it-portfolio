---
title: "Completing The Bits and Bytes of Computer Networking"
date: "September 4, 2026"
category: ["Networking", "IT Support", "Professional Development"]
summary: "A reflection on completing The Bits and Bytes of Computer Networking and the study guide I built along the way covering TCP/IP, DNS, DHCP, NAT, WANs, wireless networking, cloud computing, IPv6, and network troubleshooting."
---

I recently completed **The Bits and Bytes of Computer Networking**, the networking course in the Google IT Support Professional Certificate.

Networking was one of the areas I specifically wanted to strengthen as I work toward transitioning into IT support and eventually systems administration.

I had some experience with networking before starting the course. I manage my own websites, DNS records, email server, ticketing system, and Linux servers, and I have used tools such as `ping`, `traceroute`, and `nslookup`.

What I did not have was a structured understanding of how all of those pieces fit together.

This course helped fill in a lot of those gaps.

Rather than simply trying to memorize enough information to pass each assignment, I started building study guides as I progressed through the course. I also converted much of the material into audio-friendly study sessions that I could listen to during my commute.

That ended up being one of the most useful parts of the learning process.

When I missed questions on practice or graded assignments, I went back and added those concepts to the study material. Over time, the guide became a collection of the concepts that I found most important or easiest to confuse.

Below is the condensed study guide I ended up with by the time I completed the course.

---

## The Five-Layer Network Model

The TCP/IP Five-Layer Network Model provides a way to understand how data travels across a network.

From top to bottom:

1. Application Layer
2. Transport Layer
3. Network Layer
4. Data Link Layer
5. Physical Layer

Each layer has a specific responsibility.

### Application Layer

The application layer is where network applications and services operate.

Examples include:

- HTTP and HTTPS
- DNS
- DHCP
- FTP
- SMTP
- SSH

### Transport Layer

The transport layer handles communication between applications.

The two major protocols are:

- **TCP — Transmission Control Protocol**
- **UDP — User Datagram Protocol**

TCP is connection-oriented and provides reliable delivery.

UDP is connectionless and prioritizes speed over guaranteed delivery.

### Network Layer

The network layer handles routing between networks.

The primary protocol is:

- **IP — Internet Protocol**

Routers primarily operate at this layer.

### Data Link Layer

The data link layer handles communication between devices on the same local network.

Important concepts include:

- Ethernet
- MAC addresses
- Frames
- Switches

### Physical Layer

The physical layer represents the actual transmission medium.

Examples include:

- Copper cable
- Fiber optic cable
- Radio waves

---

## TCP and UDP

### TCP

TCP provides reliable, connection-oriented communication.

TCP uses a three-way handshake:

1. SYN
2. SYN-ACK
3. ACK

TCP keeps track of:

- Sequence numbers
- Acknowledgment numbers
- Lost segments
- Retransmissions

TCP is commonly used when reliable delivery matters.

Examples include:

- Web traffic
- Email
- File transfers

### UDP

UDP is connectionless.

It does not establish a session before transmitting data and does not guarantee that packets arrive.

This reduces overhead and makes UDP useful when speed is more important than guaranteed delivery.

Examples include:

- DNS queries
- Streaming
- Voice and video traffic

---

## Ports

Ports identify the application or service associated with network traffic.

Some commonly encountered ports include:

| Port  | Service |
| ----- | ------- |
| 20/21 | FTP     |
| 22    | SSH     |
| 25    | SMTP    |
| 53    | DNS     |
| 67/68 | DHCP    |
| 80    | HTTP    |
| 443   | HTTPS   |

An IP address identifies the host.

A port identifies the application or service on that host.

---

## IPv4

IPv4 addresses are **32 bits** long.

An IPv4 address contains four 8-bit octets.

Example:

`192.168.1.10`

IPv4 provides approximately **4.2 billion possible addresses**.

The growth of the Internet eventually exhausted the available pool of unique IPv4 addresses, which helped drive technologies such as NAT and the development of IPv6.

---

## Subnetting

A subnet mask determines which portion of an IP address identifies the network and which portion identifies the host.

Example:

`255.255.255.0`

This is also commonly written using CIDR notation:

`/24`

A `/24` means the first 24 bits represent the network portion of the address.

---

## Default Gateway

The default gateway is the router that a host sends traffic to when the destination is outside the local network.

A simple way to think about it is:

**Local destination → communicate directly**

**Remote destination → send to the default gateway**

---

## DNS

DNS stands for **Domain Name System**.

DNS translates human-readable names into IP addresses.

Example:

`example.com`

may resolve to an IPv4 or IPv6 address.

### DNS Resolution

A typical DNS lookup may involve:

1. Local DNS cache
2. Recursive DNS resolver
3. Root name server
4. Top-Level Domain server
5. Authoritative name server

The recursive resolver contacts the **root name server first** when it does not already have the answer cached.

### Common DNS Records

**A**

Maps a hostname to an IPv4 address.

**AAAA**

Maps a hostname to an IPv6 address.

**CNAME**

Creates an alias pointing one hostname to another.

**MX**

Identifies mail servers for a domain.

**TXT**

Stores text information.

Common uses include SPF and domain verification.

**SRV**

Identifies the hostname and port associated with a service.

**NS**

Identifies authoritative name servers.

---

## DHCP

DHCP stands for **Dynamic Host Configuration Protocol**.

DHCP automatically provides network configuration to clients.

Typical configuration includes:

- IP address
- Subnet mask
- Default gateway
- DNS server

### DHCP DORA Process

A common way to remember DHCP is **DORA**:

1. Discover
2. Offer
3. Request
4. Acknowledge

The client begins with a **DHCP Discover** message.

The server responds with a **DHCP Offer**.

The client sends a **DHCP Request**.

The server completes the process with a **DHCP Acknowledgement**.

### DHCP Allocation

**Dynamic allocation**

Addresses are assigned from a pool.

**Fixed allocation**

A particular IP address is associated with a specific device, commonly using its MAC address.

---

## NAT

NAT stands for **Network Address Translation**.

NAT allows private networks to communicate with the public Internet while sharing public IP addresses.

A gateway can rewrite the source IP address of outgoing traffic.

### IP Masquerading

When NAT hides the private source IP address behind a public address, this is known as:

**IP masquerading**

### Port Forwarding

Port forwarding directs traffic arriving on a particular destination port to a specific internal host.

For example:

Internet traffic arriving on a router at a particular port can be forwarded to a server on the private network.

### Port Preservation

When possible, NAT may preserve the original source port selected by the client.

If that port is unavailable, another port may be selected.

---

## IPv4 Address Exhaustion

IPv4 provides approximately 4.2 billion addresses.

The Internet Assigned Numbers Authority, or IANA, distributes address blocks to Regional Internet Registries.

Major RIRs include:

- ARIN
- RIPE
- APNIC
- LACNIC
- AFRINIC

ARIN serves the United States and Canada.

IPv6 was created largely to solve the IPv4 address exhaustion problem.

---

## IPv6

IPv6 addresses are **128 bits** long.

IPv6 provides an enormous address space compared with IPv4.

IPv6 addresses are written as:

**8 groups of 16 bits**

Example:

`2001:0db8:0000:0000:0000:ff00:0042:8329`

Leading zeros within a group can be removed.

Groups containing zeros can also be compressed under certain rules.

### IPv6 Hop Limit

IPv4 uses a field called:

**TTL — Time To Live**

IPv6 uses:

**Hop Limit**

Both serve the same basic purpose.

Each router forwarding the packet reduces the value.

---

## IPv6 Tunneling

IPv4 and IPv6 use different datagram structures.

Because the Internet cannot transition to IPv6 all at once, tunneling can carry IPv6 traffic across IPv4 networks.

The process is:

1. IPv6 datagram enters a tunnel
2. IPv6 datagram is encapsulated inside an IPv4 datagram
3. IPv4 network transports the packet
4. Remote tunnel endpoint removes the IPv4 encapsulation
5. IPv6 traffic continues normally

Examples of tunneling protocols discussed in the course include:

- 6in4
- TSP
- AYIYA

---

## ICMP

ICMP stands for:

**Internet Control Message Protocol**

ICMP is used to communicate network status and error information.

Ping uses ICMP.

### Ping

Ping sends an:

**ICMP Echo Request**

A reachable host may respond with an:

**ICMP Echo Reply**

Ping helps answer:

**Can I reach this host?**

---

## Traceroute

Traceroute helps identify the path packets take through a network.

Each router forwarding a packet decreases the TTL value by one.

When the TTL reaches zero, the router generates an ICMP response.

Traceroute uses this behavior to discover each router along the path.

### Operating System Differences

Linux and macOS use:

`traceroute`

Windows uses:

`tracert`

Linux and macOS traceroute commonly use UDP packets sent to high-numbered ports.

---

## Pathping

Windows includes another troubleshooting command:

`pathping`

Pathping combines ideas from ping and traceroute.

It can analyze routers along a path and identify:

- Packet loss
- Latency
- Problematic network hops

---

## Ipconfig

Windows uses:

`ipconfig`

to display current network configuration.

This may include:

- IP address
- Subnet mask
- Default gateway
- DNS configuration

---

## Nslookup

`nslookup` is a DNS troubleshooting tool available on major desktop operating systems.

It can be used to:

- Resolve hostnames
- Find IP addresses
- Query DNS servers

Example:

`nslookup example.com`

---

## Netcat

Linux and macOS can use Netcat, commonly called:

`nc`

to test transport-layer connectivity.

Example:

`nc example.com 443`

This attempts to connect to TCP port 443.

Useful options include:

`-z`

Zero input/output mode for checking connectivity without sending normal data.

`-v`

Verbose output.

---

## Test-NetConnection

Windows PowerShell includes:

`Test-NetConnection`

When only a hostname is provided, it performs an ICMP-style connectivity test.

A specific port can also be tested.

Example:

`Test-NetConnection example.com -Port 443`

This helps answer:

**Can I reach this specific service?**

This is different from ping.

Ping asks whether the host is reachable.

Test-NetConnection with a port asks whether a specific service is reachable.

---

## Broadband

For the purposes of this course:

**Broadband means any Internet connectivity technology that is not dial-up.**

Examples include:

- DSL
- Cable
- Fiber

---

## Dial-Up and POTS

POTS stands for:

**Plain Old Telephone Service**

Dial-up Internet uses traditional telephone infrastructure to carry data.

It is called dial-up because the modem establishes the connection by dialing a telephone number.

---

## T1

T1 stands for:

**Transmission System 1**

A T1 line:

- Uses twisted-pair copper
- Operates at 1.544 Mbps
- Contains 24 telephone channels

---

## DSL

DSL stands for:

**Digital Subscriber Line**

DSL uses traditional telephone wiring while operating at frequencies that do not interfere with normal voice calls.

### ADSL

ADSL stands for:

**Asymmetric Digital Subscriber Line**

Upload and download speeds are different.

### SDSL

SDSL stands for:

**Symmetric Digital Subscriber Line**

Upload and download speeds are the same.

### DSLAM

DSLAM stands for:

**Digital Subscriber Line Access Multiplexer**

A DSLAM combines multiple DSL connections into a high-speed communications channel.

---

## Cable Broadband

Cable Internet typically uses:

**Coaxial cable**

Cable networks commonly operate using a shared-bandwidth model.

Multiple customers may share bandwidth until their traffic reaches the ISP's core network.

---

## Fiber

Common fiber deployment terms include:

**FTTN**

Fiber to the Neighborhood

**FTTB**

Fiber to the Building

**FTTH**

Fiber to the Home

**FTTP**

Fiber to the Premises

**FTTX**

Fiber to the X

FTTX is the general term for the different fiber deployment models.

### ONT

ONT stands for:

**Optical Network Terminator**

The ONT acts as the customer-side termination point for a fiber connection.

---

## PPP

PPP stands for:

**Point-to-Point Protocol**

PPP operates at the data link layer and supports communication between directly connected devices.

Important PPP features include:

- Authentication
- Compression
- Multilink
- Error detection

### LCP

Link Control Protocol

LCP establishes, configures, and terminates the PPP link.

### NCP

Network Control Protocol

NCP configures network-layer protocols carried across the PPP connection.

### FCS

Frame Check Sequence is used for error detection.

FCS is part of the frame structure.

It is **not** a PPP subprotocol.

### PPPoE

PPPoE stands for:

**Point-to-Point Protocol over Ethernet**

PPPoE encapsulates PPP frames inside Ethernet frames.

A discovery stage establishes a session ID.

---

## WAN

WAN stands for:

**Wide Area Network**

A WAN connects networks across multiple physical locations.

### Local Loop

The local loop is the connection between the customer demarcation point and the ISP network.

### Point-to-Point VPN

A point-to-point VPN is also commonly called:

**Site-to-site VPN**

Network devices at each location establish the tunnel.

---

## SD-WAN

SD-WAN stands for:

**Software-Defined Wide Area Network**

SD-WAN uses software to simplify WAN management and can reduce dependence on expensive dedicated circuits.

---

## WAN Optimization

Common WAN optimization techniques include:

### Compression

Reduces data size.

### Deduplication

Avoids storing duplicate copies of the same information.

### Local Caching

Stores frequently requested information closer to users.

### Protocol Optimization

Improves the efficiency of network protocols.

### Traffic Shaping

Controls the flow and priority of network traffic.

Traffic shaping may include:

- Bandwidth throttling
- Rate limiting
- Traffic prioritization

---

## Frame Relay

Frame Relay is an older WAN technology.

Two connection types include:

**PVC — Permanent Virtual Circuit**

Long-term connection.

**SVC — Switched Virtual Circuit**

Temporary connection.

---

## ATM

ATM stands for:

**Asynchronous Transfer Mode**

ATM sends information using small, fixed-size cells.

A useful association is:

**ATM = fixed-size cells**

---

## MPLS

MPLS stands for:

**Multiprotocol Label Switching**

MPLS improves routing efficiency by using short labels to direct traffic through a network.

---

## Wireless Networking

Wi-Fi belongs to the:

**IEEE 802.11**

family of standards.

A wireless access point bridges wireless devices to a wired network.

---

## Infrastructure and Ad-Hoc Networks

### Infrastructure Mode

Clients communicate through a wireless access point.

### Ad-Hoc Mode

Devices communicate directly without relying on an access point or traditional network infrastructure.

---

## Wi-Fi Frequency Bands

### 2.4 GHz

Advantages:

- Longer range
- Better wall penetration

Disadvantages:

- Fewer channels
- More congestion
- More interference

Bluetooth and microwave ovens can interfere with 2.4 GHz networks.

Easy memory rule:

**2.4 GHz = farther but crowded**

### 5 GHz

Advantages:

- More channels
- Less congestion
- Higher potential speeds

Disadvantages:

- Shorter range
- Worse wall penetration

Easy memory rule:

**5 GHz = faster and cleaner but shorter**

---

## Wireless Channels

A wireless channel is:

**A smaller portion of the overall frequency band**

Wireless networks divide frequency bands into channels to allow multiple communications to coexist.

---

## Wi-Fi Standards

### 802.11b

- 2.4 GHz
- Up to 11 Mbps
- One of the first widely adopted Wi-Fi specifications

### 802.11a

- 5 GHz
- Up to 54 Mbps

### 802.11g

- 2.4 GHz
- Up to 54 Mbps

### 802.11n — Wi-Fi 4

- 2.4 and 5 GHz
- MIMO
- Channel bonding

### 802.11ac — Wi-Fi 5

- Primarily 5 GHz
- Wider channels
- MU-MIMO

### 802.11ax — Wi-Fi 6

Designed to improve efficiency in networks containing many devices.

Technologies include:

- MU-MIMO
- OFDMA
- Target Wake Time
- 1024-QAM
- Beamforming
- 160 MHz channels

### Wi-Fi 6E

Extends Wi-Fi 6 into the:

**6 GHz band**

---

## Wi-Fi 6 Technologies

### Target Wake Time

Allows battery-powered devices to sleep when they do not need to communicate.

**TWT = battery life**

### MU-MIMO

Allows an access point to communicate with multiple clients simultaneously.

**MU-MIMO = multiple users**

### OFDMA

Divides channel bandwidth among multiple devices.

**OFDMA = split bandwidth**

### 1024-QAM

Encodes more information into the wireless signal.

### Beamforming

Directs wireless energy toward a particular client.

**Beamforming = aim the signal**

---

## 802.11 Frames

An 802.11 header contains:

**Four address fields**

These may represent:

- Source
- Destination
- Transmitter
- Receiver

Other important fields include:

### Frame Control

Contains information describing how the frame should be processed.

It also includes the 802.11 version.

### Duration

Contains timing information for the frame.

### Sequence Control

Helps keep frames in the correct order.

### Data Payload

Contains information from higher-layer protocols.

### Frame Check Sequence

Provides error detection.

---

## Wireless Security

### WEP

Wired Equivalent Privacy is an old and weak wireless security technology.

It should not be considered secure today.

### WPA

Wi-Fi Protected Access improved security compared with WEP.

### WPA3

WPA3 was designed to replace WPA2 and address security weaknesses.

---

## WPA3-Personal

WPA3-Personal is designed primarily for home and personal networks.

An important technology is:

**SAE — Simultaneous Authentication of Equals**

SAE provides stronger authentication and helps resist dictionary and brute-force password attacks.

WPA3-Personal also supports forward secrecy.

Memory rule:

**WPA3-Personal = SAE**

---

## WPA3-Enterprise

WPA3-Enterprise provides stronger protections for business environments.

Technologies discussed in the course include:

**GCMP-256**

Stronger encryption and integrity protection.

**OWE**

Opportunistic Wireless Encryption.

Improves security on open wireless networks.

**DPP**

Device Provisioning Protocol.

Can use QR codes or NFC to provision devices.

**HMAC**

Provides message integrity.

---

## MAC Filtering

MAC filtering allows an access point to permit connections only from specified MAC addresses.

This creates an allowlist of trusted devices.

---

## Cellular Networking

Cellular networks, like Wi-Fi, transmit data using:

**Radio waves**

Cellular networking may also be referred to as:

**Mobile networking**

---

## IoT

IoT stands for:

**Internet of Things**

IoT devices collect, send, or receive information across networks.

Examples include:

- Sensors
- Smart thermostats
- Cameras
- Industrial equipment
- Smart lighting
- Utility meters

---

## IoT Communication Models

### Request / Response

A client requests information.

A server responds.

Examples:

- HTTP
- CoAP

### Publish / Subscribe

The main components are:

- Publisher
- Broker
- Subscriber

The publisher sends messages.

The broker distributes them.

Subscribers receive messages for topics they follow.

Examples include:

- MQTT
- AMQP
- DDS

---

## MQTT

MQTT stands for:

**Message Queue Telemetry Transport**

MQTT is a lightweight IoT messaging protocol.

Important characteristics:

- Publish/subscribe
- TCP
- Quality of Service
- SSL/TLS support
- Small message overhead

Memory rule:

**MQTT = lightweight publish/subscribe**

---

## CoAP

CoAP stands for:

**Constrained Application Protocol**

CoAP resembles HTTP but is designed for constrained IoT devices.

It uses a request/response model.

Memory rule:

**CoAP = HTTP-like protocol for constrained devices**

---

## IoT Wireless Technologies

### ZigBee

- Low power
- Mesh networking
- Common in smart-home environments
- Self-healing network behavior

### Thread

- Mesh networking
- IPv6-based
- Open standards
- Designed for low-latency IoT communication

### Z-Wave

- Low-power mesh
- Common in smart-home environments

### Bluetooth

- Short-range communication
- Common for peripherals and nearby devices

### NFC

Near-Field Communication operates over extremely short distances.

Typical uses include:

- Contactless payments
- ID cards
- NFC tags

Memory rule:

**NFC = inches**

### LoRaWAN

Long Range Wide Area Network is designed for:

- Long distances
- Low power
- Distributed IoT sensors

Memory rule:

**LoRaWAN = long range and low power**

---

## Cloud Computing

Cloud computing provides computing resources over a network.

### Hypervisor

A hypervisor manages virtual machines.

The physical system is called the:

**Host**

Virtual machines are called:

**Guests**

---

## Cloud Service Models

### SaaS — Software as a Service

Finished software delivered as a service.

Example:

Microsoft 365 Outlook.

Memory rule:

**SaaS = software you use**

### PaaS — Platform as a Service

Provides an environment for developing, testing, and deploying applications.

Memory rule:

**PaaS = platform you build on**

### IaaS — Infrastructure as a Service

Provides infrastructure such as:

- Virtual machines
- Containers
- Networking
- Storage

Memory rule:

**IaaS = infrastructure you manage**

---

## Public, Private, and Hybrid Clouds

### Public Cloud

Infrastructure operated by a cloud provider.

### Private Cloud

Cloud infrastructure dedicated to a particular organization.

### Hybrid Cloud

Combines private/on-premises infrastructure with public cloud services.

---

## My Biggest Takeaways

One of the biggest things I learned from this course is that networking becomes much easier to understand when I stop treating protocols as isolated acronyms and instead ask:

**What problem is this technology solving?**

DNS solves name resolution.

DHCP solves automatic client configuration.

NAT helps private networks share public addressing.

TCP provides reliable transport.

UDP reduces overhead.

Routers move traffic between networks.

Switches move frames within local networks.

OFDMA helps wireless devices share bandwidth.

MQTT provides lightweight messaging for IoT systems.

IPv6 solves the address-space limitations of IPv4.

Once I started connecting the technology to its purpose, the terminology became much easier to remember.

Another lesson was not to assume that understanding a concept means I will automatically remember every small implementation detail.

Some of the questions I missed during the course were things like:

- The number of telephone channels in a T1 line
- Whether ADSL or SDSL uses different upload and download speeds
- The exact purpose of an IPv6 Hop Limit field
- The number and size of IPv6 address groups

Those misses helped show me the difference between understanding how networking works and remembering specific technical details.

Both matter.

---

## What's Next

Completing this course gave me a much stronger networking foundation, but I still have plenty to learn.

My goal is not simply to collect certificates.

I want to be able to troubleshoot real systems and understand why something failed instead of blindly trying fixes until something works.

The networking knowledge from this course ties directly into the work I have already been doing with Linux servers, DNS, email infrastructure, web hosting, Active Directory labs, and self-hosted services.

I am continuing through the Google IT Support Professional Certificate and building on that foundation as I work toward my first formal IT support role and, eventually, systems administration.
