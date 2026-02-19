>You literally need a few tools to pentest Active Directory environment 90% of the time.

- Impacket
- Certipy
- Bloodhound
- BloodyAD
- NetExec
---
## Bloodhound - Must for enumeration!
### How to get zip files for Bloodhound:

#### Option 1: NetExec (nxc)

```shell
nxc ldap <ip> -u user -p pass --dns-server dns -d domain --bloodhound --collection All
```

#### Option 2: bloodhound-python 

```shell
bloodhound-python -u user -p pass -d domain -ns ip -dc dc -c all --zip 
```

### One liner to run BloodHound:

```shell
echo 'ZWNobyAiU3VrYSBub3cgb3ducyB5b3Ug4p2kIiAmJiBjdXJsIC1vIH4vZG9ja2VyLWNvbXBvc2UueW1sIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9TcGVjdGVyT3BzL2Jsb29kaG91bmQvbWFpbi9leGFtcGxlcy9kb2NrZXItY29tcG9zZS9kb2NrZXItY29tcG9zZS55bWwgJiYgc3VkbyBkb2NrZXItY29tcG9zZSAtZiB+L2RvY2tlci1jb21wb3NlLnltbCB1cA==' | base64 -d | bash
```
---
## Kerberos - Lateral Movement
### /etc/krb5.conf Minimal Format

```ini
[libdefaults]
    default_realm = <DOMAIN.IN.CAPS>

[realms]
    <DOMAIN.IN.CAPS> = {
        kdc = <DC-IP>
    }

[domain_realm]
    .<domain.in.lowercase> = <DOMAIN.IN.CAPS>
    <domain.in.lowercase> = <DOMAIN.IN.CAPS>
```

### Now how to get a Kerberos credential cache file (.ccache)

#### Option 1: Using kinit

```bash
kinit username@domain.com
```

#### Option 2: Using Impacket

```bash
impacket-getTGT domain.com/'user':'password'
```

or if you have hash.

```bash
impacket-getTGT domain.com/'user' -hashes [LMHASH:NTHASH]
```

> After generating the file you can point towards it using `export KRB5CCNAME=<path to the file>`.

>**Note: Kerberos is time-sensitive.** If your machine's clock is off by 5 minutes or more from the Domain Controller (DC), auth will fail.
>Use `sudo ntpdate <dc-ip>` to sync your system clock with the Domain Controller. 

### Basic command for Kerberos 

- `klist` - Viewing Tickets
- `kdestroy` - Deleting Tickets

### Use evil-winrm with Kerberos Tickets

```shell
evil-winrm -i <dc domain> -r <domain>
```

> No need for username while using Kerberos as authentication.
---
