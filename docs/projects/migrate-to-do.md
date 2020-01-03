---
layout: page
title: Migrating from Heroku to DigitalOcen
parent: Side Projects
permalink: /projects/migrate-to-do
---

1. TOC
{:toc}

---

My goal is to migrate my recipe website (currently called Lazy Baker, but subject to change if I ever want to get it its own domain) from Heroku to DigitalOcean. There are a couple reasons why:

- Heroku's free tier doesn't support SSL, so Lazy Baker is technically insecure (not that there's anything worth stealing or messing with).
- Now that a few other people occasionally look at this website, it sometimes runs out of free tier hours in the last few days of the month, at which point I can no longer access my own recipes.
- I'm already paying for a DO droplet, so I might as well make use of it.

There are a couple of obstacles that have made me drag my feet on this transition up to this point.

- I need to figure out how to set up my droplet (what DO calls a VPS) to support multiple sites. (After a bit of frustrated Googling, I've discovered that this is called Server Blocks on an Nginx server.) ([Instructions here](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04))
- I don't remember how to set up a Django site on DO, especially when worrying about environment variables and static content hosted on AWS S3. (I did it once for the blog website but didn't write it down. This time I'm writing it down.)
- I need to also transfer the website's *database* from Heroku to DO.
- I'm pretty sure my DO droplet needs a bunch of updates/security patches that I don't want to face.

There are a couple other things I'd like to add to the server while I'm at it:

- Automatically pulling any changes that are pushed to master.
- Running an install/update script to integrate the changes without manual intervention (more like what Heroku does.)

## System Setup

First, I need to get in to the droplet. For some reason, I do still have it set up to allow SSHing into the system as root with the password instead of an authorized SSH key. But of course, I don't remember the password. Luckily, DO has a tutorial for [adding an SSH key](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/) (I did it manually, using Access > Console access from the DO website.) Now I can log in as a user (currently I have the user `tribune` for the blog), but for some reason still not as root (probably because the password option is enabled?) Luckily, it turns out I know the password for the `tribune` user, which has admin permissions, so I can still use `sudo`. This is already off to a hacky start.

Time to install the 105 updates (oof) to my Ubuntu 16.04 server. Here's hoping it doesn't break anything. At least 16.04 is an LTS and still supported for awhile. (LPT: don't run a server on a non-LTS release of Ubuntu.)

Since I currently have my single website running within a user account, the first step seems like setting up a new user for the new site. (I'm following [this guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04).)

- Create a new user:
  ```shell
  sudo adduser recipes
  ```
- Add it to the sudo group:
  ```shell
  usermod -aG sudo recipes
  ```
- Log out and SSH in as the new user:
  ```shell
  ssh recipes@IP_ADDRESS
  ```
  (You'll need to use the password because SSH stuff isn't set up yet)
- Generate an SSH key for the new user:
  ```shell
  ssh-keygen
  ```
- From your *local machine*, copy its public key to the authorized_keys for the new user on the server using [one of these methods](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/). (I ended up doing it manually.)

You should now be able to SSH in without your password. For some reason it's still attempting to use the password for this new user (and failing at the SSH key), despite the fact that my local publickey does show up in the new server user's `~/.ssh/authorized_keys` file, and the permissions are correct. It's not a general issue with SSH key logins, since I can log in with my SSH key to the user I created long ago. Restarting the server didn't solve the problem, nor did editing `/etc/ssh/sshd_config` to disallow login by password(`PasswordAuthentication no`) -- after a reboot, that just prevents me from logging in at all (`Permission denied (publickey).`) I do want to figure this out (it's best not to have password login enabled), but for now at least I can get in.

While I'm at it, for security, I modified `/etc/ssh/sshd_config` to `PermitRootLogin no`, to disallow root login.

**Update:** It turns out that `ssh-copy-id` copied the server's public key to its own `authorized_keys`, which wasn't what I wanted. I did it manually and it works now.

I already have the firewall set up, so I can skip that step.

Now I can move on to setting up the Django stuff (following [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)).

- Install Python3:
  ```shell
  sudo apt-get update
  sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx
  ```
  (In my case, they were already installed.)
- Set up a database for the project:
  - Log into a postgres session:
    ```shell
    sudo -u postgres psql
    ```
  - Create a databse for the project:
    ```shell
    CREATE DATABASE recipes_db;
    ```
  - Create a postgres user for the database:
    ```shell
    CREATE USER recipes WITH PASSWORD 'password';
    ```
  - Set up user to play well with Django:
    ```shell
    ALTER ROLE recipes SET client_encoding TO 'utf8';
    ALTER ROLE recipes SET default_transaction_isolation TO 'read committed';
    ALTER ROLE recipes SET timezone TO 'UTC';
    ```
  - Give the user permissions for the database:
    ```shell
    GRANT ALL PRIVILEGES ON DATABASE recipes_db TO recipes;
    ```
  - Quit postgres with `\q`
- Set up Python virtual environment
  - Update pip3:
    ```shell
    sudo -H pip3 install --upgrade pip
    sudo -H pip3 install virtualenv
    ```
  - Create a virtual environment in the home folder:
    ```shell
    cd ~
    virtualenv venv
    ```
  - Activate the virtual environment and check that it's correct:
    ```shell
    source venv/bin/activate
    ```
    If you run `which python`, you should see `/home/recipes/recipes/venv/bin/python`. If you run `python --version` you should see that it's Python 3.

## Project Setup

Now we diverge from the tutorial because we're not creating a new project from scratch; it already exists in a repository with its dependencies specified.

- Add server user's SSH key to Github (so I can clone):
  - On the server, copy the output of `cat ~/.ssh/id_rsa.pub`
  - On Github, go to Settings > SSH and GPG keys > New SSH key, and paste the public key.
- Clone the repository into the user home folder:
  ```shell
  git clone git@github.com:jtebert/lazy-baker.git
  ```
- With the virtual environment activated, install the Python dependencies:
  ```shell
  pip install -r lazy-baker/requirements.txt
  ```
- Within the repository, create a configuration file called `settings.ini` (using `touch settings.ini`) and add the following:
  ```shell
  [settings]
  DJANGO_SETTINGS_MODULE=recipe_box.settings.production
  SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx
  AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXX
  AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```
  (filling in the real information, of course)
- Install any system dependencies. (In my case they were all installed already.)
- Migrate the databse to get it set up the first time:
  ```shell
  python manage.py migrate
  ```
- Create a superuser to be able to actually use/log into the website:
  ```shell
  python manage.py createsuperuser
  ```
- Add a rule to make your port externally visible:
  ```shell
  sudo ufw allow 8000
  ```
- Try running the server:
  ```shell
  python manage.py runserver 0.0.0.0:8000
  ```
  You should now be able to view it at `http://IP_ADDRESS:8000`
  (Note: in the this particular case, the main page doesn't exist yet so you'll get an error. But you can go to the `/admin` page and see if it works.)

I ran into a couple of issues here. First, I perviously only *partially* implemented my usage of [python decouple](https://github.com/henriquebastos/python-decouple) for using the settings file, so I needed to move some things to there (like the database name, and adding the database username and password) to get it to work. I also intended to switch to using a single `settings.py` file, instead of the way that Wagtail handles things by default (a settings folder containing `base.py`, `dev.py`, and `production.py`). I still had the secondary settings files around (unused), so I removed them, moved `base.py` to the parent folder as `settings.py`, and got rid of the settings folder. I then needed to change the contents of `manage.py` to get the environment from `recipe_box.settings` instead of `recipe_box.settings.dev`.

... But then I was still getting an error that `password authentication failed for user "'recipes'"`. Notice this nested quotes? Eventually I figured out that the problem was that I put everything in my `settings.ini` file in single quotes, which you don't do for that, apparently.

I then switched over to [this tutorial on ngninx server blocks](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04) to set up a new separate server block for Lazy Baker. But it's hard to test it as is. (This is going to turn into a pain in the ass to debug, if it doesn't magically work on the first try.)

Then I hopped back to the [previous tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04) and continued on with Gunicorn (which also needed `recipe_box.settings.dev` changed to `recipe_box.settings` in `wsgi.py`). Following through on the nginx part, the file it has me create in `/etc/nginx/sites-available` doesn't completely look like the one I have for the blog, but then again, the way I did that didn't have me setting up a gunicorn service, either.

In order to see if *any* of this works, though, I do actually need to move over the URL. Currently, my domain registrar has an `A` record named `blog` pointing at the IP address. Since Nginx is supposed to handle the domain routing, I think I *should* just be able to add another `A` record named `lazybaker` pointing at the same IP address and it will magically work. (That never happens.) But now I need to wait for the record to update to tell if anything worked. (Update: that part actually worked after very limited debug -- I'd put the wrong path to the `.sock` file in the nginx site configuration.)

### Database transfer

Right now I can load the admin at `lazybaker.juliaebert.com`, but the site has no content, so I still get a 500 error on the home page. Time to steal the database from Heroku.

I have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed on my local machine, so I'll just use that and then copy the dump with `scp` (because I'm lazy).

- Create a snapshop:
  ```shell
  heroku pg:backups:capture -a lazybaker
  ```
- Download it as a `.dump` file
  ```shell
  heroku pg:backups:download -a lazybaker
  ```
- Copy it to server:
  ```shell
  scp latest.dump recipes@IP_ADDRESS:/home/recipes/
  ```
- Restore it to the server database:
  ```shell
  pg_restore --verbose --clean --no-acl --no-owner -h localhost -U recipes -d recipes_db latest.dump
  ```
  Note that this will overwrite anything that you have in the database!
- Restart the Django server:
  ```shell
  sudo systemctl restart gunicorn
  ```

Now everything shows up in the admin when I log in, but I'm still getting a 500 error on the home page! Turning on Debug again (in production, sorry), it's saying it can't find the template. After local debugging, it turns out that the issue came from relative paths: when I moved the settings file out of a subdirectory, the `BASE_URL` reference in that file was then one level too high, so it couldn't find the templates. Honestly, I'm surprised that's the only thing I saw failing from that.

## TODO

(Not in any useful order)

- Set up environment variables for project
- Get it running locally on server
- Configure URL
- Add SSL certificate
- Migrate database
- Make sure static content is working with S3
- Fix settings so that in debug, it's using local dynamically-compiled static files (ie current CSS)