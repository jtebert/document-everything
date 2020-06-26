---
layout: page
parent: Research
title: Graphics
nav_order: 1
permalink: /research/graphics
---

1. TOC
{:toc}

---

## Posters (in Inkscape)

- Font sizes:
  - Poster title: 94(ish) pt
  - Section title: 60-64 pt
  - Within-section header: 30-48 pt
  - Authors: 36 pt
  - Body text: 28-32 pt
  - References: 22-24 pt
- Spacing:
  - Margin between sections/edge: 0.5"
  - Text padding within section: 0.5"
- Standard size (US): 32-36" x 48"

LaTeX math in posters can be added with the [built-in LaTeX extension](http://wiki.inkscape.org/wiki/index.php/LaTeX#How_to_embed_a_LaTeX_equation_inside_Inkscape) (the easier option to set up) but this doesn't seem to allow you to edit an equation after it is created. The [texText plugin](https://pav.iki.fi/software/textext/index.html) is a nicer interface and will let you edit equations after creating

## Fabric Posters (with Spoonflower)

- Export your poster as a PNG:
  - If necessary, rotate so the output image is landscape (instead of portrait)
  - Set as high of a DPI as you can (and remember this value) while keeping it under 40 MB (the maximum file size allowed by Spoonflower). Make sure it's *at least* 300 DPI.
- Upload to Spoonflower
  - On Spoonflower, select "Design & Sell" > "Upload your Design" and upload the image
  - Under "Repeat," select "Center" to avoid repeating
  - Use the "Change DPI" option to match what you exported
  - Choose your fabric (see below -- probably Performance Piqué) and pick the amount as 1 *yard*.
  - Be sure to check in the preview that it's what you expect!
- Choose your shipping speed
  - If you planned far enough ahead, you can get $3 shipping.
  - Otherwise, the "rush" option (3 business days for production + shipping) is $25.

The recommended fabric is [Performance Piqué](https://www.spoonflower.com/performance_pique), which is a 56"-wide, stretchy, non-creasing fabric. Since it's knit, you won't have to worry about fraying edges, but you *will* have to trim the excess white-space fabric from what you receive. It costs $18/yard (after 10% designer discount).

The non-stretchy alternative suggested is [Silky Faille](https://www.spoonflower.com/silky_faille), which (as a woven instead of knit fabric) can get fraying edges and also may need ironing. (I haven't tried this option yet.)

Sources: [Spoonflower Presentation Posters](https://www.spoonflower.com/presentation-posters), [How to Create a Fabric Presentation Poster...](https://support.spoonflower.com/hc/en-us/articles/204266984-How-to-Create-a-Fabric-Presentation-Poster-from-a-PowerPoint-or-PDF)
{: .fs-2}

## Color Palettes (Inkscape)

To use a consistent color scheme, I find it useful to have a color palette that I can reuse across my presentations, posters, graphs, etc.

### Picking Colors

I often use [Coolors](https://coolors.co/app) to pick a nice-looking set of colors. You may also like the [Seaborn color palettes](https://seaborn.pydata.org/tutorial/color_palettes.html) or [colorlover palettes](https://plot.ly/python/v3/ipython-notebooks/color-scales/).


### Generating Colors, Shades, and Tints

In Inkscape, create a square and fill with the first color you want, and set the stroke to none.

Decide how many shades (darker) and tints (lighter) you want. I arbitrarily picked 4 tints and 4 shades, for a total of 9 colors.

Convert your previously-generated square to a path (Path > Object to Path). Duplicate (Ctrl + D) it, set the fill to white, and place it above of your color squae. If you want 4 tints, leave the height of 4 squares in between. Duplicate the color square again, set the fill to black, and place it below your color square.

Select the color square and the white square above it. Go to Extensions > Generate from Path > Interpolate. In the dialog, set the following:

- Exponent: 0.0
- Interpolation steps: Number of tints you want
- Interpolation method: 1
- Duplicate endpaths: Unchecked
- Interpolate style: Checked
- Use Z-order: Unchecked

Then click Apply.

Repeat this for the color + black square, using the number of shades you want.

Duplicate the color, white, and black squares and move them to the next clear space to the right. Repeat the interpolation process to generate the shades and tints, then do it again for every color in your palette.

Then select everything (Ctrl + A) and ungroup (Ctrl + Shift + G).

The reason for doing this color-by-color is that the extension below will put the colors in the palette in the order the objects were created. (That's how they're ordered in the SVG.)

### Exporting

Inkscape uses GPL files (GIMP palettes) for colors. So we'll need to generate that from our color squares in Inkscape.

First, you need to install the [Generate Palette Extension](https://inkscape.org/~olibia/%E2%98%85generate-palette-extension) for Inkscape. Download the ZIP file and extract it to the extensions directory. If you're on Linux, it's probably `~/.config/inkscape/extensions`. But you can check the location from within Inkscape by going to Edit > Preferences > System > User extensions. Restart Inkscape for it to show up.

Go to Extensions > Palette > Generate. Select all the color squares you generated before (leaving out all those black and white ones). Pick a name and make sure "Color Property" is set to "Fill Color." I like to check "Include default grays," but that's up to you. Then click Apply, and it will generate a `.gpl` file in Inkscape's palette directory (which is something like `~/.config/inkscape/palettes`). This extension doesn't do great error handling, so it may fail with an ambiguous Python error if things aren't just right. I encountered issues if there was anything selected that wasn't a path (including Groups), or if the fill wasn't just a color (such as a Gradient or a swatch).

### Modifying

That extension puts the objects in the order they were created and name the colors with their hex code, but the GPL file is plain text and easy to edit. You might want to reorder or rename them to your liking or add comments. I also included my color palettes my [dotfiles repository](https://github.com/jtebert/dotfiles/tree/master/.config/inkscape/palettes)

Sources: [Logos by Nick](https://logosbynick.com/inkscape-custom-swatches/)
{:.fs-2}