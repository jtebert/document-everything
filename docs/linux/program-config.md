---
layout: default
title: Program Configuration
parent: Linux
permalink: /linux/program-config
---

# System Configuration

1. TOC
{:toc}

---

## Node: Update

Ubuntu comes with an old version of Node.js and it's a pain in the ass to update and make it use the updated version. Node version manager (nvm) worked for me.

Install nvm:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

In a node terminal/tab, list Node versions:

```bash
nvm ls-remote
```


Install one of the versions, e.g.:

```bash
nvm install v10.9.0
```

Check that it's now using the new version:

```bash
node -v
```

Source: [Ask Ubuntu](https://askubuntu.com/a/932885)
{: .fs-2}

## Eagle: Create desktop entry

Eagle is self-contained to a folder when you download and unpack, which is convenient for some things. But mostly not. I want to be able to open it like any other program.

Unpack the downloaded tar.gz file to `~/.local/share/Eagle/`. You should now have a subfolder named something like `eagle-<version>/`

Create a file called `eagle.desktop` in `~/.local/share/applications/` containing the following:

```
[Desktop Entry]
Name=Eagle
Type=Application
Exec=/home/<username>/.local/share/Eagle/eagle-<version>/eagle
Terminal=false
Icon=/home/<username>/.local/share/Eagle/eagle-<version>/bin/eagle-logo.png
Version=<version>
Categories=Development
```

Where `<version>` is the Eagle version number (like 8.6.3) and `<username>` is your username. If you're using a theme that has an icon for Eagle, you can replace the `Icon` value with the name given to that icon.

Whenever you get a new version of Eagle, you'll have to update the version number in this `.desktop` file to point to the right location.

## JetBrains IDEs: Installation

### Installing

JetBrains makes nice IDEs for a bunch of languages (for us mere mortals who don't use vim or emacs). But they don't make installing on Linux super easy. Here's how I do it.

- Download the relevant program and version from the JetBrains website (it's a `.tar.gz` file)
- Extract the folder inside to `~/.local/share/JetBrains/`
- `cd` into the bin folder: `~/.local/share/JetBrains/<program>-<version>/bin`
- Run the launch script from the command line (something like `./pycharm.sh`)
- When the program opens, click Tools > Create Desktop Entry. You can either make it user-specific or global.

### Updating

If you're installing an update, follow the same steps. Creating a new desktop entry should overwrite the old one, but you may need to restart your session for it to take effect. (For me in Gnome, that's Alt+F2, then `r`). Also note that if you have a user-specific desktop entry, that will take precedence over a system-wide one.

### Changing the Icon

By default, the created desktop file will use the icon in the installation folder. That means it will probably ignore an icon set by a theme (if you're using one). You'll have to do this after you create a new desktop file from updates as well.

- Open the desktop file (probably `~/.local/share/applications/jetbrains-<program>.desktop` for user-specific or `/usr/local/share/applications/jetbrains-<program>.desktop` for system-wide)
- In the line that says `Icon=` change it to just the program name -- e.g., `Icon=pycharm` and restart your session.

## Matlab: Force nice SVGs

Sometimes Matlab decides that the figure you're trying to export is too complicated for proper SVG exporting. When you go to export the figure with `saveas`, it creates an SVG with embedded images instead of vector graphics. (This is all in Matlab 2014b and later, with its new graphics system.) After digging through Google results and documentation, there is a solution to force it to export as a vector image ([from the `saveas` documentation](https://www.mathworks.com/help/matlab/ref/saveas.html)):

Set the renderer for your figure to `'painter'`:

```matlab
fig = figure;
fig.Renderer = 'painter';
```

Then save the figure as normal:

```matlab
saveas(fig, 'my_figure.svg');
```

And you'll have a proper vector plot.

## Nautilus: Remote file access with SSH/FTP/SFTP

Sometimes it's useful to be able to actually see the files that you are accessing remotely.  So, instead of just using ssh in the command line, it's useful to have a GUI.  Instead of installing extra programs, though, you can just do it directly from within your file browser in Linux.

In the Nautilus file manager just enter into the location bar (you might have to hit Ctrl+L to edit it):

```bash
ssh://username@host
```

Or whatever your preferred accessing method is (ssh, stfp, ftp).  (Also useful to remember: the change the location bar from buttons to a text field, hit Ctrl+L.)

The remote directory is then mounted and appears on the left side bar.  It will stay mounted even if you close Nautilus, and you just have to click on it to re-open it.  To unmount, just click the arrow next to it in the panel (like unmounting/ejecting a drive/disk).