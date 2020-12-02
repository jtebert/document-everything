---
title: Useful Tips
parent: 3D Printing
last_modified_date: 2020-12-02
---

1. TOC
{:toc}

---

## MMU2S Purge Lengths

I couldn't find a comprehensive list of suggested purge lengths for switching filaments with the Prusa MMU2S. So here's what I've compiled from my own experiences, what I've run across online, and the manual.

This is all done on my Prusa MK3S and MMU2S with a 0.4mm nozzle. As I try more colors, I'll add them here.

These values are what I've calibrated for the material and brand specified, but they'll probably hold (or be pretty close) for other brands as well.

| Color                        | Unloaded (mm³) | Loaded (mm³) |
| ---------------------------- | -------------- | ------------ |
| Black PLA (Hatchbox)         | 150            | 60           |
| Blue PLA (Hatchbox)          | 65             | 65           |
| Green PETG (Hatchbox)        | 90             | 70           |
| Orange PETG (Hatchbox)       | 65             | 65           |
| Red PLA (Hatchbox)           | 100            | 80           |
| Red bronze silk PLA (Eryone) | 70             | 80           |
| White PLA & PETG (Hatchbox)  | 50             | 150          |

## Add Thumbnails to PrusaSlicer GCode

You can add a thumbnail of your exported GCode that makes it easy preview your print with the OctoPrint [PrusaSlicer Thumbnails plugin](https://plugins.octoprint.org/plugins/prusaslicerthumbnails/).

Thumbnails a default feature for the Prusa Mini (because it has an LCD screen built in), but not yet for other printer profiles within PrusaSlicer. Luckily, it's easy to add.

Within PrusaSlicer, create a custom Printer profile if you don't already have one. (You likely already do, if you've set up exporting to OctoPrint.) Within the "Printer Settings" tab, click the Save button (floppy disk) and give it a name.

In the slicer menus, select Help > Show Configuration Folder. This will open the folder where your profiles are saved. From here, go into the folder `printer` (if you're using PrusaSlicer ≤2.2) of `physical_printer` (for PrusaSlicer ≥2.3). You should find a `.ini` file with the name of your new profile.

At the end of this file, add the following line:
```
thumbnails = 16x16,220x124
```

I don't know if you need to restart PrusaSlicer for this to take effect.

Now, install the [PrusaSlicer Thumbnails plugin](https://plugins.octoprint.org/plugins/prusaslicerthumbnails/) in Octoprint. Your gcode files should automatically show a thumbnail when you open them on Octoprint.