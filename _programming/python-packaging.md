---
title: Python Packaging
last_modified_date: 2020-11-18
---

1. TOC
{:toc}

---

This is how I structure my code in Python packages. Despite the [Zen of Python](https://www.python.org/dev/peps/pep-0020/) stating "There should be one—and preferably only one—obvious way to do it", there are an awful lot of different ideas about the "right" way to structure code. So take what I say here with a grain of salt: this is what works well for my projects. If this doesn't seem to work for the way your code is structured, it's not gospel.

## Folder and file structure

Another guiding principle in the Zen of Python is "Flat is better than nested." With that in mind, I keep a relatively flat structure for my package files. It looks something like this:

```
<REPO_ROOT_FOLDER>
├── docs/
├── examples/
├── tests/
├── venv/
├── <PACKAGE_NAME>
│   ├── __init__.py
│   ├── <CODE_FILE>.py
│   ├── <ANOTHER_MODULE>.py
│   ├── ⋮
│   └── <SUB_PACKAGE>
│       ├── __init__.py
│       ├── <MORE_CODE>.py
│       └── ⋮
├── .gitignore
├── README.md (or README.rst)
├── LICENSE
└── setup.py
```

If you're using continuous integration, your root folder might contain other files, like `.travis.yml` for managing that. You might also have additional files like `CONTRIBUTORS.md` or a `requirements.txt` file for development. (Note: since we're making a reusable, installable package, having `requirements.txt` is NOT a substitute for `setup.py`.)

