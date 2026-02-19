>[!Before you read]
> This is a continuation of [[File Transfer/FTP|FTP]], for `FTP Brute Forcing` go [[Brute Forcing FTP|here]]

```
21/tcp open  ftp
```

By default, `FTP` run on port **TCP/21**.
### Misconfigurations

#### Anonymous Authentication

We can use `anonymous` username and no password to gain access. 

### FTP Bounce Attack 

An `FTP bounce attack` is a network attack that uses FTP servers to deliver outbound traffic to another device on the network. 

The `Nmap` -b flag can be used to perform an FTP bounce attack:

```sh
nmap -Pn -v -n -p80 -b <username>:<password>@<ftp_ip> <target_ip>
```

>[!note]
>Modern FTP servers include protections that, by default, prevent this type of attack, but if these features are misconfigured in modern-day FTP servers, the server can become vulnerable to an FTP Bounce attack.

### Filezilla Server Vulnerability

**FileZilla** usually binds to local an Administrative service for the **FileZilla-Server** (port 14147). If you can create a tunnel from your machine to access this port, you can connect to it using a blank password and create a new user for the `FTP` service.