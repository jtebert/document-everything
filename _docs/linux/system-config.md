---
title: System Configuration
parent: Linux
last_modified_date: 2021-02-16
---

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

Edit `/etc/fstab`:

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

Just add the following to your `~/.bashrc` (or `~/.zshrc`) file:

```bash
alias rr='if [ -f /var/run/reboot-required ]; then echo "reboot required"; else echo "No reboot needed"; fi`
```

## Command line history completion

*Note: this is useful for bash, but for ZSH, there's a nicer approach.*

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

## Make a shell command

This creates a bash command that can be executed in the terminal (from any directory, as any user, without sh)

One-time setup: add this to your `~/.zshrc`/`~.bashrc` file:
```shell
if [ -d "$HOME/bin" ] ; then
    export PATH="$HOME/bin:$PATH"
fi
```

For each script:

1. Create your script file in `~/bin`. Leave off the `.sh` filename extension when you're naming it so you don't have to type it to run it.
2. Start your script file with:
   ```shell
   #! /bin/bash
   ```
3. Give it the correct permissions to be executed:
   ```shell
   chmod 755 ~/bin/$SCRIPT
   ```
4. Run it to make sure everything’s working.

You can now also add the scripts in this folder to your [dotfiles](#saving-dotfiles-with-git).

Source: [Unix Stack Exchange](https://unix.stackexchange.com/questions/201768/storing-shell-scripts)
{:.fs-2}

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

## Saving dotfiles with git

I followed [this tutorial](https://www.anand-iyer.com/blog/2018/a-simpler-way-to-manage-your-dotfiles.html) to set up a repository containing my dotfiles. No symlinks required -- it Just Works™ with the existing files in their real locations.

[Here's my dotfiles repository.](https://github.com/jtebert/dotfiles)

- This is set up for [ZSH](https://www.zsh.org/). In particular, I use the [Powerlevel10k](https://github.com/romkatv/powerlevel10k) theme (installed through https://ohmyz.sh/).
- My ZSH theme configuration uses icons from [Nerd Fonts](https://www.nerdfonts.com/). I'm using the font [Hack](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/Hack/Regular/complete/Hack%20Regular%20Nerd%20Font%20Complete.ttf), but any Nerd Font from this repository should work.
- The `.zshrc` file already creates the alias for using the `dotfiles` syntax shorthand described below.

### Initial setup

Locally create the git repository for your dotfiles:
```shell
mkdir $HOME/.dotfiles
git init --bare $HOME/.dotfiles
```

Create an alias called `dotfiles` to use your repository from anywhere. Add this to `.bashrc` or `zshrc` (depending on which you're using).
```shell
alias dotfiles='/usr/local/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
```

Add a remote location for your repository (filling in your username, of course)
```shell
dotfiles config --local status.showUntrackedFiles no
dotfiles remote add origin git@github.com:<YOUR_GITHUB_USERNAME>/dotfiles.git
```

### How to use

You now have a git repository that you can see from anywhere, aliased to `dotfiles`. So you use the same syntax as `git`, but you replace `git` with `dotfiles`. For example:

```shell
# Add a file to the dotfiles repository
dotfiles add .bashrc
# See changes (this won't show unadded files, or it would contain your whole home folder)
dotfiles status
# Commit changes
dotfiles commit -m "Add bash config"
# Push changes
dotfiles push
```

### Setting up on a new machine

This version avoids issues with conflicts with existing default config files.

Clone into a new (temporary) subdirectory:

```shell
git clone --separate-git-dir=$HOME/.dotfiles https://github.com/jtebert/dotfiles.git tmpdotfiles
```

Move the contents into your home folder:

```shell
rsync --recursive --verbose --exclude '.git' tmpdotfiles/ $HOME/
```

Delete the temporary folder:

```shell
rm -r tmpdotfiles
```

## Using Tilix as default terminal application (with Gnome, at least)

Gnome defaults to `gnome-terminal` for its system terminal, but Tilix lets you tile terminals and nice stuff like that.

To make Tilix be the terminal that opens with the shortcut `Ctrl`+`Alt`+`T`, run:
```shell
sudo update-alternatives --config x-terminal-emulator
```
and choose Tilix from the resulting list of options.

Depending on your Ubuntu version, you may need to fix a Virtual Terminal Emulator (VTE) setting. If this is the case, you'll get a warning ("Configuration Issue Detected") when you open the Tilix preferences. You need to add the following to your `~/.bashrc` or `~/.zshrc` file. (This is already in my `.zshrc` in my dotfiles repository.)
```bash
if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi
```

You may also need to create a missing symlink, if the file `/etc/profile.d/vte.sh` doesn't exist:
```bash
sudo ln -s /etc/profile.d/vte-2.91.sh /etc/profile.d/vte.sh
```

Lastly, it's useful to have the option to right click in Nautilus (file explorer) and open Tilix in that folder. To make sure that works, you have to install the `python nautilus` package.

Sources: [Ask Ubuntu](https://askubuntu.com/questions/1135970/ctrl-alt-t-launches-a-different-terminal-than-that-from-the-launcher), [Tilix: VTE Configuration](https://gnunn1.github.io/tilix-web/manual/vteconfig/), [Tilix GitHub](https://github.com/gnunn1/tilix/issues/1529)
{:.fs-2}

## Using Cisco AnyConnect VPN

There's pretty nice integration for this on Chrome OS. But the Linux client was ugly and constantly cut/lost my connection. Harvard's IT people suggested this solution/alternative using openconnect and it actually worked.

Install openconnect:
```shell
sudo apt install network-manager-openconnect-gnome
```

Test that the VPN works by using it through the command line:
```shell
sudo openconnect VPNURL
```
In the case of the Harvard VPN, the url is `vpn.harvard.edu`. Also for Harvard, you can leave the second password entry (the one for two-factor authentication) blank, in which case you'll get the Duo mobile notification on your phone for approval.

Source: [Ask Ubuntu](https://askubuntu.com/questions/1033315/connecting-to-cisco-vpn-from-ubuntu-18-04-without-a-group-password)
{:.fs-2}

## Moving home directory to a new disk/partition

I did this to move my encrypted `/home` directory from my old HDD to a new NVME SSD.

1. Using [GParted](https://gparted.org/) (`sudo apt install gparted`), create an EXT4 partition on your target drive.
   - If there's no partition table (like on a new drive), go to `Device > Create Partition Table...`. See [this thread](https://ubuntuforums.org/showthread.php?t=1457901) for which to choose. TL;DR: If it's a Linux-only machine, choose GPT; if it's dual-boot with Windows, choose MBR (sometimes called MSDOS).
   - Right click on the bar showing the drive, and select `New`. Create an ext4 partition that fills the whole drive. Don't give it a name or label. Make sure that it is a Primary Partition. Click the check mark to apply the changes.
   - *While you're here,* make note of the name of the new partition (e.g., `/dev/sdb1` or `/dev/nvme0n1p1`).
2. Temporarily mount point your new drive.
   - Create a folder for mounting:
     ```shell
     sudo mkdir -p /media/home
     ```
   - Mount your drive. Use the drive name (and partition number) from step 1 to mount.
     ```shell
     sudo mount /dev/nvme0n1p1 /media/home
     ```
3. Copy everything to the new drive. If you've got a lot in your home directory, this will take hours.
   ```shell
   sudo rsync -avh /home/. /media/home/.
   ```
   By running this as root and using the `-a` flag, it will preserve the correct ownership of everything.
4. Check that everything copied correctly:
   ```shell
   diff -r /home /media/home
   ```
5. Set up your system to point to the new home location.
   - Get the UUID of your new partition:
     ```shell
     sudo blkid /dev/nvme0n1p1
     ```
   - Create a backup of `/etc/fstab` (because if you mess this up, your system won't boot)
     ```shell
     cp /etc/fstab /etc/fstab.bak
     ```
   - Edit `fstab`.
     ```shell
     sudo nano /etc/fstab
     ```
     In this, comment out the current line that mounts your home directory with `#`. Copy this line (uncommented, of course) and replace the UUID with what you got out of `blkid`. In my case, it looks like this:
     ```shell
     UUID=4f491680-ec96-453b-85a9-40d4faa20e86 /home ext4 noatime,errors=remount-ro 0 0
     ```
6. Reboot your computer. If you open up GParted, you should see that your new drive is mounted at `/home`. But you shouldn't see anything different in your experience, because everything should be exactly the same as on your old drive!
7. Clean up your old home drive. Once you're satisfied that everything is working correctly, you can reformat your old drive or remove everything from it with `rm`.

Sources: [TecMint](https://www.tecmint.com/move-home-directory-to-new-partition-disk-in-linux/), [Make Tech Easier](https://www.maketecheasier.com/move-home-folder-ubuntu/)
{:.fs-2}