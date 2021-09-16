---
title: Useful Tips
parent: Graphics & Design
last_modified_date: 2021-09-16
---

1. TOC
{:toc}

---

## White photo backgrounds in Gimp

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

## Create Inkscape color palette

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

## Duotone images in Gimp

![All methods of creating duotone images](/assets/img/graphic-design/duotone/duotone.svg)
Image source: [Maximalfocus/Unsplash](https://unsplash.com/photos/0n4jhVGS4zs)
{:.fs-2}


### Option A: Screen & Multiply

This approach lets you adjust the colors and brightness/contrast without having to undo anything. However, the screen and multiply effects will dull out whichever layer is underneath.

1. In the menu go to Colors > Desaturate > Desaturate. In the dialog, you can select the conversion mode. Luminance often best matches the original brightness/contrast of the image. Then click OK.
2. If you want, you can now adjust the brightness/contrast. To make the effect look its best, you probably want to increase the contrast. Go to Colors > Brightness-Contrast to make these adjustments.
3. Now we'll create the layer for the background. First, set the color you want as your darker color as the secondary (background) color. In the layers section, click the button to create a new layer. Under "Fill with," select "Background color." (If you want to adjust this later, you can always drag the color you want ) Set the Mode to "Screen," and click OK to create the layer. Now, the dark parts of your image will have the color you set.
4. Next, the foreground. Set the Gimp foreground color to your lighter color. In the layers section again, click to create a new layer.Under "Fill with," this time select "Foreground color," and set the Mode to "Multiply."
5. You can now tweak the colors of your foreground and background, and adjust the brightness and contrast of the underlying grayscale image layer. Particularly useful for tweaking: on your grayscale image, go to Colors > Curves. Try adjusting the lower end (blacks) down and the upper end (whites) up to increase the contrast between your colors.

Source: [3D world-wide](http://www.3dworld-wide.com/how-to-create-duotone-effect-with-gimp.html)
{:.fs-2}

### Option B: Gradient Map

This option preserves the colors, but doesn't let you change the base image (eg brightness/contrast) after applying the gradient map. To do that, you'll need to undo, change the image, and redo.

1. Start by adjusting the brightness and contrast of your base image. It doesn't have to be made grayscale, but doing so can help you figure out the appropriate brightness and contrast.
2. Set your active colors: The dark background color should be set as the active foreground color, and vice versa. (Come on, Gimp!)
3. Make sure that your active gradient is set to "FG to BG (RGB)". This should be in the same panels as the layers. If not, click the little arrow in the top right corner of the panel, then Add Tab > Gradients.
4. Time to set the gradient. Go to Colors > Map > Gradient Map.

Source: [Photo StackExchange](https://photo.stackexchange.com/a/85293)
{:.fs-2}

### Option C: Layer Masks

This option feels like the best of both worlds: It maintains the ability to edit the various pieces, while better preserving the selected foreground and background colors.

1. Like in Option A, create two new layers filled with your foreground and background colors, but keep their Mode set to "Normal." Your foreground layer should be on top.
2. Right click on the foreground layer and select "Add Layer Mask." It doesn't matter what you initialize the mask with, since we'll be replacing it.
3. Select the layer containing your original image (again, perhaps easier if it's grayscale) and copy the layer itself. Click on the *mask* of your foreground layer (this will make sure you're editing the mask, not the layer directly). Paste with Ctrl+V. You'll now have a floating selection. Click the green anchor button at the bottom of the Layers panel ("Anchor the floating layer"). This will place your floating layer into the layer mask.

Source: [Reddit /r/GIMP](https://www.reddit.com/r/GIMP/comments/gatfkm/how_to_do_duotone_in_gimp/)
{:.fs-2}