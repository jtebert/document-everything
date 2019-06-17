---
layout: default
title: System Configuration
parent: Linux
permalink: /linux/system-config
---

# System Configuration

- TOC
{:toc}

---


## Setting up additional internal drive

### Format your drive


I use gparted and set the whole thing to be a single ext4 partition with a gpt partition table. Note the partition ID (e.g., /dev/sda1) for the next step.

If you give your partition a label and name in this step, it'll make it easier to identify/remember in the next step and later on. Setting the name will also mean it's nicely labeled in your file explorer.


### Get the UUID of the disk

Run `sudo blkid` and copy the UUID for the partition from the previous step.

### Create a mount point

Choose a location where you want your drive to show up as, such as `/data`, `/media/data`, or `/media/USERNAME/data`. I don't actually know if there's a canonical way to choose the mount point. Since I'm generally creating a drive that's only used by my user, I generally create the mount point under my username.

Now create this directory to mount at, such as: (with your username filled in)

```bash
sudo mkdir /media/USERNAME/data
```

Then change this location to be owned by your user and group:

```bash
sudo chown -R USERNAME:USERNAME /media/USERNAME/data
```

### Set up automatic mounting

We'll add an entry to the filesystem table to detect and mount the drive by its UUID when the computer boots, and give your user read and write access to the drive.

**Warning:** If you mess up this file, your computer will possibly not boot. I suggest making a backup of it so you can revert if necessary.

Edit /etc/fstab:

```bash
sudo nano /etc/fstab
```

Add a line to the end of the file, using the UUID you got before:

```bash
UUID=YOURUUID /media/USERNAME/data ext4 user=USERNAME,rw 0 2
```

A couple notes on this:

