```sh
2049/tcp  open  mountd          1-3 (RPC #100005)
```

Use `showmount` to enumerate NFS exports:
```sh
showmount -e <target_ip>
```

Then we can mount `NFS shares` using `mount`

```sh
mkdir /mnt/nfs
sudo mount -t nfs <target_ip>:<enumerated_share> /mnt/nfs
```

### Useful nmap scripts 

```sh
nfs-ls #List NFS exports and check permissions
nfs-showmount #Like showmount -e
nfs-statfs #Disk statistics and info from NFS share
```

