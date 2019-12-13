---
layout: page
title: Custom Keyboard
parent: Side Projects
permalink: /projects/keyboard
---

1. TOC
{:toc}

---

*This is a build log of my ortholinear 87-key (~75%) keyboard, ostensibly as a class project for Physics 223*

## TL;DR: The current status

![Keyboard render with keycaps](/assets/img/projects/keyboard/keyboard-render-1.png)

![Keyboard size comparison](/assets/img/projects/keyboard/keyboard-size-comparison.jpg)

- All of the parts are now printed (assuming they all work as expected).
- There's a nice render, but currently there's an empty shell of a case where a keyboard will be.
- QMK firmware compiles, but I don't have an assembled keyboard to test it on.

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

And [someone on Reddit actually made a 14x6 ortholinear keyboard](https://www.reddit.com/r/MechanicalKeyboards/comments/94caov/hand_wired_14x6_ortholinear_mechanical_keyboard/), which commenters described as "enormous" and "What a beast." But even the creator said that the 1u space bar(s) in this were a pain.

![Someone made a 14x6 ortholinear keyboard]({{ "/assets/img/projects/keyboard/14x6-ortho-example.jpg" }})


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

## Designing

As I start to look at keycap designs and stabilization, I'm realizing that my 3u space bar/backspace might prove difficult: it's large enough that it should have some stabilizer, and 3u isn't a standard keycap size. A pain to make keycaps, and one more thing I need to buy and design for. The easiest solution while keeping the whole thing ortholinear: make the space bar(s) 2u and add more keys for thumbs! From my experience with 2u keys for thumbs on my ErgoDox, that's small enough not to need stabilizers.

I also realized my first design had the bottom row of letters shifted over 1u to the left from what my current setup is, which would inevitably drive me up a wall. So now I'm switching to hoping that a 1u shift key doesn't drive me up a wall instead.

Which brings us to the updated layout, now with 87 keys (and made in Inkscape):

![Layout 2]({{ "/assets/img/projects/keyboard/keycaps.png" }})

For pointless funsies, I also thought it would be fun to make a function layer just for emojis. Why? How about *why not*? Now I can more easily write [Emojiscript](https://github.com/dan3944/emojiscript).

![Function layers]({{ "/assets/img/projects/keyboard/fn-layers.png" }})

(The emoji for the function role are basically a selection of random animals.)

And finally, I made an unnecessarily nice diagram of the wiring, without actually knowing if this will work.

![Keyboard wiring]({{ "/assets/img/projects/keyboard/wiring.png" }})

*Note: to avoid confusing myself in the future, I'm updating this wiring figure to match what I'm actually doing. Trust me, the original still looked very similar.*

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
   6. The Thingiverse link also has suggestions about post-processing to know which filament to swap when, but I haven't bothered with that. You can tell which color will print first by looking at the color of the first layer skirt. If it's not doing it in the order you want, just swap which STL is printed with extruder 1 and 2.
3. Print setup:
   1. Import *both* STLs at the same time. Because you have multiple extruders selected, you should get a prompt asking if you want to treat it as one multi-material object. Select yes.
   2. In the plater, check the right side bar and verify that each part is set to use a different extruder.
   3. Hit "Slice Now" and you should see the multi-color g-code preview for printing.

Surprisingly, this worked for me on the first try. I went back to printing the keycaps letter-side down for two reasons: first, I thought it would make a nice textured finish with the two colors (no bridging for the legend now). But more importantly, I could do the filament swapping immediately and not have it wait around for me half and hour (or more) later.

It looks sweeeeeeeet! And the top texture is so much nicer to type on than printing the keycaps right-side-up and getting those retraction bumps.

![Dual color keycap]({{ "/assets/img/projects/keyboard/keycap-dual-color.jpg" }})

It's not *perfect,* especially around the corners, but I think with a little fiddling with retraction and the seam position, I can get it looking even nicer. And if all also fails, I'll just orient it so that part ends up in a less visible corner of the keycap.

(Update: I realized that this is occurring because of cooling. This only happens on the back corners because they're on the opposite side of the fan. So I'll just orient my parts that way.)

![Keycap imperfections]({{ "/assets/img/projects/keyboard/keycap-imperfections.jpg" }})

Now, instead of going to sleep, I can make the CAD for all of the keycaps. I'd been pondering the best way to do this for awhile. Should I try to manually type all the letters into a sketch in OnShape? And then import the icon ones as DXF files to put on each individual keycap? My instincts said this was a terrible idea and would make me sad. But I realized that I'd actually done pretty much all the work in the Inkscape render of the keycaps (see above). I could just export this as a DXF (after converting the text to paths) and use that directly.

The remaining piece then, was to generate the correct grid of keycaps to paste my DXF on top of. This I did kind of hackily. In a new part studio, I imported one 1U keycap and did linear patterns to make a grid. Then I imported the 2U keycap and did manual transforms to place them in the right location. Still better than recreating the whole legend by hand. OnShape definitely started to struggle with what I was throwing at it by this point -- once I generated the inset pieces for the legends, I was at 209 individual parts.

After that, it was some quick recoloring, and I can actually render the full keycap set with legends!

![render of keycap set, with legends](/assets/img/projects/keyboard/keycap-set-render.png)

Still a little inconsistent on when I'm using text vs. icons, and some of the colors and line thicknesses, but it's relatively easy to change. I just make the change in Inkscape, export, and import into OnShape.

### Making all the keycaps

Once I started printing keycaps in batches instead of individually, I ended up having to change the tolerances again: -0.05 mm was too tight because the layers had more time to cool before the extruder returned for the next layer. The keycap stem attachments ended up being too tight. With a bit of force, I could still get them *onto* the switches, but then this happened sometimes when trying to get them *off.*

![Broken keycap stem](/assets/img/projects/keyboard/broken-key-stem.jpg)

At least it just broke the keycap (which I can easily replace) instead of the switch itself. I did a bit of fiddling with parts of the stem design (reducing the asymmetry between the slot sizes for the stem) and increasing the tolerance to -0.02 to get something that worked for large batches.

The first set of multiple keys I printed was my highlight keys (because there's red filament in the lab but not at home). Here's a comparison of my three rounds to get them looking like I want:

![3 versions of highlight keys](/assets/img/projects/keyboard/highlight-key-versions.jpg)

In the first version (top row), I was still using the text version of the enter symbol. It looks a little small and didn't quite match the style I wanted. And the escape key symbol (also the text version) was smaller than I wanted; in fact, the arrow part came off the bed and just became a blob.

In the second version (next row), I switched to icons. The enter symbol is from the [material design icons](https://materialdesignicons.com/), and the (now also larger) escape symbol came from [The Noun Project](https://thenounproject.com/). In this case, it printed the red first, then filled in the white icons. This resulted in the icons coming out smaller/narrower-lined than I wanted. Because the first layer is always a little more squished and therefore produces wides lines than it should, whichever color goes down first will be on the bottom and look fatter.

So for the third version, I printed white first. Looks good enough for my purposes!

Now check out how many keycaps I made instead of studying for this final exam:

![I made a lot of keycaps](/assets/img/projects/keyboard/many-keycaps.jpg)

I haven't had a 100% success rate with the printing. Occasionally they'll come off the printbed (the bottom surface is pretty small, and I sometimes forget to clean the bed with isopropyl alcohol before I print). And a few have had some under-extrusion on the bottom layer, so the legends don't come out looking very clean. I've had to reprint under 10 keys for the whole board.

![I did not nail it. Failed keycap prints](/assets/img/projects/keyboard/keycap-print-fail.jpg)

**#NailedIt**. I let it keep going so I could at least get 7/10 keycaps out of that batch.

## Firmware

From my cursory search, there seem to be two common approaches for programming a Teensy 2.0 as a keyboard: [TMK](https://github.com/tmk/tmk_keyboard) and [EasyAVR](https://github.com/dhowland/EasyAVR). In keeping with this class using low-level coding, it seems like TMK is the right choice, since EasyAVR is a GUI interface meant for non-technical people. And what fun is that??

I started by playing around with the keymaps, looking at part 2 of [this tutorial](https://deskthority.net/viewtopic.php?f=7&t=7177&start=) and the [TMK keymap documentation](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md). (We're still waiting on the parts to arrive, so this seems like a better place to start than messing around with setting up the pins.)

This shows how it's very straightforward to set up the "standard" keys: alphanumerics, modifiers, and even system things like volume control and power. But for other things, it gets hairy fast. The first not-so-simple thing is setting dedicated keys for underscore and parentheses. The TMK documentation calls these [modified keys](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md#212-modified-key) -- a modifier plus a key. An underscore, for example, is just `Shift + -`. So according to the documentation, that's `ACTION_MODS_KEY(MOD_LSFT, KC_MINS)`.

...But this documentation isn't really clear on *where on earth you're supposed to put that line of code.* (I could go on such a rant about documentation that makes very frustrating and off-putting assumptions about its users. Give examples, people!) From [this other part of the documentation](https://github.com/tmk/tmk_keyboard/wiki/FAQ-Keymap#1-keyboard-layout), it looks like you just use it directly in place of a keycode in a `KEYMAP`.

...But then I ran across multiple random forum threads like [this](https://deskthority.net/viewtopic.php?t=12622) and [this](https://geekhack.org/index.php?topic=41989.1400), which seem to say otherwise. Here, they set that key to be an unused `Fn` key (e.g., `FN8`), and then within `fn_actions[]`, they set that to be something like `[8]  = ACTION_MODS_KEY(MOD_LSFT, KC_MINS)`. That's way uglier. And based off of [this section of the keymap documentation](https://github.com/tmk/tmk_keyboard/blob/master/tmk_core/doc/keymap.md#15-fn-key), you can only have 32 function keys. If that's really the case, the emoji layer is probably dead. (Also, based on [this FAQ](https://github.com/tmk/tmk_keyboard/wiki/FAQ-Keymap#input-special-charactors-other-than-ascii-like-c%C3%A9dille-%C3%87), it seems like there's not even a universal way to implement unicode input; it's OS-specific.) Even my current modifier layer has about 40 custom keys.

### Long Live QMK

After looking around more, it turns out that there are way better options than TMK. As fork of it has since taken off and become its own thing: QMK. And QMK has *way* better documentation and more features, like native (software-based) support for unicode. So let's use that instead. As a bonus, when you get it working, you can submit a pull request (even for your homemade, handwired keyboard), and they'll include it in the repository so other people can make it!

But that means we first have to go through the process of [creating a custom layout for a hand-wired board](https://docs.qmk.fm/#/hand_wire). I followed the instructions for "Creating and compiling your firmware locally (command line method)," because why would I do it through an online GUI when I can dig into it myself? (Maybe I'm old and just don't trust the internet, but I also like to be able to keep track of everything in a git repository.) But the process was pretty well-documented and straight-forward (summarized here):

- On Github, create a fork of the [QMK firmware repository](https://github.com/qmk/qmk_firmware).
- Clone your newly forked repository and create a new keyboard project with: `.util/new_keyboard.sh` (and follow the prompts)
- Navigate into the new project: `cd keyboards/<project_name>`
- In the project's `config.h` file, fill in the number of `MATRIX_ROWS` and MATRIX_COLUMNS`, pins that are used for each row and column (these should be in order) and any unused pins (to save power). Mine looks like this:
  ```c
  /* key matrix size */
  #define MATRIX_ROWS 6
  #define MATRIX_COLS 15
  ...
  #define MATRIX_ROW_PINS \
      { F7, F6, F5, F4, F1, F0 }
  #define MATRIX_COL_PINS \
      { B4, D7, D4, D5, C7, C6, D3, D2, D1, D0, B7, B3, B2, B1, B0 }
  #define UNUSED_PINS \
      { B6, B5, B4, D6 }
  ```
- In `<project_name>.h`, we'll fill out the `LAYOUT`: how the pins map to the layout of the keyboard. This I found a little confusing, because the example used key names like `K03` for the key in the 0th row and 3rd column. But I have more than 10 columns. Because downloading the QMK firmware also includes the firmware for every other keyboard, I could look for examples of how othershandled it, and they weren't consistent. Some used `k0A` (hex) to indicate being the 0th row and 10th column, where others used `K010`. (Also inconsistent capitalization.) These are all using constants/variables, not strings, so my guess is that behind the scenes QMK gives you every option, or some of them are aliases for others. I opted for the 3-digit version, which compiles; we'll find out later if it actually works correctly. Mine ended up looking like this:
  ```c
    #define LAYOUT( \
        K000, K001, K002, K003, K004, K005, K006, K007, K008, K009, K010, K011, K012, K013, K014, \
        K100, K101, K102, K103, K104, K105, K106, K107, K108, K109, K110, K111, K112, K113, K114, \
        K200, K201, K202, K203, K204, K205, K206, K207, K208, K209, K210, K211, K212, K213, K214, \
        K300, K301, K302, K303, K304, K305, K306, K307, K308, K309, K310, K311, K312,       K314, \
        K400, K401, K402, K403, K404, K405, K406, K407, K408, K409, K410, K411, K412, K413, K414, \
        K500, K501, K502, K503, K504,       K506,       K508, K509, K510, K511, K512, K513, K514 \
        ) \
        { \
        { K000, K001, K002, K003, K004, K005, K006, K007, K008, K009, K010, K011, K012, K013, K014 }, \
        { K100, K101, K102, K103, K104, K105, K106, K107, K108, K109, K110, K111, K112, K113, K114 }, \
        { K200, K201, K202, K203, K204, K205, K206, K207, K208, K209, K210, K211, K212, K213, K214 }, \
        { K300, K301, K302, K303, K304, K305, K306, K307, K308, K309, K310, K311, K312, KC_NO,K314 }, \
        { K400, K401, K402, K403, K404, K405, K406, K407, K408, K409, K410, K411, K412, K413, K414 }, \
        { K500, K501, K502, K503, K504, KC_NO,K506, KC_NO,K508, K509, K510, K511, K512, K513, K514 }  \
    }
  ```
  - The first part of `LAYOUT` is a 1D array containing all of the key names (just formatted to look nice)
  - The second part is a 2D array showing what key is in what row and column. If there's a column without a key in that row (matching your actual wiring), it gets the code `KC_NO` to make sure the vertical alignment of columns is retained.
- Now we can set up the keymap in `keymaps/default/keymap.c` This is where you assign what physical key maps to what character. For all of the "standard" keyboard keys, there are [keycodes listed here](https://beta.docs.qmk.fm/features/keycodes_basic). In addition to standard keys (alphanumeric, system keys), I also needed to encode my unicode (more on that below) and stuff like `(` as a non-shift key, which I explain below.
- Now we need to compile. First (and *not* in the documentation) you need to run `make git-submodule` from the repository root folder to install/compile dependencies. (Otherwise you'll get an error about LUFA.) Then just run `make <project_name>:default` to compile the default layout. (Or fix any errors.) If you have a mismatch anywhere in terms of number of keys specified for a layout/keymap, it will conveniently tell you when it fails to compile.

#### Special keymap stuff

Because it's large, you can see the full keymap [in my Github repository](https://github.com/jtebert/qmk_firmware/blob/master/keyboards/project223/keymaps/default/keymap.c). But there were a couple particulars that I had to sort out to get the layout as I wanted.

**Modifier keys (`(` = `Shift+9`):** While TMK made this a pain, QMK makes it easy ([as described here](https://github.com/qmk/qmk_firmware/blob/master/docs/feature_advanced_keycodes.md#modifier-keys)). Where I would but a keycode like `KC_9`, I instead use `LSFT(KC_9)` or `S(KC_9)` to get a left parenthesis (`Shift + 9`).

**Emoji (full unicode mapping)**: QMK has a whole [section of documentation for Unicode input](https://beta.docs.qmk.fm/features/feature_unicode). If I only wanted "simple" unicode characters (anything with a 3-4 digit code, which cover non-emoji stuff), there's a simpler way to do this. But since I want Emoji (5-digit unicode characters), I have to encode all of my Unicode using the more complicated method.

- First, in the project's `rules.mk`, you add the following: `UNICODEMAP_ENABLE = yes`
- In the `keymap.c` file, you then need to create names for every unicode character you want to use (before you define your keymaps):
  ```c
    enum unicode_names {
        BANG,
        IRONY,
        SNEK
    };
  ```
- Then you add your map from names to characters:
  ```c
    const uint32_t PROGMEM unicode_map[] = {
        [BANG]  = 0x203D,  // ‽
        [IRONY] = 0x2E2E,  // ⸮
        [SNEK]  = 0x1F40D, // 🐍
    };
  ```
- Now you can use these names in your keymap like you would any other keycode like `KC_9`

**Unicode strings:** It turns out flag emoji are multiple characters, and I had decided to ironically put the US flag in the keyboard's emoji layer. This multi-character part means that you can't use the approach above to include a flag. Instead, you need a unicode string. This requires a couple of pieces in the `keymap.c`

- In the `custom_keycodes` array, add a name for your character (in my case, `US_FLAG`):
  ```c
    // Defines the keycodes used by our macros in process_record_user
    enum custom_keycodes {
        ...
        US_FLAG
    };
  ```
- In the `process_record_user` function, add a case to the switch statement for this character:
  ```c
    bool process_record_user(uint16_t keycode, keyrecord_t *record) {
        switch (keycode) {
            ...
            case US_FLAG:
                if (record->event.pressed) {
                    send_unicode_hex_string("1F1FA 1F1F8");
                }
                break;
        }
        return true;
    }
  ```
- Now you can use that character name as a keycode in your keymap

**Switching unicode input mode:** As I mentioned earlier, unicode is a PITA for keyboard input because different operating systems have different input methods. Luckily, QMK also has a way to handle this. It has a keycode for switching the unicode input mode, which is then saved to EEPROM. It's kind of hacky, but I don't know what a better solution would be. At least it's easy to set up.

- In the *keymap's* `config.h` (`<project_name>/keymaps/default/config.h`) (*not* the project config file), add the following:
  ```c
  #define UNICODE_SELECTED_MODES UC_LNX, UC_OSX, UC_WIN, UC_WINC
  ```
  (and remove whatever options you don't want).
- In `keymap.c`, in one of your keymap layers, add `UC_MOD` as a keycode, which will cycle through the input modes you specified. I have mine set to `Emoji + Tab`.

- Unicode strings (flag)
- Switching unicode input mode

**Reset key:** My physical keyboard design (ingeniously) makes it impossible to get to the reset button on the Teensy when the keyboard is assembled. (That's part of the design that I stole from the [SiCK-68](https://www.thingiverse.com/thing:3478494).) But QMK lets me set a keyboard key to do this! It's dead simple: just use the keycode `RESET` for a key. (Mine is the top right key on the function layer.)

### TODO:

- Initialize Unicode input method? (Not sure if this is needed)
- Make a macro that outputs some stupid copypasta (because we can)

## Making the case

### Prototype

All of this needs to go into something. We can't even wire anything until the case is printed -- the switches have to get inserted into the top half of the case, and then the hand wiring is done on the backside of that. The challenge here is that the case is 298 mm wide, and my printer bed is only 250 mm wide. I *could* figure out how to split it up into pieces that I could glue/screw together after the fact, but luckily I don't have to; my boyfriend [Clark](https://cbteeple.github.io/) has a CR-10S printer with a 300 mm x 300 mm bed. The case will *just barely* fit in that. Nice.

Because every printer has different tolerances, I had to also test my case tolerances on that printer before I went ahead and printed the whole thing. So I cut out one corner of both pieces of the case and printed those (taking only an hour and a half of print time total). There were a three major things I needed to check the tolerances for: the M3 screw + nut, the switches, and the Teensy. I also wanted to see how my choice of colors looked: black PLA on top and natural/clear PETG for the bottom (hoping to somewhat show off the multi-colored wiring). It was printed at 0.15 mm layer height for a compromise between aesthetics and strength.

![Switch fit for case prototype](/assets/img/projects/keyboard/case-prototype-1.jpg)

The CR-10S has a glass bed instead of the textured PEI I've been using for my keycaps. And we have to cover the whole thing in gluestick to get the PLA to stick to the bed (which, fortunately, can be washed off with soap and water). So the top surface finish isn't as nice, but it will mostly be covered up by the keys anyway.

The switches fit into the case, but *just barely;* they were very difficult to get out. I increased the tolerance on the 14 mm square holes from 0.05 mm to 0.1 mm. At least the thickness of the top plate part was right (set to 1.5 mm and came out as 1.44 mm, which worked fine).

The dimensions for the M3 screw hole I took from my LARVAbot CAD model. In this case, the hole for the shaft and the nut were fine, but the diameter of the counterbore hole for the head was a little small. It was set as 5.6 mm, and it came out quite a bit smaller than that -- to small for the 5.38 mm head diameter. The squished first layer also made it difficult to get the screw in. I bumped that up to 5.8 mm for the next version and added a small chamfer around the opening.

![Side view of case prototype](/assets/img/projects/keyboard/case-prototype-2.jpg)

As my CAD model showed, the switches and the teensy *just* clear each other. Assuming there are no crazy wires, it's perfect. It's really hard to get a sense of size in a CAD model, so I'm very happy with how thin the whole base is when assembled. I'm also incredibly satisfied that my choice of 10 mm screws is just right: fully into the nut on the backside, and doesn't stick out to scratch whatever the board is sitting on. I still plan to put rubber feet on the bottom anyway so it doesn't lide around.

The opening for the Teensy board inside the bottom of the case was *almost* right. I stole all the dimensions for this from the SiCK-68 again. It's mostly free in the case, but the end of the board is press fit into a horizontal slot in the back of the bottom piece. The slot means there's an unsupported overhang to print. We tried printing with supports, but it's such a tiny little piece that the support didn't really exist, and the Teensy didn't fit in. But a little work with a knife cleaned up the sagging overhang and we could cram the board in. It's now protected from being pulled out if you yank on the USB cord, but there's nothing to stop it from coming loose when you *push* it from the outside (like putting in a USB cord.) The easiest solution is probably just a dab of hot glue when everything is finally put together. No reason to overcomplicate this.

To keep the edges of the case from feeling to sharp, I also included a chamfer along the top and bottom. But as you might be able to tell from the picture above, it's basically non-existant. (Again, really hard to judge scale of things in a CAD model on a screen.) So I'll also bump up the chamfer size.

Lastly, I didn't end up being happy with the clear PETG for the bottom of the case. Having it printed in a different color ends up emphasizing the fact that it's all 3D printed. And the clear filament didn't end up being super clear and looked a bit dirty. So I'll just make both parts black PLA for a stealth look.

### Production

In theory, the CR-10S has a large enough print bed to do both the top and bottom pieces at once (which Cura told us would take 29 hours to print, but only 157 g of filament). In practice, the print bed was slightly bowed and didn't print well near the front and back edges; the extruder was too close to the bed. It's possible to add a sensor to the printer to adjust for that, or to do a manual adjustment, but it's not worth the time to try and figure that out when there's a deadline at hand. Instead, we can just print one piece at a time.

First up: 15 hours to print the top plate.

![Case top printing](/assets/img/projects/keyboard/case-printing-1.jpg)

It looks kind of comical, when the printer can do up to 400 mm on the Z axis and I'm using 8.2 mm of that. But at least it seems to be sticking well to the bed.

And it's finished!

![Finished keyboard case top piece](/assets/img/projects/keyboard/case-top-finished.jpg)

One corner came up a tiny bit, but it's just a little rounded and barely noticeable. Definitely not worth re-printing.

The bottom of the case is only a 10 hour print, but the first layer is 1:15 of that. The first 8 layers take a total of 8 hours, printing that huge base, but then the next 24 layers for the walls only take 2 hours! That giant first layer is also a real test of the levelness of your print bed.

![Finished keyboard case bottom piece](/assets/img/projects/keyboard/case-bottom-finished.jpg)

Check out that beautiful top finish, which no one will ever see because it's inside the keyboard.

In a moment of truth when we got the pieces, from Clark, we tested the tolerances. Both pieces warped a little (the long way) from cooling, but that shouldn't be an issue because it'll all be screwed together. The switches have a *tiny* bit of wiggle to them. They're definitely not coming out accidentally, though, and I'm guessing that little wiggle won't be noticeable when the whole thing is assembled. (And if it is, a tiny drop of hot glue with fix it.) The screw heads fit nicely with their increased tolerance, and you can get all of the nuts in easily using the [screw pulling technique](https://manual.prusa3d.com/Guide/1.+Introduction/1057#s18633) that I learned when building my Prusa MK3S printer.

I screwed the whole thing together with all 10 M3 screws. One screw end sticks out a tiny bit and scratches the table This is where one corner of the top plate pulled off the bed a bit, so the screw head hole is deeper than it should be. I could add a bit of support inside the hole if I want to prevent this, but it won't be a problem once I add rubber feet to the bottom.

When assembled, though, the whole thing is incredibly sturdy; there's hardly any flex when trying to bend or twist the keyboard, or when pressing down on the top plate. (Thanks to the support screws in the middle, I think.) But there is a significant problem: when sitting it down on the table, it doesn't lay flat. It sits on two diagonal corners and rocks back and forth across the other two. There are two ways I can think of to fix this. The lazy way would be shimming the rubber feet -- adding a bit of thickness underneath one or more of the feet until it sits flat. But the more proper way would probably be with Clark's suggestion to warm it up slightly (there's a 60 deg C oven in his lab) and put a weight on it to force it flat. If we take that route, it needs to be done before we actually insert all the switches and start wiring it up.

Before we get to that (which will be *after* the final exam for this class, so I actually do some studying), some pictures to show off.

First, a size comparison to my other keyboards: ErgoDox Infinity and Magicforce 68:

![Keyboard size comparison](/assets/img/projects/keyboard/keyboard-size-comparison.jpg)

It's narrower than the 68-key keyboard but deeper. (After all, it does have to squeeze in 19 more keys somewhere.) Overall, I'm pleased by the compact form factor I've managed to squeeze this into. It's also a very thin keyboard:

![Keyboard height comparison](/assets/img/projects/keyboard/keyboard-height-comparison.jpg)

It's slightly thinner than the thinnest part of the Magicforce keyboard (without rubber feet, though). I'm excited to start turning this into something functional.

## Assembly

### Wiring the rows

With the final exam finished, there's now time to put this whole contraption together!

Popping all 87 switches into place on the board was so satisfying.

![Switches popped into case](/assets/img/projects/keyboard/assembly-switches.jpg)

- Shaping/cutting the diodes, soldering them on
- Cutting wire for rows (gaps, stripping)
- Soldering rows, cleaning up wires

Next, we had to shape and cut all 87 diodes for the keys. Because the switches just have pins sticking out, you want to make your life as easy as possible when it comes to soldering them on. That means creating a little loop on each diode to stick over the pin, then solder that without it falling off when one hand is full of solder and the other has the soldering iron. (Soldering is the primary situation in which I want a robotics third hand.)

So first we bent all the diodes into an L shape. This provides sort of a nucleation point for the loop you make next. It's important to do this on the correct end of the diodes. Because we want to allow current to flow *into* the wires for the rows (from the columns), we need to attach the anode to the switch and the cathode (the end with the black line) to the row wire. So we're making loops on the anode (non-black-line) end.

![Bending diodes](/assets/img/projects/keyboard/assembly-diodes-1.jpg)

Then, to make the loop, we had to wrap the lead of each diode around something slightly larger than the pins on the switches. The best thing we could find in the lab was... a small nail. It looks incredibly sketchy, but it did the job.

![Making loops in diode leads](/assets/img/projects/keyboard/assembly-diodes-2.jpg)

You can then trim the ends of loops on each diode and solder them all onto the switches. For soldering, each of the diodes has its long cathode end pointing up (so we can attach it to the row wires). That means its easiest to start by soldering the diodes in the top row, so you don't have to worry about the leads of the other rows' diodes getting in the way.

Turns out 87 diodes is a lot, so we took turns on this part.

![Jen soldering diodes](/assets/img/projects/keyboard/assembly-jen-soldering.jpg)

Next, we have to wires each of these diodes together into a row. To make it harder to short the row wires and column wires of the matrix, we want to keep the wires between each of the switches insulated. That means a lot of wire stripping. To make our lives easier, we employed some math to strip our wires beforehand.

Switches are spaced at 19 mm apart, and we want to leave ourselves a little gap in the insulation to actually solder the diodes to the wires (say, 3 mm). For our 15 switches in a row, that means we want 14 sections of insulation, each 16 mm long. To make sure we had enough wire length, we first stripped about 5 cm of insulation off the end of our solid core wire. Then we marked out our 16 mm sections with Sharpie and cut with wire strippers. Now we can slide the little sections of insulation around as we solder to put them in between the switches. It turns out its not worth trying to line up all the little gaps before you solder; just do it for the next switch as you go.

To make it easier to solder, we again make little loops (well, half loops this time). Lay the wire down just north of the bump in the middle of the switch, with the diode cathode leads underneath. Then fold the first diode up and over the stripped section of wire (forming a little U), and solder. Then you can slide the next section of insulation down tight to this (preferably after you let it cool) and move on to the next switch.

![Closeup of soldered row](/assets/img/projects/keyboard/assembly-row-closeup.jpg)

The one challenge we encountered with our nice 16 mm insulation sections is that it doesn't apply when you have switches more the one switch-length apart, like for the enter key and the space/backspace keys on the bottom row. But it turns out the math here isn't complicated. The enter key is spaced in between two columns, so it's 1.5 switch-lengths away from the next switch in the row (about 29 mm). Subtract our 3 mm stripped section, and we need a 26 mm insulation section instead of 16 mm: $$1.5 \times (19~\text{mm}) - 3~\text{mm} = 26~\text{mm}$$.

We can also do the same thing for the gap between the 2u keys in the bottom row: $$2 \times (19~\text{mm}) - 3~\text{mm} = 35~\text{mm}$$.

We took turns stripping wire and soldering, then trimmed up all the loose wire and and ends of the diode leads.

![All the rows soldered and trimmed](/assets/img/projects/keyboard/assembly-rows-finished.jpg)

### Wiring the columns

This is very similar to wiring the rows, but this time there are no diodes to connect to; we're soldering all of the column pins together directly. This does mean that we don't have any convenient little loops anymore, but we can make loops in the wire as we go to make soldering easier.

Stripping the wire is also pretty much the same as for the rows, with 19 mm vertical spacing for the switches as well. The one trick here is that some rows only have 5 rows of keys, while others have keys in the column slightly offset from the others. (See the wiring diagram above or the result picture below.) I *could* calculate the angle between the keys again for this, but it's really not a precise operation, so I just approximated the distance between the pins with a ruler and subtracted 3 mm.

Here, each column is slightly different, so it was useful to keep them all in order to prevent confusion. (The color coding here is also useful. But we forgot to grab blue wire, so we'll have to come back to those columns.) Because we also have to wrap the wires around each of the pins, we started with a longer stripped length at the end of the wire so we wouldn't run out.

![Stripped wires for the keyboard columns](/assets/img/projects/keyboard/assembly-stripped-wires.jpg)


## Programming

*Coming later but still soon...*

## Bill of materials

I'll update this as I go. You can get this stuff cheaper on eBay/AliExpress, but I have a deadline, so they're from Amazon.

| Item                                                                                                                                | Quantity | Unit Price |      Total |
| :---------------------------------------------------------------------------------------------------------------------------------- | -------: | ---------: | ---------: |
| [1N148 diodes (pack of 100)](https://smile.amazon.com/gp/product/B06XB1R2NK)                                                        |        1 |      $4.99 |      $4.99 |
| [Teensy 2.0 microcontroller](https://smile.amazon.com/gp/product/B00NC43256/)                                                       |        1 |     $19.20 |     $19.20 |
| [Gateron Mechanical switches (pack of 90)](https://smile.amazon.com/gp/product/B07X3VFBFJ/?th=1)                                    |        1 |     $34.99 |     $34.99 |
| [Hatchbox PLA filament](https://smile.amazon.com/stores/page/BE84484A-154A-49EC-BF3F-FF4CE6E4ECB7)                                  |        1 |     $19.99 |     $19.99 |
| [Rubber feet](https://www.homedepot.com/p/Everbilt-3-8-in-Clear-Adhesive-Bumper-Pads-16-Pack-822891/306229466) (pack of at least 8) |        1 |      $2.48 |      $2.48 |
| M3x10 mm screws and nuts                                                                                                            |       10 |
| Solid-core wire                                                                                                                     |
| Solder                                                                                                                              |
|                                                                                                                                     |          | **TOTAL:** | **$59.18** |

Non-consumable equipment:
- 3D printer
- Wire strippers
- Soldering iron