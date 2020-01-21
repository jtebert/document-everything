---
layout: page
title: Modding
parent: 3D Printing
permalink: /3d-printing/modding
---

1. TOC
{:toc}

---

## Camera Setup (Logitech C270)

This camera doesn't come with a standard camera screw mount, so to fit with most of the 3D printed designs, I removed the hinge connecting it to its own mount, [following this video](https://www.youtube.com/watch?v=bWz1-wV8AU4). First, you pop off the rubbery end caps (they're sticky-backed). Then you unscrew a tiny Phillips head screw on the side by the wire, then push out the hinge pin. The whole thing takes under a minute and is completely painless.

### Camera modding

Next up: adding manual focusing to the camera. This requires opening up the front cover to add a focusing ring. I followed [this video](https://www.youtube.com/watch?v=v-gYgBeiOVI) to disassemble it. You pop off the front cover by hand, unscrew the cover underneath, unscrew the PCB, and then use something sharp to cut the little dot of glue by the lens that keeps the focus fixed. In my case, I had to actually spend a little more time with an Xacto knife and tweezers to get the blob of glue out so I could freely turn the focus ring.

Now the camera is ready for its 3D-printed accessories. First is the focus ring and a front cover that accommodates it. I originally tried [this focus ring](https://www.thingiverse.com/thing:1406879) with [this front plate](https://www.thingiverse.com/thing:1228521), but it required extra screws (small countersunk screws of indeterminate size, which the thing frustratingly didn't specify) so I switched to a different one. I opted for this ["thin & minimalistic" focus ring/front plate](https://www.thingiverse.com/thing:3036739/) that doesn't require extra screws. The front plate for this worked well enough (it does push against the microphone in a bulgey way, but it's OK), but the focus ring was too big. When printed at 98% scale (as per the comments), the ridges were too small actually grab the ring on the camera. So I ended up using this [remixed focus ring](https://www.thingiverse.com/thing:3645622), printed at 100% scale.

### Camera mounting

The camera is now ready for mounting to the printer. I opted for [this universal camera mount](https://www.thingiverse.com/thing:2477180) because has an attachment for the C270 camera, it's articulated (so I can choose my preferred position), it doesn't look flimsy, and it uses real screws instead of trying to 3D print its own screws. Also, it includes cable management, which actually fits the camera cord well! Of its many options for modular parts, I ended up using the `c270.stl`, 1 of the `shortarm2.stl`, and 3 of the `02-ARM-new6cm.stl`.

However, my preferred camera mounting position is attached to the heatbed, so that I get a consistent static image. I found [this remix's heatbed mount](https://www.thingiverse.com/thing:3693818) for the Prusa i3. It calls for a longer countersunk screw to attach the mount to the y-carriage, but from printing a heatbed mount for a different camera arm, I was confident that I'd be fine press-fitting it without finding this niche screw. However, the "pocket" that gets screwed onto the arm is too short to securely hold it in place. So I convinced Clark to pull out Blender and adapt the STL to make the pocket deeper. This is kinda hacky and not really ready for Thingiverse, so I'll just [include the STL file here](/assets/files/Y-Axis_Mount-Left_deeper.stl).

My whole camera modding/mounting setup ends up requiring the following non-3D printed hardware:

- 4x M4 20 mm screws/nuts for links (20 mm is a bit on the short side, but my only other option was 30 mm, which was overkill long)
- M3 30 mm screw/nut for attaching the camera to the mount (4/40 screw would probably work as well)

## Nylock Mod

This is the process for improving the levelness of the bed on the Prusa i3 MK3S with locknuts (instead of relying purely on the software-based geometry compensation). These instructions are based on [this Reddit post](https://www.reddit.com/r/prusa3d/comments/bp440f/full_guide_to_doing_nylock_mod_if_you_havent_you/), [this YouTube video](https://www.youtube.com/watch?v=hDv73AdiBqM), [this follow-up YouTube video](https://www.youtube.com/watch?v=NJSWhqmYgJo), and my experience doing this.

### Prerequisites

- 8 M3 locknuts, which is (inconveniently) fewer than there are extras in your kit.
- Printer connected to OctoPrint (though the video/Reddit has a way to do it without OctoPrint).
- Install the [PrusaMeshMap](https://github.com/PrusaOwners/OctoPrint-PrusaMeshMap) plugin for OctoPrint. This will let you check the levelness of the bed when you're making adjustments. Note caveat at the end that it will have to compile matplotlib/numpy on a Raspberry Pi, so you can end up with some errors-that-aren't-errors while installing.

### Instructions

1. Power off the printer and unscrew the heatbed PCB.
2. For the 8 screws around the outside of the heatbed (not the center one), screw the locknuts onto the underside of the PCB. Do this with the nylon part of the nuts facing away from the heatbed (though it's debatable whether this makes a difference). Screw them until it's tight enough that you can still turn the screw, but with resistance.
3. Put a spacer in the middle of the y-carriage and put an allen wrench through it to keep it aligned. Put your heatbed back on but don't put in the screw yet.
4. Start screwing in the outside screws, one turn at a time, cycling around, until the heatbed is close to the height of the center spacer. (You can also insert a spacer near these screws to double check.)
5. Use pliers to insert the spacer next to your screws at each point and tighten your screws until you can't pull the spacer out, then loosen the screw just enough to be able to pull the spacer out.
6. Then screw in center screw until it's tight.
7. Turn your printer back on, put the steel sheet back on, and change the mesh bed leveling (if you haven't already). Go to Settings > Mesh Bed Leveling > Mesh, and set it to 7x7. Also set the z-probe to 5.
8. Heat the print bed to 60°C if you print primarily with PLA, 85°C if you print with PETG, or something in the middle if you print with both.
9. Since you've installed the OctoPrint plugin, you can go the MeshMap tab and click "Perform Bed Level and Check". This will show you an visualization of the variance.
10. Go to the terminal tab of OctoPrint and copy the output values under `Measured points:`. It should look something like this:
    ```shell
    Recv:   0.02400  0.10950  0.15350  0.28050  0.32150  0.40550  0.48250
    Recv:   0.14450  0.20900  0.20700  0.27600  0.37800  0.50350  0.54400
    Recv:   0.20950  0.26050  0.22650  0.29625  0.33750  0.50750  0.56550
    Recv:   0.16750  0.22900  0.22950  0.34500  0.39225  0.48850  0.58950
    Recv:   0.21500  0.28800  0.28500  0.35525  0.39800  0.56650  0.61900
    Recv:   0.18850  0.29350  0.29750  0.39300  0.46400  0.58650  0.60850
    Recv:   0.12950  0.26600  0.34950  0.42300  0.52150  0.58250  0.60100
    ```
    Paste the result into [this tool](https://pcboy.github.io/g81_relative/), which will convert the variation into how much you should turn each of the 8 screws.
11. Turn the screws according to those instructions and **repeat steps 9-10.** Keep doing this until you have < 0.2 mm height difference across the bed. (Or so the instructions say. I haven't actually been able to get it that small.)
12. Before you start printing again, **set the live z back near zero** so you don't dig into the bed and re-run the first layer calibration.

### Upkeep

From my (so far limited) experience with this, you'll probably need to re-check this over time and make adjustments. Conveniently, the values are actually checked every time you start a print. So it's easy to check how off-level your bed is.

1. In the OctoPrint Terminal tab, type `G81` to re-process the last mesh bed leveling points.
2. In the OctoPrint Mesh Map tab, click "Reload Heatmap Image".
3. Go through steps 8-12 of the previous section if you're not satisfied with the bed's levelness.

Source: [/r/prusa3d](https://www.reddit.com/r/prusa3d/comments/bp440f/full_guide_to_doing_nylock_mod_if_you_havent_you/)
{:.fs-2}