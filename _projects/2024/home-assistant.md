---
title: Home Assistant
parent: "2024"
date: 2024-09-25
nav_order: -20240925
permalink: /projects/home-assistant
---

1. TOC
{:toc}

---

Documenting the process, results, and useful resources in building by basement mini server

---

## Hardware

I was originally going to put this on a leftover old Jetson Nano from work, but it looked like this was actually going to be a headache, because of the particulars of the architecture. I instead bit the bullet and got a Raspberry Pi 5 (8GB) and put an adorable litter active cooler on it. This saved me a lot of headaches. The list of [ways to install home assistant](https://www.home-assistant.io/installation/) is extensive and kind of confusing. But my goal for this is to have ti be reliable and mostly just work. Using a native installation on a Pi gives me all the features I want (in particular: add-ons and backups) without a lot of manual work or setup.

## Access

I want to access this outside my home network. I could pay for Home Assistant Cloud ($65/year), use Cloudflare tunnels, or use a Tailscale VPN. I'm cheap, Cloudflare seemed most likely to accidentally expose my network, and I've used Tailscale before. So I'll start with that.

I followed [this blog post and video](https://tailscale.com/blog/remotely-access-home-assistant) to set up my Tailscale access. There was just one missing step from the video ([described here](https://github.com/hassio-addons/addon-tailscale/blob/27994089fc86340157e53944a7d5af0c4c88394d/tailscale/DOCS.md#option-proxy)): In my Tailscale admin page,I had to go to DNS > HTTPS Certificates, and click "Enable HTTPS".

Now, when I'm connected to Tailscale, I can access my Home Assistant at `https://homeassistant.pirate-lizard.ts.net`.

Eventually, I'd like to put this on a custom URL (`home.teebert.co`), but I haven't gotten to the second half of that video to actually set that up.

Also, props to Tailscale for providing such a clear and useful video on this themselves.

## Add-ons and integrations

I'll walk through all the things I integrated & set up on my Home Assistant.

For many of these, I needed to install HACS (Home Assistant Community Store). This is a plugin that lets you easily add integrations that individuals made (aka, other Annoyed Nerds who want to integrate their own stuff). I was able to follow the guide on the [HACS website](https://hacs.xyz/docs/use/) to get this set up, and then I had a HACS tab in my sidebar.

### Emporia Vue

I already have the Emporia Vue 2 installed in my electrical panel. It has its own (kinda janky-looking) app, but this will let me integrate it with all the things in my house.

To do this, I needed an integration via HACS: [ha-emporia-vue](https://github.com/magico13/ha-emporia-vue)

### Airthings Radon

Radon levels ([Airthings](https://www.home-assistant.io/integrations/airthings)). This defaults to only showing levels in Bq/m^3, but I want to see it in pCi/L. I had to create an additional (top-level) entry in my `configuration.yaml`:

{% raw %}
```yaml
template:
  - sensor:
      - name: "Airthings Radon US"
        unit_of_measurement: "pCi/L"
        state: "{{ (states('sensor.view_radon_radon') | float / 37) | round(2) }}"
```
{% endraw %}

The tricky thing I encountered here (relative to other posts I found) is the base sensor that this new sensor is derived from. Mine is called `sensor.view_radon_radon`. To figure this out, I had to go to the device (Settings > Devices and services > Airthings > entities (on the left side)). This showed me all the entity IDs.

From there, I spent some time arguing with Claude to set up a custom card for my UI Lovelace Minimalist dashboard. We eventually got to this:

{% raw %}
```yaml
- type: custom:mushroom-template-card
  primary: >
    {{ states('sensor.airthings_radon_us') }} pCi/L
    {% set value = states('sensor.airthings_radon_us') | float %}
    {% if value >= 4.0 %}
      - Danger
    {% elif value >= 2.7 %}
      - Warning
    {% endif %}
  secondary: "{{ relative_time(states.sensor.airthings_radon_us.last_updated) }} ago"
  icon: mdi:radioactive
  icon_color: >
    {% set value = states('sensor.airthings_radon_us') | float %}
    {% if value >= 4.0 %}
      red
    {% elif value >= 2.7 %}
      yellow
    {% else %}
      green
    {% endif %}
  entity: sensor.airthings_radon_us
  tap_action:
    action: more-info
```
{% endraw %}

It shows the level, sets the color (and additional text) depending on the level, and clicking on it shows the level history.

### Hubspace (backyard outlets)

I already have one set of (not very reliable) smart outlets in the backyard to control some string lights. They run on the Hubspace app, which means... one more integration. I installed this [Hubspace-Homeassistant integration through HACS](https://github.com/jdeath/Hubspace-Homeassistant?tab=readme-ov-file), and it was able to automatically pick up and configure the outlet.

Particularly nice: it lets me separately control each of the outlets. I could do this through the (also buggy and unreliable) Hubspace app, but Google Home only let me control both of them together.

If I were starting now, though, I wouldn't use this buggy wifi outlets; I'd use something Zigbee or Z-wave.

### Weather

API: [tomorrow.io](https://www.home-assistant.io/integrations/tomorrowio/)

Weather card: [hourly weather card](https://github.com/decompil3d/lovelace-hourly-weather)

### Mitsubishi heat pumps

Eventually, I'm hoping to control our heat pumps with ESPHome ([relevant link](https://github.com/geoffdavis/esphome-mitsubishiheatpump))

That might become a project page of its own.

### Yale Assure 2 Z-wave lock

This was more of a pain than I expected to do the initial setup and integration

First, I had to go through the setup

https://smarthomepursuits.com/how-to-install-keymaster-to-manage-z-wave-lock-pins-in-home-assistant/

It was important to set up the dashboard view, otherwise you have no way to set codes. (The documentation really isn't clear on how you actually *use* Keymaster.)

But the next problem was that I wasn't getting notifications. The example notification script came with no explanation and just didn't work. I spent a lot of time googling before coming up with this, which will send a notification to all phones.

```yaml
data:
  title: "{{ title }}"
  message: "{{ message }}"
action: notify.all_phones
```

BUT this also requires having the `notify.all_phones` group. Under "helpers," there is an option to create a notify group, but this doesn't work. It just always showed unavailable. (So why does this exist??) More googling said I needed to set this up in YAML directly, so I ended up adding this to my `configuration.yaml`. (Of course, put in your own groups here.)

```yaml
notify:
- name: all_phones
  platform: group
  services:
  - service: mobile_app_clark_s_phone
  - service: mobile_app_julia_s22
```

Getting DoorSense working was also tricky, probably because I didn't set it up at the same time as the lock. Eventually I figure out that, in the device view, there was another "Sensor" that was disabled: `binary_sensor.yale_assure_2_lock_sl_key_free_keypad_window_door_is_open`. I had to enable this, and then I could use it in automations.

### Pi-hole

I found [this guide](https://www.reddit.com/r/homeassistant/comments/1fan6el) explaining how to connect Pi-hole to Home Assistant.

There's a Pi-hole integration that you can add through the UI. One trick: in the setup, you need to provide the IP address of the pi-hole, not the local URL (eg, `192.168.1.115`, not `http://pihole.local`; the latter just didn't work).

[This link](https://www.reddit.com/r/homeassistant/comments/nwke8h) also explained how I can create a button to temporarily disable Pihole. The integration provides a service called `pihole.disable` that takes a `duration` parameter. I can create a button that calls this service with a duration of 30 minutes. That page shows the YAML code to do this, but you can do it through the UI, too, by setting the tap action to "Perform action" and then selecting the service.

### Smart Life (Tuya) plugs & lights

We have a handle of smart plugs and lights that run on the Smart Life app, which it turns out is just actually all Tuya. I installed the Tuya integration, logged in, and then got confused by the QR code it showed me to connect. I tried to just scan it with my phone's camera, but it said that no app on my phone could open it. It turns out that you have to go into the Smart Life app, click the "+", choose "Scan", and then scan the QR code that shows up in Home Assistant with that.

But once that was done, it's showing all my plugs and lights.

Once again: I wouldn't recommend buying these if you're starting from scratch, but since I already have them, I'm not going to toss them out.

### Google Calendar

We keep a shared calendar for common events. Sure, it's also in the Google Calendar tab in my browser, and the widget on my phone's home screen, but why not *also* add it to Home Assistant? (I'm just going crazy with power, now.)

## Automations

### Lock the door at night

This one was easy, and a good place to start

- WHEN: At 11:00 PM
- CONDITION: Door is unlocked (be careful of the entity here: you want the whole lock entity, not some sub-entity within it; this has the state value of locked/unlocked)
- ACTION: Lock the door

### Washer/dryer finished

I made a Blueprint for an automation that sends a notification when the washer or dryer finishes. [Here's the gist](https://gist.github.com/jtebert/c1330f9f2a2c8ef8b53bbf7baf4e46cb). It's based on [this blueprint](https://gist.github.com/sbyx/6d8344d3575c9865657ac51915684696), but I wanted to add a feature that would say how long the washer/dryer had been running. That turned out to be tricky, because you somehow have to get not just the changed of when it stopped, but know when it started to get that duration. I got Claude to do the work for me, but it took a lot of iterations, and I haven't done a load of laundry to know if it works.

And... it sort of worked. I got the push notification on my phone, but the duration field wasn't populated. It just said "It took minutes." (I guess it's technically correct?) But when I opened the app, it said "It took 238 minutes." Which is *also* not correct, because it actually took about 80 minutes. I'm not sure what's going on here, and it's kind of annoying to test. For now: I *am* getting notifications when the washing machine is done running, so that's great! I'll keep an eye on the time thing and see if I can find a pattern to its weird values.

### Turn on the entry lights

The side entry light is on a switch at the top of the stairs. So when you come in the door after dark, you're in the dark until you go up half a flight of stairs to hit the switch. To fix this, I got a [Zooz Z-Wave light switch](https://www.amazon.com/gp/product/B09698KJH6). It'll still work as a normal switch at the top of the stairs, but I can also add an automation that if it's after dark (I can check when sunset is), and the side door gets unlocked (or opened, if I can figure out the DoorSense stuff), the light will be turned on. When you're done, just hit the switch normally to turn it off. I can also do the reverse: when the door is locked, turn off the light.

### Gradually turn on the lights in the morning

Turning on the bedroom lights at a certain time of day is the easiest automation.

The first complication was wanting them to only do that on weekdays. You can't do this in the "When" trigger, but you can do it in the "Condition" section. The condition lets me set days of the week, but it still *also* requires that I give it a time? So I just said it has to be after 7:00. In the future, I might add alarm integration (eg, turn on 15 minutes before my alarm goes off), at which point I'll probably have to revisit this.

But we're still in the situation where it brutally turns the lights on full blast, all at one. I want to make it happen gradually. Luckily, more dedicated nerds have already solved this problem, in an extremely detailed fashion. I found [Ashley's Light Fader](https://community.home-assistant.io/t/ashley-s-light-fader-2-0-fade-lights-and-or-color-temperature-with-your-choice-of-easing-curves-including-ease-in-ease-out-and-ease-in-out/584077), which does exactly what I need. I installed it by copy/pasting the Github gist into a script in the HA UI, then changed the automation to call this script (which I could configure in the automation) instead of turning the lights on directly.

The next "eventually" is to make it somehow sync with my alarms, so that it turns on 15 minutes before my alarm goes off, and also make it not trigger if I'm not home. (But right now, it doesn't seem to be detecting my location in HA?)

## Dashboard

### Theme

I wanted a couple things out of my theming:
- Minimalist design
- Dark mode with Teebert Teal primary color (and purple accent color)
- Dashboard bar at the bottom (for easy phone taps)

The default theme is pretty good, but I want to make it cleaner and move the dashboard bar. I ended up basing it off of the [Graphite theme](https://github.com/TilmanGriesel/graphite), but with the primary and accent colors changed. Then I added this configuration toward the top of the theme move the dashboard bar (from the Minimalist theme). (If I put it at the end it didn't work. I don't get that.)

This *mostly* works. It's fine as long as you're not editing the dashboard, but editing the dashboard doubles the height of the bar, so the bottom half then sticks off the bottom. (It's not just me; the original theme I copied this from looks like it has the same issue.)

### Energy production and consumption

With the energy dashboard, plus the integrations for my solar system (Emporia Vue) and solar panels (Enphase), I can see how much energy I'm producing and consuming. To put data into a form that HA likes, I needed to create some derived values. After a couple of failed attempts, I ended up following [this guide](https://community.home-assistant.io/t/enphase-envoy-on-2024-4/) to get the values I needed. The fun thing with setting this stuff up is that you basically have to wait a day to see if the data looks correct. In my case, I was comparing the results to what I see in the Enphase app, and it finally looks correct!

There's still a little bit of wonkiness, when comparing the total energy usage (from Enphase) to the individual circuit usage (from Emporia). I think there's slight differences in the timing of when the data comes in. In the bar graph of usage, I'll sometimes see hours with a negative balance, meaning that the usage of all of my circuits for that hour was *more* than the total energy usage for that hour, as computed by Enphase. (Then the next hour will show a balance in the other direction). If this really ends up bugging me (and I'm not sure it will), I could switch to using Emporia to compute the total energy usage, but then I might end up with weird discrepancies relative to the solar production data from Enphase.

Because I'm picky, I also wanted the colors in my energy dashboard to match the style of what I have elsewhere in my theme. Changing this does require that you're using a custom theme, but I'm already doing that, so it was just a matter of adding the colors to the theme's YAML file.

### Energy & power consumption chips

My circuits are *approximately* divided by room. (It's an old house; electrical jankery is standard.) This means that for each room section on my dashboard, I can have a little chip that shows the current power usage and the day's total energy usage for that room.

I decided to use the [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) Chips card for this (and the other chips described below). This lets me put many small chips of information in a single card, for each room section, to give some at-a-glance info about each room. These are pretty convenient for items of varying complexity. For a simple chip, you can just use the "Entity" chip option and show a single state. But for more complex chips, you can use the "Template" chip option, which lets you write a Jinja template to display whatever you want.

For the living room, I set the template entity to `sensor.living_room_energy_today`, and my content used this template. One particular worth noting here: the `%.3g` means that it will show three sig figs, so I can see 1.23 W and 123 W, without having to see 123.456 W. It's the little things.

{% raw %}
```yaml
{% set current_power = states('sensor.living_room_power_minute_average') | float %}
{% set total_energy = states('sensor.living_room_energy_today') | float %}
{{ '%.3g' | format(current_power) }} W /
{{ '%.3g' | format(total_energy) }} kWh
```
{% endraw %}

In the case of the basement (and a couple others), there are multiple circuits contributing the the total power usage (general basement, utilities, washer, and dryer). I could have a separate chip for each of these, but I think it's more useful to have a single chip that shows the total power usage for the basement. So my template for this has to sum the energy and power usage of all those circuits.

{% raw %}
```yaml
{% set basement_power = states('sensor.basement_power_minute_average') | float %}
{% set washer_power = states('sensor.washer_power_minute_average') | float %}
{% set dryer_power = states('sensor.dryer_power_minute_average') | float %}
{% set basement_utilities_power = states('sensor.basement_utilities_power_minute_average') | float %}
{% set current_power = basement_power + basement_utilities_power + washer_power + dryer_power %}

{% set basement_energy = states('sensor.basement_energy_this_month') | float %}
{% set washer_energy = states('sensor.washer_energy_today') | float %}
{% set dryer_energy = states('sensor.dryer_energy_today') | float %}
{% set basement_utilities_energy = states('sensor.basement_utilities_energy_today') | float %}
{% set total_energy = basement_energy + basement_utilities_energy + washer_energy + dryer_energy %}

{{ '%.3g' | format(current_power) }} W /
{{ '%.3g' | format(total_energy) }} kWh
```
{% endraw %}

### Outdoor air quality chip

I used the government's free AirNow API to get the outdoor air quality index (AQI) for my home. My lungs aren't great, and I bike to work every day, so it's nice to have this info at a glance while I'm getting ready for my day.

To get the data, I [created an account on the AirNow](https://docs.airnowapi.org/account/request/?account%2Frequest=) website. Once confirmed, I had to actually find the API key. Being a government website, it's terribly designed. Once logged in, you go to the "Web Services" tab. In the top right corner, in small text, it says "Your API Key". Way to make it obvious! This is the key that you need in the integration configuration.

The integration is straightforward; you don't even need HACS. [Here it is](https://www.home-assistant.io/integrations/airnow/). Just use the API key you got from the website.

Now I want to display the AQI as another entity chip on my dashboard (for `sensor.airnow_air_quality_index`). Here's where things get kind of dumb. I want to have it be a different color depending on the AQI level. This is possible if you're using YAML configuration for a board, but otherwise not (as far as I can tell). So my hacky solution was to create a different chip for each level with the corresponding color, and then have it conditionally appear when the AQI is in that range. For example, if the AQI is below 50, it shows the chip with the green color.

### Radon chip

I did something similar with a radon chip, using my computed pCi/L values. If the value is above 4, it shows the red chip.

### Hourly rain prediction

I wanted a card that will graph the hourly probability and quantity of rain - kind of like the weather underground app. And if I have that data, I can also use it to automate warning me that I need to bring rain gear when I bike to work.

This was a deep rabbit-hole for a single graph.

But unlike just a sensor, a weather forecast requires an actual API service call. If you're using a pre-made card, it just does this for you. But I want to just get the data and plot it myself. But this turned out to be kinda tricky as well, because it seems like Home Assistant has changed its API a couple times (so it's hard to know you're finding all current data), and you have to do your own processing on it.

I tried following [this thread](https://github.com/home-assistant/core/issues/106097), which does seem to generate a `weatherman_data` sensor, but the state is always `unknown` and it doesn't show any attributes.

Well what about [this one?](https://github.com/home-assistant/core/issues/106097). It didn't seem to work at first, but maybe it took awhile to update or stick. Now I see an hourly forecast in my Developer Tools > States.

There was also a red herring I encountered in setting this up in the `configuration.yaml`. I'm using the VS Code server extension in HA, which includes its own extension that checks whether you're writing proper home assistant code, including checking if you're using deprecated syntax. When I used `weather.get_forecasts` (the latest syntax that I could find), I was getting an editor error saying `String does not match the pattern of "DEPRECATED^"`. Eventually, I found a thread saying that this extension uses string matching, and `weather.get_forecast` is in fact an old, deprecated syntax. But it was falsely flagging the new syntax, because it contained the old syntax as a substring. They really need to fix their parsing.

But anyway: I have the data, so now I need to figure out how to display it. The [mini-graph-card](https://github.com/kalkih/mini-graph-card) that I'm using for other things is designed to display *past* data. An entity has a single value, and it shows those values over history. But I want to display future data. Instead, I found the [Apex charts card](https://github.com/kalkih/mini-graph-card). It's powerful, but clunky. There's not a lot of use out there (compared to more common libraries like matplotlib), so AI wasn't very helpful for getting this set up. There was a lot of forum searching and trial and error.

...Except that the probability of rain is always zero. I waited until there was actually rain in the forecast, as a sanity check, and it still always shows `precipitation_probability: 0` and `precipitation: 0`. I previously *was* getting precipitation chances in the [hourly weather card](https://github.com/decompil3d/lovelace-hourly-weather), but I noticed that now those rows are blank. So this might be an issue with the tomorrow.io API, rather than my setup.

So in the meantime, I made basically the same sensor template, but now with `weather.openweathermap` as the entity for the source. Once again, I have to wait for it to trigger, since it's a time-based update.

### 3D printers

I want to make pretty views to see and interact with my 3D printers (Bambu P1S, 2 Prusa MK3S, and the reanimated corpse of a Creality CR10S).

I saw a lot of recommendations for [this dashboard configuration](https://wolfwithsword.com/bambulab-home-assistant-dashboard/) for Bambu printers. But boy does it require a lot of setup. The first problem was that I needed to download the media assets to my system. So I installed the [SSH & Web Terminal add-on](https://community.home-assistant.io/t/home-assistant-community-add-on-ssh-web-terminal/33820). It was *not* clear on the configuration needed (again: great documentation, y'all) -- what password was I supposed to be adding to its config file?? I did discover that I could paste my public SSH key into the config, then click the *correct* save button (why are there two?), then restart the add-on. The logs finally showed it was happy with the configuration, and I could use the terminal (which I pinned to the sidebar).

I downloaded the dashboard assets into the `config` directory with `wget https://nightly.link/WolfwithSword/Bambu-HomeAssistant-Flows/workflows/media_archive/main/bambu-ha-media-files.zip` (per the instructions). When I unzipped it, the files put themselves in the correct places. Nice.

The page tells you how to set up the dashboards, *then* has the forms to generate the YAML files for the cards. A bit confusing, but fine. I generated *all* the file options, and was able to copy+paste the YAML into a manual card for each one. This *mostly* worked. I did have to go into the printer entity to set each temperature unit to celsius, as it suggested in the FAQ at the bottom.

But it seemed like I was missing the entities to be able to set the printer temperatures. It showed `number.p1s_01p00a3a1100531_set_nozzle_temp Entity not found` in the card. In the developer tools section, I looked at all the entities and didn't see it, or anything that looked similar. I went to the device under the settings/integrations, and under controls, it showed booleans to turn the fans and light on & off, but nothing to set the temperature. Well, I can't remember if I've ever manually set the temperature on the Bambu *anyways*, so I'm not going to worry about it.

... And then I didn't end up using any of that dashboard setup. It showed me a lot of info I didn't care about and wasn't going to set. I haven't needed to go in and change the chamber fan manually on a print, for example, and I don't need a giant photo of the printer with the temperatures overlaid on it.

I ended up adapting [this example](https://community.home-assistant.io/t/my-bambu-lab-x1c-dashboard-automations/665646), which mimics what you see in the Bambu app. It's a lot simpler, and I can see the info I care about at a glance. I did do some cleanup on it, though. I made use of the sections view, so everything didn't have to be in a single vertical-stack card, for example.

And then I basically replicated it for my Octoprint-connected printers. The one thing I *couldn't* add to those was the name of the print job.