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

**3D printed arms:** There are a lot of designs for 3D printed robot arms around Thingiverse, but none of them are quite right for our purposes. They're servo-powered or poorly documented or have poor linkage design or use a 3D printed gear train with a lot of backlash, etc. And of course, none of them will match our aesthetic. But they're a useful reference for designing our own. (By which I mean Clark designing one. This falls squarely into his mechanical engineering wheelhouse.)

## Wheels

This seems like a part I can work on while Clark designs the arm.

We're design this to work with NEMA 14 pancake stepper motors, because they're compact and will fit in line with the three NEMA 17 motors planned for the arm without making the robot too wide. But mostly because we have them. We'll have to see if they're powerful enough, though. (Spoiler from later: they're not.)

We have to mount the wheel to the motor shaft, but we don't have any set screws, and if you screw into the 3D printed plastic that would strip out immediately. So we need to leave space to stick an M3 nut into the hub and screw an M3 screw into that. In the first test print, I only allowed a 0.1 mm tolerance on the hole for the shaft, and it fit on so tightly that we had to cut the print off. Oops.

![motor mounting design](/assets/img/projects/quarantine-bot/wheel-motor-mount.jpg)

Consistent with our design goals for this robot, I want to get that nice curved/futuristic aesthetic. Most of the time for this was invested in getting the spokes to look just right. I also designed it with a curved front face, which means we need to print with that side up and a ton of support material on the underside/back (which no one will see when the robot is assembled). I was worried that the gently curved top surface would result in the ugly stair stepping effect that you get on 3D prints from the large layer height relative to the slope. However, the latest PrusaSlicer (2.2) comes with an automatic variable layer height, which reduces the layer height to as low as 0.07 mm for the most gently sloped areas. The result is much cleaner than I expected.

![curved wheel surface with variable layer height](/assets/img/projects/quarantine-bot/orig/wheel-surface.jpg)

### Tires

The wheels also need tires for grip, which we're printing with Ninjaflex. Since Clark's printer has a bowden extruder, it can't print flexible materials. That means we're printing it on my printer, which I've never tried printing Ninjaflex on before. So the first step here is to figure out the settings I need to print Ninjaflex. I started with this [Ninjaflex printing profile for the Prusa MK3](https://www.prusaprinters.org/prints/12586-ninjaflex-profile-zero-stringing-flawless-print-be) that someone else made, and printed a 20 mm calibration cube. It's the one on the left here:

![Ninjaflex calibration cube attempts](/assets/img/projects/quarantine-bot/ninjaflex-calibation-cubes.jpg)

It started out so promising. So I tried again, this time turning off retraction, since that can cause flexible filaments to get backed up and wound around the extruder gears. It failed again. I tried turning down the print speed from 15 mm/s to 10 mm/s. Still failing. I got a number of prints like the middle one in that picture -- frustratingly worse than my first attempt.

Eventually, I loosened the idler gear in the extruder and was able to get the cube on the left. Huzzah! Apparently having the gear too tight squishes the filament out of shape and makes it more likely to fail. I don't understand the mechanics behind it, but it's a common suggestion I saw online, and it worked. My cube definitely isn't perfect. The perimeters didn't adhere to each other and some of the layers separated. It was only printed at 15% infill, so that might have played a role. I think this clear filament is also particularly unforgiving when it comes to showing flaws, since every small detail/error reflects and refracts the light to make it as visible as possible. It's good enough, though, especially since we're printing the tire at 100% infill. So let's invest 7 hours to print this tire!

I also make another fun discovery while trying to print Ninjaflex: if I unload it from the printer menu, it's too fast and the filament gets wrapped around the extruder gears. I ended up unloading by slowing moving the extruder motor position from the settings menu.

6 hours and 53 minutes later, the tire actually printed successfully! We're still seeing the perimeter separation, which seems to indicate that we're getting consistent under-extrusion. Since it's at least consistent, we could bump up the extrusion multiplier in the slicer to compensate. But it's a functional tire.

![Picture of completed tire](/assets/img/projects/quarantine-bot/tire-print.jpg)

And I think it looks pretty dang good all put together:

![Wheel and tire assembled](/assets/img/projects/quarantine-bot/wheel-complete.jpg)

Let's jump back a couple steps here to talk about the design of the tire. To make sure the tire stays seated on the rigid wheel and doesn't slip, we have notches in the tire and corresponding nubs on the wheel to keep it in place. The size, angle, and number of these was pretty arbitrary, with one exception. Since the tire is printed flat, it has to be able to print the overhang angle for the sides of the notches, and Ninjaflex doesn't like to print overhangs. I could have printed an overhang test, but I'm lazy, so I just made a guess that it could probably handle 40° from horizontal. It turned out I was right on that, but that's a relatively shallow angle, which also allows a bit of slipping side-to-side on the wheel. (On the plus side, it's pretty easy to get the tire on and off.)

