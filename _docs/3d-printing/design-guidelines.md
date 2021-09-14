---
title: Designing for Printing
parent: 3D Printing
last_modified_date: 2021-09-14
---

These are a set of personal guidelines I've developed when designing models for 3D printing. They are based on my experience designing parts in parametric CAD programs for my Prusa i3 MK3S. These are rules of thumb, not theoretically/mathematically grounded principles.

1. TOC
{:toc}

---

## Design Guidelines

- Think about print orientation from the start when designing. This will prevent you from creating unprintable or weak parts.
- Print orientation affects strength. The weakest direction of a print is between layers. Design your parts such that the stresses won't tear your print apart at the layer lines. (Imagine printing a long square rod; it will be strongest if it's printed flat on the bed, rather than printed standing up.)
- Start big and work toward smaller features. Don't worry about adding small chamfers and fillets until the end.
- For short angles on underside of prints without supports, limit angle to 35° from horizontal.
  - For long angles, limit angle to 40° from horizontal.
- Add chamfers to concave corners to increase strength. (Even 1 mm will significantly improve strength.)
- Avoid shallow slopes on horizontal surfaces. The layer lines become very prominent. (Exception: This issue is purely aesthetic, not function. If surface will end up on inside/bottom of print, it matters less.)
- Prefer chamfers instead of fillets on horizontal corners (the same problem with shallow slopes exists here)
  - Avoid fillets on the bottom of prints; the nearly-flat angles droop down and look bad.
- Remember that the nozzle diameter (often 0.4 mm) will automatically fillet any vertical corners by this dimension. The nozzle diameter has no effect on vertical resolution, except to limit the maximum layer height (typically 75% of the nozzle diameter).
- Be aware of feature size. Typically, a 0.4 mm nozzle is set in the slicer to an extrusion width of 0.45 mm. Any feature smaller than this will not be printed.
- Break the edges of your parts. While vertical corners will be rounded by the nozzle diameter, horizontal top and bottom edges will often be fairly sharp; bottom edges are often especially sharp because they're squished into the print bed. To make this feel nicer, add a 0.5 mm chamfer to top and bottom flat faces of your model.

### Support Material

- Start designing with the goal to not need support material. Only start creating features requiring supports if you can't design your part without them.
- Avoid supports that are inside of your parts. They're often impossible to remove.
- Avoid using supports that are printed on top of flat horizontal surfaces. It's hard to get them off.
- Bridges (long straight overhangs connected on both sides) can often be done without support, but the length of quality bridging depends on factors like your printer and the material (typically up to a couple of centimeters). Test this out before relying on it in your prints.

## Materials

Material matters! It affects both the appearance and structural properties of your print, so take the time to pick the right one. There are more exotic or fancy filaments out there, such as nylon or carbon fiber infill. But I don't use them, so you'll have to find info about those elsewhere. If you want to see my thoughts on specific brands of filaments, see my [filament brand ratings here](/3d-printing/filament-brand-ratings/).

**PLA:** This is typically the cheapest and easiest to print filament, and it comes in the widest variety of colors. But it's brittle and cracks easier, especially along layer lines, so be careful about using this for prints where you care about the structural properties. In addition to colors, PLA can come in different finishes (such as [Overture's matte PLA](https://smile.amazon.com/OVERTURE-Filament-Printer-Dimensional-Accuracy/dp/B08L14B9FJ)), with different filler materials (such as [wood](https://smile.amazon.com/HATCHBOX-3D-Filament-Dimensional-Accuracy/dp/B01092XXD4/ref=sr_1_4?dchild=1&keywords=woodfill+pla&qid=1631550292&s=industrial&sr=1-4) or [iron](https://www.proto-pasta.com/products/magnetic-iron-pla)), or with different properties (like [glow in the dark](https://smile.amazon.com/HATCHBOX-3D-Filament-Dimensional-Accuracy/dp/B00M0CS73S) or [temperature-dependent color changing](https://smile.amazon.com/Changing-Temperature-Filament-Dimensional-CC3D/dp/B074T8TGL5)). Note that some of these specialty versions need to use larger nozzles (e.g., 0.6 mm for wood fill) or special nozzles (0.6 mm hardened steel nozzle for iron PLA). This works great on the Prusa smooth sheet. It fails to adhere well to the Prusa textured sheet (even large prints came off mid-print), but somehow works great on my [Thekkiinngg textured sheet](https://smile.amazon.com/Thekkiinngg-Prusa-Double-Sided-Textured-Powder-Coated/dp/B07V1JYJS2).

**PETG:** This is my go-to filament for structural parts. It's typically 10-20% more expensive than PLA (or depending on the brand, it's sometimes the same price), and on most printers it now prints nearly as well as PLA. It is slightly more prone to stringing, because it prints at higher temperatures. PETG is slightly more flexible than PLA has better fusing between layers, which makes it less likely to crack; instead, it has some give to it. This is what makes it so much better than PLA for anything structural. This prints great on the Prusa textured PEI sheet, but has a tendency to over-adhere to the smooth sheet, so spray windex on the smooth sheet before printing with it.

