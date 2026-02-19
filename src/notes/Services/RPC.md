### Misconfigurations

We can use the `rpcclient` tool with a null session to enumerate a workstation or Domain 
Controller.

```sh
rpcclient -U'%' <ip>

rpcclient $> enumdomusers
```

