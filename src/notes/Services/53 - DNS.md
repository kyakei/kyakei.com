```
53/tcp  open   domain      ISC BIND 9.11.3-1ubuntu1.2 (Ubuntu Linux)
```

DNS is mostly UDP/53, but DNS will rely on TCP/53 more heavily as time progresses.

### Basic dig commands

| Command                         | Description                                                                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dig domain.com`                | Performs a default A record lookup for the domain.                                                                                                                                                   |
| `dig domain.com A`              | Retrieves the IPv4 address (A record) associated with the domain.                                                                                                                                    |
| `dig domain.com AAAA`           | Retrieves the IPv6 address (AAAA record) associated with the domain.                                                                                                                                 |
| `dig domain.com MX`             | Finds the mail servers (MX records) responsible for the domain.                                                                                                                                      |
| `dig domain.com NS`             | Identifies the authoritative name servers for the domain.                                                                                                                                            |
| `dig domain.com TXT`            | Retrieves any TXT records associated with the domain.                                                                                                                                                |
| `dig domain.com CNAME`          | Retrieves the canonical name (CNAME) record for the domain.                                                                                                                                          |
| `dig domain.com SOA`            | Retrieves the start of authority (SOA) record for the domain.                                                                                                                                        |
| `dig @1.1.1.1 domain.com`       | Specifies a specific name server to query; in this case 1.1.1.1                                                                                                                                      |
| `dig +trace domain.com`         | Shows the full path of DNS resolution.                                                                                                                                                               |
| `dig -x 192.168.1.1`            | Performs a reverse lookup on the IP address 192.168.1.1 to find the associated host name. You may need to specify a name server.                                                                     |
| `dig +short domain.com`         | Provides a short, concise answer to the query.                                                                                                                                                       |
| `dig +noall +answer domain.com` | Displays only the answer section of the query output.                                                                                                                                                |
| `dig domain.com ANY`            | Retrieves all available DNS records for the domain (Note: Many DNS servers ignore `ANY` queries to reduce load and prevent abuse, as per [RFC 8482](https://datatracker.ietf.org/doc/html/rfc8482)). |

## DNS Zone Transfer

`DNS Zone Transfers` do not require any authentication, so anyone can ask `DNS servers` for it's zone information. Even though, `DNS` usually runs on UDP port, but when performing zone transfers, it uses a TCP port for reliable data transmission.

### DIG - AXFR Zone Transfer

```shell
dig +short AFXR @<nameserver> <domain>
```

Tools like Fierce can be also used to enumerate all `DNS servers` of the root domain and scan for `DNS zone transfer`.

```shell
fierce --domain <domain>
```

### Domain Takeovers & Subdomain Enumeration

`Domain Takeover` is registering a non-existent domain name to gain control over another domain. 

`Domain takeover` is also possible with subdomains called `subdomain takeover`.

A DNS's canonical name (CNAME) record is used to map different domains to a parent domain. Many organizations use third-party services like AWS, GitHub, Akamai, Fastly, and other content delivery networks (CDNs) to host their content. In this case, they usually create a subdomain and make it point to those services. For example,

```
sub.target.com.   60   IN   CNAME   anotherdomain.com
```

The domain name (e.g., sub.target.com) uses a CNAME record to another domain (e.g., anotherdomain.com). Suppose the anotherdomain.com expires and is available for anyone to claim the domain since the target.com's DNS server has the CNAME record. In that case, anyone who registers anotherdomain.com will have complete control over sub.target.com until the DNS record is updated.

### Subdomain Enumeration

Before performing a subdomain takeover, we should enumerate subdomains for a target domain using tools like [Subfinder](https://github.com/projectdiscovery/subfinder).

```shell
subfinder -d <domain> -v
```

An excellent alternative is a tool called [Subbrute](https://github.com/TheRook/subbrute). This tool allows us to use self-defined resolvers and perform pure DNS brute-forcing attacks during internal penetration tests on hosts that do not have Internet access.

```sh
subbrute <domain> -s names.txt -r resolvers.txt
```

Now let's say, we have reached an internal host through pivoting and want to work from there. Of course, there are other alternatives, but it does not hurt to know alternative ways and possibilities.

```sh
host <subdomain>

<subdomain> is an alias for <s3 bucket>
```

However, the URL shows a `NoSuchBucket` error indicating that the subdomain is potentially vulnerable to a subdomain takeover. Now, we can take over the subdomain by creating an AWS S3 bucket with the same subdomain name.

![[Pasted image 20250731202610.png]]

The [can-i-take-over-xyz](https://github.com/EdOverflow/can-i-take-over-xyz) repository is also an excellent reference for a subdomain takeover vulnerability. 

### DNS Spoofing
>Also known as `DNS Cache Poisoning`.

This attack involves altering legitimate `DNS records` with false information so that they can be used to redirect online traffic to a fraudulent website. Example attack paths for the` DNS Cache Poisoning` are as follows:

- An attacker could intercept the communication between a user and a DNS server to route the user to a fraudulent destination instead of a legitimate one by performing a **Man-in-the-Middle (MITM)** attack.
- Exploiting a vulnerability found in a DNS server could yield control over the server by an attacker to modify the DNS records.

#### Local DNS Cache Poisoning

From a local network perspective, an attacker can also perform `DNS Cache Poisoning` using **MITM** tools like [Ettercap](https://www.ettercap-project.org/) or [Bettercap](https://www.bettercap.org/).

To exploit the `DNS cache poisoning` via `Ettercap`:

- We should first edit the `/etc/ettercap/etter.dns` file to map the target domain name that they want to spoof and the attacker's IP address that they want to redirect a user to.

- Next, start the Ettercap tool and scan for live hosts within the network by navigating to `Hosts > Scan for Hosts`.

- Once completed, add the target IP address to `Target1` and add a default gateway IP to `Target2`.

- Activate `dns_spoof` attack by navigating to `Plugins > Manage Plugins`. This sends the target machine with fake DNS responses that will resolve <domain> to IP address.

