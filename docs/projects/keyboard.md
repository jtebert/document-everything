---
layout: page
title: Custom Keyboard
parent: Side Projects
permalink: /projects/keyboard
---

1. TOC
{:toc}

---

## TL;DR: The latest picture

![Keyboard render with keycaps](/assets/img/projects/keyboard/keyboard-render-1.png)

- There's a nice render but the only thing physical is a couple keycaps
- The firmware is making me sad because it won't let me make an entire layer of emoji.

(Gotta put a nice picture first for the social media previews.)
{:.fs-2}

## Inspiration

I want to build a custom mechanical keyboard from the ground up. That means a custom layout, designing the case to fit that, hand wiring the keyboard, getting (or making) keycaps, compiling my own firmware,

Why? Possibly technological masochism? Also wanting to understand how a keyboard works and set it up *just right* for how I want it.

Why now? I want to see if I can use it as a final project for my electronics class. Plus, it seems like a great way to procrastinate on the thesis-related work I'm actually supposed to be doing. It's a bit of an intimidating project, so this seems like a nice kick in the pants to do it.

According to [this](https://deskthority.net/viewtopic.php?f=7&t=5761&start=) it takes a couple months and a couple hundred Euros to build a custom keyboard. I have a couple of weeks and no desire to spend hundreds of dollars. *What could go wrong?* On the other hand, I have quite a bit of experience with electronics (thanks to this class), programming (including C and microcontrollers), and I've built a keyboard before (albeit from a kit).

### Design inspiration

I like the ortholinear keyboard design of my [ErgoDox Infinity keyboard](https://kono.store/products/infinity-ergodox-keyboard-kit).

![ErgoDox Infinity keyboard]({{ "/assets/img/projects/keyboard/ergodox-infinity.jpg" }})

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

I also realized my first design had the bottom row of letters shifted over 1u to the left from what my current setup is, which would inevitably drive me up a wall. So now I'm switching to hoping that a 1u shift key doesn't drive me up a wall instead.

Which brings us to the next layout, now with 87 keys (and made in Inkscape):

![Layout 2]({{ "/assets/img/projects/keyboard/keycaps.png" }})

For pointless funsies, I also thought it would be fun to make a function layer just for emojis. Why? How about *why not*? Now I can more easily write [Emojiscript](https://github.com/dan3944/emojiscript).

![Function layers]({{ "/assets/img/projects/keyboard/fn-layers.png" }})

(The emoji for the function role are basically a selection of random animals.)

And finally, I made an unnecessarily nice diagram of the wiring, without actually knowing if this will work.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/wiring.png" }})

Spend way too much Prednisone-fueled time in OnShape and I have a render of a first prototype!

![Keyboard wiring]({{ "/assets/img/projects/keyboard/mockup-1.png" }})

This completely neglects things like tolerances, since I haven't printed pretty much any of these parts. But it looks nice, right?

The body is composed of two 3D printed pieces, each precariously close to the 300 mm length limit of Clark's printer, clocking in at 297.7 mm. Each is designed to print with a nice flat base (with possibly a few minimal supports to hold up some holes for nuts on the bottom of the bottom piece.) In theory, this should also work with 10 mm M3 screws and not have them stick out the bottom, but I'll believe it when I print it. (Also, no idea if this is enough screws for the whole thing to feel sturdy, or if it's completely excessive.) Right now, the keys are all blanks, because I'm not going to waste my time designing the details of keycaps that possibly don't even work. For the space for the Teensy, I blatantly stole the shape and dimensions from the SiCK-68 linked above. If it works, why reinvent it? (Though, I haven't verified yet if it does work...)

## Keycaps

Meanwhile, I've also been working on the keycap design. Here's a comparison of my first efforts.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/keycaps-prototypes-1.jpg" }})

I printed everything in white to show off every flaw. Of course, they all look crappy compared to the actual injection-molded version. The first version I tried was the [Thingiverse DSA keycap](https://www.thingiverse.com/thing:2172302)) (with the addition of my own imprinted legend). As expected, the biggest problem here was the gently curved top surface -- it looks pretty topographical and quickly collects finger grease.

So next I made my own variant of this with a flat top. I measured some of the features in the DSA STEP file, made up the rest, and gave it a new name: DFA. Like DSA, but with "spherical" replaced by "flat." So creative. My first attempt for this I printed with the top down, which I figured would give me a nice finish on the top. But I ran into two problems here: the first was that Attempt #1 came off the printbed halfway through the print, though from N=2 I can't tell if this was just a fluke. But more problematic, the sloping side surfaces look pretty crappy. I was hoping that the gentle slope would mean it would get a nice finish despite the slight outward angle, but there are some really weird textured artifacts here. Perhaps my tiny 0.07 mm tall layers are biting me here. But if I switch to taller layer, the layer lines will be more prominent...

As a comparison, at least, I printed the same design with the top up. This time, the print *technically* finished. If you just look at it from the top, it looks pretty good! It could use a little work to minimize the dots on the top surface from retraction, and I probably need to slow it down or check my belt tension to get the sides extra smooth. But the bigger problem here is underneath: The stem for attaching to the switch came off the bed. It's pretty cool that it even finished at all, but I should probably add some sort of manual brim in the future to keep that from coming loose.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/stem-fail.jpg" }})

The next step is to actually systematically test out an array of keycap tolerances to find what will fit sung on the switches without falling off or being unremovable. And I need to do the same thing for... the rest of the keyboard parts.

Coming back a week later, I did just that. First, I fixed the bed adhesion issue by adding a 0.2 mm thick bar connecting the stem part to the outer part. (I should probably just take a picture.) I increased my tolerance/slop factor to 0.15 mm, kept my 0.07 mm layer height, and bam -- I have a functional keycap!

![First functional keycap]({{ "/assets/img/projects/keyboard/keycap-prototype-2.jpg" }})

I'm still getting some weirdly prominent/funky layer lines, so I decided to try printing with a 0.1 mm layer height, keeping the same tolerance (and this time printing in black). The resulting keycap was so loose that it didn't stay on the switch at all. I can't tell whether it's from the different filament color or the layer height, but at least the layers look a little bit nicer. Actually, the fact that this tolerance is now too loose for a taller layer height suggests that I was getting a bit of (probably inconsistent) over-extrusion for the thin layers.

I checked the inside of the cross for the stem on both the 0.1 mm and 0.07 mm layer prints (which is tricky to get calipers into) and it verified what I suspected: despite the larger tolerance, the lower layer height cap had a smaller opening. So I think we're just gonna stick to 0.1 mm layers. So I printed out the caps with different tolerances:

![Keycap tolerance testing]({{ "/assets/img/projects/keyboard/keycap-tolerances.jpg" }})

At some point I stopped printing the whole thing and saved myself 20 minutes each by only printing the stem portion. Because I kept having to go lower and lower. Eventually I settled on -0.05 mm, but I can't say for certain whether this is actually negative, because I couldn't find consistent information online about the canonical size of the "+"-shaped stem of Cherry MX-style switches. (And again, measuring this tiny thing with calipers is a pain.)

### Making them prettier

Yesterday I ran across a [Raspberry Pi Case on Thingiverse](https://www.thingiverse.com/thing:3723561) that took an interesting approach to creating multi-color prints without actually needing a multi-material upgrade to the Prusa. Basically, you change the filament manually instead of having the machine do it, which works fine as long as you don't have many swaps to do. In the case of this case, there are one or two accent colors in the first layer that get swaps, and then the rest of it prints in the main color. I can definitely steal that and apply it to my keycaps. Here's the setup process:

1. In CAD, create the keycap with a 0.2 mm depth inset for the legend. (0.2 mm is the height of the first layer.) Make the legend as a separate part (in place), 0.2 mm thick. Export each as a separate STL.
2. PrusaSlicer setup:
   1. Under Printer Settings > General > Capabilities, set the number of extruders to 2, and check the box for Single Extruder Multi Material
   2. For each extruder on the left side of the Printer Settings, change the color so you can tell them apart
   3. In Printer Settings > Custom G-code > Tool change G-code, add `M600`. That's the code for manual filament change.
   4. In Print Settings > Multiple Extruders > Wipe tower, *uncheck* the enable box. (You don't need a purge block if you're changing the filament manually.)
   5. Under Print Settings > Skirt and Brim, set the skirt height to at least 2. This will keep any gunk from the filament swapping out of the print itself.
   6. The Thingiverse link also has suggestions about post-processing to know which filament to swap when, but I haven't bothered with that yet; I'm doing pretty simple stuff.
3. Print setup:
   1. Import *both* STLs at the same time. Because you have multiple extruders selected, you should get a prompt asking if you want to treat it as one multi-material object. Select yes.
   2. In the plater, check the right side bar and verify that each part is set to use a different extruder.
   3. Hit "Slice Now" and you should see the multi-color g-code preview for printing.

Surprisingly, this worked for me on the first try. I went back to printing the keycaps letter-side down for two reasons: first, I thought it would make a nice textured finish with the two colors (no bridging for the legend now). But more importantly, I could do the filament swapping immediately and not have it wait around for me half and hour (or more) later.

It looks sweeeeeeeet! And the top texture is so much nicer to type on than printing the keycaps right-side-up and getting those retraction bumps.

![Dual color keycap]({{ "/assets/img/projects/keyboard/keycap-dual-color.jpg" }})

It's not *perfect,* especially around the corners, but I think with a little fiddling with retraction and the seam position, I can get it looking even nicer. And if all also fails, I'll just orient it so that part ends up in a less visible corner of the keycap.

![Keycap imperfections]({{ "/assets/img/projects/keyboard/keycap-imperfections.jpg" }})

Now, instead of going to sleep, I can make the CAD for all of the keycaps. I'd been pondering the best way to do this for awhile. Should I try to manually type all the letters into a sketch in OnShape? And then import the icon ones as DXF files to put on each individual keycap? My instincts said this was a terrible idea and would make me sad. But I realized that I'd actually done pretty much all the work in the Inkscape render of the keycaps (see above). I could just export this as a DXF (after converting the text to paths) and use that directly.

The remaining piece then, was to generate the correct grid of keycaps to paste my DXF on top of. This I did kind of hackily. In a new part studio, I imported one 1U keycap and did linear patterns to make a grid. Then I imported the 2U keycap and did manual transforms to place them in the right location. Still better than recreating the whole legend by hand. OnShape definitely started to struggle with what I was throwing at it by this point -- once I generated the inset pieces for the legends, I was at 209 individual parts.

After that, it was some quick recoloring, and I can actually render the full keycap set with legends!

![render of keycap set, with legends](/assets/img/projects/keyboard/keycap-set-render.png)

Still a little inconsistent on when I'm using text vs. icons, and some of the colors and line thicknesses, but it's relatively easy to change. I just make the change in Inkscape, export, and import into OnShape.

Also, I still need to figure out homing keys.

## Firmware

From my cursory search, there seem to be two common approaches for programming a Teensy 2.0 as a keyboard: [TMK](https://github.com/tmk/tmk_keyboard) and [EasyAVR](https://github.com/dhowland/EasyAVR). In keeping with this class using low-level coding, it seems like TMK is the right choice, since EasyAVR is a GUI interface meant for non-technical people. And what fun is that??

I started by playing around with the keymaps, looking at part 2 of [this tutorial](https://deskthority.net/viewtopic.php?f=7&t=7177&start=) and the [TMK keymap documentation](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md). (We're still waiting on the parts to arrive, so this seems like a better place to start than messing around with setting up the pins.)

This shows how it's very straightforward to set up the "standard" keys: alphanumerics, modifiers, and even system things like volume control and power. But for other things, it gets hairy fast. The first not-so-simple thing is setting dedicated keys for underscore and parentheses. The TMK documentation calls these [modified keys](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md#212-modified-key) -- a modifier plus a key. An underscore, for example, is just `Shift + -`. So according to the documentation, that's `ACTION_MODS_KEY(MOD_LSFT, KC_MINS)`.

...But this documentation isn't really clear on *where on earth you're supposed to put that line of code.* (I could go on such a rant about documentation that makes very frustrating and off-putting assumptions about its users. Give examples, people!) From [this other part of the documentation](https://github.com/tmk/tmk_keyboard/wiki/FAQ-Keymap#1-keyboard-layout), it looks like you just use it directly in place of a keycode in a `KEYMAP`.

...But then I ran across multiple random forum threads like [this](https://deskthority.net/viewtopic.php?t=12622) and [this](https://geekhack.org/index.php?topic=41989.1400), which seem to say otherwise. Here, they set that key to be an unused `Fn` key (e.g., `FN8`), and then within `fn_actions[]`, they set that to be something like `[8]  = ACTION_MODS_KEY(MOD_LSFT, KC_MINS)`. That's way uglier. And based off of [this section of the keymap documentation](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md#15-fn-key), you can only have 32 function keys. If that's really the case, the emoji layer is probably dead. (Also, based on [this FAQ](https://github.com/tmk/tmk_keyboard/wiki/FAQ-Keymap#input-special-charactors-other-than-ascii-like-c%C3%A9dille-%C3%87), it seems like there's not even a universal way to implement unicode input; it's OS-specific.) Even my current modifier layer has about 40 custom keys.

### Some incomplete playing around with keymaps

```c
const uint8_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    /* 0: Letters & numbers (base layer)
     * ,-----------------------------------------------------------.
     * |Esc| F1| F2| F3| F4| F5| F6| F7| F8| F9|F10|F11|F12|Del|Pau|
     * |-----------------------------------------------------------|
     * | ` | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | - | = | ( | ) |
     * |-----------------------------------------------------------|
     * |Tab| Q | W | E | R | T | Y | U | I | O | P | [ | ] | \ |PgU|
     * |-----------------------------------------------------------|
     * | _ | A | S | D | F | G | H | J | K | L | ; | ' | Enter |PgD|
     * |-----------------------------------------------------------|
     * |Shf| Z | X | C | V | B | N | M | , | . | / |Cap|Hom| Up|End|
     * |-----------------------------------------------------------|
     * |Ctl|Alt|Sup|Del|Backspc| Space |Ent|Alt|Fn0|Fn1|Lft|Dwn| Rt|
     * `-----------------------------------------------------------'
     */
    KEYMAP( ESC, F1,  F2,  F3,  F4,  F5,  F6,  F7,  F8,  F9, F10, F11, F12, DEL,PAUS, \
            GRV,  1,   2,   3,   4,   5,   6,   7,   8,   9,   0,MINS, EQL,SHIFT(9),SHIFT(0), \
            TAB,  Q,   W,   E,   R,   T,   Y,   U,   I,   O,   P,LBRC,RBRC,BSLS,PGUP, \
            SHIFT(MINS),  A,   S,   D,   F,   G,   H,   J,   K,   L,SCLN,QUOT,      ENT,PGDN, \
           LSFT,  Z,   X,   C,   V,   B,   N,   M,COMM, DOT,SLSH,CAPS,HOME,  UP, END, \
           LCTL,LALT,LGUI,DEL,     BSPC,      SPC, ENT,RALT, FN0, FN1,LEFT,DOWN,RGHT),
    /* 1: Cursor(HHKB mode)
     * ,-----------------------------------------------------------.
     * |SLP|1/2|2/3|1/3|1/4|3/4|   |   |1/8|1/9|/10|   |   |   |Prt|
     * |-----------------------------------------------------------|
     * |   | ‽ | ° |   | € |   |   | • | × |   | ∅ | – | ± | ⟨ | ⟩ |
     * |-----------------------------------------------------------|
     * |   |   |   | ∃ |   | ™ |   | ∪ | ∈ | Ω | ∝ |   |   | ≈ |VUp|
     * |-----------------------------------------------------------|
     * | _ | α | ∑ | ° | ∀ |   |   |   |   | λ | ∴ | ⋯ |   ↵   |VDn|
     * |-----------------------------------------------------------|
     * |   | ✓ | ✗ | © |   | β |   | μ | ≤ | ≥ | ÷ | ≠ |   | ↑ |   |
     * |-----------------------------------------------------------|
     * |   |   |   |   |       |   ⋅   | ↵ |   |   |   | ← | ↓ | → |
     * `-----------------------------------------------------------'
     *
     * ,-----------------------------------------------------------.
     * |Pwr| F1| F2| F3| F4| F5| F6| F7| F8| F9|F10|F11|F12|Ins|Del|
     * |-----------------------------------------------------------|
     * |Caps |   |   |   |   |   |   |   |Psc|Slk|Pus|Up |   |Backs|
     * |-----------------------------------------------------------|
     * |Contro|VoD|VoU|Mut|   |   |  *|  /|Hom|PgU|Lef|Rig|Enter   |
     * |-----------------------------------------------------------|
     * |Shift   |   |   |   |   |   |  +|  -|End|PgD|Dow|Shift |   |
     * `-----------------------------------------------------------'
     *      |Gui |Alt  |Space                  |Alt  |Gui|
     *      `--------------------------------------------'
     */
    KEYMAP(PWR, F1,  F2,  F3,  F4,  F5,  F6,  F7,  F8,  F9,  F10, F11, F12, INS, DEL, \
           CAPS,TRNS,TRNS,TRNS,TRNS,TRNS,TRNS,TRNS,PSCR,SLCK,PAUS,UP,  TRNS,BSPC, \
           LCTL,VOLD,VOLU,MUTE,TRNS,TRNS,PAST,PSLS,HOME,PGUP,LEFT,RGHT,ENT, \
           LSFT,TRNS,TRNS,TRNS,TRNS,TRNS,PPLS,PMNS,END, PGDN,DOWN,RSFT,TRNS, \
                LGUI,LALT,          SPC,                RALT,RGUI),
    /* 2: Mousekey
     * ,-----------------------------------------------------------.
     * |Esc| F1| F2| F3| F4| F5| F6| F7| F8| F9|F10|F11|F12|Ins|Del|
     * |-----------------------------------------------------------|
     * |Tab  |   |   |   |   |   |MwL|MwD|MwU|MwR|   |   |   |Backs|
     * |-----------------------------------------------------------|
     * |Contro|   |   |   |   |   |McL|McD|McU|McR|   |   |Return  |
     * |-----------------------------------------------------------|
     * |Shift   |   |   |   |   |Mb3|Mb2|Mb1|Mb4|Mb5|   |Shift |   |
     * `-----------------------------------------------------------'
     *      |Gui |Alt  |Mb1                    |Alt  |   |
     *      `--------------------------------------------'
     * Mc: Mouse Cursor / Mb: Mouse Button / Mw: Mouse Wheel
     */
    KEYMAP(ESC, F1,  F2,  F3,  F4,  F5,  F6,  F7,  F8,  F9,  F10, F11, F12, INS, DEL, \
           TAB, TRNS,TRNS,TRNS,TRNS,TRNS,WH_L,WH_D,WH_U,WH_R,TRNS,TRNS,TRNS,BSPC, \
           LCTL,TRNS,ACL0,ACL1,ACL2,TRNS,MS_L,MS_D,MS_U,MS_R,TRNS,QUOT,ENT, \
           LSFT,TRNS,TRNS,TRNS,TRNS,BTN3,BTN2,BTN1,BTN4,BTN5,SLSH,RSFT,TRNS, \
                LGUI,LALT,          BTN1,               RALT,TRNS),
};

const action_t PROGMEM fn_actions[] = {
    [0] = ACTION_LAYER_MOMENTARY(1),            // FN0
    [1] = ACTION_LAYER_MOMENTARY(2),            // FN1
};
```

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