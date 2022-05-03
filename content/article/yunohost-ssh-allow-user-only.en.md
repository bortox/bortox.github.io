---
title: Yunohost setup SSH key access only for user account
description: How to setup SSH key access on YunoHost webserver and allow SSH login attempts only from your username
date: 2022-02-02T15:28:00.000+00:00
tags: 
- ssh
- server
categories: ['tutorial', 'linux']
---
After installing YunoHost on my VPS on a few days, I checked _fail2ban_ logs. Fail2ban is a Python service to ban IPs that try to access your server by reading the access logs, as SSH log, Nginx log by using regular expressions to catch malicious IPs.

Long story short, there were about ~800 failed SSH login attempts, and the rising number annoyed me, so I decided to allow only SSH access with asymmetric key pairs and disallow authentication with passwords to be a bit safer.

<!--more-->

## How SSH Key asymmetric encryption works

* You create two keys on your device, one public key and one private key. Your device uses complicated operations with elliptic curves and prime numbers to derive the keys in a secure way.

* After the public key is sent to the server, the server uses it to encrypt information. 

* The private key stays on your device, and it can decrypt information encrypted using the public key paired with it. 

* To establish a secure connection, for example, the server encrypts  with the public key a challenge message which your device has to decrypt with the paired private key and send back.

* It is not possible to derive the private key from the public key.
*  You can protect your private key with a password, so everyone who gets the private key file has to first decrypt it with the password you set before. 

## 1) Create a SSH Key on your device. 

`ssh-keygen -t ed25519 -a 1000`

To know more about this, you can check first [GitHub's tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), then, for example, [this blog post](https://cryptsus.com/blog/how-to-secure-your-ssh-server-with-public-key-elliptic-curve-ed25519-crypto.html), regarding the differences between SSH key generation algorithms.

## 2) Copy the SSH Key on the YunoHost Server.

There are two easy ways.

* `ssh-copy-id -i ~/.ssh/your-key-name.pub username@host-domain.com`

Recommended. This way, the SSH program will automatically copy your public key to a new line in the `authorized_keys` file in your server user's home directory. This file contains all the public keys used to encrypt the connections. 

Alternatively, using YunoHost's built-in command, we can 

* `cat ~/.ssh/your-key-name.pub` 
* copy the cat output to clipboard
* login to the server using password authentication
* `sudo yunohost user ssh add-key username your-public-key-pasted-from-clipboard` --> Run this script with `sudo`, I ran it as root and it messed with the `.ssh` folder and `authorized_keys` file's permissions, making them belong to the root user. 

Personally, I've found the `ssh-copy-id` way, way easier.

## 3) Enable SSH access for your user

`yunohost user permission add ssh.main username`

## 4) Check SSH access for your user: try to log in using key

`ssh -i ~/.ssh/your-key-name username@host-domain.com`

Then in another terminal window try

`ssh username@host-domain.com`

If the output is the same (it asks for your user's password), **your key is not being accepted**, so we need to fix that.

If the output is different, everything should work and you can go to step *5* to disable basic password authentication. 

### Troubleshooting SSH key access

* On your device

Check if you are entering your private key name, not your public key (without the .pub suffix)

* On the server

Login using your username and password, then check the ~/.ssh directory.

```
ssh username@host-domain.com
ls -lah ~/.ssh
```

This is the output you should get, with instead of `username` your username, of course.

```
drwx------  2 username username 4.0K Feb 20 12:12 .
drwxrwxr-x+ 5 username username 4.0K Feb 20 13:21 ..
-rw-r--r--  1 username username  190 Feb 20 12:30 authorized_keys
```

If it's not that, we need to fix and **check the permissions** of files related to your SSH Keys. 

`ssh-copy-id` automatically sets the right `.ssh` files and folder permissions, so if you used `ssh-copy-id` you should be fine.

1) Give the ownership of `~/.ssh` directory and files contained in it  to your user and the group of your user

`sudo chown -R your-username: ~/.ssh`

To know more about permissions and the usage of `chmod` to change them, you can check out this [informative guide by Linode](https://www.linode.com/docs/guides/modify-file-permissions-with-chmod/) or [the Arch Wiki](https://wiki.archlinux.org/title/File_permissions_and_attributes).

2) Give the `autorized_keys` file 644 permissions (the current user can read and write, the group and the other users can only read the file)

`chmod 644 ~/.ssh/authorized_keys`

3) Make the ~/.ssh directory is executable by your username (if a user has the executable permission on a directory, the user can enter that directory)

`chmod 700 ~/.ssh`

4) Retry to access from your device. Now it should ask your SSH Key password you set up before.

`ssh -i ~/.ssh/your-key-name username@host-domain.com`

## 5) Disable SSH password authentication from YunoHost

`sudo yunohost settings set security.ssh.password_authentication -v no`

YunoHost will automatically modify the `/etc/ssh/sshd_conf` file and restart the daemon.

## 6) Yay! All done!

Now your server should be much more secure.

**Bonus**: Change your SSH Port to get less bruteforce attempts by bots:
```
# yunohost settings set security.ssh.port -v [number between 1024 and 65536]
```
Then add the parameter `-p [number between 1024 and 65536 you chose]` while connecting to your server.