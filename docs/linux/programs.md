---
layout: default
title: Programs to Install
parent: Linux
permalink: /linux/programs
---

# {{ page.title }}

1. TOC
{:toc}

---

## Everyday

| Program                                               | Purpose                                                                              |
| :---------------------------------------------------- | :----------------------------------------------------------------------------------- |
| [Chrome](https://www.google.com/chrome/)              | Browser                                                                              |
| `sudo apt install tilix`                              | Better terminal ([configuration]({{ 'linux/system-config#eagle-create-desktop-entry' | absolute_url }}))        |
| `sudo apt install inkscape`                           | Vector graphics editor                                                               |
| `sudo apt install gimp`                               | Raster graphics editor                                                               |
| [Typora](https://typora.io/)                          | Markdown editor                                                                      |
| [MuseScore](https://musescore.org/en)                 | Music notation                                                                       |
| [Spotify](https://www.spotify.com/us/download/other/) | Music                                                                                |
| [Z shell]({{ "linux/zsh"                              | absolute_url }})                                                                     | Better interactive shell |

## Visuals

| Program                                                                                              | Purpose                             |
| :--------------------------------------------------------------------------------------------------- | :---------------------------------- |
| [Adapta GTK Theme](https://github.com/adapta-project/adapta-gtk-theme)                               | Clean dark theme                    |
| [Adapta-gtk-theme-colorpack](https://www.gnome-look.org/p/1190851/)                                  | Change Adapta accent color          |
| [Plata GTK Theme](https://www.linuxuprising.com/2018/11/plata-is-new-gtk-theme-based-on-latest.html) | Clean darker theme                  |
| [Papirus icons](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme)                        | Material-inspired icons             |
| [Papirus folders](https://github.com/PapirusDevelopmentTeam/papirus-folders)                         | Match folder icons to Adapta colors |


## Gnome Extensions

| Program                                                                               | Purpose                                                     |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| [Alternatetab](https://extensions.gnome.org/extension/15/alternatetab/)               | Alt+Tab switches by window instead of program               |
| [Dash to dock](https://extensions.gnome.org/extension/307/dash-to-dock/)              | More configuration of dash bar                              |
| [OpenWeather](https://extensions.gnome.org/extension/750/openweather/)                | Show weather in top bar                                     |
| [ShellTile](https://extensions.gnome.org/extension/657/shelltile/)                    | More places to snap windows                                 |
| [Suspend button](https://extensions.gnome.org/extension/826/suspend-button/)          | Add a suspend button to the main dropdown                   |
| [User themes](https://extensions.gnome.org/extension/19/user-themes/)                 | Allow user themes described above                           |
| [Workspace Indicator](https://extensions.gnome.org/extension/21/workspace-indicator/) | Label/number workspaces in the top bar                      |
| [Material Shell](https://github.com/PapyElGringo/material-shell)                      | Tiling WM style for Gnome (clear `~/.cache` if misbehaving) |

## Work/Research

| Program                                                                                   | Purpose                                                                                                               |
| :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| [Kilogui](https://github.com/acornejo/kilogui/releases)                                   | Programmer interface for Kilobots                                                                                     |
| [Mendeley](https://www.mendeley.com/guides/download-mendeley-desktop/ubuntu/instructions) | Managing papers                                                                                                       |
| [Eagle](https://www.autodesk.com/products/eagle/overview)                                 | PCB design ([configuration]({{ 'linux/program-config#using-tilix-as-default-terminal-application-with-gnome-at-least' | absolute_url }})) |
| `sudo apt install minicom`                                                                | Serial monitor terminal (for Kilobots and LARVAbot)                                                                   |
| [PrusaSlicer](https://github.com/prusa3d/PrusaSlicer/releases)                            | 3D printing slicer                                                                                                    |
| `sudo apt install openscad`                                                               | Script-based CAD                                                                                                      |

## Programming

| Program                                                        | Purpose                                                                                     |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Visual Studio Code](https://code.visualstudio.com/Download)   | General-purpose code editor + git integration                                               |
| [Matlab](https://www.mathworks.com/downloads/)                 | "Programming"                                                                               |
| [Arduino IDE](https://www.arduino.cc/en/guide/linux)           | Programming Arduinos/microcontrollers ([configuration]({{ 'research/larvabot#arduino-setup' | absolute_url }})) |
| [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) | Manage Heroku projects                                                                      |

Install relevant development packages all at once:

| Item            | Install                                                                                                                                            |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Python 2        | `sudo apt install python-dev python-pip`                                                                                                           |
| Python 3        | `sudo apt install python3-dev python3-pip`                                                                                                         |
| Python packages | `pip3 install numpy scipy matplotlib pandas seaborn tables h5py jupyter pylint dash plotly`                                                        |
| Jekyll          | `sudo apt install ruby-full build-essential zlib1g-dev & gem install jekyll bundler`                                                               |
| Node/NPM        | `sudo apt install nodejs build-essential` or [PPA or NVM](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) |
| Other           | `sudo apt install libhdf5-dev htop`                                                                                                                |

## Miscellaneous/Utilities

| Program                                                                                                  | Purpose                                                         |
| :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher)                                      | Automatic desktop integration when you first launch an AppImage |
| `sudo apt install synaptic`                                                                              | GUI for package management                                      |
| `sudo apt install gparted`                                                                               | GUI for disk partitioning                                       |
| [Insync](https://www.insynchq.com/)                                                                      | Google Drive client for Linux                                   |
| `sudo apt install duplicity`                                                                             | Déjà Dup automatic backups                                      |
| [Nvidia drivers](https://www.mvps.net/docs/install-nvidia-drivers-ubuntu-18-04-lts-bionic-beaver-linux/) | Proprietary GPU drivers (now may be included, Ubuntu 19.10+)    |
| `sudo apt install gnome-tweaks`                                                                          | Make Gnome usable                                               |
| `sudo apt install dconf-editor`                                                                          | Edit Dconf files                                                |

## OctoPrint Plugins

For OctoPrint installation/setup and more information, see my [OctoPrint page]({{ '3d-printing/octoprint' | absolute_url }})

| Program                                                                     | Purpose                                   |
| :-------------------------------------------------------------------------- | :---------------------------------------- |
| [CustomBackground](https://github.com/jneilliii/OctoPrint-CustomBackground) | Change background on temperature graph    |
| [FileManager](https://github.com/Salandora/OctoPrint-FileManager)           | Separate tab for direct file management   |
| [Firmware Updater](https://github.com/OctoPrint/OctoPrint-FirmwareUpdater)  | Update printer firmware                   |
| [Fullscreen Camera](https://github.com/BillyBlaze/OctoPrint-FullScreen)     | Make camera full screen with double click |
| [NavbarTemp](https://github.com/imrahil/OctoPrint-NavbarTemp)               | Show temperatures in top bar              |
| [Octolapse](https://github.com/FormerLurker/Octolapse)                      | Pretty timelapses                         |
| [Printer Stats](https://github.com/amsbr/OctoPrint-Stats)                   | Tab of various printer stats              |
| [Print Time Genius](https://github.com/amsbr/OctoPrint-Stats)               | Better print time estimation              |
| [Prusa Mesh Map](https://github.com/PrusaOwners/OctoPrint-PrusaMeshMap)     | Mesh bed leveling for Nyloc mod           |
| [TabOrder](https://github.com/jneilliii/OctoPrint-TabOrder)                 | Set tab order and icons                   |
| [The Spaghetti Detective](https://www.thespaghettidetective.com/)           | Watch for failed prints                   |
| [Themeify](https://github.com/birkbjo/OctoPrint-Themeify)                   | Dark theme!                               |
| [TouchUI](https://github.com/BillyBlaze/OctoPrint-TouchUI)                  | Make it finger-friendly                   |