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

- Someone made CAD files of DSA keycaps (and [posted them on Reddit](https://www.reddit.com/r/MechanicalKeyboards/comments/5yzsaz/dsa_keycap_i_modeled_print_files_available_in/) and shared a [Google Drive folder](https://drive.google.com/drive/folders/0B0LNjZf_tzjWZGhwZ0VKUm9PQVE?usp=sharing))
- Someone made a [fully 3D printed keyboard (including keycaps)](https://imgur.com/a/AalpV1r) ([Github](https://github.com/sealclubber/SB-147))
- [SiCK-68](https://www.thingiverse.com/thing:3478494): an open-source 3D printed keyboard with good documentation
- [SwillKB Plate & Case designer](http://builder.swillkb.com/) for getting the correct sizes to insert switches. (It's designed for laser cutting. I could do that or turn it into a 3D printable part.)
- [keyboard-layout-editor.com](http://www.keyboard-layout-editor.com/), for designing the layout (which imports to the plate builder above)
- [Reddit links to tutorials/resources for handwiring keyboards](https://www.reddit.com/r/MechanicalKeyboards/comments/4wgf3w/hand_wiring_a_keyboard_tutorials/)
- [Guide to building your own firmware](https://deskthority.net/viewtopic.php?f=7&t=7177&start=)
- [The seemingly canonical keyboard-building guide from matt3o](https://matt3o.com/book/)
- [Another guide, this one with good pictures and explanations.](http://www.masterzen.fr/2018/12/16/handwired-keyboard-build-log-part-1/) The result here is very clean-looking.
- [Yet another hand-wiring guide](https://geekhack.org/index.php?topic=87689.0)

## Layout planning

Based on the ideas above, I came up with this initial design:

![Full-size ortholinear design]({{ "/assets/img/projects/keyboard/my-first-layout.png" }})

It's a 15x6 grid requiring a total ow 84 switches.

I've added a number of customizations for my personal preferences:
- There's no right shift key because I absolutely never use it. Instead, I've put a small caps lock key in its place.
- Where caps lock was, I now have an underscore key. I've done this to my ErgoDox keyboard and I love how convenient it is for programming. (Snake case FTW!)
- The space bar is split in half, with the left half becoming a backspace bar (stolen from the ErgoDox again).
- Currently the warning sign in the top right corner will probably function as print screen, but again -- not locked in.
- The 4 lines key on the bottom row I'm planning as a function/layer key so I can add additional functionality (like controlling volume or opening the calculator) on the other layers.

Because I can always make new 3D printed keycaps and re-program the board, this also means I'm not locked into this layout forever.

This does involve a lot of custom keycaps/sizes, so I've basically given up on ordering something and decided I'll design and 3D print my own. If I don't get that done by the time limit for this as a class project, I can always slap on something from my pile of miscellaneous caps, even if it looks kind of trashy in the short term.

I'm definitely not set on the colors yet. But I do know I have (or have access to) black, white, red, and yellow printer filament. If I print in PLA, I'll have more color options than if I use PETG, but the latter might make for higher quality keys. If you buy injection-molded keycaps, they're usually ABS, but there's no way I'm messing with printing that stuff.

## Bill of materials

I'll update this as I go. You can get this stuff cheaper on eBay/AliExpress, but I have a deadline, so they're from Amazon.

| Item                                                                                             | Quantity | Unit Price |      Total |
| :----------------------------------------------------------------------------------------------- | -------: | ---------: | ---------: |
| [1N148 diodes (pack of 100)](https://smile.amazon.com/gp/product/B06XB1R2NK)                     |        1 |      $4.99 |      $4.99 |
| [Teensy 2.0 microcontroller](https://smile.amazon.com/gp/product/B00NC43256/)                    |        1 |     $19.20 |     $19.20 |
| [Gateron Mechanical switches (pack of 90)](https://smile.amazon.com/gp/product/B07X3VFBFJ/?th=1) |        1 |     $34.99 |     $34.99 |
| Stabilizers (TBD)                                                                                |
| Solder                                                                                           |
| Solid-core wire                                                                                  |
| 3D printer filament                                                                              |
| Screws                                                                                           |
|                                                                                                  |          | **TOTAL:** | **$59.18** |

Non-consumable equipment:
- 3D printer
- Wire strippers
- Soldering iron