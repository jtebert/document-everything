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

### Miscellaneous

- Change hostname. Edit `/etc/hostname` and `/etc/hosts` to swap in the new name you want. It should take effect on reboot. (I named mine `fortyone`, since It's in an Argon40 One case, similar to how my sister named her OnePlus One Phone `Two`.)

## TODO

- Change username (which probably means [making a new user and moving stuff over](https://www.raspberrypi.org/forums/viewtopic.php?t=12270))
- Change login screen
- Fix caps lock key... *permanently*
- Add SSD (when it arrives)