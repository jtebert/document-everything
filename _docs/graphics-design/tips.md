---
title: Useful Tips
parent: Graphics & Design
last_modified_date: 2020-12-07
---

1. TOC
{:toc}

---

## White photo backgrounds (Gimp)

It looks nice in papers and on websites to have a photo with a perfectly white background. I don't promise that this is the best approach, but it works well enough for me.

This assumes that you are starting with an image where the background is *close* to white. These are the locations of things in Gimp 2.10, but they may be slightly different in your version of Gimp.

1. Open your image in Gimp. In the top menu, go to Edit > Preferences. In the sidebar of the Preferences window, go to Image Windows > Appearance. Set/change the following in the section "Default Appearance in Normal Mode":
   1. Uncheck the boxes "Show layer boundary" and "Show canvas boundary"
   2. Change "Canvas padding mode" to "Custom colour"
   3. Set "Custom padding color" to white
2. Duplicate the layer containing your image, either through the GUI or with Ctrl+Shift+D.
3. With the new upper layer active, go to Colors > Levels in the top menu.
   1. Within this dialog, make sure that the Channel is set to "Value".
   2. In the *upper* horizontal bar (directly below the histogram), drag the right-most arrow to the left. This will force the almost-white values up to white and make everything slightly lighter.
   3. Conversely, if you want to make an almost-black background completely black, drag the left-most slider to the right.
4. While still in the upper (now-lightened) layer, we'll add a mask to deal with the fact that we also over-lightened the subject of the photo. Right-click the layer and choose "Add Layer Mask...". In the dialog, choose to initialize it as White (full opacity).
5. With the mask layer selected (it should have an outline in the layers dialog), select a 50% fuzzy paintbrush with full opacity, and set black as your foreground color. Now paint over the areas of the subject that you don't want to be lightened. You should see the lower, non-lightened layer show through in the spots you paint.
6. You may want to directly view the black-and-white mask to make sure you haven't missed something. To do so, right click the layer and select the checkbox "Show Layer Mask." Then un-check it when you're done.
7. If you find that this approach also washes out your shadows, use the fuzzy paintbrush with a low opacity and roughly paint over the shadow area in the mask to let through a bit of the darker area. This often helps to anchor your subject better in the sea of white.
8. When you're done, export the image to a new JPEG.

Source: [ePHOTOzine](https://www.ephotozine.com/article/gimp-tutorial--whiten-a-dull-background-15818)
{:.fs-2}

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