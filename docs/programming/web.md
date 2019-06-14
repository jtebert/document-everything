---
layout: default
title: Web Development
parent: Programming
permalink: /programming/web
---

# {{ page.title }}

1. TOC
{:toc}

---

## Github Pages project on custom subdomain

*Still trying to get this working*

First, enable GitHub pages for your repository under the settings. If you're using Jekyll and want Github to compile the site, set the source to "master branch". If you're compiling it yourself and pushing it to the gh-pages branch, choose that.

Then under "Custom domain," set your subdomain, such as `docs.juliaebert.com`. (Look familiar?) This will create a commit to your repository with a CNAME file that will let GitHub handle properly directing requests to your github.io domain.

Now go to your domain provider's site to add a custom DNS record. Choose the type as CNAME and set the name to your subdomain (e.g., `docs`). Then under the Domain name/data, set your GitHub Pages base url with a period at the end, such as `jtebert.github.io.`. Note that this does *not* include your project's repo name at the end.