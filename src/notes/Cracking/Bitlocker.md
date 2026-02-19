### Cracking Bitlocker

>[!note]
>![[Cracking files#^06deb8]]


We are going to use `bitlocker2john` here.

```shell
bitlocker2john -i Backup.vhd > backuphash
```

Now that you have the hash, we need to find the actual hash

```sh
grep "bitlocker\$0" backuphash > backup.hash
```
>It searches for the usable hash and then saves it as `backup.hash`

Now we can either use `JohnTheRipper` or `Hashcat` to crack it.



```sh
hashcat -a 0 -m 22100 backup.hash /usr/share/wordlists/rockyou.txt
```

### Mounting Bitlocker

To mount bitlocker we first need `dislocker`:
```sh
sudo apt-get install dislocker
```

Then we create folders where we want to mount the bitlocker:
```sh
sudo mkdir -p /media/bitlocker
sudo mkdir -p /media/bitlockermount
```

We then use `losetup` to configure the VHD as [loop device](https://en.wikipedia.org/wiki/Loop_device), decrypt the drive using `dislocker`, and finally mount the decrypted volume:
```shell
sudo losetup -f -P Backup.vhd
sudo dislocker /dev/loop0p2 -u<password no space> -- /media/bitlocker
sudo mount -o loop /media/bitlocker/dislocker-file /media/bitlockermount
```

