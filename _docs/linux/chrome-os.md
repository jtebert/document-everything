---
title: Chrome OS
parent: Linux
last_modified_date: 2019-11-27
---

1. TOC
{:toc}

---

## Setting up xiwi

- Add it to an existing crouton installation: `sudo sh ~/Downloads/crouton -u -t xiwi`
- Install the [Chrome extension](https://goo.gl/OVQOEt)
- Inherit your XFCE settings by adding this line to your user's `.xiwirc` file (this file might not exist yet): `xfsettingsd&`

## Run graphical Crouton/chroot

**In a totally separate view:**

    sudo startxfce4 -X xorg

Use `Ctrl + Alt + Shift + ←` and `Ctrl + Alt + Shift + →` to switch between Chrome OS and Linux.

**In a tab/window within Chrome OS:**

*This requires that you have xiwi installed as part of your crouton setup and the [crouton integration extension](https://chrome.google.com/webstore/detail/crouton-integration/gcpneefbbnfalgjniomfjknbcgkbijom) installed in Chrome.*

    sudo startxfce4 -X xiwi

(from [Crouton Wiki](https://github.com/dnschneid/crouton/wiki/crouton-in-a-Chromium-OS-window-(xiwi) )

## Run Crouton/chroot shell

*This gives you a full linux shell that you can run programs from and install things with `apt`*

Get the names of your chroots:

```bash
sudo edit-chroot -a
```

Mount the chroot and enter the shell: (using whatever `chrootname` you got from the first command).

```bash
sudo enter-chroot -n chrootname
```

If you have a single chroot, you should be able to just do `sudo enter-chroot`.

(from [Crouton Command Cheat Sheet](https://github.com/dnschneid/crouton/wiki/Crouton-Command-Cheat-Sheet))

## Run a single linux program in a window (already in a chroot shell)

```bash
xiwi [program-name]
```

Some programs require an additional flag to run properly, such as Sublime text editor: `xiwi subl -w`

## Remount a card/drive with execute permissions

*I ran into this when trying to run scripts that were stored on my Chromebook's SD card.*

```bash
sudo mount -o remount,exec /media/removable/Card
```

(or wherever the mountpoint of your card/USB device is)

(from [Unix StackExchange](https://unix.stackexchange.com/questions/6821/bash-wont-execute-files))

## Set locales

*To be minimalistic, locales are not set by default in Chrome OS/crouton. This can cause a problem with filenames or characters not displaying in terminals (or terminals crashing). You can set the locales to stop the madness.*

```bash
sudo locale-gen en_US
sudo locale-gen en_US.utf8
sudo dpkg-reconfigure locales
```

(First select all, then next select the default as en_US)

It should be reconfigured on reboot.

## Fixing `apt-get` failure

I started getting a segfault when I try to run any `apt` or `apt-get` commands in crouton on my Chromebook. So I couldn't update or install. [This GitHub issue comment](https://github.com/dnschneid/crouton/issues/2688#issuecomment-378670878) provided a workaround. It's not pretty, but it works. Basically, you manually download and re-install `apt`, then update and install dependencies.