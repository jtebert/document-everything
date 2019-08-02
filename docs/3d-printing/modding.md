---
layout: default
title: Modding
parent: 3D Printing
permalink: /3d-printing/modding
---

# {{ page.title }}

1. TOC
{:toc}

---

## Camera Setup (Logitech C270)

This camera doesn't come with a standard camera screw mount, so to fit with most of the 3D printed designs, I removed the hinge connecting it to its own mount, [following this video](https://www.youtube.com/watch?v=bWz1-wV8AU4). First, you pop off the rubbery end caps (they're sticky-backed). Then you unscrew a tiny Phillips head screw on the side by the wire, then push out the hinge pin. The whole thing takes under a minute and is completely painless.

Next up: adding manual focusing to the camera. This requires opening up the front cover to add a focusing ring. I followed [this video](https://www.youtube.com/watch?v=v-gYgBeiOVI) to disassemble it. You pop off the front cover by hand, unscrew the cover underneath, unscrew the PCB, and then use something sharp to cut the little dot of glue by the lens that keeps the focus fixed. In my case, I had to actually spend a little more time with an Xacto knife and tweezers to get the blob of glue out so I could freely turn the focus ring.

Now the camera is ready for its 3D-printed accessories. First is the focus ring and a front cover that accommodates it. Many the things on Thingiverse probably work, but I picked these because they're popular and therefore probably don't suck:

- [Focus ring](https://www.thingiverse.com/thing:1406879) from TheChrisP
- [Front plates](https://www.thingiverse.com/thing:1228521) from luc_e. This is part of a whole tripod, but the focus ring is designed to go with this. You only need 2 parts from it: c270_cam1.stl and c270_cam2_shaped.stl. As a bonus, this reuses the same screws as the original cover.

Try [this focus ring that doesn't require extra screws](https://www.thingiverse.com/thing:3036739/).

**Mount:** [This universal camera mount](https://www.thingiverse.com/thing:2477180) with [this remix's heatbed mount](https://www.thingiverse.com/thing:3693818). For the modular mount, I used the `c270.stl`, 1 of the `shortarm2.stl`, and 3 of the `02-ARM-new6cm.stl`.

Hardware for mounting:

- M4 30 mm screws/nuts for links
- M3 25 mm (countersunk head) screw + nut for heatbed mount