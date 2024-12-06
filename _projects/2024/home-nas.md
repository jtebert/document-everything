---
title: Home Server (NAS)
parent: "2024"
date: 2024-10-03
nav_order: -20241003
permalink: /projects/home-server-nas
---

1. TOC
{:toc}

---

The real "meat" of the home server system is... the server.

I started with what I want to run on this, and then figured out what hardware I'd need (or, as it turned out, already had).

I wanted to be able to have this function as "regular" network attached storage, be a backup target for my devices, and experiment with additional services like Jellyfin, Calibre web, and whatever else I might want to try out in the future.

It came down to deciding between TrueNAS Scale (I know Linux and I'm not learning FreeBSD to use TrueNaS Core) or Proxmox. After a lot of googling, I decided on Proxmox. First, it seems to be more popular in the home server crowd, and second, it's what we run on the server at work. So it will probably end up serving double duty for me to learn how to manage the server than our co-op set up before he left. Proxmox also supports ZFS, which is generally one of the selling points of TrueNAS.

With proxmox as the hypervisor, I'll start by running virtualized OpenMediaVault, and then use that as the storage backend for Nextcloud. Once I get that working, I'll try adding Jellyfin.

## Hardware

So what do I need to run this effectively? I saw three paths: (1) buy a mini-PC and connect my existing drives to it, (2) build a NAS system with a low-powered chip/board designed for a NAS, or (3) repurpose the old desktop computer parts I already have (maybe with some minor updates/tweaks)

For option #1, I pretty much eliminated the pre-built mini-PC because I wouldn't be able to nicely connect my four 4 TB hard drives to it; they don't expose SATA ports or power for them, and attaching by USB seemed like I was going down a janky path.

For option #2, I was looking at things in the N100/N3105 category or something like that. There are motherboards with built-in CPUs that are designed for NAS systems, and would support my hard drives. These are running the same types of CPUs as you'd find in those mini PCs. Their big benefit is that they're low power draw. But there are so many options in this space that it's really hard to sift through.

For option #3, here's what I had to work with:

- Intel i7 6700
- 32GB DDR4
- mATX motherboard
- 1TB NVMe SSD (boot drive)
- 4x 4 TB WD Black HDDs (storage; originally used to store a boatload of robot simulation results)
- Nvidia GTX 1060. For now, I'm leaving this out of the build, but I might add it back in later if I do more video transcoding or light machine learning stuff.
- 550W ATX PSU

My biggest concern here was the CPU; would this CPU from 2016 still be up to the tasks I wanted, eight years later? Reddit told me yes. My *other* concern was power draw. But once you compare the cost of buying a new system to the cost of running this one, it would take probably seven years (with pessimistic estimates of this being a bit of a power hod) to break even. And this is still going to give me a slightly more powerful CPU, way more RAM, and the possibility to slap in my existing GPU if I need it. So I'm going with this.

That said, I did buy a low-profile cooler to replace my existing chonker of an upright cooler: [ID-COOLING IS-40X V3](https://www.amazon.com/dp/B07MQV3G55). It's relatively cheap, has good reviews, says it supports my socket, and will take up a lot less room in my mini server.

I won't go into the physical setup of this in the rack here; for that, go check out my [mini server rack](/projects/mini-server-rack) project page.

## Proxmox

The first step for the server is to install proxmox on the NVME drive. I followed [installation guide](https://pve.proxmox.com/pve-docs/chapter-pve-installation.html). I'm using version 8.2-2, since it's the most recent stable release.

After downloading the ISO, I imaged a flash drive with it. (I checked my drive's name with the Gnome disks utility before running this.)
```shell
sudo dd bs=1M conv=fdatasync if=./proxmox-ve_8.2-2.iso of=/dev/sda
```
This just sat there for multiple minutes with no feedback while flashing the drive. Great design, `dd`.

Anyway: I was an idiot and didn't install this before shoving all my hardware into my little server rack that hid all the ports. So I had to drag a mouse, monitor, and keyboard down to the basement, then unscrew the bottom plate (which left the PSU hanging from the cables) to plug in all these peripherals and the boot drive.

Install was straightforward from here. I double checked that it was installing to the right drive, that the IP address it was assigning looked correct, and that the DNS server it picked was the PiHole.

With a reboot, I was able to go to `192.168.1.62:8006` and log in. (Pro tip: the username you need is `root`, plus the password you set before. This was *not* clear to me at first.) Then I could unplug my cable monstrosity. (In hindsight, I should have seen if there were any BIOS changes I should have made for passthrough stuff, but I didn't. I'll come back to this if I have problems.)

After a bit of digging, I found [this guide](https://portal.habitats.tech/Proxmox+VE+8+(PVE)/4.+PVE+8.x+-+Setup) that walked me through changing the source of updates to the non-subscription repository.

## ZFS

To have a place for all my data, I need to set up the hard drives I have connected to this thing. As an experiment, I primarily used Anthropic's Claude for this, while cross-checking its suggestions by googling what it recommended.

In the web UI's far left bar, I selected Datacenter > proxmox (since that's what I very cleverly named my system.) In the next column that comes up, I clicked Disks. Here, I could see the four hard drives I had connected. I selected each that had a partition already on it, and clicked Wipe Disk. (Otherwise, I discovered, it didn't show up for creating a ZFR pool.)

At this point, realizing how hot the disks already were and thinking about how high my electricity rate is here ($0.32/kWh), I decided to turn the system off and unplug one of the drives. This would give me 3 4TB drives, plus a cold spare, and when configured in ZFS, 8TB of usable storage. I have nowhere near that much data, so that's fine for now. And according to Claude, it could save me $10-$20/year in electricity.

Back to the ZFS setup: Under the 2nd column's Disks, I clicked ZFS. In its pane, I clicked "Create ZFS". I named it `datapool` because the AI told me to, and checked the boxes for my three drives.For the RAID level, I once again asked Claude, and settled on RAIDZ1, since this gives me 8 TB of data and can handle one disk failure. (I'll make it integrate with Home Assistant and alert me if a disk fails... I hope.) For Compression, I chose lz4, since both googling and Claude agreed on this. I left the "Add Storage" box checked, because I think this is actually what I want here. It means proxmox manages the storage, and handles some configuration to make it easy to install containers/VMs on. If I just wanted it raw and unmanaged, I'd uncheck this, but I do actually want to use this for VMs.

## OpenMediaVault

To install OMV as a virtual machine, I need to download the ISO for it. In the left column, under Datacenter > proxmox > local, I selected the "ISO Images" tab. With "Download from URL", I was able to give it the URL of the stable OMV image [from the OMV website](https://www.openmediavault.org/?page_id=77).

I could then use the big blue "Create VM" button in proxmox to create the VM. I used the ISO I just downloaded, and put it on the NVMe drive, gave it 2 cores, 2GB of RAM, and 32GB of disk space. I also gave it a network bridge, so it could talk to the rest of the network (I hope). I did click the "Advanced" checkbox on the first tab of this setup, which gave me the option to have this run at startup.

To *actually* get this up and running, I then clicked on the new VM in the left sidebar (`100 (OpenMediaVault)`) and went to the Console. I had to go through all of this system's first-boot setup. After this, this showed up as a new device on my network, so I could fix its IP address and visit the page -- for me, `192.168.1.198`, or `vault.local`. Annoyingly, the login info is *not* what I just configured in the setup, but `admin` and `openmediavault`. (How do they expect you to know that??) Once logged in, click the user icon in the top right, then "Change Password" to set a new password.

Then, I spent the better part of an hour arguing with Claude about how to connect it to the ZFS pool I just created. At one point, it tried to have me `dd` 2TB of data into a 32 GB partition. It was fine at other stuff in this process, but it completely shit its pants on this, for some reason.

After a series of screw-ups and some pleading with Reddit , I ended up with the setup below. (In two cases, I somehow managed to delete the OMV installation, so booting took me back to the ISO install page. Also, I somehow managed to make two devices with the same name, and therefore accidentally deleted the partition for OMV while it was running. True brilliance, all around.)

- When creating the initial VM, I set up the storage as 32 GB on `local-lvm` (the NVME SSD that proxmox is also installed on)
- Going through the installation in the Console tab for the VM in proxmox, this 32GB was the only storage, so it was installed there.
- After setup, I went to the VM's Hardware tab, then clicked Add > Hard Disk. For the "Storage," I selected the `datapool`, and set the size to 3TB. It turns out that this creates a 3TB virtual disk within the ZFS pool (I think that's a dataset?), which is available to OMV.
- Inside OMV, I went to Storage > Disks, selected this 3TB disk, and wiped it. Then, I went to Storage > File Systems, and created a new file system on this disk. I made it EXT4, because that's what most Linux stuff uses. Now, technically this is not optimal, because I now have a virtual EXT4 disk inside a ZFS pool, which introduces some overhead. Some forums will scream that this is a Terrible Idea, but when I asked on Reddit, they said it was fine. (I'm bottlenecked by gigabit internal networking and spinning hard drives, so I don't think it's really going to be a problem for me.)
- Now that I have a file system, I was able to create a Shared Folder on it.

With this created and (fingers crossed) working, I added and enabled the file browser plugin so that you can actually view the files in the shared folder from the web. It feels kinda weird to me that this isn't a default thing, personally.

### Tailscale

I want to set up Tailscale on OMV so that I can access this from outside my home network. In the OMV console within proxmox, I installed curl (`sudo apt install curl`) and then downloaded and ran the Tailscale install script (`curl -fsSL https://tailscale.com/install.sh | sh`). Then run `sudo tailscale up` to connect it to your account.

Now I can access OMV via `http://vault` (and the file browser from `http://vault:3670`). I'm always pleased with how simple Tailscale stuff is relative to everything else in these projects. I promise I'm not a shill.

### NFS access

I don't want to use the browser and download files every time I want to look at them. Time to set up NFS (for Linux access) and SMB (for Windows access). I did this once before to access files on the work OMV server, but of course, I didn't write down how I did it. So that's why I'm writing it down this time.

In the OMV UI, under Services > NFS > Settings, check to box to enable it. Then go to Shares, and add a new one. I used my shared folder (`teebert`), and set clients to `*`, which means I'm not restricting which IP addresses can NFS connect to it. Since I'm staying behind my Tailscale VPN, I feel OK about this. Permissions are Read/Write, and I left the default extra options (`subtree_check,insecure`).

On my laptop, I already have NFS installed (because work). But I guess just `apt install` the right thing? I think it's `nfs-common` on Ubuntu/debian.

I want to be able to automatically mount this  so I see it in my file explorer. I already have this example line for `/etc/fstab` from the work version:
```shell
fleet-nas-1:/export/RobotBackups /mnt/fleet-nas/robot-backups nfs defaults,nofail,x-systemd.automount,_netdev 0 0
```

Part of this (`x-systemd.automount`) means that it won't mount it until asked (which makes sense when this operates over Tailscale). And `nofail` means it won't freak out if it can't mount it. The `_netdev` option is because this is a network device.

Updated for my home server:
```shell
vault:/export/teebert /mnt/teebert nfs defaults,nofail,x-systemd.automount,_netdev 0 0
```

I also have to make sure that the mount point exists:
```shell
# Create the mount point
sudo mkdir /mnt/teebert
# Set the owner to my user
sudo chown -R jtebert:jtebert /mnt/teebert
```

Double check that I can ping the OMV server with `ping vault`. Then try mounting it, before adding it to fstab:
```shell
sudo mount -t nfs vault:/export/teebert /mnt/teebert -o defaults,nofail,_netdev
```
You should be able to see it with `showmount -e vault`. Or `cd /mnt/teebert`, and `ls`. Or in the file explorer. (I dragged it into the sidebar in Nautilus to save it as a bookmark.)

## Nextcloud

[Here's a guide](https://forum.openmediavault.org/index.php?thread/28216-how-to-nextcloud-with-swag-letsencrypt-using-omv-and-docker-compose/)

## Jellyfin

I want to do... something(?) with media. I don't actually know yet, but it's a common thing people use servers for. Plex used to be the go-to, and I once set it up on a Raspberry Pi (many years ago). But they seem to have made some unpopular choices recently, and Jellyfin is now becoming the cool new toy.

[Reddit says it's easier to install Jellyfin as an LXC](https://www.reddit.com/r/Proxmox/comments/1c3hbjl/jellyfin_on_proxmox/) (a container) rather than a VM. So I'll try that. One tricky thing I expect is that I want to be able to use hardware transcoding, but I didn't put in my whole GPU (for now), so I'm not sure if I'll have issues passing that through. ([Jellyfin does have a guide for this.](https://jellyfin.org/docs/general/administration/hardware-acceleration/))

## Calibre Web

I use a Kobo e-reader, and I'm currently maintaining my library in Calibre on my laptop. But now I discovered [Calibre-web](https://github.com/janeczku/calibre-web), which will let me store my library somewhere more stable, and also sync it to my e-reader.

I found [this useful Reddit thread](https://www.reddit.com/r/Proxmox/comments/ykhsqz/running_calibre_via_proxmox/) suggesting setting up an LXC within proxmox.

So I asked AI to help me set this up. (Full disclosure: No idea if this is actually the right way to do this.)

First, in the proxmox shell, I needed to get a debian base image for the LXC:
```shell
pveam update
pveam available | grep debian
# Choose the latest standard version for the command below
pveam download local debian-12-standard_12.XXXXXX
```

Then I clicked the "Create CT" button in the top right of proxmox. I gave the LXC 2 cores of CPU, 512 MB of RAM, and 16 GB of disk space in my ZFS datapool. I gave it a network bridge, set it to start at boot, and set the hostname to `library`. I set the IPv4 and IPvv6 to DHCP so I can manage the IP address from the router and make it static there.

Once this was up and running, I went into the LXC console and ran the following to get docker set up:
```shell
apt update && apt install -y docker.io docker-compose
# Set up where I'll put my data
mkdir -p /books /config
```

I then created a `docker-compose.yml` file (`nano docker-compose.yml`) and set it up as follows:
```yaml
version: "3.7"
services:
  calibre-web:
    image: linuxserver/calibre-web:latest
    container_name: calibre-web
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - DOCKER_MODS=linuxserver/mods:universal-calibre  # Remove this line if you don't need ebook-convert
    volumes:
      - /config:/config
      - /books:/books
    ports:
      - 8083:8083
    restart: unless-stopped
```

Then run `docker-compose up -d` and wait a minute or two to show up. Then navigated to `http://[your-container-IP]:8083` to go to the web interface (default username: `admin` and password: `admin123`).

It won't let you do anything until you set up the database. If you have none, you can add a default that's suggested in the calibre-web readme. But I already have my data on Calibre on my laptop. So I needed to upload that to the server.

After some trial and error, I needed to do the following. First, allow root SSH by adding the following to `/etc/ssh/sshd_config`: `PermitRootLogin yes`. (Probably best to disable this when you're done.) Restart SSH with `systemctl restart ssh`.

Then, on my laptop, I used `scp` to copy the Calibre library to the server:
```shell
scp -r ~/Library/* root@[LXC_IP_ADDRESS]:/books
```

The data is now there, but the permissions are wrong (they're owned by root.) In the LXC console, I ran the following to fix this:
```shell
chmod 775 /books
```

Then restart the container for it to take effect: `docker-compose restart calibre-web`.