If you're not doing [full-fledged documentation](/programming/python-documentation), it's probably good to include a [Changelog](https://keepachangelog.com/en/1.0.0/) in your root folder. This is incredibly helpful when it comes to releasing new versions of your code: if you keep track of your changes as you go (adding to the changelog with each commit), you basically have your release notes written for you.

## Virtual environments

It's important to separate the dependencies and packages used by *this package* vs by *other projects* on your system, or it will be hell to keep track of what you're using. This is where virtual environments come in. You pull together a version of Python and specific packages within a folder that are used for just this project. Luckily, this is easy to set up and use. Within the root folder of your project, run:
```shell
python3 -m venv venv
```
This creates a Python 3 virtual environment in a folder called `venv`. (There's nothing special about this name, but it's a convention.) To use this virtual environment, run:
```shell
source venv/bin/activate
```
and your terminal will probably show an indicator that you're using a virtual environment.

As long as it's active, any Python commands you run (including installing) will use the Python version and set of packages in that virtual environment. You can see what packages you currently have installed with `pip freeze`.

When you're done, you can just close your terminal or deactivate the virtual environment with `deactivate`.

## In the code

For your code to work as an installable package, there are certain files you need.

### Package `setup.py` file

First is `setup.py`, in the root folder. This tells the installer what to do, and it also provides metadata for describing and categorizing your package.

```python
from setuptools import setup, find_packages

with open('README.md') as f:
    readme = f.read()

setup(
    name='gridsim',
    version='0.4',
    description='Simple grid-based robot simulator',
    long_description=readme,
    python_requires='>=3.6',
    author='Julia Ebert',
    author_email='julia@juliaebert.com',
    url='https://gridsim.readthedocs.io',
    download_url='https://github.com/jtebert/gridsim',
    packages=find_packages(exclude=('tests', 'docs', 'examples')),
    license='MIT',
    install_requires=[
        # List of dependencies
        "pygame>=1,<2",
        "numpy>=1.10",
        "h5py>=2",
        "pyyaml>=5.3",
        'pillow >=7',
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Framework :: Robot Framework",
        "Development Status :: 3 - Alpha"
    ],
    zip_safe=False,
)
```
There are a couple important things to note here:
- This uses the existing README file as the long description, which follows the mantra of "don't repeat yourself."
- Using `python_requires` will perform a compatability check to ensure that the user installing your code can run it. Check for certain features in your code that may limit its compatability with older versions of Python (such as some type checking)
- For the `packages`, you have two options: explicitly give it a list of package names (eg `packages=['gridsim']`) or let it recursively find packages with `setuptools.find_packages`. If you take the second approach, make sure you exclude folders in your root directory that aren't packages, such as your tests, documentation, and examples. If you only have one package (no nested sub-packages), it's probably easier to just list it explicitly.
- If you're not sure what license to choose for your code, [here's a very useful guide](https://choosealicense.com/). I usually use the MIT license, since it's very open and easy to understand. *Not* including a license means that it defaults to "exclusive copyright," ([see here](https://choosealicense.com/no-permission/)), which means nobody else has rights and can get messy.
- `install_requires` specifies the pip dependencies of your package. You *can* include package names here with no version limitations, but this might lead to problems if a user tries to use a much older or newer version than your system is designed for. [Read here](https://packaging.python.org/discussions/install-requires-vs-requirements/) for more information about specifying versions.
- `classifiers` help organize packages and help people find yours. [Here is a list of the classifiers available](https://pypi.org/classifiers/).

For more on options to include in `setup.py`, [see the documentation](https://docs.python.org/3/distutils/setupscript.html).

With this in place (and your virtual environment active), you can install your package locally to develop it:
```shell
python setup.py develop
```
This essentially installs the local folder. Any changes you make to the code will be used, so you don't have to re-install.

You can also use this in-development package in a related project (for example, to test how changes work in a project that has this package as a dependency). From within the virtual environment of that project, run:
```shell
pip install -e /path/to/this/package
```
where the path goes to the folder containing the `setup.py` file.

### Package `__init__.py` file

Packages have `__init__` files, similar to how Python classes have `__init__` methods for their constructors. Whatever you put in this file will be called when you import your package. So if you put a print statement here, that text will be printed when you import the package.

The existence of this file in a folder is what makes it behave as a package. You can leave this file completely empty and your package will work just fine.

The most common use of the init file is to import things within the package to make it easier to use. Let's say you have a package structure that looks like this:

```
my_package/
    __init__.py
    cats.py
        class: Cat
        class: Tiger
    dogs.py
        class: Dog
```

With your package installed and an empty init file, you can import like this:
```python
from my_package.cats import Cat, Tiger
from my_package import dogs

# Use it
Cat()
dogs.Dog()
```
You can see how this might be a little tedious. You might like to write the code in multiple files to make it easier, but your user doesn't necessarily need that additional structure of `dogs.Dog()`. You can modify your package's `__init__.py`:
```python
from .cats import Cat, Tiger
from .dogs import Dog
```
Note the relative import: since we're already inside `my_package`, you can use `.` to reference the current location, like when using Unix-based filesystems.
Now your user doesn't need to know that internal structure and can import everything under a single namespace:
```python
from my_package import Cat, Tiger, Dog
```
You don't *have to* do this, though; if importing with the file namespace makes sense for your code, do it.

### Subpackages

First, remember the mantra that "flat is better than nested," and ask whether your project is complex enough that it would benefit from subpackages. The advantage of using subpackages is that it provides additional namespaces and can provide more structure to help users make sense of a complex package. But it also adds complexity to using the code; you now have more complex import statements, and users might get confused if you have modules with the same name in different sub-packages, such as `package.sub1.utils` and `package.sub2.utils`.

But let's say that your package does benefit from subpackages. This isn't terribly complicated to implement: you just use subfolders, each of which has its own `__init__.py` file, plus whatever code you're including. If you use `find_packages` in your `setup.py` file, these should be included automatically.

It is useful to understand how these subpackages and submodules are handled when you import them. [This Stack Overflow question](https://stackoverflow.com/questions/12229580/python-importing-a-sub-package-or-sub-module) provides some useful insight on understanding some of the mistakes in understanding, and [Real Python](https://realpython.com/lessons/subpackages/) gives some insights on how to use them.

## Semantic versioning

[Semantic versioning](https://semver.org/) is a way  to give your code meaningful release numbers. You've probably seen this in a wide variety of software, including Python packages. It's the way the PyPi handles version numbering.

Each time you release your code, it gets a new number, like `3.6.1`, which is in the format `MAJOR.MINOR.PATCH`. From the semantic versioning website:

> MAJOR version when you make incompatible API changes,<br>
> MINOR version when you add functionality in a backwards compatible manner, and<br>
> PATCH version when you make backwards compatible bug fixes.<br>
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Another general rule of thumb: code that's "pre-release" has a major version number of 0. I typically start my code at v0.1. (You can leave off the "patch" number if you're not using it.)

### In your code

One of the most annoying challenges in managing versions is to make sure that everywhere has the same version number: your documentation, your GitHub release, your PyPi release, the code itself. There's not a perfect solution to this. The way I do it is by:

1. Keeping the version number in only *one* place in the code, which everywhere looks at.
2. Creating a checklist for new releases. (I'll describe this in the [automation section](#automate-it) below.)
3. Automating the release toolchain as much as possible, so it's harder to mess up.

Let's start with putting the version number in one place in the code. After looking at various well-managed projects and examples, I keep it in `<PACKAGE_NAME>/__init__.py` This file includes the following:
```python
# Canonical source for version number
# major.minor.patch
__version__ = '0.4'
```
Notice that the version number is a string, because it might be something like "0.4.1", which wouldn't work as a number.

Because it's in the `__init__` file, you're now able to see it when you import your package. For example, in my gridsim project:

```shell
>>> import gridsim
>>> gridsim.__version__
'0.4'
```

But this requires that your package be installed and loaded to get the version number. This isn't great for managing with `setup.py` and PyPi.

To solve this, we're going to create some helper functions within `setup.py`. (This may seem hacky, but it's actually [one of the recommended solutions](https://packaging.python.org/guides/single-sourcing-package-version/), and it's how pip manages its own versioning.)
```python
import codecs
import os.path

def read(rel_path):
    here = os.path.abspath(os.path.dirname(__file__))
    with codecs.open(os.path.join(here, rel_path), 'r') as fp:
        return fp.read()

def get_version(rel_path):
    # Getting version number without package import:
    # https://packaging.python.org/guides/single-sourcing-package-version/
    for line in read(rel_path).splitlines():
        if line.startswith('__version__'):
            delim = '"' if '"' in line else "'"
            return line.split(delim)[1]
    else:
        raise RuntimeError("Unable to find version string.")
```
Now we can use this to set the version number within the `setup` function:
```python
setup(
   ...
   version=get_version("<PACKAGE_NAME>/__init__.py")
   ...
)
```

If you also want to access the version number elsewhere, you can create a less-hacky helper function. This will allow users (and yourself) to access the package version number with a consistent function, even if you change where the version number is stored in the future. I put my function in `<PACKAGE_NAME>/utils.py`:

```python
def get_version() -> str:
    """
    Return main version (X.Y[.Z]) from __version__ (found in gridsim/__init__.py).

    Returns
    -------
    str
        String representation of the version "major.minor[.patch]"
    """
    from gridsim import __version__
    return __version__
```

## Deploying/releasing your package

Now that you have your code structured as a package, it's time to make it available to the world.

### PyPi

To make your package installable with pip, it needs on [pypi.org](https://pypi.org/).

I'm not going to go through all the steps here, because there's [a great official walkthrough](https://packaging.python.org/tutorials/packaging-projects/#generating-distribution-archives) available.

This first walks you through testing the process on test.pypi.org, then making your first real release on pypi.org.

There's one important note here that has tripped me up in the past: you can't re-upload to pypi with the same version number. This makes sense -- you don't want to have two different versions of the code with the same version number! So if you discover you made a mistake in the code you uploaded, just increment your version number at the patch level and upload again. (For example, v0.4 becomes v0.4.1) I've done this a lot, especially when fiddling with automating the process (which I'll describe below).

### GitHub

In addition to pip having version numbering, GitHub *also* lets you make releases. (For the nitpicky, version tags are a feature of `git` itself, but GitHub has a nice interface for adding additional information with those tags.)

This might seem redundant and pointless at first, but it will be useful for automating everything. So bear with me.

On the page for your GitHub repository, you should see a tab for "Tags" or "Releases". When you click on it, you should have a button that says "Draft a new release."

That will take you to a form. For the "Tag version," use the release number that's set in your code (in `<PACKAGE_NAME>/__init__.py`). For the name, I do something like "Gridsim v0.4.1". No need to get fancy, but I like to include the version number for clarity. For the description, this is where the changelog comes in handy: if you keep track of the changes from the last version as you go, you can just copy and paste them here.

By default, this release will include a zip file of your source code *at the most recent commit*. You can change which commit this is paired with, but typically you'll want to create a release from your latest code. You have the option to include additional files, but this isn't really necessary in this case; people should be installing your project from pip anyway!

## Automate it

Right now, we have a lot of manual steps to create a new version of your package, which means a lot of steps to forget or mess up. If we automate it, we can avoid that.

Here we'll use [Travis CI](https://travis-ci.com) (which stands for continuous integration). This lets you automate code-related tasks by connecting it to your GitHub, such as running tests, compiling documentation, and (in our case) creating releases.

Travis CI provides some useful documentation here: for [setting up Travis with Python](https://docs.travis-ci.com/user/languages/python/) and [deploying to PyPi](https://docs.travis-ci.com/user/deployment/pypi/).

First, we need to connect our GitHub repo to Travis. ([Here's a tutorial](https://docs.travis-ci.com/user/tutorial/), if you don't like reading my version.) When you go to [travis-ci.com](https://travis-ci.com), log in with your GitHub and follow the prompts. You can either activate it for all repositories, or just this project. (It won't do anything to your other repositories unless you set them up like below.)

In order for Travis to know what to do with our repository, we'll include a `.travis.yml` file in the root of the repository. Travis will spin up a virtual machine with the specifications you give it and run the commands you request of it. This file will tell Travis the configuration and what you want it to do. Here's what the basics look like: (we'll add on to this in a moment)

```yaml
os: linux
dist: xenial

# If you're running tests, you can use multiple versions of Python to make sure
# it works in all of them. We're just using it to deploy, so we'll stick with
# one version of Python.
python:
- '3.7'

# Command to install dependencies
install:
- python setup.py install

# Commands to run
# script:
# - pytest
```

With this included in your repository, Travis will run this every time you push your code to Python. Right now, all it does is install your package and do nothing with it. So the build will pass if your code successfully installs, and fail if it can't install your code.

Below this, there are two commented lines that would run any tests in your system. But I haven't covered testing here (I might in a future post), so for now we'll leave it out.

Now, we'll make this deploy to PyPi whenever we create a new release on GitHub. After this, we'll never need to go through those PyPi steps I describe above. We'll add the following to our `.travis.yml`.

```yaml
# Push tagged releases to pip
# Instructions for PyPi setup come from here:
# https://docs.travis-ci.com/user/deployment/pypi/
# (Had to first system travis package with `sudo gem install travis`)
deploy:
  provider: pypi
  username: __token__
  password:
    secure: ..............................
  distributions: "sdist bdist_wheel"
  cleanup: false
  # Don't try to add to PyPi multiple times if you're running this with multiple
  # different python configurations
  skip_existing: true
  on:
    tags: true
```
Notice the last two lines: these mean that this deploy will only happen when there is a new tag (release).

We need to fill in the password, but (because security) we're not going to just put in a regular password here. It's a bit of a pain, but you only need to do it once! First, we'll generate a token with PyPi. Then we'll encrypt it with Travis CI, so it's safe to put in a plain-text file in the repository.

First (following [these instructions](https://pypi.org/help/#apitoken)), we'll generate a token. Go to your [account settings](https://pypi.org/manage/account/), then go to the API tokens section and select "Add API token." Give it a name (like "My Package (travis-ci.com)"), set the scope to this package, and copy the token.

Next: encryption. ([More info here.](https://docs.travis-ci.com/user/encryption-keys/#usage)) We need to install the Travis command line interface and set it up:
```shell
gem install travis
```
(You might need to run with sudo, depending on your setup.) The log in:
```shell
travis login --pro
```
Now we're ready to encrypt that API token you made above.
```shell
travis encrypt YOUR_API_TOKEN --add deploy.password --com
```
Then paste the output into the `secure` line above. You can [read more about the encryption keys here](https://docs.travis-ci.com/user/encryption-keys/#usage).

If you push to GitHub, you should see on your Travis dashboard that this runs, but it won't deploy to PyPi. Now, if you create a tag/release on GitHub, the deployment will run and create a new version of your package, which you'll be able to see on pypi.org.

### Release checklist

Before making a new release, I have a checklist to make sure I don't miss any steps to proper deployment. For my Gridsim project, I keep this in `docs/developments.md`, since it's part of my development process. Here's what it looks like:

- Verify tests and examples work. (It must be passing on Travis CI.)
- Check that all documentation is updated and builds locally.
- Update version number (`__version__`) in `gridsim/__init__.py`
- Update changelog: Update the title for "Unreleased" to the new version
- Push (or merge) to master
- Create release on GitHub. (This will automatically create a new Stable and version-numbered documentation version on Read The Docs and deploy an updated release to PyPi.)

Some of this is only relevant if you're running tests or [generating documentation](/programming/python-documentation), but just ignore those steps.