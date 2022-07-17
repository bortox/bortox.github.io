---
title: Install Ruby and Jekyll on OpenSUSE Tumbleweed
description: How to install Ruby and Jekyll on OpenSUSE Tumbleweed through rbenv
published: true
date: 2021-09-26T15:07:00+00:00
tags: 
- ruby
- jekyll
- opensuse
categories: ['tutorial', 'linux']
editor: markdown
---


OpenSuse is a distro that I can recommend. Fast and stable, European and also easy to customize thanks to YAST.

In the first days of use, however, I encountered a problem: **I could not install Jekyll, the program written in Ruby** that I use to compile most of my static sites. <!--more-->

![opensuse-jekyll-ruby.png](/blog/opensuse-jekyll-ruby.png "Article image: OpenSuse chameleon compares with Ruby gems including Jekyll")

Ruby 2.7 -preinstalled- is also used by YaST and other system programs, and for some reason the version distributed with OpenSuse didn't get along very well with the installation of Jekyll and Bundler.

Fortunately, after a bit of research, I found an issue on GitHub, where *jcayouette* describes exactly how to solve the problem. I've translated the process into Italian and written it here (even though this is the English version of the post) to make it easier to understand and faster to search, however this is the link to the [original tutorial](https://github.com/jekyll/jekyll/issues/6852) in English.



## How to install Ruby 3.0 on OpenSuse

Before installing Jekyll, we'll need to **install Ruby**, and only after Jekyll, as a **"gem" of Ruby**, i.e. code that you can include in Ruby projects.

* Install dependencies
``bash
sudo zypper in autoconf libopenssl-devel libyaml-devel readline-devel libxslt-devel ncurses-devel libffi-devel zlib-devel gdbm-devel libgdbm4
```

## Install rbenv to handle different versions of Ruby on the same system.

* Clone the rbenv repo
``bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```
* Add rbenv to the PATH variable so that the program can be run and initialized automatically.

Add these lines to the `.bashrc` file.

``bash
export PATH="$HOME/.rbenv/bin:$PATH"
export PATH="$HOME/usr/local/bin:$PATH"
eval "$(rbenv init -)"
```

* Run source on .bashrc to apply changes

```bash
source ~/.bashrc
```

* Check if the installation was successful.

Run the rbenv command and check the output. It should be something like:

``bash
rbenv 1.1.2-61-g585ed84
Usage: rbenv <command> [<args>].

Some useful rbenv commands are:
   commands List all available rbenv commands
   local Set or show the local application-specific Ruby version
   global Set or show the global Ruby version
   shell Set or show the shell-specific Ruby version
   install Install a Ruby version using ruby-build.
   uninstall Uninstall a specific Ruby version
   rehash Rehash rbenv shims (run this after installing executables)
   version Show the current Ruby version and its origin
   versions List installed Ruby versions
   which Display the full path to an executable
   whence List all Ruby versions that contain the given executable

See `rbenv help <command>' for information on a specific command.
For full documentation, see: https://github.com/rbenv/rbenv#readme
```

## Install Ruby using rbenv

* To use the rbenv install command, which simplifies the process of installing new versions of Ruby, you should install ruby-build, installed as a rbenv plugin through git:

``bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

* Displays the latest stable versions for each Ruby implementation that can be installed.

```bash
rbenv install -l
```

To see all installable versions, use

```bash
rbenv install -L
```

In this case, we will install version **3.0.2**, although after this article is written, this will no longer be the latest stable release, shown with `rbenv install -l`.

* Install Ruby 3.0.2 with rbenv


``bash
rbenv install 3.0.2
```

* Sets the installed Ruby version as default

```bash
rbenv global 3.0.2
```

* Checks if Ruby installation was successful.

``bash
ruby -v
```

Thanks to rbenv, the system can live with the installed version, keeping the default one needed, for example, for YaST, so don't uninstall it.


* Install Jekyll

``bash
gem install jekyll
```

That's it! Now we have installed Jekyll without running into dependency issues with the pre-installed version of Ruby!
