### Cracking files using 2john

We can get hashes for the password protected file using `2john` (or `locate *2john*`). ^06deb8

Example:
```sh
zip2john protected.zip > hash
```

then we can simply crack it using `JohnTheRipper` itself.

```sh
john hash --wordlist=/usr/share/wordlists/rockyou.txt
```

> Use `rar2john`, `7z2john`, `pdf2john`, etc. for other formats
---
### Cracking files that are encrypted with openssl

But that's not the same for `gzip`.
`gzip` does not support password protection or encryption natively. So we use `openssl` to encrypt `gzip` files.

We can basically use this one liner to do so:

```sh
for i in $(cat rockyou.txt);do openssl enc -aes-256-cbc -d -in GZIP.gzip -k $i 2>/dev/null| tar xz;done
```

>The following one-liner may produce several GZIP-related error messages, which can be safely ignored.

**To speed up the cracking, we can split the wordlist and run parallel instances:**

```sh
split -n l/4 rockyou.txt parts_
for file in parts_*; do
  (for i in $(cat $file); do
     openssl enc -aes-256-cbc -d -in secret.gz.enc -k "$i" 2>/dev/null | tar xz 2>/dev/null && echo "[+] Password found: $i" && break
   done) &
done
wait
```


