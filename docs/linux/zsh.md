---
layout: default
title: Z shell
parent: Linux
permalink: /linux/zsh
---

# {{ page.title }}

1. TOC
{:toc}

---

## Installation

Install zsh with:
```bash
sudo apt install zsh
```

Set zsh as your default terminal:
```bash
chsh -s $(which zsh)
```
You have to log out in order for that to take effect, but you can run it directly from your existing shell by running `zsh`.

Install oh-my-zsh for nicely configuring Zsh:
```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

The [powelevel9k](https://github.com/bhilburn/powerlevel9k/) theme for Zsh is a highly configurable and fancy-looking theme. To install it, you need to clone the source to your Zsh themes folder:
```bash
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```
Then, in your `~/.zshrc` file, set the theme:
```bash
ZSH_THEME="powerlevel9k/powerlevel9k"
```
We also need to edit this file to use a [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts#patched-fonts) font (one with extra icons). Add this:
```bash
POWERLEVEL9K_MODE='nerdfont-complete'
```

Pick a font from that link above and download one of the ttf/otf fonts to your `~/.fonts/` directory. Then, using Gnome Tweaks (or whatever your equivalent), set the Monospace font to your chosen Nerd Font variant. (I'm currently using the Hack font.) You may need to logout or restart for it to show up here. Once I set the font, I also had to restart the shell (Alt+F2 r) for the change to show up in the terminal.

## Configuration

These are a useful set of plugins (which does in your `~/.zshrc`): `plugins=(git extract z history-substring-search)`

- `extract` lets you easily extract tar/zip files without remembering all the necessary letters
- `z` is like `cd` but searches your history for places you go often
- [`history-substring-search`](https://github.com/zsh-users/zsh-history-substring-search) lets you search your history by starting to type things. You need to set keybindings (I use up/down arrow keys) in `~/.zshrc`: \\
  ```zsh
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
  ```

I also added my reboot required alias to `~/.zshrc`:
```bash
alias rr='if [ -f /var/run/reboot-required ]; then echo "reboot required"; else echo "No reboot needed"; fi'
```
And a shortcut to opening the config file:
```bash
alias zshconfig="nano ~/.zshrc"
```

- virtualenv

## Appearance Customization

The powerlevel9k wiki has a [Show Off Your Config section](https://github.com/bhilburn/powerlevel9k/wiki/Show-Off-Your-Config) if you want to check out some variants or examples. There is another section with basics on [Stylizing Your Prompt](https://github.com/bhilburn/powerlevel9k/wiki/Stylizing-Your-Prompt).

Also, a quick note on colors: using things like "green" or "black" will use that value as specified by the colors you have configured in your terminal, rather than the number-based extra colors in the Stylizing wiki.

You can also search for the unicode values associated with custom symbols on the [Nerd Fonts](https://nerdfonts.com/#cheat-sheet) cheat sheet.

You can set the separator between segments by setting these in `~/.zshrc`:
```zsh
POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR=$'\uE0B1'
POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR=$'\uE0B3'
```
There are many options provided in the [powerline extra symbols](https://github.com/ryanoasis/powerline-extra-symbols) (included with Nerd Fonts).

Here is also an annotated bit of my (possibly outdated) `~/.zshrc` file:

```zsh
# LEFT SIDE
# Set what shows up in the left-aligned section. `newline` add a line break
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs newline os_icon)
# Show a lock and blue background when in a folder I don't have write permissions for
POWERLEVEL9K_DIR_SHOW_WRITABLE=true
# Show the current directory as bold (just that last folder)
POWERLEVEL9K_DIR_PATH_HIGHLIGHT_BOLD=true
# Set location to have green background and white text
POWERLEVEL9K_DIR_HOME_FOREGROUND="white"
POWERLEVEL9K_DIR_HOME_BACKGROUND="green"
POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="white"
POWERLEVEL9K_DIR_HOME_SUBFOLDER_BACKGROUND="green"
POWERLEVEL9K_DIR_DEFAULT_FOREGROUND="white"
POWERLEVEL9K_DIR_DEFAULT_BACKGROUND="green"
# This keeps the non-writable folder from having black text on blue background
POWERLEVEL9K_DIR_NOT_WRITABLE_FOREGROUND="white"
# Hide the tilde (~) abbreviating /home/jtebert in paths, since I'm showing an icon instead
POWERLEVEL9K_HOME_FOLDER_ABBREVIATION=""
# Use a pretty caret character (> ) to display instead of / character
POWERLEVEL9K_DIR_PATH_SEPARATOR=" \ue0b1 "
# Show a home icon when in home folder or a subdirectory of home
POWERLEVEL9K_HOME_ICON='\uf7db'
POWERLEVEL9K_HOME_SUB_ICON='\uf7db'
# Show a MDI folder icon everywhere else
POWERLEVEL9K_FOLDER_ICON='\uf74a'
# I like this github icon better
POWERLEVEL9K_VCS_GIT_GITHUB_ICON='\uF408'
# And I think showing the branch is redundant
POWERLEVEL9K_HIDE_BRANCH_ICON=true
# Show the OS icon right before the prompt
POWERLEVEL9K_OS_ICON_BACKGROUND='grey'
POWERLEVEL9K_OS_ICON_FOREGROUND='white'
# Show a blank line between prompts for readability
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true

