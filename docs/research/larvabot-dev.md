---
layout: page
title: LARVAbot Development
parent: Research
permalink: /research/larvabot-dev
---

1. TOC
{:toc}

---

## Christmas Redesign

*This starts with development as of December 2019.*

The current version of the LARVAbot (PCB version 2.2, git commit [14f8468](https://github.com/jtebert/larvabot/commit/14f8468450e2ec294b87def1cffc1aaf779bde6e)) is based around a couple of main principles that I want to change/update:

### Change microcontroller from ATmega 328p to 32u4

There are many reasons for this. The thought of changing was first prompted by running out of interrupts when I put on the motor encoders. The quadrature encoders require 2 interrupt pins each, plus I need one for I2C communication. The 328p only has 2 interrupt pins. The 32u4 has 5 external interrupt pins (or 4, since 1 seems to be synchronous?).

This microcontroller is also what's running the Arduino Micro (and Leonardo), so if I set it up right, I can use it "natively" with the Arduino IDE (no need to install something from someone's Github repo to use the microcontroller). The Micro can also provide me with a template of what parts and connections I need to configure my own PCB to work this way, since it's all open source. Because it has native USB, I can also ditch the external programmer without needing a lot of extra stuff on the board to make that work (the way the Arduino Uno works). As a bonus, this would also simplify serial debugging with Arduino (instead of my current hacky approach of having a pair of TX/RX pins for an FTDI cable, which doesn't interface with the Arduino IDE.)

The limitation of this is that I would have to do a lot of redesign for this, both for the PCB and also the code. In addition, since the 32u4 has more pins than the 328p, even its large package looks way too small to solder by hand with a soldering iron. But Clark thinks that it's possible to do with reflow soldering on a hot plate or oven. And we have that in our lab! So it's a great excuse to learn to do that.

### Changing IR communication to digital

Currently I'm using IR phototransistors to detect whether there's a robot above it. This just uses the analog intensity, which means it's heavily dependent on background IR, and difficult to communicate a digital message (as I discovered in HTMAA). But as I learned in Physics 223, there are [IR receivers](https://www.adafruit.com/product/157) that process high frequency IR signals (like are sent by remote controls) and output a digital signal. ([And there are some easy-to-follow tutorials for it in Arduino.](https://learn.sparkfun.com/tutorials/ir-communication/all))

### Switching from 5 V to 3.3 V power

Currently, everything is powered by a 2-cell LiPo battery (7.4 V), which is used directly for the motors, down-regulated to 5 V for most of the circuitry, and 3.3 V for the IMU. Using 5 V means I need this 2-cell battery or an up-regulating voltage regulator. But it turns out I can probably easily switch almost everything to 3.3 V, which would have a bunch of advantages.

First, is it possible? All of the active components need to be able to function on 3.3 V, namely the motor driver, IR LIDAR, IMU, and [motor encoders](https://www.pololu.com/product/4761). According to their datasheets, we're in good shape!

Switching to 3.3 V means I can use a single-cell 3.7 V LiPo battery, which makes charging significantly easier because there's no need to worry about load balancing. Which means I can pull off charging it through the same USB I use for programming the board. (Yay, standardization!) Also, (with the exception of the motors), that theoretically means a 1/3 reduction in power consumption.

There are trade offs to this change, though. First is the motor power: 3.3 V is probably not enough to power the 6 V motors at the speed/torque that I want. But it's definitely possible to get a switching voltage regulator (probably on a breakout board) to power just that. Lowering the voltage also lowers the maximum possible clock speed. Instead of my current 20 MHz at 5V, I'd probably have to drop to 12 or 8 MHz.

### What now?

So what are the steps to do this? I can go down another PCB redesign rabbit hole, but it's tricky without a post doc electrical engineer to consult on component choice. On the other hand, how much time does it make sense to spend on code when I'm about to change a bunch of things? (To be fair, a lot of the changes will probably just be pin numbers; the biggest change will be interrupts for the encoders yet, which I haven't done anything for yet, anyway.)