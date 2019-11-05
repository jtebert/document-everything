---
layout: default
title: LARVAbot
parent: Research
permalink: /research/larvabot
---

# {{ page.title }}

1. TOC
{:toc}

---

*Coming soon, when I actually get something done.*

For now, see the [LARVAbot code](https://github.com/jtebert/larvabot) and [LARVAbot PCB](https://github.com/jtebert/larvabot-pcb) repositories.

## Arduino Setup

The current (in progress) version of the LARVAbot code is an Arduino library. Because the LARVAbot board is not a full Arduino board, there are some additional steps required to be able to program it from the Arduino IDE.

1. Install support for programming the raw microcontroller
   - In the Arduino IDE, open Preferences (`File > Preferences` in Linux, at least), and under "Additional Boards Manager URLs" add:
   `https://raw.githubusercontent.com/carlosefr/atmega/master/package_carlosefr_atmega_index.json`
   - Go to `Tools > Board > Boards Manager` and search `Barebones ATmega Chips` and install. The `Tools > Board` section should now include `ATmega Microcontrollers`.
2. Set up configuration for LARVAbot board. In the `Tools` menu, set the following:
   - Board: ATmega328/328p
   - Processor: ATmega328p
   - Clock: External 20MHz
   - Programmer: USBtinyISP (if you're using the FabISP or my design)
3. Burn the Arduino bootloader (this only needs to be done once for each robot)
   - Connect the robot via the ISP header pins
   - Make sure the right port is selected under `Tools > Port`
   - From the `Tools` menu, select `Burn Bootloader`
4. Install dependencies from `Tools > Manage Libraries...` by searching for the following:
   - [LIDAR library](https://github.com/pololu/vl53l0x-arduino): VL53L0X
   - SparkFun MPU-9250 9 DOF IMU Breakout
5. Install LARVAbot library to use with your own code
   -

Sources: [Carlos Rodrigues Github](https://github.com/carlosefr/atmega)