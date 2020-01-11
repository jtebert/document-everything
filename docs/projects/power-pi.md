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
  sudo apt install xfce4
  sudo update-alternatives x-session-manager
  ```
- xfce extras
- ZSH (and download dotfiles)
- [ARM version of VS Code](https://code.headmelted.com/) (community-maintained Code OSS)
  ```shell

  ```