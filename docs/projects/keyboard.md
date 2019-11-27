---
layout: default
title: Custom Keyboard
parent: Side Projects
permalink: /projects/keyboard
---

# {{ page.title }}

1. TOC
{:toc}

---

## Inspiration

I want to build a custom mechanical keyboard from the ground up. That means a custom layout, designing the case to fit that, hand wiring the keyboard, getting (or making) keycaps, compiling my own firmware,

Why? Possibly technological masochism? Also wanting to understand how a keyboard works and set it up *just right* for how I want it.

Why now? I want to see if I can use it as a final project for my electronics class. Plus, it seems like a great way to procrastinate on the thesis-related work I'm actually supposed to be doing. It's a bit of an intimidating project, so this seems like a nice kick in the pants to do it.

According to [this](https://deskthority.net/viewtopic.php?f=7&t=5761&start=) it takes a couple months and a couple hundred Euros to build a custom keyboard. I have a couple of weeks and no desire to spend hundreds of dollars. *What could go wrong?* On the other hand, I have quite a bit of experience with electronics (thanks to this class), programming (including C and microcontrollers), and I've built a keyboard before (albeit from a kit).

### Design inspiration

I like the ortholinear keyboard design of my [ErgodDox Infinity keyboard](https://kono.store/products/infinity-ergodox-keyboard-kit).

![ErgoDox Infinity keyboard]({{ "/assets/img/projects/keyboard/ergodox-infinity.png" }})

I like the icon keycaps of the [Granite keycap set](https://kono.store/products/sa-granite-keycap-set) (but I'm way too cheap to ever buy it).

![SA Grantite keycaps]({{ "/assets/img/projects/keyboard/granite-keycaps.png" }})

The 84-key size and style of the [Keychron K2 keyboard](https://smile.amazon.com/dp/B07QBPDWLS/) seems like enough to have the useful stuff without keys I'm never going to use.

![Keychron K2]({{ "/assets/img/projects/keyboard/keychron.jpg" }})

3D printed keycaps (which I think I can make look nicer than this). I like the large legends, which should be easy to read when printed. (Link below.)

![3D printed keycaps]({{ "/assets/img/projects/keyboard/3d-printed-keycaps.jpg" }})

On a [GeekHack thread](https://geekhack.org/index.php?topic=75111.0), some people were coming up with ideas for full-size ortholinear designs.

![Full-size ortholinear design]({{ "/assets/img/projects/keyboard/full-size-ortholinear.png" }})

### Useful tools and references

Electronics:
- [Reddit links to tutorials/resources for handwiring keyboards](https://www.reddit.com/r/MechanicalKeyboards/comments/4wgf3w/hand_wiring_a_keyboard_tutorials/)
- [Another guide, this one with good pictures and explanations.](http://www.masterzen.fr/2018/12/16/handwired-keyboard-build-log-part-1/) The result here is very clean-looking.
- [Yet another hand-wiring guide](https://geekhack.org/index.php?topic=87689.0)
- [The seemingly canonical keyboard-building guide from matt3o](https://matt3o.com/book/)

Case/keycaps:

- Someone made CAD files of DSA keycaps (and [posted them on Reddit](https://www.reddit.com/r/MechanicalKeyboards/comments/5yzsaz/dsa_keycap_i_modeled_print_files_available_in/) and shared a [Google Drive folder](https://drive.google.com/drive/folders/0B0LNjZf_tzjWZGhwZ0VKUm9PQVE?usp=sharing)) (EDIT: Now it looks like it's [based on Thingiverse](https://www.thingiverse.com/thing:2172302))
- Someone else has a whole OpenSCAD system for keycap design [on Thingiverse](https://www.thingiverse.com/thing:2783650). Unfortunately, I suck at OpenSCAD and the whole thing seems rather poorly documented.
- [SiCK-68](https://www.thingiverse.com/thing:3478494): an open-source 3D printed keyboard with good documentation
- [SMOLBOAT case](https://www.thingiverse.com/thing:3289175): the ortholinear basis for the SiCK-68. It doesn't seem to include much documentation - just STL files for the case(s).
- Someone made a [fully 3D printed keyboard (including keycaps)](https://imgur.com/a/AalpV1r) ([Github](https://github.com/sealclubber/SB-147))
- [SwillKB Plate & Case designer](http://builder.swillkb.com/) for getting the correct sizes to insert switches. (It's designed for laser cutting. I could do that or turn it into a 3D printable part.)
- [keyboard-layout-editor.com](http://www.keyboard-layout-editor.com/), for designing the layout (which imports to the plate builder above)

Programming:
- [Guide to building your own firmware](https://deskthority.net/viewtopic.php?f=7&t=7177&start=) (using TMK)
- [Easy AVR](https://github.com/dhowland/EasyAVR): A GUI for designing layouts/firmware and flashing it

## Layout planning

Based on the ideas above, I came up with this initial design:

![Full-size ortholinear design]({{ "/assets/img/projects/keyboard/my-first-layout.png" }})

It's a 15x6 grid requiring a total of 84 switches.

I've added a number of customizations for my personal preferences:
- There's no right shift key because I absolutely never use it. Instead, I've put a small caps lock key in its place.
- Where caps lock was, I now have an underscore key. I've done this to my ErgoDox keyboard and I love how convenient it is for programming. (Snake case FTW!)
- The space bar is split in half, with the left half becoming a backspace bar (stolen from the ErgoDox again).
- Currently the warning sign in the top right corner will probably function as print screen, but again -- not locked in.
- The 4 lines key on the bottom row I'm planning as a function/layer key so I can add additional functionality (like controlling volume or opening the calculator) on the other layers.

Because I can always make new 3D printed keycaps and re-program the board, this also means I'm not locked into this layout forever.

This does involve a lot of custom keycaps/sizes, so I've basically given up on ordering something and decided I'll design and 3D print my own. If I don't get that done by the time limit for this as a class project, I can always slap on something from my pile of miscellaneous caps, even if it looks kind of trashy in the short term.

I'm definitely not set on the colors yet. But I do know I have (or have access to) black, white, red, and yellow printer filament. If I print in PLA, I'll have more color options than if I use PETG, but the latter might make for higher quality keys. If you buy injection-molded keycaps, they're usually ABS, but there's no way I'm messing with printing that stuff.

## Design round 2

As I start to look at keycap designs and stabilization, I'm realizing that my 3u space bar/backspace might prove difficult: it's large enough that it should have some stabilizer, and 3u isn't a standard keycap size. A pain to make keycaps, and one more thing I need to buy and design for. The easiest solution while keeping the whole thing ortholinear: make the space bar(s) 2u and add more keys for thumbs! From my experience with 2u keys for thumbs on my ErgoDox, that's small enough not to need stabilizers.

For pointless funsies, I also thought it would be fun to make a function layer just for emojis. Why? How about *why not*? Now I can more easily write [Emojiscript](https://github.com/dan3944/emojiscript).

Which brings us to the next layout, now with 87 keys (and made in Inkscape):

![Layout 2]({{ "/assets/img/projects/keyboard/keycaps.png" }})

![Function layers]({{ "/assets/img/projects/keyboard/fn-layers.png" }})

(The emoji for the function role are basically a selection of random animals.)

And finally, I made an unnecessarily nice diagram of the wiring, without actually knowing if this will work.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/wiring.png" }})

Spend way too much Prednisone-fueled time in OnShape and I have a render of a first prototype!

![Keyboard wiring]({{ "/assets/img/projects/keyboard/mockup-1.png" }})

This completely neglects things like tolerances, since I haven't printed pretty much any of these parts. But it looks nice, right?

The body is composed of two 3D printed pieces, each precariously close to the 300 mm length limit of Clark's printer, clocking in at 297.7 mm. Each is designed to print with a nice flat base (with possibly a few minimal supports to hold up some holes for nuts on the bottom of the bottom piece.) In theory, this should also work with 10 mm M3 screws and not have them stick out the bottom, but I'll believe it when I print it. (Also, no idea if this is enough screws for the whole thing to feel sturdy, or if it's completely excessive.) Right now, the keys are all blanks, because I'm not going to waste my time designing the details of keycaps that possibly don't even work. For the space for the Teensy, I blatantly stole the shape and dimensions from the SiCK-68 linked above. If it works, why reinvent it? (Though, I haven't verified yet if it does work...)

### Keycaps

Meanwhile, I've also been working on the keycap design. Here's a comparison of my first efforts.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/keycaps-prototypes-1.jpg" }})

I printed everything in white to show off every flaw. Of course, they all look crappy compared to the actual injection-molded version. The first version I tried was the [Thingiverse DSA keycap](https://www.thingiverse.com/thing:2172302)) (with the addition of my own imprinted legend). As expected, the biggest problem here was the gently curved top surface -- it looks pretty topographical and quickly collects finger grease.

So next I made my own variant of this with a flat top. I measured some of the features in the DSA STEP file, made up the rest, and gave it a new name: DFA. Like DSA, but with "spherical" replaced by "flat." So creative. My first attempt for this I printed with the top down, which I figured would give me a nice finish on the top. But I ran into two problems here: the first was that Attempt #1 came off the printbed halfway through the print, though from N=2 I can't tell if this was just a fluke. But more problematic, the sloping side surfaces look pretty crappy. I was hoping that the gentle slope would mean it would get a nice finish despite the slight outward angle, but there are some really weird textured artifacts here. Perhaps my tiny 0.07 mm tall layers are biting me here. But if I switch to taller layer, the layer lines will be more prominent...

As a comparison, at least, I printed the same design with the top up. This time, the print *technically* finished. If you just look at it from the top, it looks pretty good! It could use a little work to minimize the dots on the top surface from retraction, and I probably need to slow it down or check my belt tension to get the sides extra smooth. But the bigger problem here is underneath: The stem for attaching to the switch came off the bed. It's pretty cool that it even finished at all, but I should probably add some sort of manual brim in the future to keep that from coming loose.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/stem-fail.jpg" }})

The next step is to actually systematically test out an array of keycap tolerances to find what will fit sunggly on the switches without falling off or being unremovable. And I need to do the same thing for... the rest of the keyboard parts.

## Bill of materials

I'll update this as I go. You can get this stuff cheaper on eBay/AliExpress, but I have a deadline, so they're from Amazon.

| Item                                                                                             | Quantity | Unit Price |      Total |
| :----------------------------------------------------------------------------------------------- | -------: | ---------: | ---------: |
| [1N148 diodes (pack of 100)](https://smile.amazon.com/gp/product/B06XB1R2NK)                     |        1 |      $4.99 |      $4.99 |
| [Teensy 2.0 microcontroller](https://smile.amazon.com/gp/product/B00NC43256/)                    |        1 |     $19.20 |     $19.20 |
| [Gateron Mechanical switches (pack of 90)](https://smile.amazon.com/gp/product/B07X3VFBFJ/?th=1) |        1 |     $34.99 |     $34.99 |
| Solder                                                                                           |
| Solid-core wire                                                                                  |
| 3D printer filament                                                                              |
| M3x10 mm screws and nuts                                                                         |       10 |
|                                                                                                  |          | **TOTAL:** | **$59.18** |

Non-consumable equipment:
- 3D printer
- Wire strippers
- Soldering iron