---
title: Python Documentation
last_modified_date: 2020-11-18
---

1. TOC
{:toc}

---

This is how I document and version-control my Python code and create auto-generated documentation on Read The Docs – all for free. To see an example of this in action, check out my [Gridsim project](https://github.com/jtebert/gridsim) and [its documentation](https://gridsim.readthedocs.io/en/latest/).

All of these are available for free when your code is open source. (Some don't have this requirement, or let you use non-open source code with an education account.)

## Code structure

I'm starting by assuming that your code is already structured as a Python package, like I describe in my [Python Packaging post](/programming/python-packaging).

## Inline code documentation

The first thing you'll need to document your code is... documentation in your code. That means thorough docstrings for all of your functions, classes, and methods. (Or, at the very least, all the ones that are part of the public API for your code.)

There are many different docstring formats for Python, just to make things confusing. Whichever you pick, be consistent about it throughout your code. Personally, I've settled on the [numpy format](https://numpydoc.readthedocs.io/en/latest/format.html) because it's easy to read in the source code and easy to include types for parameters and returns.

While you're documenting your code, this is also a great chance to include [type hinting](https://docs.python.org/3/library/typing.html) in your code! As I'm sure you know, Python doesn't enforce types, but you can *hint* what they should be (and you can use [mypy](http://mypy-lang.org/) in your editor/IDE to check that you're obeying the hints). These type hints will also show up in your Sphinx-generated documentation. As a bonus: if you use type hints in your code and then autogenerate the docstrings (with something like [VS Code Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring)), it'll probably auto-populate the types in your docstring.

### Documenting classes

There's one additional trick for documenting classes, compared to functions: how to document the constructor (the `__init__()` function). There are two ways to do this, both of which are considered acceptable:

1. Put your documentation inside the `__init__()` method, just like any other method
2. Put your documentation just inside the *class,* above the init function.

I take the second option, for two reason: it works nicer with auto-documenting classes, and it looks nicer in the final output; you don't have documentation listed as belonging to `__init__()`, when you never actually call that function directly.

If you opt for the first option, you will need to add an additional change to your documentation configuration, which is [described below.](#documenting-the-__init__-function)

### Internal referencing

The documentation uses [reStructuredText](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html), which I'll talk about a bit more below. For documenting your code, it's useful to know that use can use the RST syntax within your documentation, and it will be formatted correctly. Here are the most useful examples:

- ``` ``text`` ```: Include monospaced text, like a code snippet. Note that it's *double* backticks (vs single ticks in Markdown).
- `` :class:`~<PACKAGE>.<FILE>.<CLASS_NAME>` ``: Link to a Class. Using `~` means that it will just show the class name, not the whole path to the class.
- `` :meth:`~<PACKAGE>.<FILE>.<CLASS_NAME>.<METHOD>` ``: Link to a method within a class. Using `~` means it won't show the whole path to the method.
- `` :func:`~<PACKAGE>.<FILE>.<FUNCTION>` ``: Link to a function. Using `~` means it won't show the whole path to the function.
- `` `Python <http://www.python.org/>`_ ``: Link text to a website.

## Set up local documentation

This is based on the [getting started instructions for Sphinx](https://docs.readthedocs.io/en/stable/intro/getting-started-with-sphinx.html), so you can get the same idea there.

First, we need to install the package to make our documentation:
```shell
pip install sphinx
```
Now we'll create the folder for the documentation:
```shell
mkdir docs
cd docs
```
And then run the quickstart to set things up:
```shell
sphinx-quickstart
```
When asked "Separate source and build directories", enter "n" (the default). As prompted, set your project name and authors. When it asks for a Project release, enter "0.1". (You'll be able to change this later, but this is a good place to start.)

Now we should be ready to generate our first documentation:
```shell
make html
```
We want to make sure that this output isn't included in your git repository: in `.gitignore`, add `docs/_build/`.

This should generate a web page that we can open: (or open that file in your browser using your file explorer)
```shell
open _build/html/index.html
```

Time to set it up to actually document our code. Within the `docs` folder, you should find a file called `conf.py`. This contains all of the configuration for your documentation. Let's set some things in there.

First, we need to make sure that it finds the code we're documenting, which is one level up from our docs folder. To do so, add the following line after the import statement within `conf.py`:
```python
sys.path.insert(0, os.path.abspath('..'))
```

Edit extensions (probably an empty list by default):
```python
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.coverage',
    'sphinx.ext.napoleon'
]
```
These extensions do the following:
- `sphinx.ext.autodoc`: Let you automatically document an entire file or class.
- `sphinx.ext.coverage`: When the documentation compiles, check for any undocumented functions/classes and warn you.
- `sphinx.ext.napoleon`: Lets you use different docstring formats, like numpy and Google formats.

The default theme isn't great, so we'll also change the theme.
First, install the theme used by Read the Docs:
```shell
pip install sphinx_rtd_theme
```
In `conf.py` change `html_theme`:
```python
html_theme = 'sphinx_rtd_theme'
```
Rebuild the documentation, refresh your browser, and it should be using the new theme:
```shell
make html
```

In case you want to document anything in Markdown, we can also add that capability to Sphinx.
```shell
pip install recommonmark
```
Then add `recommonmark` to the `extensions` list in `conf.py`.

### Release version

If you set up your version system [like I did here](/programming/python-packaging/#semantic-versioning), you should have your canonical package version in `<PACKAGE_NAME>/__init__.py` as the variable `__version__`. We can use that variable here without needing to install or import the whole package with this code snippet in `conf.py`:
```python
import sys
import codecs

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
Now, change the `release` variable in `conf.py`:
```python
release = get_version(os.path.join("..", "gridsim", "__init__.py"))
```

### Documenting the `__init__()` function

If you opted for documenting `__init__` instead of your classes ([see here](#documenting-classes)), you'll need to add the following to make the function show up in your generated documentation. (Source: [Stack Overflow](https://stackoverflow.com/questions/5599254/how-to-use-sphinxs-autodoc-to-document-a-classs-init-self-method))

```python
# Show __init__() in documentation.
def skip(app, what, name, obj, would_skip, options):
    if name == "__init__":
        return False
    return would_skip

def setup(app):
    app.connect("autodoc-skip-member", skip)
```

## Add your documentation

Sphinx uses ReStructuredText (RST) for documentation. The general idea is similar to Markdown, where you write human-readable syntax and it gets converted into HTML. Annoyingly, it uses completely different syntax than Markdown. But it does support more complex stuff, like referencing functions and classes within your documentation. There's a [very thorough guide here](https://www.sphinx-doc.org/en/master/usage/restructuredtext/index.html), which I recommend skimming for the basics.

First, let's look at the documentation home page. This is what you saw when you opened the documentation above. It comes from the file `docs/index.rst`. If we open that up, we see headers (with `==============` underline), table of contents, and a bulleted list of links to other sections. You can get rid of the "Indices and tables" section (which is my personal preference) and put in the basic that you want your users to see right away, such as a description and how to quickly install your project.

The table of contents (`toctree`) is what shows up in the menu on the left side. We'll populate that as we go. To start, add `reference/index`, which is where we'll put our code reference. It should look like this:

```
.. toctree::
   :maxdepth: 2
   :titlesonly:

   reference/index
```

Now we need to make that file. Create `docs/reference/index.rst` and add in a sub-table of contents for each of the files (modules), classes, etc. that you want to document.
```
=================
Package Reference
=================

Each page contains details and full API reference for all the code in this code package.

.. toctree::
    :maxdepth: 1

    logger
    robot
```

### Documenting your code

Within `docs/reference`, we'll create a `.rst` file for each file/module/class in your documentation. If you have sub-packages, you could create additional subfolders in `reference` to structure this section.

Let's say that your package has a module (file) that contains code for data logging, called `logger.py`. You can document this entire file with autodoc. Create a file called `logger.rst`, and include the following:
```
======
Logger
======

.. automodule:: gridsim.logger
    :members:
```
Rebuild the documentation (`make html`) and refresh. You should now see a collapsible menu on the left for your code reference. When you click on "Logger" (or whatever you actually created), you should see the documentation for the whole file you specified. If you included a docstring at the start of the file (multi-line string in triple quotes), this will also appear at the start of the documentation.

However, sometimes you might not want to include absolutely everything in a file, perhaps because there are functions or methods that aren't meant to be part of the user API. By default, Sphinx *will* exclude functions and methods prefixed with an underscore (e.g. `_private_function()`), which is the Python convention for making something private.

For example, you might want to include multiple classes from different files in one documentation page. `autoclass` allows you to specify a class name within a file to document. You can also add `:exclude-members:` to exclude specific methods or class variables from the documentation.

```
======
Robots
======

This contains docoumentation for two robot classes.

They are :class:`~gridsim.robot.Robot` and :class:`~gridsim.grid_robot.GridRobot`.

For details on extending the Robot classes to create your own, see :ref:`custom-robot`.

.. autoclass:: gridsim.robot.Robot
   :members:
   :exclude-members: update, get_tx_message, add_to_world


.. autoclass:: gridsim.grid_robot.GridRobot
   :members:
```

### Adding additional pages

You probably want more than just class references in your documentation. For example, you might want a "Getting Started" guide, or a page for developers. You can structure these either as individual `.rst` files directly in the `docs` folder, or within a subfolder. If you use a subfolder, you'll probably want an `index.rst` folder to organize its contents. My project has a folder called `getting_started`, which contains this `index.rst` file:
```
===============
Getting Started
===============

.. toctree::
    :maxdepth: 1

    installation
    basic-usage
    custom-robot
```
which creates the submenu for all of the pages within it (the other files in the folder).

Files that are directly within `docs` can be added directly to the `toctree` in the toplevel `index.rst`.

Within these files, you might want to include blocks of code (like how to install the package). [Here is information on code blocks in RST](https://sublime-and-sphinx-guide.readthedocs.io/en/latest/code_blocks.html). Most simply, it's like this:

```
.. code-block:: console

    $ python3 -m venv venv
    $ source venv/bin/activate
```

If you have pages that don't require any of the additional functionality of RST (like internal links), you can also write them as Markdown files.

### Adding examples

You might also have examples of how to use the code. I keep these in an `examples` directory in the root of my repository.

Within your documentation, you can include the contents of these examples, with syntax highlighting, line numbers, and even highlighting certain lines. For example:

```
.. literalinclude:: /../examples/viewer_simulation.py
  :language: Python3
  :linenos:
  :emphasize-lines: 22-23, 30-31
```

You can also allow the user to download the file directly, which uses similar syntax to RST links:
```
:download:`ex_env.png </../examples/ex_env.png>`.
```

### Changelog

It's also good practice to include a [Changelog](https://keepachangelog.com/en/1.0.0/), so that your users know what has changed between different versions of your code. That links provides a very good overview of how to structure the changelog itself.

For this documentation structure, I recommend including it in docs folder: `docs/changelog.rst`. Why RST instead of Markdown? It lets you link to relevant methods or functions. But it's not strictly necessary to use RST here.

You can then add the changelog to the table of contents in `docs/index.rst`.

## Deploying documentation

With your project hosted on GitHub, it's really easy to automatically deploy your documentation. On [Read the Docs](https://readthedocs.org/), log in with your GitHub account. This will let Read the Docs set up a webhook, which will automatically generate updated documentation.

Once logged in, you should see an "Import a Project" button. Click it, then choose your repository. You can opt for a nicer-looking name, but the URL and type should be auto-filled correctly.

When you continue, this should automatically create a webhook in your repository. You can check this on GitHub: Go to your repository > Settings > Webhooks, and you should see one for Read the Docs. Now, a new documentation version will be generated whenever you create a new release on GitHub. (To learn about GitHub tags/releases on projects, see [this section of my Python Packaging post](/programming/python-packaging#github).)

If your documentation didn't compile correctly on Read the Docs, go to the Builds tab on the project page. Click the failed build to see what went wrong.

## Wrap up

Everything should now be in place to automatically generate your documentation whenever you make a new release on GitHub. Now we can go back to the checklist [I described here](/programming/python-packagin#release-checklist).

- Verify tests and examples work. (It must be passing on Travis CI.)
- Check that all documentation is updated and builds locally.
- Update version number (`__version__`) in `gridsim/__init__.py`
- Update changelog: Update the title for "Unreleased" to the new version
- Push (or merge) to master
- Create release on GitHub. (This will automatically create a new Stable and version-numbered documentation version on Read The Docs and deploy an updated release to PyPi.)