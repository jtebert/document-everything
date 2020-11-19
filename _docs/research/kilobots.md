---
layout: page
title: Kilobots
parent: Research
update: 2019-06-13
---

1. TOC
{:toc}

---

## Fix Kilogui permissions error

When running this on Linux, I tried to connect to the USB IR controller as a Serial device. I got an error that it couldn't connect, so check if the device was in use. This message was actually masking a permissions error.

To check the permissions of the selected USB device, run `ls -la /dev/ttyUSB0` (or whatever the USB number is). You can one-time change the permissions for the device with `chmod 666 /dev/ttyUSB0`. I've been trying to implement a "permanent" rule change for the device permissions as suggested [here](http://ask.xmodulo.com/change-usb-device-permission-linux.html), but I haven't gotten it to work yet.

## Debug Kilobots with serial monitor

- Can use Putty, minicom, or any other serial terminal emulator to print out debug statements
- Using minicom:
  - Install with `sudo apt-get install minicom`
  - Set up: `sudo minicom -s`
    - Under `Serial port setup`:
      - `A - Serial Device`: `/dev/ttyUSB1` or something similar
      - `E - Bps` (baudrate): 38400
    - `Save setup as dfl` and then `Exit from Minicom`
    - If something's not working, try changing the Hardware/Software Flow Control and restarting minicom
  - Run the monitor: `sudo minicom` (`sudo minicom -c on` if you want pretty colors)
  - Quit: `Ctrl+a`, `x`
- Printing statements to terminal from kilobot:
  - Follow [this example](https://www.kilobotics.com/docs/debug_8h.html#acb61874a60dbc42389ed5f10264510d3) to add debugging to your code
  - To get stuff to print correctly on successive lines (in Linux, at least), put `\r\n` at the end of the `printf` statement.

## Locally compile Kilobot code

[I want to try this](https://diode.group.shef.ac.uk/kilobots/index.php/Getting_Started:_How_to_work_with_kilobots#Compile_your_own_control_software)