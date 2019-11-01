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

## Copy Heroku database locally (for Django project)

If you want to test stuff locally with the contents of your development database, the easy way (assuming your database is small and you're a hobbyist like me) is to copy it to your local machine.

1. Install the [Heroku command line interface](https://devcenter.heroku.com/articles/heroku-cli) and log in
2. In the directory where your Heroku project is, generate a copy of the current database:
   ```shell
   heroku pg:backups:capture
   ```
3. Download that copy with:
   ```shell
   heroku pg:backups:download
   ```
4. Restore the database to your local system:
   ```shell
   pg_restore --verbose --clean --no-acl --no-owner -h localhost -U PSQL_USERNAME -d DB_NAME BACKUP_DUMP
   ```
   1. where `PSQL_USERNAME` is the username that will own the database (this might be your system username)
   2. `DB_NAME` is the name of the database (this should match what's in your settings)
   3. `BACKUP_DUMP` is the name of the file you downloaded in the previous step (something like `latest.dump`)
5. If the previous step asks for a password and you haven't set one for your postgres user yet:
   ```shell
   sudo -u postgres psql
   ```
   Then set the password:
   ```shell
   ALTER USER PSQL_USERNAME PASSWORD 'newPassword';
   ```
   **Do not forget the trailing semicolon.** Then exit with `Ctrl+D` or `\q`.
6. If it complains that the database doesn't exist, the easiest solution is to run
   ```shell
   python3 manage.py migrate
   ```
   and try again.

Source: [Heroku](https://devcenter.heroku.com/articles/heroku-postgres-import-export), [StackOverflow](https://stackoverflow.com/a/7696398/2552873)
{:.fs-2}