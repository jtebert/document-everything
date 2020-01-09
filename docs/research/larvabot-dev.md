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

Also, there are *definitely* things I haven't even tested on the current version of the board (like the motor drivers), so I should probably make sure that works before continuing on with my design...

There are a couple of relevant parts I'll need to add/change:

- **Charging circuit:** I can steal from this [SparkFun LiPo charger design](https://www.sparkfun.com/products/10217), which is dead simple for charging a single-cell LiPo. Since it's open source, they even provide the Eagle files for it, and all of the parts (like the [charging IC](https://www.digikey.com/product-detail/en/microchip-technology/MCP73831T-2ATI-OT/MCP73831T-2ATI-OTCT-ND/1979803)) are available on DigiKey. The circuit design looks very simple, at least. Plus, I can then ditch this other charging port *and* not have to open up the robot whenever I want to reprogram it.
- **Battery:** Time to swtich to single-cell. No idea how much capacity I need. My current 1200 mAh battery is probably excessive, though. I could also take this opportunity to pick a battery with a connector that I won't accidentally plug in backwards. (Which means I also need to find board-mountable female connectors for them.) [These 800 mAh batteries on Amazon look not completely sketchy.](https://smile.amazon.com/dp/B01N74TTW6/).
- **Step-up voltage convertor:** In the event that I need 5 V (which I'm realizing I might for the MCU if I want to be able to use it like an Arduino Micro), I will need a step-up convertor from 3.7 V to 5 V. Sparkfun [used to make one of these](https://www.sparkfun.com/products/retired/109680), but it's now retired because the 5V version of the part is not available anymore. Pololu makes a [different 5V convertor with a newer part](https://www.pololu.com/product/2564). It looks to be made of simple parts, but the chip it uses only comes in a [package no human can solder](https://www.digikey.com/products/en/integrated-circuits-ics/pmic-voltage-regulators-dc-dc-switching-regulators/739?k=TPS+6120&k=&pkeyword=TPS+6120&sv=0&sf=0&FV=-8%7C739%2C1779%7C249171&quantity=1&ColumnSort=0&page=1&pageSize=25).
- **32u4 microcontroller:** [It's on Digikey](https://www.digikey.com/product-detail/en/microchip-technology/ATMEGA32U4-AU/ATMEGA32U4-AU-ND/1914602). The 44-TQFP has pins sticking out, which means it's at least conceivable to solder it by hand. The other version of this (ATMEGA32U4**RC**-AU-ND) has an internal resistor/capacitor clock, which isn't super precise. The non-RC version means I need to add an external clock, but I'm already doing that, and I'll get a more precise clock. The Arduino website also has [all of the files for the Arduino Micro](https://www.arduino.cc/en/pmwiki.php?n=Main/arduinoBoardMicro) (all hail open source hardware), which means I can pick that apart to figure out what I need to make this thing function like an Arduino, and ditch the parts I don't need. (Again, it would be really nice to have an electrical engineer on hand to help with this.) Because I'm planning to power it 3.3 V with an 8MHz (or at least less than 16 MHz), I probably won't be able to directly use the Micro board within the Arduino IDE. But people have written [instructions on how to create your own custom board](https://www.hackster.io/wallarug/arduino-ide-creating-custom-boards-89f7a6).
- **Updated motor encoders:** Pololu has come out with a new varient for their [motor encoders](https://www.pololu.com/product/4761), which now feature JST plugs for attachment. Does this mean I can avoid having to solder as many tiny ribbon cable wires?? I do still have to figure out how to get wires with the relevant male ends for this, but I'm optimistic about less tiny sad soldering. (It looks like [Pololu even sells some](https://www.pololu.com/product/4762).)
- **IR receiver:** There are [through-hole ones on Sparkfun](https://www.sparkfun.com/products/10266), but I want to be able to stick these on top of the robots, so I'll probably go with surface mount if possible. The [TSOP6238TT](https://www.digikey.com/product-detail/en/vishay-semiconductor-opto-division/TSOP6238TT/TSOP6238TTCT-ND/3516290) on Digikey looks promising, with an excessive 45 m range and +/- 50 degree viewing angle. But I'm not certain whether the package it comes in is something I could solder. The [datasheet](http://www.vishay.com/docs/82463/tsop62.pdf) gives instructions for manual soldering, but I don't know if that's a standard thing, or perhaps just that it's technically possible to solder it by hand.

## 2020 January

On my battery connector conundrum, SparkFun might simplify things again with its internal consistency. They have a [right angle JST connector](https://www.sparkfun.com/products/8612) (and [corresponding DigiKey part](https://www.digikey.com/product-detail/en/jst-sales-america-inc/S2B-PH-SM4-TB-LF-SN/455-1749-6-ND/1059119) for slightly cheaper), and it's compatible with all of their [LiPo batteries, like this 850 mAh one](https://www.sparkfun.com/products/13854). (And I'd also trust these batteries more than the similar ones on Amazon with few and poor reviews.) And while I'm at it, I could also get [ribbon cable that doesn't suck](https://www.sparkfun.com/products/10647).