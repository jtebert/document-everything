---
title: Miscellaneous
last_modified_date: 2019-07-01
---

1. TOC
{:toc}

---

## VS Code Remote Development

*All of this is done from the local machine -- the one you want to connect **from**.*

1. Generate an SSH key to use with this specific host. (This makes it safer than using a single key for everything, in case someone ever gets that one private key.)
    ```
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa-HOSTNAME
    ```
2. Add the key to your remote HOST
    ```
    ssh-copy-id -i ~/.ssh/id_rsa-HOSTNAME.pub USERNAME@HOSTNAME
    ```
3. Test your connection by SSHing with this key:
    ```
    ssh -i ~/.ssh/id_rsa-HOSTNAME.pub USERNAME@HOSTNAME
    ```
4. In VS Code, use the command palette (Ctrl+Shift+P) to run **Remote-SSH: Open Configuration File...** and pick `~/.ssh/config`. Add or modipy the contents to be something like this (but matching your stuff, of course):
    ```
    Host tupuxuara
        User jtebert
        HostName 10.243.52.252
        IdentityFile ~/.ssh/id_rsa-HOSTNAME
    ```
    The `Host` is just something human-friendly. The `HostName` is the IP address or name that actually gets your machine.
5. Test your SSH Config by using it to log in:
    ```
    ssh tupuxuara
    ```
    You shouldn't need to enter a password or anything. Magic.
6. Test in VS Code. From the command palette run **Remote-SSH: Connect to Host...** and select your hostname. It should take a moment to set itself up the first time, but if the previous step worked, this should work.

### Other Notes

- Within VS Code, you can now also do super useful things like port forwarding (in case your remote code runs a server, for example.)
- You may need a VPN to connect this way, if you otherwise need a VPN to connect (duh). (Looking at you, Harvard SEAS.)

Sources: [Remote Development Using SSH](https://code.visualstudio.com/docs/remote/ssh), [Key configuration](https://code.visualstudio.com/docs/remote/troubleshooting#_configuring-key-based-authentication)
{: .fs-2}