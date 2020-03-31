---
layout: page
title: Quarantine Bot
grand_parent: Side Projects
parent: 2020
permalink: /projects/quarantine-bot
date: 2020-03-29
nav_order: 97
---

1. TOC
{:toc}

---

## About

Are you stuck self-quarantining with a basement full of 3D printers and miscellaneous electronics?

No?

Well, [Clark](https://cbteeple.github.io/) and I are. So we decided to use our free time, basement junkyard, and combined engineering powers to build a robot that could be *sort of* useful in this pandemic.

Here's what we have in mind: a small wheeled robot with an arm on top that can grab things. In theory, this could be used to grab deliveries off of your porch so you don't have to go outside. In practice, it will probably wander around and bump into walls, like a Roomba without the usefulness of being a vacuum cleaner.

As a mechanical engineer, Clark is excited about designing and building the arm and gripper. I'm excited about the possibilities of what we could program this thing to do, like using an Intel Realsense to detect and pick up particular objects. We're both excited about over-engineering and over-designing this thing, and putting LEDs in it. Plus, I'm looking forward to seeing how a real engineer goes about designing and building something like this.

## Initial Design Ideas

We're trying to do as much of this as possible with the parts we have on hand. (Let's try to reduce to the risk to Amazon warehouse workers!) From our initial scratch-paper design, here's what we have in mind:

- All of the structural parts will be 3D printed. We'll probably go with PETG over PLA because it's less brittle. This includes the body, arm, wheels, and pulleys. For things like timing belts and tires, we can print in Ninjaflex TPU. (McMaster even provides [CAD files for timing belts](https://www.mcmaster.com/6484k118), which makes things even easier.)
- Because we also like things to look nice, we're thinking about how to give this thing a nice aesthetic. We're aiming for a sleek futuristic look with white and blue plastic, like a cross between R2-D2 and those stock photos of white plastic humanoid robots (but less creepy).
- Arm
  - 2 links with a pincher gripper at the end
  - 3 DOF powered by NEMA 17 stepper motors: bending at the base, elbow, and wrist. They're controlled by linkages, and motors are inside the body, connected by timing belts/pulleys. We'll rely on turning the body to get alignment.
  - Gripper pinching controlled by a servo motor mounted on the arm. And we could even add some Ninjaflex gripper pads
- Body
  - We're thinking a tear-drop shape, wider in the back for all the motors, and narrower in the front. The nose has to be wide enough to fit the RealSense (plus the USB-C cable that annoyingly sticks out sideways).
  - Since the arm will likely be reaching forward, placing it in the back of the robot will keep it from tipping the robot over if it grabs something heavy. The compromise is that this limits the workspace of the arm, since it has to reach over the front of the robot to get to things.
  - We'll put a strip of RGB LEDs around the whole body, because we can. Maybe they'll be useful for debugging, but mostly they'll be there to look cool.
- Drive control
  - Differential drive, powered by 2 NEMA 14 pancake motors. We'll align the base of the arm between the wheels, so we can just rotate the robot to control the rotation of the arm.
  - Wheels will be 3D printed in PETG with Ninjaflex tires.
  - We'll use a caster wheel in the front for balance.
- Control & sensing
  - Clark has a couple of [Intel RealSense D435](https://www.intelrealsense.com/depth-camera-d435/) depth cameras, so we can put one in the front of the robot for all of our sensing needs
  - The brains will be a Raspberry Pi 4, which has USB 3 to work with the RealSense and should have enough computational horsepower for everything we plan on doing.
  - For low level motor control/motor drivers, Clark has a spare [RAMPS 1.4 board](https://reprap.org/wiki/RAMPS_1.4) from a 3D printer. It can handle 5 motors, which will cover the 3 arm and 2 drive stepper motors.
  - Someone made the [Pi + RealSense do object detection](https://github.com/samhoff20/Realsense-Object-Detection-Public) using a [Coral USB accelerator](https://coral.ai/docs/accelerator/get-started/) for machine learning inference. It's really slick-looking and only costs $75. Clark also wants to try adding [Deep Object Pose Estimation](https://github.com/NVlabs/Deep_Object_Pose). Both of these would make is possible to tell the robot what to
  - To handle all of these pieces, including the RealSense, we'll probably need to use ROS. 😕 It's probably gonna end up ugly. But maybe it would be easier to add in a pre-built SLAM package or something like that.
  - In a far-off future, I'd make an app to control the robot (over Bluetooth or wi-fi), allowing you to give either high level commands (find/pick up/bring back the soup) or remote control the robot (e.g., inverse kinematics to move the arm/gripper). First we need a functional robot, and I also need to learn how to make an app.
- Power
  - The Pi runs on 5V but needs up to 3 Amps. I have a 20,000 mAh USB-C battery bank capable of powering of Chromebook and Switch, so that should be plenty
  - The stepper motors run at 12 or 24 V. A 3S (11.1V) LiPo battery should be enough. Clark estimates that a 2,000 mAh battery should be enough, but we haven't run any calculations to determine that for certain. We'll also probably need a LiPo charger so we don't blow ourselves up.

### Reference Robots

There are a lot of homemade robots floating around the internet, some better engineered than others.

**[ZeroBot Pro:](https://hackaday.io/project/25092-zerobot-raspberry-pi-zero-fpv-robot)** This is powered by a Pi Zero and comes in a very slick-looking body. It's also using the idea we had of wheels with Ninjaflex tires. And it's wifi connected for controlling the robot. At first glance, it also appears to be very well-documented to use for reference!

**[How to Mechatronics Arduino Robot:](https://howtomechatronics.com/projects/arduino-robot-arm-and-mecanum-wheels-platform-automatic-operation/)** This robot has the general structure of what we're aiming for: an arm on wheels. In contrast to what we're planning, it's using a weak and imprecise servo-powered arm, omni-wheels instead of differential drive, and an Arduino for control. But it also has an app for control, and that blue-and-white aesthetic.

**3D printed arms:** There are a lot of designs for 3D printed robot arms around Thingiverse, but Clark can point out a problem with all of them. They're servo-powered or poorly documented or have poor linkage design or use a 3D printed gear train with a lot of backlash, etc. And of course, none of them will match our aesthetic. But they're a useful reference for designing our own. (By which I mean Clark designing one. This falls squarely into his mechanicla engineering wheelhouse.)