**ABS:** I don't print with this. It's considered one of the best options structurally, but it's not that far off from PETG to matter for most functions. It's also more difficult to print (it's prone to warping) and produces toxic fumes that require proper filtering and ventilation.  Don't print it unless you know what you're doing.

**TPU:** If you need something flexible or grippy, use TPU. However, it's notoriously difficult to print, with the extruder designs on some printers making it next to impossible. It comes in different hardnesses, with the softest being the hardest to print. Even if your printer is capable of printing TPU without it winding up in the extruder, it can be difficult to tune the print settings to get good prints; it needs to be printed very slowly, with overextrusion to account for its stretchiness. (Warning: It also adheres *very* hard to PEI, so coat a smooth PEI bed before printing.)


## Slicing & Printing

- 0.15 mm layer height typically provides the best balance between strength and aesthetics.
- Layer height matters less aesthetically when your print is mostly completely vertical edges.
- Increasing the number of perimeters increases part strength more than increasing infill. For structural parts, I typically use 3 perimeters with a 0.4 mm nozzle (1.2 mm thick walls).
- Infill beyond 40% has strongly diminishing returns on strength. Printing at 100% infill is usually just a waste of filament.
- If strength isn't necessary for your part, 5-10% infill is often sufficient.
- Choose an infill pattern that varies position as the height changes, such as gyroid or cubic infill. This reduces the chance of hollow spots that have no infill at all.
- Print test sections of larger prints to check tolerances before making the whole thing. It will save you both time and filament.

## Tolerances and Dimensions

These are guidelines based on my experience and the parts that I have used. These should be a starting point, but don't take them as gospel truth; check the dimensions of your actual parts (e.g., screws) and test/adjust the tolerances for yourself.

| Parts                                     | Tolerance |
| ----------------------------------------- | --------- |
| Between hard 3D printed parts             | 0.2 mm*   |
| Hard 3D printed part + TPU/flexible print | 0 mm      |
| Hard 3D printed part + non-printed part   | 0.15 mm   |

\* This depends on the tolerances of your printer and print orientation. For a well-tuned printer, I can go down to 0.15 mm. If releasing online for a general audience, 0.3 mm will ensure it works for more people.

### Screws

| Part               | Dimension |
| ------------------ | --------- |
| M5 through hole    | 5.3 mm    |
| M5 head hole width | 9.0mm     |
| M5 head hole depth | 5.0 mm    |
| M5 nut hole flat   | 8.3 mm    |
| M5 nut hole depth  | 4.0 mm    |

| Part                   | Dimension  |
| ---------------------- | ---------- |
| M3 through hole        | 3.4-3.6 mm |
| M3 head hole width     | 5.8 mm     |
| M3 head hole depth     | 3.0 mm     |
| M3 thread into plastic | 2.7 mm     |
| M3 nut hole flat width | 5.7 mm     |
| M3 nut hole depth      |

Unless you absolutely need it, I recommend not using M2.5, since it's much less common and harder to find parts.

| Part                     | Dimension |
| ------------------------ | --------- |
| M2.5 through hole        | 3.2 mm    |
| M2.5 head hole width     | 4.6 mm    |
| M2.5 head hole depth     | 2.5 mm    |
| M2.5 nut hole flat width | 5.1 mm    |
| M2.5 nut hole depth      | 2.0 mm    |

| Part                   | Dimension |
| ---------------------- | --------- |
| M2 through hole        | 2.4 mm    |
| M2 head hole width     | 4.1 mm    |
| M2 head hole depth     | 2.0 mm    |
| M2 nut hole flat width | 4.2 mm    |
| M2 nut hole depth      | 1.8 mm    |


### Print-in-place hinges

This is for hinges things like box hinges, where there won't be an extraordinary amount of stress on the hinges (and it will likely be distributed across multiple hinges). This is meant for something like the [pill box](/3d-printing/designs/#larger-weekly-pill-box) not the [flexi gator](/3d-printing/designs/#flexi-gator).

| Part                            | Dimension |
| ------------------------------- | --------- |
| Hinge pin diameter              | 2.2 mm    |
| Hinge pin/casing clearance      | 0.35 mm   |
| Hinge casing thickness          | 1.5 mm    |
| Hinge casing/box wall clearance | 0.4 mm    |
| Hinge support angle*            | 35 deg    |

\* The hinge is circular, so to avoid printing in thin air, you need some angled support underneath. This is the angle from horizontal to make it printable.