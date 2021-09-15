# Julia Documents Things

[![Netlify Status](https://api.netlify.com/api/v1/badges/fd44e2d6-5084-4a77-a373-d9dc70d2594e/deploy-status)](https://app.netlify.com/sites/julesdocs/deploys)

This is documentation of various useful things I've figured out and will inevitably forget if I don't write them down.

## Usage

Local setup:
```shell
bundle update
bundle install
```

Run locally:
```shell
bundle exec jekyll serve
```

If you want to speed up build times, try adding the `--incremental` flag, but [be aware of its limitations](https://jekyllrb.com/docs/configuration/incremental-regeneration/):
```shell
bundle exec jekyll serve --incremental
```

Occasionally update your packages:
```shell
bundle update
```

Netlify builds from the master branch. (Previously, using GitHub pages would disable the last-modified plugin, but this is no longer used. So it should work on Github Pages, but I haven't tried it recently to confirm.)

## Credits

This uses the very slick [Just the Docs](https://pmarsceill.github.io/just-the-docs/) Jekyll theme.

Images are from [unDraw](https://undraw.co/illustrations), sometimes modified by me.


## Things I want to add

- For long pages (in desktop view, at least), a running within-page table of contents along the right side
  - Also should involve smooth-scrolling between sections when you click on the links
  - And dynamically updating the TOC to show which section is currently active ([possibly helpful](https://tj.ie/building-a-table-of-contents-with-the-intersection-observer-api/))
- On the home page, add links to most recently posted & most recently updated pages

## Notes

For Ruby 2.7 and Jekyll 3.8.5, you get a billion warnings printed to the console. Until Just The Docs supports Jekyll 4.0, run this instead of the above command:

```shell
bundle exec jekyll serve 2>/dev/null
```

If you encounter errors when trying to locally run the site, try deleting the `vendor` and `_site` directories, then reinstalling dependencies (as described above).