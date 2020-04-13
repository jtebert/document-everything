---
layout: page
title: Infinity ErgoDox Configuration
label: In Progress
grand_parent: Side Projects
parent: 2020
permalink: /projects/infinity-ergodox
date: 2020-02-03
nav_order: 98
---

1. TOC
{:toc}

---

I've been using my [Infinity ErgoDox](https://kono.store/products/infinity-ergodox-keyboard-kit) for a few years, which means it seems like it's about time to break everything by messing with the firmware.

By default, this uses a custom firmware developed by Kiibohd/Input Club, the creators of the keyboard. It's also QMK compatible, so I could program it [like I did for my fully home-built keyboard](/projects/keyboard). But that wouldn't give me control over the little LCD screens built into the keyboard, so what fun is that? But since the default firmware is all open source like the hardware, I can hack the crap out of it directly.

And luckily, someone has already worked out how to do this in a series of posts on Reddit. (They're three years old, so hopefully they still work.)

- [Building and flashing the firmware](https://www.reddit.com/r/MechanicalKeyboards/comments/5bjdxe/guide_the_infinity_ergodox_a_linux_guide/)
- [Modifying the firmware for advanced macros](https://www.reddit.com/r/MechanicalKeyboards/comments/5bjtt8/guide_infinity_ergodox_linux_guide_modifying/)
- [Altering the LCD screen](https://www.reddit.com/r/MechanicalKeyboards/comments/5coiu8/guide_infinity_ergodox_linux_guide_altering_the/)

I'm going to start by basically following this and filling in any details/gaps I run into along the way. (Luckily, it's already written for Linux.)

**EDIT:** Turns out they've change quite a bit, including getting rid of the online configurator. And their [new documentation for configuration and compiling](https://input.club/configurator-ergodox/) is frustratingly incomplete. So this will be more *fun* than originally planned.

## Building and Flashing Firmware

You need some dependencies to build the firmware yourself ([taken from the wiki](https://kiibohd.github.io/wiki/#/Setup?id=ubuntu)):
```shell
sudo apt-get install git cmake exuberant-ctags libusb-1.0-0-dev ninja-build gcc python3 lsb-release bsdmainutils
sudo apt-get install binutils-avr gcc-avr avr-libc
sudo apt-get install binutils-arm-none-eabi gcc-arm-none-eabi libnewlib-arm-none-eabi dfu-util
sudo apt-get install ruby ruby-dev screen
sudo gem install serialport
```

You'll also need to clone the controller/firmware repository:
```shell
git clone git@github.com:kiibohd/controller.git
```

`cd` into the repository's `Keyboards` directory.

We need to install the Python dependencies:
```shell
pip install pipenv
```
And then make sure it's set to use Python 3 (or this will break): ([See this note](https://stackoverflow.com/questions/56186765/python-3-how-do-you-tell-pipenv-to-use-python-3-and-not-python-2))
```shell
pipenv --python 3.6
```
Install/activate the pipenv:
```shell
pipenv install
pipenv shell
```

You can run a test to make sure everything is behaving as expected and your layout isn't broken (from within `Keyboard/Testing`)
```shell
./klltest.bash
```

Now you should be able to compile the controller (from within the `Keyboards` directory):
```shell
./ergodox.bash
```

<!-- You'll also need the IC Configurator. (This used to be online, but now you download it and do it locally.) -->

