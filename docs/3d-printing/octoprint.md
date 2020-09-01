---
layout: page
title: OctoPrint
parent: 3D Printing
nav_order: 3
permalink: /3d-printing/octoprint
---

1. TOC
{:toc}

---

This is my setup/usage for OctoPrint on a Raspberry Pi 3B+ connected to a Prusa i3 MK3S.

## Installation

1. [Download the latest OctoPi image](https://octoprint.org/download/)
2. Run a checksum on the zip file to make sure the file is valid. It should make the MD5sum shown on the OctoPrint website right below the download button.
   ```shell
   md5sum octopi-stretch-lite-XXXXXX.zip
   ```
3. Extract the `.img` file from the zip file (either with GUI or `unzip` command)
4. Insert your micro SD card and find its location. You can do this with the Gnome Disks GUI or with `sudo fdisk -l`. You'll get something like `/dev/sdx`
5. Unmount the disk, either with the GUI or `sudo umount /dev/sdx*`
6. Copy the image file contents to the SD card:
   ```bash
   sudo dd bs=1M if=your_image_file_name.img of=/dev/sdx
   ```
7. Remove and reinsert the SD card so it shows up correctly.
8. Set up the WiFi.
   1. Look for the SD card to show up as something like "boot". Open the file `octopi-wpa-supplicant.txt`.
   2. Uncomment the `WPA/WPA2 secured` section and add the network name and password.
   3. At the bottom of the file, uncomment the line with your country (probably US).

## Setup

1. Insert the SD card into the Pi and connect it to a decent power supply (at least 2 A, preferably 2.5 A).
2. Log in via SSH: (default password: `rasberry`)
   ```shell
   pi@octopi.local
   ```
   If you can't connect, check the [WiFi troubleshooting guide](https://community.octoprint.org/t/wifi-setup-and-troubleshooting/184).
3. Run `sudo raspi-config` for initial configuration
   1. Use "Change User Password" to set a more secure than the default
   2. Use "Localisation Options" > "Timezone" to set the time zone
   3. (Optional) Use "Network Options" > "Hostname" to change the hostname from `octopi`. (Your device will then be accessed at `HOSTNAME.local` instead of `octopi.local`.)
4. In your browser, go to `octopi.local` (or whatever you set in the previous step) or the Pi's IP address, and follow the setup wizard.
5. In the "Set up your printer profile" step, use the following values for the Prusa i3 MK3S (from the [OctoPrint forum](https://community.octoprint.org/t/known-printer-profiles-for-octoprint/3032)):
   - **Form factor:** Rectangular
   - **Origin:** Lower Left
   - **Heated bed:** yes
   - **Width (X):** 250 mm
   - **Depth (Y):** 210 mm
   - **Height (Z):**  210 mm
   - **Custom bounding box:** X: 0/250, Y: -4/210, Z: 0/210
   - **Maximum X speed:** 6000 mm/min
   - **Maximum Y speed:** 6000 mm/min
   - **Maximum Z speed:** 200 mm/min
   - **E (extruder) feed rate:** 300 mm/min
   - **Nozzle:** 0.4 mm
   - **Number of Extruders:** 1 *(See step 9 if you're using MMU.)*
6. After the wizard, obey the pop up and update OctoPrint!
7. If you connect a Raspberry Pi camera or a [supported webcam](https://github.com/foosel/OctoPrint/wiki/Webcams-known-to-work), it should just work with no additional configuration. (In my case, I had to reboot for it to show up, though. I'm using a Logitech C270.)
   - Depending on the camera, you may also benefit from modifying the camera settings. Run `sudo nano /boot/octopi.txt` and edit the `camera_usb_options`. Suggested values can also by found on the [OctoPrint Webcams wiki](https://github.com/foosel/OctoPrint/wiki/Webcams-known-to-work). For my C270, I set mine as:<br>
     `camera_usb_options="-r 1280x720 -f 30"`.
8. Install any plugins you want. I have a list of the ones I use in this [OctoPrint Plugins section]({{ 'linux/programs#octoprint-plugins' | absolute_url }}). For some reason, I had to disable connectivity checking (under Settings > Server) in order for it to connect to/find the plugin server, even though the connectivity check passes. ([See this forum post.](https://community.octoprint.org/t/i-cant-install-any-plugins-from-the-repository-it-is-unreachable/178/4))
9. **If you're using the MMU2S:** You'll need to modify the configuration (or else your filament won't switch). Under Settings > Printer Profile, click the pencil to edit the configuration. Under "Hotend & extruder," set "Number of Extruders" to 5, and check the box next to "Shared nozzle." Don't forget to click "Confirm" when you're finished.

Sources: [Raspberry Pi StackExchange](https://raspberrypi.stackexchange.com/questions/931/how-do-i-install-an-os-image-onto-an-sd-card), [All3DP OctoPrint Setup Guide](https://all3dp.com/2/octoprint-setup-guide-how-to-set-up-octoprint/), [OctoPrint Download & Setup](https://octoprint.org/download/)
{:.fs-2}

## Plugin Configuration

### Firmware Updater

SSH into the Raspberry Pi and install avrdude:
```shell
sudo apt install avrdude
```

Open Settings (wrench) and under "Plugins," select "Firmware Updater." Click the wrench in the upper right to get the plugin configuration, and set the following settings:

| Item                | Setting                          |
| :------------------ | :------------------------------- |
| Flash method        | avrdude (Atmel AVR family)       |
| AVR MCU             | ATmega2560                       |
| Path to avrdude     | `/usr/bin/avrdude` (and test it) |
| AVR Programmer type | wiring                           |

And you don't need to do anything for the advanced settings.

Now you can get the [latest firmware from Prusa](https://www.prusa3d.com/drivers/) and flash the HEX file with "Flash from File."

Source: [PrusaPrinters forum](https://forum.prusaprinters.org/forum/original-prusa-i3-mk2-s-others-archive/octoprint-firmware-upgrades/)
{:fs-2}

### Octolapse

Edit Main Settings > Uncheck "Always Display Navbar"

### Print Time Genius

Set it to use the output from PrusaSlicer (because all of the others seem to be terrible estimators).

### PrusaSlicer Thumbnails

By default, PrusaSlicer only generates thumbnail images for the Prusa Mini (as of the time I'm writing this). Luckily, you can edit your printer profiles to add it ([as described in the plugin description](https://plugins.octoprint.org/plugins/prusaslicerthumbnails/)).

1. Within PrusaSlicer, go to the menu: Help > Show Configuration Folder. This should open the folder containing the configuration/profile files.
2. Within the `printer` subfolder, open your desired printer profile in a text file.
3. Find the line that says `thumbnails =` and replace it with:
   ```
   thumbnails = 16x16,220x124
   ```
4. Save the file and restart PrusaSlicer to see it take effect.

### Tab Order

These are my tab settings (all with the color set to white, and the label unchecked):

| Icon                      | Tooltip      | Tab identifier      |
| ------------------------- | ------------ | ------------------- |
| `fas fa-camera`           | Webcam       | control             |
| `fas fa-thermometer-half` | Temperature  | temperature         |
| `far fa-clock`            | Octolapse    | plugin_octolapse    |
| `fas-fa-terminal`         | Terminal     | terminal            |
| `fas fa-draw-polygon`     | GCode Viewer | gcodeviewer         |
| `fas fa-folder`           | File Manager | plugin_filemanager  |
| `fas fa-clock`            | Timelapse    | timelapse           |
| `fas fa-layer-group`      | Mesh Map     | plugin_PrusaMeshMap |

### Themeify

Enable customization and add the following rule to correct the color of the temperature in the navbar:

```css
.navbar-text {
    color: #ffffff
}
```

## Connect PrusaSlicer to OctoPrint

- On OctoPrint, go to Settings (wrench icon) > Features > API and copy the API Key
- In PrusaSlicer, go to the "Printer Settings" tab and switch the "Advanced" or "Expert" configuration levels.
- Under "General" modify the "Print Host upload" with the following settings:
  - **Hostname, IP or URL:** octopi.local (or whatever you modified it to be)
  - **API Key/Password:** The API key you copied above
- Save as a new profile (mine is "Original Prusa i3 MK3S (OctoPrint)") and use this whenever you want to be able to directly upload to the printer.

Source: [PrusaPrinters Forum](https://forum.prusaprinters.org/forum/original-prusa-i3-mk3s-mk3-hardware-firmware-and-software-help/sending-gcode-directly-to-octoprint/)
{:.fs-2}

## Things to do

- Add a self-signed certificate to get access over https
- Set up for access outside the local network ([see this guide](https://octoprint.org/blog/2018/09/03/safe-remote-access/))
- Info about nyloc mod