There's also another potential cause for the fit of the tire on the wheel hub. TPU like Ninjaflex tends to shrink when printed, relative to the specified dimensions. For rigid filaments, you typically need to give a tolerance of something like 0.2 mm (a gap) to get things to fit together. With TPU, you actually need to give a *negative* tolerance. For the tires, we added a tolerance of -0.5 mm on the round surface where it meets the wheels. But we didn't add any tolerance to the notches, because we wanted to make sure the wheel stayed round and didn't end up not fitting nicely over the nubs on the wheel. Once printed, though, this likely contributes to the small amount of slippage we see between the tire and wheel. The possible under-extrusion probably doesn't help, either.

But do you know the phrase "good enough for government work"? Well, this is good enough for quarantine work. For the other tire, I can try adjusting the negative tolerance as well as the extrusion multiplier in the slicer. But I'm not going to mess with this one.

One last note on Ninjaflex. We were planning to also use it to 3D print timing belts for the arm. But even at 3 mm thick and 100% infill, the Ninjaflex tire still has some stretch to it, which is not what you want in a timing belt (or else you'll get backlash). So this might not work as well as we'd hoped for timing belts.

### Motorizing the Wheel

With both parts of the wheel complete, let's put our NEMA 14 motor on it. The setup for actually running the motor is incredibly hacky: the stepper motor is connected to a RAMPS 1.4 board (intended to be put into a 3D printer), which is then connected to a Raspberry Pi, which is runnning Clark's instance of OctoPrint (which is normally connected to his 3D printer). Then, from the OctoPrint web interface, we tell it to move the y-axis to run our motor.

![Hacky setup for running this motor](/assets/img/projects/quarantine-bot/hacky-motor-testing.jpg)

But hey, it runs!

<video loop autoplay muted>
    <source src="/assets/video/projects/quarantine-bot/motor-test.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

...as long as there's no load. As soon as you introduce any significant resistance (like you'd get from the weight of the robot), the motor can't produce enough torque to keep going.

What about the beefier NEMA 17 motor? It's slightly better, but it still can't really produce enough torque that it would be able to move our robot around. It looks like our original plan of directly driving the wheels with the motors is a bust.

In true quarantine bot fashion, we now have to figure out an alternative with our scavenged scrap. We can gear the motors down, but that requires us to have a shaft and bearings for the wheel, plus gears. (One benefit of this, though, is that it will allow us to offset the motors from the line of arm motors and keep the robot body smaller.) We can 3D print some mediocre gears, so that should be manageable. And it turns out that Clark has some 3/16" dowels and bushings leftover from something else. 3/16" is close enough to the 5 mm motor shaft that I designed the wheels for, so it turns out that we can just stick it into the existing wheels and tighten down our makeshift set screw. (We don't have a file, so we can't give it a nice flat to grab onto.)

### Printer issues

All of that glosses over many other incredibly frustrating and still-unsolved issues with my 3D printer that cropped up in the midst of all of this. But it's too confounding to explain in detail here. I'll add more when it makes me less sad.