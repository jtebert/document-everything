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

The most up-to-date version of my `.zshrc` configuration is in [my dotfiles repository](https://github.com/jtebert/dotfiles/blob/master/.zshrc). For more info on setting up/saving/retrieving dotfiles with git, see [this section]({{ 'linux/system-config#saving-dotfiles-with-git' | absolute_url }}). If adding existing dotfiles to a new system, install ZSH and Oh-My-ZSH *before* cloning the dotfiles repo (otherwise it looks like the .zshrc gets overwritten).

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

My most up to date `~/.zshrc` file can be found [in my dotfiles repository](https://github.com/jtebert/dotfiles/blob/master/.zshrc).

## `ls` with icons and colors

While we're add it, let's make `ls` look pretty too by giving it nicer colors and icons. First we need to install dependencies:
```shell
sudo apt install ruby ruby-dev ruby-colorize
```
and then install `colorls` from Ruby:
```shell
sudo gem install colorls
```

We can also add an alias in `~/.zshrc` to map `lc` because `colorls` is long:
```shell
alias lc='colorls'
```

But now the colors probably don't match your terminal. First we have to copy an existing YAML file containing color configuration:
```shell
cp $(dirname $(gem which colorls))/yaml/dark_colors.yaml ~/.config/colorls/dark_colors.yaml
```
If this complains about "no such file or directory," it probably means that you don't have a config folder for colorls. You can make one with:
```shell
mkdir ~/.config/colorls
```
Now you can edit this YAML file to your heart's content. I opted for lazily taking someone else's version that uses the terminal profile's ANSI colors, as [found in this GitHub issue](https://github.com/athityakumar/colorls/issues/165).

Sources: [OMG Ubuntu](https://www.omgubuntu.co.uk/2017/07/add-bling-ls-bash-command-colorls), [colorls GitHub](https://github.com/athityakumar/colorls/issues/165)
{:.fs-2}

## Other Fixes

### VS Code

To fix the broken icons in Visual Studio Code, add the following line to your settings: `"terminal.integrated.fontFamily": "Hack Nerd Font"`. And substitute whatever font you're using. Note that the font name doesn't exactly match the file name.

The colors are also different from whatever you specify in your external terminal. Someone made [a website to generate VS Code terminal color schemes](https://glitchbone.github.io/vscode-base16-term/#/). But my default (Tango) wasn't included, so I copied the default colors into the settings section like this:

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

Since then, I've also switched to my own dark/bold Material color scheme, which I've put into gnome-terminal and Tilix. (The color scheme for Tilix is included in my dotfiles.)

```js
"workbench.colorCustomizations": {
    "terminal.ansiBlack": "#263238",
    "terminal.ansiRed": "#F44336",
    "terminal.ansiGreen": "#4CAF50",
    "terminal.ansiYellow": "#FFC107",
    "terminal.ansiBlue": "#3F51B5",
    "terminal.ansiMagenta": "#673AB7",
    "terminal.ansiCyan": "#00BCD4",
    "terminal.ansiWhite": "#E0E0E0",
    "terminal.ansiBrightBlack": "#607D8B",
    "terminal.ansiBrightRed": "#E57373",
    "terminal.ansiBrightGreen": "#81C784",
    "terminal.ansiBrightYellow": "#FFD54F",
    "terminal.ansiBrightBlue": "#7986CB",
    "terminal.ansiBrightMagenta": "#9575CD",
    "terminal.ansiBrightCyan": "#80DEEA",
    "terminal.ansiBrightWhite": "#FAFAFA",
},
```

## Unresolved Issues

- Try switching to [powerlevel10k](https://github.com/romkatv/powerlevel10k) because it's faster (apparently)
- I get single-pixel lines next to the segment separators (in gnome-terminal, but not within VS Code)

