---
title: Git Cheat Sheet
last_modified_date: 2022-01-04
---

1. TOC
{:toc}

---

This walks through most of what you'll probably need to do with git in the command line. You can also read the [full git documentation](https://git-scm.com/doc), but it's not very beginner friendly. A cool resource for interactively learning the more complex stuff (and understanding what's going on under the hood) is [Learning Git Branching](https://learngitbranching.js.org/).

A lot of text editors and IDEs have git integration that will handle basic usage like staging, committing, pushing, pulling, and resolving merge conflicts, but they don't always handle (or are hard to use for) some of the more involved stuff (such as stashing and branching) described here. I use VS Code, which has very good built-in git handling; it especially makes it easy to see what changes you've made to your code since your last commit.

## Set up a repository from scratch

*Do this if you have an empty repository on GitHub, don't have any code yet, or want to turn an existing folder into a repository*

- Initialize a new repository on your machine (in a folder containing your code, if you have any yet): `git init`
- On GitHub (or code.harvard.edu) create a new repository and copy the URL for cloning. (HTTPS or SSH, depending on how you're doing authentication).
- Add this GitHub URL as a remote location for your repository: `git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git`
  - `remote` tells git you want to link your repository with a location not on your local machine
  - `origin` is the name you're giving this remote location. (It could be anything, but `origin` is a common convention for your primary remote, and it's the automatic name if you `clone` a repository)
- Check that the remote is properly set up: `git remote -v` (This should list the name and URL for `origin`)
- Move on to "Basic use"

## Clone an existing repository

*Do this if you want to create a local copy of a GitHub repository that already has stuff in it.*

- Clone the existing repository: `git clone https://github.com/[USERNAME]/[REPO-NAME].git` (This automatically sets up the `remote`)
- Move on to "Basic use"

## Basic use

*Making commits to your code and pushing/pulling to sync with a remote location*

- Check the status of changes in your repository: `git status`
- **Stage:** Prepare the changes you want to add to a commit
  - Adding changes:
    - Add *all* files and changes (including untracked files -- be careful!): `git add .`
    - Add all changes to files you're already tracking: `git add -u`
    - Add specific files and/or folders: `git add [FILE1] [FILE2] [DIRECTORY]`\\
      *Note: Adding a folder will add all of the contents of that directory*
  - Removing changes:
    - Unstage file(s) from the current commit: `git reset -- [FILE]`
       (This does **not** delete/remove/undo the edits or files themselves, just whether they'll be part of the commit you're currently staging)
    - To stop tracking a file altogether, look at the "Using `.gitignore`" section
  - Check that everything you want is staged: `git status` \\
    (Also useful to check if you've staged things you *don't* want to, and update your `.gitignore`)
- **Commit:** Create a checkpoint version of your code
  - Commit with an inline comment (easiest): `git commit -m "[YOUR COMMIT MESSAGE]"`
  - **OR** Let a text editor open to write your commit message: `git commit`
- **Push:** Update the remote with your new commit (or multiple commits)
  - Push the changes: `git push origin master` (or more generally, `git push [MY-REMOTE] [MY-BRANCH]`)
  - If `push` fails because there were changes on the remote since your last change, you will first need to `pull` the changes. (Don't worry, git will tell you and won't let you break things by pushing without pulling.)
    - Pull the remote changes: `git pull`
    - If it can, git will automatically merge the changes between your local version and the pulled version and create a new commit. If not, you will need to sort out the merge conflicts yourself and make a commit with the conflicts solved. (See "Dealing with merge conflicts" below.)
    - Push your newly merged version: `git push`
- **Pull:** Get changes made in the remote version
  - Pull changes: `git pull origin master`
  - Git will complain if you try to pull with uncommitted changes. To deal with that, look at "Stashing work in progress" below.

## Switch to an old version of your repository

A cardinal rule of git: *don't change history*. So if you messed something up, you want to make an old version (commit) or your code the current version to work with.

This is a safe way to do it, because you will not undo (remove from history) any commits between your current version and the version you're switching to. If you later want to return to some version in between, you can simply get the hash for it and follow the same procedure. ([Stack Overflow citation](https://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit/21718540#21718540))

- Get the hash of the commit you want to use (it will look something like `0b5ab5232b7e30192ac5e126563abef1a31e0747`)
  - Run `git log` (This is where writing good commit messages is useful!)
  - On GitHub, click "### commits" (make sure you're on the right branch) and use the button to copy the hash of the commit you want. (This is useful because you can see the code/diff associated with that commit.)
- Switching to that commit
  - Make sure you are on the right branch by running `git branch`
  - Revert the status of your repository to the commit with that hash: `git revert --no-commit [YOUR-HASH]..HEAD`
  - Commit that version as your current version: `git commit`
  - Push the updated version: `git push`

If you want to look at a commit but not stay there:

- Switch to the commit: `git revert --no-commit [YOUR-HASH]..HEAD`
- Switch back to where you were before: `git reset --hard HEAD` or `git cherry-pick --abort` ([source](https://stackoverflow.com/questions/8728093/how-do-i-un-revert-a-reverted-git-commit))

**Note:** This won't work if there's a merge commit between your current status and the commit you're trying to get back to; that gets more complicated. In that case you'll need to revert back to the merge point and [deal with the merge specifically](https://stackoverflow.com/questions/5970889/why-does-git-revert-complain-about-a-missing-m-option).

## Using branches

Branches of a repository let you keep track of different versions of your code. It is good practice to keep branches for different things you're working on in your code rather than doing everything on `master`. For example, you could have an always-functional, ready-for-use version on `master`; automatically-generated documentation on the `docs` branch; work on significant changes on a `refactor` branch, and a particular bug fix in `fix-robot-initialization`. etc. Be careful about keeping around a lot of old/unused/abandoned branches because this can become hard to keep track of.

- Creating/using a new branch
  - Create a new branch on your machine and switch to it: `git checkout -b [NEW-BRANCH]`
  - Check what branch you're on (and what other branches exist): `git branch`
  - Push your new branch to GitHub: `git push origin [NEW-BRANCH]`
  - Switch branches: `git checkout master` or `git checkout [NEW-BRANCH]`
    - Git may complain here if you have uncommitted changes. To deal with that, look at "Stashing work in progress" below
  - Use just like your master branch (with `add`,  `commit`, etc.), but now when pushing/pulling with the remote, you use: `git push origin [NEW-BRANCH]`
- Getting a branch from a remote source (a branch you don't have on your machine)
  - Download everything from your remote: `git fetch` \\
    (This is shorthand for `git fetch origin`. If you have multiple remotes to sync up with, you can do `git fetch --all` or specify the remote name) \\
    The command line output should show that it has found and created the new branch.
  - Check out the retrieved branch like any other branch: `git checkout [NEW-BRANCH]` \\
    It's also now automatically tracking (synced with) the corresponding branch in the remote location.
  - The branch should now also show up when you list all your branches with `git branch` (Note that it won't show up until you check it out for the first time.)
- Merging branches
  - Although you can merge branches from the command line interface, it's better (and easier) to follow the procedure for [pull requests on GitHub](https://help.github.com/en/articles/about-pull-requests). If there are no merge conflicts, this is really straightforward and pretty much automatic. If there are conflicts, follow the command line instructions on the GitHub page for the pull request and look at "Dealing with merge conflicts" below. I (Julia) can also help you with this.

## Stashing work in progress

Useful if you're switching branches or pulling changes before you're ready to commit (which can happen if you know a collaborator has made changes you need to use), git will complain that you have uncommitted changes. Instead of committing your partially-complete work, it can be useful to "stash" your work in progress and retrieve it later (when you're back on that branch, or after pulling).

**Warning:** Stashes are only stored on your local machine and are only intended for temporary/WIP storage (e.g., dealing with branches/pulling). Don't overuse them or use them in place of commits or branches!

`git stash` comes with a lot of sub-commands. You can view a short summary with `git stash -h` or [check out the full documentation](https://git-scm.com/docs/git-stash). But here's the most common way you'll probably want to use it:

- Stash your current changes on the current branch (including untracked files) with a custom message: `git stash push -u -m "[MESSAGE ABOUT PARTIAL STASHED VERSION]`. (If you don't want to include untracked files, drop the `-u` flag). Each stash automatically gets a number (starting with 0) you can use to show, drop or apply it later.
- List all of the stashes you've made: `git stash list` (This will also show you what branch the stash was made on)
- View what changed in a particular stash: `git stash view [#]`
- Applying a stash:
  - Retrieve/apply the stash but *keep it in* your list of stashes: `git stash apply [#]`
  - Retrieve/apply the stash and *remove it from* your list of stashes: `git stash pop [#]`
  - In either case (`pop` or `apply`) you can use the *latest* stash by leaving off the stash number
  - **Note:** git will let you apply/pop stashes made on a different branch, but it's liable to create a bunch of merge conflicts and is **not** how you should merge branches. Just don't do it.
- Get rid of a stash you don't need anymore: `git stash drop [#]`

## Dealing with merge conflicts

[Useful reference on resolving merge conflicts](https://help.github.com/en/articles/resolving-a-merge-conflict-using-the-command-line)

You can end up with conflicts that can't be automatically reconciled when you try to merge different versions of your code. This usually comes from three sources:

- Multiple people making changes to the same branch (e.g., two collaborators editing the same code). Your collaborator pushes a commit to GitHub. Meanwhile, you make your own changes, commit, and need to pull from GitHub before you can push. If you edited the same parts of the code, you can end up with a merge conflict.
- Merging separate branches with a pull request. If changes were made on both branches, there can be merge conflicts.
- Retrieving stashed changes (`git stash apply` or `git stash pop`)

Regardless of the source, the work flow for resolving merge conflicts is the same.

- Run `git status` to see what files have unresolved merge conflicts. It will say something like `unmerged paths`
- Conflicting sections of code will look something like this:
  ```
  <<<<<<< HEAD
  Example content edited locally.
  =======
  Example content edited elsewhere.
  >>>>>>> 8ab72e58dddcf2484077234d42ce2e5af6de5e68
  ```
  The part before the `=======` is your local version, and the part after is the incoming version. You can manually find and resolve these conflicts, but most text editors/IDEs will have nice highlighting and tools to find and solve these conflicts.

- Before committing, make sure that you have resolved **all** conflicts and that your code runs as expected. (If you have a lot of merge conflicts, it's easy to break your code when resolving all the individual conflicts.)
- Stage, commit, and push your changes like in the "Basic use" section.

The further apart the versions of your code get, the more merge conflicts you get and the sadder your life gets. To avoid this:

- Commit often, preferably in meaningful units of change. This makes it easier to reason about changes/differences in code versions
- Push often (if possible, every time you make a commit). This prevents *others* from working with out-of-date code
- Pull before you start editing. This prevents *you* from working with out-of-date code
- Avoid making separate branches to do the same thing that you intend to merge later. From experience, I can tell you that this creates merge conflict hell.

## Using `.gitignore`

*How to prevent git from storing and tracking files you don't want, such as logs, compiled files, and caches*

- Create a file in the root of your repository called `.gitignore`. This is a plain text file you can add things to. Anything described here will be ignored by your repository tracking.
  - When you create a repository on GitHub, it also gives you the option to automatically create a `.gitignore` file that handles commonly ignored directories/filetypes for a language
- If a file is already in your repository (i.e., it's being tracked), adding the file(s) to the `.gitignore` will **not** remove the file from your repository and prevent it from being tracked.
  - If you want git to remove/stop tracking a file *without deleting the file:* `git rm --cached [FILENAMES]`
  - If you don't mind getting rid of the file, you can also just delete the file, add the change, and commit

Example `.gitignore` patterns:

```shell
# Ignore the files with exactly these names
.env
ignore-me.txt
subdirectory/ignored.md
# Ignore these sub-directoried (and all files in them)
node_modules/
.vscode/
.dist/
# Ignore all files in all subdirectories (of any depth) that match the wildcard
**/*.pyc
**/*.o
```

## Tags and releases

Tags let you mark certain commits with versions so you can identify them easier at a later time. This is particularly useful in conjunction with [GitHub's releases](https://help.github.com/en/articles/creating-releases).

The most common use case I have is adding a tag to your current commit on a repository's master branch. After you make your commit, add a tag:
```bash
git tag -a v2.2 -m "more about my version 2.2"
```

The `-a` says that it's an annotated tag, which keeps more information with it than a lightweight tag. (Use this type of tag if you're not certain.) And the `-m` let's you add the message for your tag directly, like a commit message.

You can list all of your tags with `git tag`.

Now you need to push your tags:
```bash
git push origin --tags
```

Now if you go to the "Releases" section on your repository on GitHub (in the bar below the repository description), you'll see your tag. If you move from the "Releases" tab to the "Tags" tab, you can click the three dots and select "Create release." From here, you can create a nicely-formatted permalinked release with additional information, embedded images, and compiled binaries. It will also automatically include a zip file of the source code at that tag's commit.

Source: [Git documentation](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
{: .fs-2}

## Other useful stuff

- Show differences between your staged/committed and unstaged changes:  `git diff` \\
  (But editors with git integration will usually be a nicer way to see this)
- Dealing with `fatal: refusing to merge unrelated histories`
  - This commonly happens if you initialize a repository locally and make a commit, then try to pull from a repository that already has commits (for example, if you created a repository on GitHub and let it initialize with a Readme/license/.gitignore)
  - Pull with a flag allowing it: `git pull origin master --allow-unrelated-histories`
- If things get really messed up or don't seem to be working, just save your stuff elsewhere and re-clone [like XKCD tells you to](https://xkcd.com/1597/).