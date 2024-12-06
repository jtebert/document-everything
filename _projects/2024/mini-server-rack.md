---
title: Mini Server Rack
parent: "2024"
date: 2024-09-13
nav_order: -20240913
permalink: /projects/mini-server-rack
---

1. TOC
{:toc}

---

My network is 3D printed mounts screwed to a piece of plywood. I want to up my game, partly in preparation for adding home assistant and a NAS to my system.

It will be made with the aluminum extrusion that I have leftover from the LARVAbot treadmill, and a bunch of 3D prints.

## Requirements

- Use the 1" aluminum that I have all over my basement
- Prints must be able to fit within the print volume of my Bambu P1S printer (I *mostly* followed that)
- Fit the largest parts of my system: an mATX motherboard, and the 9" wide ONT for my fiber internet
- Be able to have a "wide" section (for the bigger stuff like the ONT) and a "narrow" section (for the smaller stuff like Raspberry Pis)
- Look cool (even though it's going in a dark corner of my basement)

## Initial design

After messing around in OnShape, I settled on a form factor: 9" wide for the wide section, which accommodates the ONT. 1.5" for my "1U" height. Slightly smaller than the standard 1.75" height, but none of this is standard anyway, so who ares! Also, this means that the narrow section with vertical bays is a multiple of the unit size (6U).

## Computer & network guts

This is what I have to fit into the rack.

### Networking

I've been using a Ubiquiti [Dream Router](https://store.ui.com/us/en/products/udr) for a couple of years already, paired with a [U6 Lite](https://store.ui.com/us/en/products/u6-lite) access point to cover the upstairs. It's working well, so I have no reason to upgrade or replace any of it. (If I were doing it now: I'd get their new [Gateway Max](https://store.ui.com/us/en/products/uxg-max).) The one annoying thing is that it's meant to look nice in a living room, not fit in a rack; it's a big white cylinder. So it has to go on top.

The ports on the router and the flex mini switch were plenty with my original home networking setup, but now I'm adding more devices to it, like the NAS and Home Assistant, so I need more ports. Very conveniently, Clark happens to have a [Planet POE-E304](https://www.planet.com.tw/en/product/poe-e304-v2) switch laying around, so that's getting added to the rack. Having the extra POE is nice, too, since things like the SLZB-06M Zigbee stick can be powered over POE (one less cable to worry about!)

### Pi-hole

I've also had this Pi-hole chugging along happily for a couple of year now without incident. It's running on a Raspberry Pi 3B with no issues. All that's changing here is that it's getting a new little rack mount case.

### Home Assistant

Home Assistant is new with this setup! It's running on a snazzy new Pi 5 (8GB - I splurged) in the rack. You can [read more about that setup here](/projects/home-assistant).

### NAS

The real server is arguably this. Also in this new setup, I'm repurposing my old grad school desktop built in 2016 (they let me keep it after I graduated) into a home server. After doing a lot of research online, I decided against buying something new, and instead just saving the money and re-purposing this. I'll have a page up with more about this part of things, soon, but here's the specs:

- Intel i7 6700
- 32GB DDR4
- mATX motherboard
- 1TB NVMe SSD (boot drive)
- 4x 4 TB WD Black HDDs (storage; originally used to store a boatload of robot simulation results)
- Nvidia GTX 1060. For now, I'm leaving this out of the build, but I might add it back in later if I do more video transcoding or light machine learning stuff.
- 550W ATX PSU (This might get swapped out for something physically smaller, if I run into space issues)
- I also bought a low-profile fan to replace my existing chonker of an upright cooler: [ID-COOLING IS-40X V3](https://www.amazon.com/dp/B07MQV3G55). It's relatively cheap, has good reviews, and says it supports my socket.

The challenge here: I didn't think about the form factor of the motherboard when I built the rest of the server. An mATX motherboard is 244mmx244mm, or 9.6"x9.6". While the external form factor of the server is 11"x12", there's a 1" square in each corner of that cross-section for the frame. So the motherboard is too big to fit in the frame. I looked into getting an ITX motherboard, which is only 170mm/6.7" square, but even used on eBay, they were all over $100. I'll see if I can do something creative before I resort to that.

And that creative (and cursed) thing is mounting it vertically in the back of the rack, rather than as a rack-mount tray. Again: cursed. This is also still pretty tall (just about half the height of the rack), so I have to make sure the other rack mounts don't get in the way (ie: all the deep ones need to be in the top part of the rack.) I will also still need to make horizontal mounts for the drives, a way to mount the PSU, and a way to route/access all the cables need to power the motherboard and route ethernet. For the ethernet, I think I'll make a short-width 1U panel with a keystone mount in it for an ethernet jack, then have that connected inside to the motherboard's ethernet port. That will make it a lot easier to move around connections with the network switches.