- Don't put quotes around the UUID
- The second entry is the mount point you set up in the previous step
- ext4 is the journaling system you formatted your partition as. I think you can also use `auto`, but why not be explicit if we know it? Also, if you set this wrong there's a possibility your computer won't boot.
- The `user=` and `rw` options specify that it will be mounted for your user with read/write permissions. (I don't really know much about all the configurations here. Check out the [Ubuntu documentation wiki](https://help.ubuntu.com/community/Fstab#Editing_fstab) for more info about this and fstab in general.)
- `0` is the "dump" flag. It's not used for much and has something to do with automatic backups. When it doubt, it's 0.
- `2` is the "pass". It means that fsck (filesystem check) will check this as a secondary partition. 0 means it will be skipped (common for external drives) and 1 will be checked first (usually used by your root partition).

### Check

Try manually mounting the drive:

```bash
sudo mount /dev/sda1 /media/USERNAME/data
```

Verify that it shows up in your terminal and file explorer and create a test file. (Checks that you can write as your user.)

And unmounting it:

```bash
sudo umount /media/USERNAME/data
```

Check that your test file isn't in the mount location. Remount and check that it is. (aka check that you actually wrote to the disk.)

Then reboot (verify that you didn't break fstab) and check that your drive mounted properly and your test file is there.

Sources: [Installing a New Hard Drive](https://help.ubuntu.com/community/InstallingANewHardDrive), [fstab](https://help.ubuntu.com/community/Fstab#Dump)
{: .fs-2}

## Check if computer restart required, with a bash alias

Sometimes you have to restart Linux after updates. If you do this with the software updater, it will tell you a restart is required. But I do my updates through the command line and am generally too lazy to restart my computer on a regular basis.

You can tell that a restart is required if the file `/var/run/reboot-required` exists. But I also never remember what that file name and location are to check that. But I can remember `rr`, so now I have an alias that uses that file to tell me if a restart is required based on the existence of that file. (This came from the [AskUbuntu answer](https://askubuntu.com/a/861286/410248).)

Just add the following to your `~/.bashrc` file:

```bash
alias rr='if [ -f /var/run/reboot-required ]; then echo "reboot required"; else echo "No reboot needed"; fi`
```

## Command line history completion

In Matlab, you can start typing a command, hit the up arrow, and it'll go through the history of commands that match what you've typed in. I like this feature and  want to use it in my general command line.

Turns out this is easy to do in Linux. Open the .inputrc file:

```bash
nano ~/.inputrc
```

Add this to the file:

```bash
## arrow up
"\e[A":history-search-backward
## arrow down
"\e[B":history-search-forward
```

Save and exit, then load the changes:

`bind -f ~/.inputrc`

## Prettier bash prompt

There's a [simple, awesome tool](https://www.kirsle.net/wizards/ps1.html) to help you do that. There's an interactive GUI to change color, boldness, and insert text. It will even show you a live preview of what your prompt will look like.

Below that on the page, there are a few lines of code to add this customization to your terminal. If you just want to try it out before finalizing, you can just copy and paste the `PS1=........` portion into your terminal. When you finalized what you want, open your `bashrc` file with `nano ~/.bashrc` and paste that entire block of code at the bottom. Then restart your terminal to make sure everything worked.

The command prompt customization is user-specific, which has a bunch of benefits: it will show up when you SSH into your user, it will show up no matter what terminal you use, and it lets you distinguish between users (so you don't accidentally do everything as root, for example).

Currently, here's what mine looks like (copy and paste into your terminal to check it out):

```bash
PS1="\[$(tput bold)\]\[$(tput setaf 2)\]\n\u@\h: \[$(tput setaf 7)\]\w\[$(tput setaf 3)\]\n\\$ \[$(tput sgr0)\]"
```

## Fix "System program problem detected" on every boot

Contrary to what I thought, these errors popping up every time you turn the computer on doesn't mean that there is always a bunch of stuff crashing on start up.  It means that something crashed in the past and somehow never got cleared from the crash reports.  So that means there is a simple fix!

All you have to do is clear the crash reports, which you can do with one line in the terminal:

sudo rm /var/crash/*
And when you reboot, the pesky errors from before shouldn't make a reappearance.  If something does, it probably really does mean something is crashing on start up and needs to be investigated further.

Source: [Ask Ubuntu](http://askubuntu.com/questions/133385/getting-system-program-problem-detected-pops-up-regularly-after-upgrade)
{: .fs-2}

## Make a bash command

This creates a bash command that can be executed in the terminal (from any directory, as any user, without sh)

1. Create a text file in any location with the first line:
   ```bash
   #! /bin/bash
   ```
2. Add comments in it on lines starting with `#`
3. Add the commands you want the script to execute
4. Move the file to the correct location with:
   ```bash
   sudo mv $SCRIPT /usr/bin
   ```
   (where `$SCRIPT` is the name of the file)
5. Give it the correct permissions to be executed:
   ```bash
   sudo chmod 755 /usr/bin/$SCRIPT
   ```
6. Run it to make sure everything’s working.

## Automatic backups (with cron and rsync)

I use this for creating a daily uncompressed backup of data of my internal data drive to an external hard drive.

Create a bash script somewhere (I have it in the main directory of what I'm backing up) containing the following:
```bash
rsync -av --delete SOURCE DESTINATION
```
Mine looks like this:
```bash
rsync -av --delete /media/jtebert/data /media/jtebert/data-backup/backup
```
Note that the `--delete` flag means anything placed in the destination that's not in the source will be deleted. In other words, use the backup as a backup, not to actually edit stuff.

Then make sure the script is executable:
```bash
chmod +x /path/to/backup-script.sh
```
You can now directly run this script to verify that it does what you expect.

Now we'll create a cron table entry to automatically call this script at some time every day (this is set to 3 AM). Open the cron table with:
```bash
crontab -e
```
And add the following line:
```bash
0 3 * * * /path/to/backup-script.sh
```
Check back the next day and you should see a copy of everything from your original folder in the backup location.

Source: [How-To Geek](https://www.howtogeek.com/135533/how-to-use-rsync-to-backup-your-data-on-linux/)
{:.fs-2}