# RIGHT SIDE
# What to show in right-aligned section. `virtualenv` shows which you're in
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status virtualenv time)

# Make virtualenv colors match
POWERLEVEL9K_VIRTUALENV_BACKGROUND='green'
POWERLEVEL9K_VIRTUALENV_FOREGROUND='white'
# Make the status show up as green check/red x on gray background
POWERLEVEL9K_STATUS_OK_BACKGROUND='grey'
POWERLEVEL9K_STATUS_ERROR_BACKGROUND='grey'
POWERLEVEL9K_STATUS_ERROR_FOREGROUND='red'
POWERLEVEL9K_STATUS_CROSS=true
# Get rid of the icon next to the time
POWERLEVEL9K_TIME_ICON=''
```

## Other Fixes

### VS Code

To fix the broken icons in Visual Studio Code, add the following line to your settings: `"terminal.integrated.fontFamily": "Hack Nerd Font"`. And substitute whatever font you're using. Note that the font name doesn't exactly match the file name.

The colors are also different from whatever you specify in your external terminal. Someone made [a website to generate VS Code terminal color schemes](https://glitchbone.github.io/vscode-base16-term/#/). But my default (Tango wasn't included), so I copied the default colors into the settings section like this:

```js
"workbench.colorCustomizations": {
    "terminal.ansiBlack": "#2E3436",
    "terminal.ansiBlue": "#3465A4",
    "terminal.ansiBrightBlack": "#555753",
    "terminal.ansiBrightBlue": "#729FCF",
    "terminal.ansiBrightCyan": "#34E2E2",
    "terminal.ansiBrightGreen": "#8AE234",
    "terminal.ansiBrightMagenta": "#AD7FA8",
    "terminal.ansiBrightRed": "#EF2929",
    "terminal.ansiBrightWhite": "#EEEEEC",
    "terminal.ansiBrightYellow": "#FCE94F",
    "terminal.ansiCyan": "#06989A",
    "terminal.ansiGreen": "#4E9A06",
    "terminal.ansiMagenta": "#75507B",
    "terminal.ansiRed": "#CC0000",
    "terminal.ansiWhite": "#D3D7CF",
    "terminal.ansiYellow": "#C4A000"
},
```

## Unresolved Issues

- Try switching to [powerlevel10k](https://github.com/romkatv/powerlevel10k) because it's faster (apparently)
- I get single-pixel lines next to the segment separators (in gnome-terminal, but not within VS Code)

