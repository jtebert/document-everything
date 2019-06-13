# Julia's Documentation

This is documentation of various useful things I've figured out and will inevitably forget if I don't write them down.

## Usage

Local setup:

```
bundle update
bundle install
```


Run locally:

```
bundle exec jekyll serve
```

Github pages is currently set up for the master branch. The trick to actually getting this to work was to disable the `url` and set the `remote_theme` in `_config.yml`.