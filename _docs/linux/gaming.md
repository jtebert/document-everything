---
title: Gaming
parent: Linux
update: 2020-06-30
---

1. TOC
{:toc}

---

## Games

| Game                                                                                                                  | Configuration                                                               |
| :-------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| [Burnout Paradise: The Ultimate Box](https://store.steampowered.com/app/1238080/Burnout_Paradise_Remastered/)         | [Steam/Proton](https://www.protondb.com/app/24740): no configuration needed |
| [Cities: Skylines](https://store.steampowered.com/app/255710/Cities_Skylines/)                                        | Native                                                                      |
| [Firewatch](https://store.steampowered.com/app/383870/Firewatch/)                                                     | Native                                                                      |
| [GTA V](https://www.epicgames.com/store/en-US/product/grand-theft-auto-v/home)                                        | Epic/Lutris: [config](#gta-v)                                               |
| [Kerbal Space Program](https://store.steampowered.com/app/220200/Kerbal_Space_Program/)                               | Native                                                                      |
| [Portal](https://store.steampowered.com/app/400/Portal/)/[Portal 2](https://store.steampowered.com/app/620/Portal_2/) | Native                                                                      |

Games I haven't tried yet:

- [Mirror's Edge](https://store.steampowered.com/app/17410/Mirrors_Edge/)
- [Sims 4](https://store.steampowered.com/app/1222670/The_Sims_4/)

## System Configuration

I'm assuming you've installed [Lutris](https://lutris.net/downloads/) and [Steam](https://store.steampowered.com/about/).

### Steam

To play games that don't run natively on Linux, you need to [set up Proton](https://segmentnext.com/2018/12/06/steam-proton-guide/).

Go to Steam > Settings > Steam Play. Check both of these boxes:

- Enable Steam Play for supported titles
- Enable Steam Play for all other titles

Steam will now let you download and install any game that wasn't made for Linux, but this doesn't guarantee that it will work. Check out [ProtonDB](https://www.protondb.com/) to see what games will work, with what tweaks.

## Game Configuration

### GTA V

- Install [Epic Games Store](https://lutris.net/games/epic-games-store/) with Lutris.
- Within the Epic Games Store, download/install GTA V.
- Launch the game from the Epic Games Store. (There's probably a way to do this directly.)
- When the game launches the first time, change it to "borderless windowed mode" in the settings. ([See notes](https://lutris.net/games/grand-theft-auto-v/))

This game also works out of the box (no configuration needed) with the Logitech F310 Gamepad, when it's in Xinput mode.