---
title: Useful Tips
parent: Linux
last_modified_date: 2020-02-13
---

1. TOC
{:toc}

---

## PDF Manipulation (CLI)

Split out a subset of pages:
```shell
qpdf --pages input.pdf 1-3,5 -- input.pdf out.pdf
```

Concatenate PDFs:
```shell
qpdf --empty --pages in1.pdf in2.pdf -- out.pdf
```

Concatenate PDFs using wildcards:
```shell
qpdf --empty --pages *.pdf -- out.pdf
```

Source: [Ask Ubuntu](https://askubuntu.com/a/672001/410248), [Stack Overflow](https://stackoverflow.com/a/53754681/2552873)
{:.fs-2}

## Programming Infinity ErgoDox

I have an ongoing attempt to [modify the ErgoDox firmware](/projects/infinity-ergodox). But in the meantime, here's how I'm programming this keyboard with the Kiibohd firmware.

I started with the [IC Configurator AppImage](https://kiibohd.github.io/wiki/#/Quickstart). I already had a layout from back in the days of the online Configurator that I wanted to modify. In the downloaded ZIP from that, I needed the contents of `MDErgo1-Default.json`. Within in the Configurator, I selected "Import Keymap" and pasted in the contents of that file.

From there, I made my modifications and clicked "Flash Keyboard." And even when I was in flash mode with one keyboard half plugged in, it didn't work. So I just flashed it manually. The dialog that appears for flashing the keyboard gives a file name where the compiled file is (in my case, `/home/jtebert/.config/kiibohd-configurator/firmware-cache/MDErgo1_Default_bffebbe02e60e62b/left_kiibohd.dfu.bin`). (There's also one for the right half of the keyboard.)

First, make sure you have `dfu-util` installed:
```shell
sudo apt install dfu-util
```

Then `cd` to the directory containing compiled firmware. Directly plug in only the keyboard half you're flashing, and put it into flash mode (using the button on the back or whatever keyboard shortcut you have already programmed in). Then run:
```shell
sudo dfu-util -D left_kiibohd.dfu.bin
```
or `right_kiibohd.dfu.bin` for the other half. (You're going to need a second, actually functional keyboard for that.)

Unplug the keyboard and repeat for the other half.