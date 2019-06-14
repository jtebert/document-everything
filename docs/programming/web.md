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

First, enable GitHub pages for your repository under the settings. If you're using Jekyll and want Github to compile the site, set the source to "master branch". If you're compiling it yourself and pushing it to the gh-pages branch, choose that.

Then under "Custom domain," set your subdomain, such as `docs.juliaebert.com`. (Look familiar?) This will create a commit to your repository with a CNAME file that will let GitHub handle properly directing requests to your github.io domain.

Now go to your domain provider's site to add a custom DNS record. Choose the type as CNAME and set the name to your subdomain (e.g., `docs`). Then under the Domain name/data, set your GitHub Pages base url with a period at the end, such as `jtebert.github.io.`. Note that this does *not* include your project's repository name at the end.

It can take awhile (up to hours) for this to propagate. You can check whether it's working with:
```bash
dig docs.juliaebert.com +nostats +nocomments +nocmd
```
It should give an output like this:
```bash
; <<>> DiG 9.11.3-1ubuntu1.7-Ubuntu <<>> docs.juliaebert.com +nostats +nocomments +nocmd
;; global options: +cmd
;docs.juliaebert.com.           IN      A
docs.juliaebert.com.    3519    IN      CNAME   jtebert.github.io.
jtebert.github.io.      1816    IN      A       185.199.108.153
jtebert.github.io.      1816    IN      A       185.199.109.153
jtebert.github.io.      1816    IN      A       185.199.110.153
jtebert.github.io.      1816    IN      A       185.199.111.153
```
If you don't have any lines not starting with `;`, it means it's not working (or not working yet).

A final note if you're using Jekyll: when you're set up with the subdomain instead of `USERNAME.github.io/PROJECT-NAME`, you will set the `base_url` in your `_config.yml` to nothing instead of `/PROJECT-NAME`.