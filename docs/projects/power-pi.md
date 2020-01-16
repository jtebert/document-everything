---
layout: page
title: Powerful Pi
grand_parent: Side Projects
parent: 2020
permalink: /projects/power-pi
---

1. TOC
{:toc}

---

This Christmas, I got a Raspberry Pi 4 with 4 GB of RAM. I want to see how far I can push this little computer as a useful computer. So of course, I have to deck it out with equally excessive accessories: an [Argon One case](https://smile.amazon.com/gp/product/B07WP9P8VW/) and [500 GB external SSD](https://smile.amazon.com/gp/product/B073GZBT36/) (which costs more than the computer itself).

But at the moment, this doesn't have a real targeted practical purpose. I want to make a [Pi-hole](https://pi-hole.net/), but that doesn't require this powerful of a machine. Other ideas I'm considering:

- Home VPN (so I can watch my 3D printer from anywhere!)
- Self-hosted cloud ([perhaps nextcloud](https://nextcloud.com/)) or NAS (something I played around with on a Pi 2 but didn't really do anything with)
- Seeing how far I can push it, using it as a desktop computer (covered in [MagPi issue 85](https://magpi.raspberrypi.org/issues/85/pdf))
- Serving a website... maybe even this one (not a useful idea, since this is currently hosted free on GitHub)
- Media center (but do I really have media to warrant this?)

## Initial setup

Before anything else, I need an OS. I'm sticking with Raspbian for now because it has the best support. It comes in three flavors from the [Raspberry Pi website](https://www.raspberrypi.org/downloads/raspbian/): Lite (no desktop environment), with desktop, and "desktop and recommended software." I don't want their pre-installed stuff (which makes for a huge download anyway), but starting with X installed will make my life easier since I don't plan to just run it headless. So the middle option it is... but dear god their server is slow and this is taking forever to download. So I used Transmission and had the torrent downloaded in under five minutes. Go figure. (And yes, I did seed back to at least a 1.0 ratio.)

- Verify the SHA-256 checksum against the one provided on the downloads page to make sure the file is correct:
  ```shell
  sha256sum 2019-09-26-raspbian-buster.zip
  ```
- Unzip the image:
  ```shell
  unzip 2019-09-26-raspbian-buster.zip
  ```
- Insert your micro SD card and find its location with the Gnome Disks GUI or with `sudo fdisk -l`. You’ll get something like `/dev/sdX`
- Unmount the disk, either with the GUI or `sudo umount /dev/sdX*`
- Copy the image to the SD card:
  ```shell
  sudo dd bs=1M if=your_image_file_name.img of=/dev/sdX
  ```
  This might take awhile, with no terminal output until it finishes
- Remove the SD card, stick it in your Pi, and boot it up
- Since we installed a version with the desktop, it should boot up with a setup walkthrough, including setting a password, setting up wifi, and installing updates. If the updates don't work (for some reason it failed for me), you can do it manually:
  ```shell
  sudo apt update
  sudo apt upgrade
  ```

By default, Raspbian now comes with its own PIXEL desktop interface, which isn't very configurable. So I'm switching to XFCE.

### Software to install

- XFCE4
  ```shell
  sudo apt install xfce4 xfce4-terminal lightdm
  sudo update-alternatives x-session-manager
  ```
- [ARM version of VS Code](https://code.headmelted.com/) (community-maintained Code OSS) (from [these instructions](https://pimylifeup.com/raspberry-pi-visual-studio-code/))
  ```shell
  wget https://packagecloud.io/headmelted/codebuilds/gpgkey -O - | sudo apt-key add -
  curl -L https://raw.githubusercontent.com/headmelted/codebuilds/master/docs/installers/apt.sh | sudo bash
  ```
- [Papirus icon theme](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/#debian-and-derivatives)
  ```shell
  sudo sh -c "echo 'deb http://ppa.launchpad.net/papirus/papirus/ubuntu bionic main' > /etc/apt/sources.list.d/papirus-ppa.list"
  sudo apt-get install dirmngr
  sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com E58A9D36647CAE7F
  sudo apt-get update
  sudo apt-get install papirus-icon-theme
  ```
- Theme. Originally I was going to install Adapta, but it doesn't have a release in its PPA for Raspbian. Nor does the Pop OS theme. Nor did Plata. But someone made a [variant of the Plata theme that works with XFCE](https://www.xfce-look.org/p/1313394/). Just download the ZIP file and extract it to `~./themes`. (The folder might not exist yet, so you may need to create it.) To match the theme, I also used the [Roboto font](https://www.fontsquirrel.com/fonts/roboto). (Extract the files to `~/.fonts`.) *Note: I later changed this. See below.*
- xfce extras
  ```shell
  sudo apt install xfce4-goodies
  ```
- ZSH (and download dotfiles)
- Terminal configuration
- Panel configuration

### Configuration

- Whisker menu. The XFCE default is ugly. The main thing: change out the default applications menu for the whisker menu. You can also [make a keyboard shortcut](https://codeyarns.com/2015/11/03/how-to-open-whisker-menu-with-win-key/) to open this with the Super (Win) key. Under Settings > Keyboard > Application Shortcuts, add a new shortcut for `xfce4-popup-whiskermenu`, and press the `Win` key when prompted for the shortcut.
- Make caps lock work as caps lock. Since I'm using Colemak, caps is remapped to backspace, and XFCE doesn't have a utility to easily change this. But thanks to [this AskUbuntu question](https://askubuntu.com/questions/1053457/caps-lock-as-a-control-ctrl-key-though-the-shell-command), I found an easy fix:
  ```shell
  setxkbmap -option 'caps:capslock'
  ```
  *Edit: somehow this didn't seem to stick, maybe after rebooting or updates.*

### Theming

Eventually I gave in after spending too much time on [/r/unixporn](https://www.reddit.com/r/unixporn/) and decided to invest the time to compile Adapta from scratch, following the instructions on the [repository](https://github.com/adapta-project/adapta-gtk-theme). As a bonus, this also lets me customize the theme colors myself as well.
```shell
./autogen.sh --prefix=/usr \
	--enable-parallel --disable-gnome --disable-cinnamon --disable-flashback --disable-mate --disable-openbox \
	--with-selection_color=#f44336"" --with-accent-color="#e57373" --with-suggestion-color="#4caf50" --with-destruction-color="#ef9a9a"
make
sudo make install
```
And then I ended up using the pre-generated Adapta Red Grey Nokto instead of my own colors anyway.

I also used this [Adapta XFCE fix](https://www.xfce-look.org/p/1262068/) to get the menu bars to look right

And I used [Papirus folder icon colors](https://github.com/PapirusDevelopmentTeam/papirus-folders) to make the folders red like everything else. (This assumes you've already added the Papirus repository)
```shell
sudo apt-get install papirus-folders
papirus-folders -C red --theme Papirus-Dark
```

### Prettier login screen

First I want to fix the fact that this automatically logs in on boot. Turns out this is easy to fix inside of `sudo raspi-config`. Go to Boot Options > Desktop and select the option for desktop without automatic login.

OK, now to make that login screen as pretty as everything else. It's using its own greeter settings within lightdm, which are stored in `/etc/lightdm/pi-greeter.conf` (as I learned [here](https://www.raspberrypi.org/forums/viewtopic.php?t=164001)). I backed up the original and made mine look like this:
```shell
[greeter]
default-user-image=/home/pi/Pictures/raspberry-pi-logo-mono.png
desktop_bg=#d6d6d3d3dede
wallpaper=/home/pi/Pictures/wallpapers/mars-ultrawide.png
wallpaper_mode=crop
gtk-theme-name=Adapta-RedGrey-Nokto
gtk-icon-theme-name=Papirus-Dark
gtk-font-name=Montserrat 11
```
Now it matches the theme, fonts, icons, and background I already set up.

I also had to make sure that I had the font installed system-wide (putting it in `/usr/local/share/fonts`) and that both the font and images had the permission `644` (`-rw-r--r--`) so they could be accessed.

### Miscellaneous

- Change hostname. Edit `/etc/hostname` and `/etc/hosts` to swap in the new name you want. It should take effect on reboot. (I named mine `fortyone`, since It's in an Argon40 One case, similar to how my sister named her OnePlus One Phone `Two`.)
- Argon case setup: for fan and power button control
  ```shell
  curl https://download.argon40.com/argon1.sh | bash
  ```
  - Configuration: `argonone-config`
  - Uninstall: `argonone-uninstall`

## Booting from SSD

It's not yet possible on the Pi 4 to boot without any SSD at all, so it's time to use the same solution I did back when I first got a Pi 2: the SSD just has a tiny boot partition, and everything else goes on the SSD. Why move to the SSD in the first place? [Because it's faster!](https://www.tomshardware.com/news/raspberry-pi-4-ssd-test,39811.html). According to that article, it can be as much as 42% faster, for some tasks (also depending on the SSD, of course.) I couldn't find anything about *which* external SSD would be best suited to this task, so I ended up picking the [500 GB Samsung T5](https://www.amazon.com/Samsung-T5-Portable-SSD-MU-PA500B/dp/B073GZBT36) because it seemed like a well-received and reliable one in general.

I was planning to follow this [Tom's Hardware guide](https://www.tomshardware.com/news/boot-raspberry-pi-from-usb,39782.html), but based on the comments, people couldn't get it to work. Instead, I ended up directed to a [tutorial by James A. Chambers](https://jamesachambers.com/raspberry-pi-4-usb-boot-config-guide-for-ssd-flash-drives/) It has the additional benefits of being updated within the past week, and an author who seems very responsive when people have trouble getting it to work. But on the downside, it says:

> I highly recommend doing this on a completely new install. If you try to upgrade your old ones and something goes wrong there’s a good chance you might lose data. We will be modifying the boot partition, resizing partitions, etc. so don’t use a drive with any data on it unless you are positive you have all of the steps down!

Welp. Too late for that. Maybe I shouldn't have been so impatient and done all this stuff before my SSD arrived. But on the plus side, I wrote everything down in case I need to redo it! I'll also copy what I can to a flash drive and try to keep a record of programs installed so I can restore things if needed.

### Backup prep

From [this page](https://www.ostechnix.com/create-list-installed-packages-install-later-list-centos-ubuntu/) I figured out how to make a list of packages I can re-install from later. (It says it's for Ubuntu, but both Raspbian and Ubuntu are Debian-based, so it should work.) Since I did some weird custom installations (like Adapta and Code OSS), I might need to do some manual stuff after, but this is where my notes here come in.
```shell
dpkg-query -f '${binary:Package}\n' -W > pkglist.txt
```

I'll also need a list of PPAs so I can get actually get them later. Because I want the GPG keys and the sources lists, I think I'll just copy/save/backup the whole `/etc/apt` directory. (What could go wrong...)

So, I'll save the following to a flash drive:
- `/home/pi` (and I also put my `pkglist.txt` here)
- `/etc/apt`
- `/usr/share/themes` (which mightprevent needing re-compile the Adapta theme. But it also threw a bunch of errors about symlinks, so we'll see.)

### New Installation

For my own sanity, I'm not going to re-write the details of the tutorial (it's already very clear and well-written), but I'll note any quirks/issues/failures I ran into along the way.

- I skipped the USB quirks stuff at the beginning; if I run into an issue, I'll deal with it then.
- The instructions are adamant about using Balena Etcher to make the disk instead of `dd`, but Balena isn't working (and didn't for OctoPi either) so I rebeliously used `dd`. It worked for making my initial SD card.
- It always refers to `/dev/sda` as the SSD. In my case, it was, but I don't know if it's guaranteed that it will be. You can check before you start with `sudo fdisk -l`
- When I ran the storage benchmark at the end of the guide, I got a score of 6309, which is slightly below average for the T5, [according to the results online](https://storage.jamesachambers.com/fastest/). Based on a comment on the main page, I could play around with the Quirks stuff to maybe speed it up. But the results are also skewed by some people overclocking the crap out of their Pi 4s, so I'm going to call this good enough for now.

After I'm finished, the Pi is now using the "default" everything (`/home` and `/`) that's on the new SSD, but my "updated" versions (that I made on the SD card) are still on the SD card. Can I just copy the contents of these directories on the SD card to what's on the SSD? ...What's the worst that could happen?

Two things here: I need to keep the permissions on everything when I copy it, and I probably shouldn't do this on the system while I'm running it. So I powered down the Pi and plugged both the SSD and SD card into my desktop. It's important to keep track of which is which, because they'll look nearly identical. In my case, I plugged in the SD card first, so it mounted as `/media/jtebert/boot` (the partition we're not going to mess with) and `/media/jtebert/rootfs`. Then the relevant SSD partition mounted as `/media/jtebert/rootfs1`.

After some digging on Google, I found [this StackExchange post](https://superuser.com/a/713017/788876), which covered the issue of transferring everything with the right ownership and permissions. I left out all the things it talked about excluding, but I wanted to make sure I didn't mess with the `/etc/fstab` (leaving it to boot from the wrong place), so I marked that for exclusion. I also had to run it as root or some stuff wouldn't transfer because of permissions errors.
```shell
sudo rsync -axHAWXS /media/jtebert/rootfs/ /media/jtebert/rootfs1/ --info=progress\
    --exclude='media/jtebert/rootfs/etc/fstab'
```

Plugged them both back into the Pi, crossed my fingers, and it works! To make sure I wasn't tricking myself and it was actually running from the SSD, I ran:
```shell
findmnt -n -o SOURCE /
```
and indeed, `/` is on `/dev/sda2`, the SSD. That was a lot less painful than I expected, and I didn't even need to use my sketchy flash drive backup.

## Pi-hole

I hate intrusive ads. They're especially bad on mobile, where they massively slow everything down and mobile browsers don't have extensions to block them. (I know there are exceptions. It still sucks.) So let's set up network-wide ad blocking with [Pi-hole](https://pi-hole.net/).

The first hiccup here: it doesn't officially support Buster yet, the latest release of Raspbian. But at least people report it working anyway, so we'll just run with it.

It's got a convenient one command install:
```shell
curl -sSL https://install.pi-hole.net | bash
```

These seem to becoming much more common than when I last did Pi stuff three of four years ago, which is great for ease of use (if they work). The problem with this is a lack of guidance. When it asks you to select your upstream DNS provider, for example there's no additional information in the installer or on the main Pi-hole install page. I had to Google it and find a [Reddit thread](https://www.reddit.com/r/pihole/comments/aor5m3/upstream_dns_provider/).

Another issue: the script has to be run as root, but the one-liner they give you doesn't tell you that. It shows up as a quick failure/warning message before dumping you into a full-terminal view so you can't see it. (And then my install failed partway through and I had to restart to make DNS work on my Pi again.) So I tried running it with `sudo`, and the error went away, but the full screen thing crashed as soon as it appeared. I ended up doing `sudo su` and running it as root this way. Hacky AF.

There is a warning in the installer that the router could decide to take the static IP address that you're assigning on the device (in my case `192.168.0.107`), but normally routers are smart enough to avoid this. I haven't had a problem with my OctoPi server having its IP address getting re-assigned, so I'm probably fine. (FYI, I'm using a TP-Link Archer C7.) In case I mess something up while trying to reserve an address, I'll get this working first, then try setting that on the router.

Still, a relatively painless installation process, compared to some stuff. (After all, this was setting up an entire server behind the scenes.)

Now I have to configure things to use this new (hopefully functional) server. Before I put it on the whole network without asking my roommates, I should probably test this on my own devices. First thing: turns out it works on the device running Pi-hole without needing to do anything. Looking at the query log on [pi.hole](http://pi.hole/admin/queries.php), I see it's blocking stuff on the `localhost` client. I confirmed this by opening [speedtest.net](https://www.speedtest.net/) in an incognito tab: no ads! Meanwhile, that same page on my desktop has total ad cancer. We're in business!

### A side adventure in network management...

Now let's try to make my desktop use the Pi-hole. According to the [Pi-hole FAQ](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245) I should be able to go to my wi-fi settings and pick a network to edit. Then go to the "IPv4 Settings" tab, put in the Pi-hole's IP address, and change the method from "Automatic (DHCP)" to "Automatic (DHCP) addresses only." ...But that tab has no ""Automatic (DHCP) addresses only" option.

So I decided to see what these settings looked like on the Pi, only to realize that now using XFCE instead of the default PIXEL, I had no way to see or manage my networks. I was able to fix that problem by [installing a couple packages](https://raspberrypi.stackexchange.com/questions/67616/how-to-show-wifi-launcher-in-xfce): `blueman` and `wicd`. But since this is different than Network Manager, it didn't help in identifying the DHCP configuration issue.

...And when I restarted the computer, I got an icon for wifi in the sidebar (awesome!)... and I couldn't connect to the internet (not awesome!) It's now complaining that the network requires encryption and I don't have an encryption key. WTF. Turns out that means a password (not a user-friendly way to put this), and this different network manager apparently doesn't get access to the passwords from the other one. I have to first pick the right encryption method from a list of 18 options. According to the network manager on my desktop, the security type is "WPA & WPA2 Personal". Guess what's not an option in the Pi's settings? I tried "WPA1/2 (Passphrase)" and it said (after waiting...) "Connection Failed: Bad password". (Yes, I checked the password.) Then I tried pretty much every other option in the list. Then I tried the 2.4 GHz network instead of the 5 GHz network. Same result. Now I'm afraid that if I uninstall this, I'll totally lose any way to connect to the internet. So let's restart again and see what happens first?

...And now it's connected when it boots up?? I don't understand any of this. But the "Automatically connect" box is unchecked. And if I disconnect, I can't reconnect. So it seems like the Raspbian default network management is connecting it the first time, but when I disconnect, this new, other manager is failing. So I'll just uninstall it, hope the internet doesn't break, and worry about that later...

In the meantime, I just gave up on figuring this out myself and asked on Reddit what's going on with this Linux client/network issue. (I don't even know what to Google to solve this.)

Somewhere in my online searching, I ran across `pihole -d` as a thing that will give you debug output, so I ran it. It showed a bunch of stuff about `eth0` (wired internet) but not `wlan0`(wireless internet). After scratching my head and retrying the installation to reconfigure, rebooting, and running the debug again, my stupidity dawned on me. By default, `eth0` was selected in the terminal. I used my arrow keys to go down to `wlan0` and hit Enter. But enter doesn't select the option; it moves on to the next step. I never actually selected `wlan0`.

Does this solve my problem? Partially. On my Desktop, I still needed to make one change. I left the IPv4 method as "Automatic (DHCP)", but now I went back and unchecked "Automatic" next to DNS. Now, it would just check the Pi-hole for DNS. I had tried this before, but it didn't work because the Pi-hole wasn't actually connecting to the network. (It was trying to connect by ethernet, which it didn't have connected.) Now, it would *only* check the Pi for DNS, not the router.

Now speedtest.net doesn't have ads, and my Pi-hole queries show blocked ads from the Desktop!

## VPN

I was going to use the Pi to set up a VPN, but when I was digging around in the router settings to set up Pi-hole, I discovered that this router has the capability to manage a VPN itself. Thanks, TP-Link Archer C7 v4, and thanks, former roommate who purchased this router and left it behind.

I started with this [tutorial from TP-Link](https://www.tp-link.com/us/support/faq/1544/?utm_medium=select-local), which starts by saying you should already have dynamic DNS set up.

I created a hostname (`jtebert.hopto.org`) on [No-IP](https://www.noip.com/). Then in the router configuration (at `192.168.0.1`), I went to Advanced > Network > Dynamic DNS, and entered the info I had just set up. I didn't know what to do with the "WAN IP binding" option, but [this page](https://www.tp-link.com/ae/support/faq/1921/) suggests that I need to enable it. When I clicked Save, I got a little success message, so I guess it worked?

So now back to the VPN, under Advanced > VPN Server > OpenVPN. First, it complains I haven't generated a certificate. So scroll down to the next box and the page and click generate. (I don't know why it doesn't just do this automatically.) I left the "Service Type", "Service Port", and "VPN Subnet/Netmask" with their default settings, and set "Client Access" to "Internet and Home Network." (I think that means that using the VPN will mean that Pi-hole is in effect when using it, but we'll see.) Then hit "Export." This configuration file is what you'll use to set up/connect to the VPN from a client.

Let's try it, from the desktop this time. (Still in the same network, but if this doesn't work there are bigger issues.) Annoyingly, there's no OpenVPN client installed by default on Ubuntu, so we need to install it and integrate it with the network manager:
```shell
sudo apt install openvpn network-manager-openvpn network-manager-openvpn-gnome
```
Now, when you open up the network settings and click to add a VPN, there should be an option for OpenVPN. But don't use it directly; pick "Import from File" and use your exported `.ovpn` file.

But then when I tried to connect, it failed with no clear explanation of why. Hopefully the command line interface will at least give me an error message I can use:
```shell
openvpn --config OpenVPN_config.ovpn
```
It gave an error, but not an informative one. Eventually, I went back to the router page and discovered that I had forgotten to check the "Enable VPN Server" box. *Facepalm.*

Now I get a new error on the client CLI: `Cannot ioctl TUNSETIFF tun: Operation not permitted`. Copy and paste into Google, and I find out that [I have to run this as root](https://serverfault.com/questions/647231/getting-cannot-ioctl-tunsetiff-tun-operation-not-permitted-when-trying-to-con). Now the CLI interface gets to `Initialization sequence Completed`, which seems like success, but I don't know how to test if that means the VPN is working. But now when I turn on the VPN from the GUI, it says it connects almost instantly! And it shows up on the router's list of VPN connections.

With a bit more digging, I've discovered that people don't like No-IP. (For example, you have to log in and check a box every 30 days to keep your URL active.) [Duck DNS](https://www.duckdns.org/why.jsp) looks like a really nice option, and I could even [use my Google domain for DDNS](https://support.google.com/domains/answer/6147083?hl=en), but... my router doesn't support it. For some dumb reason, it has limited, fixed options for DDNS providers: DynDNS (which is apparently now shut down), No-IP, and TP-Link itself. The documentation on using TP-Link is limited at best. I was able to create and enable a domain, but for some reason the .ovpn file isn't including the new domain, even if I log out of No-IP. At that point, it was just putting in the raw dynamic IP, but it turns out that in the client, I can change it to `jtebert.tplinkdns.com` and it still works. Really annoying if the exported file contains the wrong IP address, though.


## Audio

I tried watching a YouTube video, because people send there are issues with 1080p video on the Pi. But I was too distracted by the horrendous audio: rattles, choppy, static, etc. And, like the network interface, I realized that I have no way of controlling the audio in XFCE. Fantastic.

I started with the [first link I found](https://mike632t.wordpress.com/2014/02/04/installing-xfce/), which is now almost 6 years old (and it shows):
```shell
sudo apt install alsa-base alsa-utils pimixer
```
That gets me a mixer I can at least open from the programs list, but nothing integrated into the settings, and no way to choose the output. (It's only playing from HDMI, and it doesn't even show the built-in audio jack.)

One thing that kept popping up was that some of this shows up in the "Indicators" panel widget, which didn't come up as an option for me. So I installed it:
```shell
sudo apt install xfce4-indicator-plugin
```
and nothing showed up.

[These instructions](https://ubuntuforums.org/showthread.php?t=2210233) let me get an icon (at least temporarily), but it's kludgy AF -- middle clicking on it opens alsamixer in a terminal, and a regular click mutes it and pops up the volume in the middle of the screen.

To change the audio output you can [use `sudo raspi-config`](https://www.raspberrypi.org/documentation/configuration/audio-config.md). Go to Advanced Options > Audio. But if you're using their PIXEL desktop environment, you can do it fromt he desktop taskbar. But if you're not using their DE, you're apparently shit out of luck.

I did discover that there's a PulseAudio Plugin you can add to the panel., which does actually let me control the volume and open a mixer. But it still doesn't let me change the audio output; it just shows Port: Analog Output (even though it's actually playing through HDMI).

## TODO

- Change username (which probably means [making a new user and moving stuff over](https://www.raspberrypi.org/forums/viewtopic.php?t=12270))
- Fix caps lock key... *permanently*
- [PiVPN](https://pivpn.dev/)
  - Another potentially useful tutorial](https://pimylifeup.com/raspberry-pi-vpn-server/)
  - Maybe use [No-IP](https://www.noip.com/) with it ([settings up Dynamic DNS](https://www.noip.com/support/knowledgebase/how-to-configure-ddns-in-router/))
- [PiHole](https://pi-hole.net/)
  - Might need [final config](https://marcstan.net/blog/2017/06/25/PiVPN-and-Pi-hole/) to make it work with PiVPN ([or this](https://github.com/pivpn/pivpn/wiki/FAQ#installing-with-pi-hole))
- Give it a local hostname and static local IP