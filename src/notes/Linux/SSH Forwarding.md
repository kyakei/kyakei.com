Also known has **SSH Tunneling**.

### Local Port Forwarding

Here we are outside and we want to access inside port.

```sh
ssh -L <local_port>:<target_host>:<target_port> <user>@<ssh_host>
```

Here:
- `<local_port>` : The local port you want to forward to.
- `<target_host>` : The remote host you want to access.
- `<target_port>` : The remote port of the host you want to access.

**Example:**
```sh
ssh -L 8080:10.10.11.11:80 user@domain.com
```

Here, we have port forwarded **their** port 80 to **our** port 8080.
### Remote Port Forwarding (Rare)

Now here we are inside and we want to access outside port. Just the reverse for `Local Port Forwarding`.

```sh
ssh -R <remote_port>:<local_host>:<local_port> <user>@<ssh_host>
```

Here:
- `<remote_port>` : The port you want to forward to.
- `<local_host>` : Hostname
- `<local_port>` : The port we want to forward.

**Example:**
```sh
ssh -R 8080:localhost:8000 user@domain.com
```

Here, we have forwarded **our** port 8000 to **their** port 8080.

### Dynamic Port Forwarding (SOCKS Proxy)

Lastly here we transfer all the traffic instead of individual ports (used for pivoting, proxychains is used here to access the traffic).

```sh
ssh -D <local_port> <user>@<ssh_host>
```

Here:
- `<local_port>` : The port we want to forward all the traffic to.

**Example:**
```sh
ssh -D 1080 user@domain.com
```

Then we can setup `Proxychains`:

```
sudo nano /etc/proxychains4.conf

[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
#socks4  127.0.0.1 9050
socks5  127.0.0.1 1080 ---> This is the line we added.
```

Then we can access services by either using:

```sh
proxychains firefox
```

or for quieter output:

```sh
proxychains -q firefox
```


### Local Port Forwarding using SSHPass

```sh
sshpass -p '<password>' ssh -L <local_port>:<target_ip>:<target_port> <user>@<ssh_host>
```

### Remote Port Forwarding using SSHPass

```sh
sshpass -p '<password>' ssh -R <remote_port>:<local_host>:<local_port> <user>@<ssh_host>
```

### Dynamic Port Forwarding with SSHPass

```sh
sshpass -p '<password>' ssh -D <local_port> <user>@<ssh_host>
```

>[!note]
>Use `-fNT` to run it in background mode.

## Tunneling with Netcat
```bash
#Forwards traffic from port 8080 to port 80 on another host.
nc -l -p 8080 | nc 10.10.14.5 80
```

