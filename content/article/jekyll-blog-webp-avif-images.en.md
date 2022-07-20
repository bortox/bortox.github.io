---
title : Convert jekyll blog images to avif and webp
description : How to convert the images of a jekyll blog to avif and webp formats
date: 2022-07-20 00:24:00Z
lastmod: 2022-07-20 11:24:00Z
tags:
- optimization
- image
- avif
- webp
categories: ['tutorial', 'github']
---

I have a blog with over 100 articles, mainly [Compiti Scolastici (:it: School assignments)](https://bortox.it/Compiti-scolastici), where I also convert images to the recent .avif and .webp formats. 

## Why convert images to modern formats?

Why did I do it? Mainly for three reasons:

* The score of some pages with many images on PageSpeed was sometimes less than 90/100 and it mildly infuriated me, because the website average is 98/99 out of 100.
* After enabling webp conversion on my Hugo blog I noticed a better loading speed and savings on bandwidth and image size. It's better for who uses the website too!
* This [article about the _obesity crisis_ (:gb:)](https://idlewords.com/talks/website_obesity.htm) of the web convinced me to reduce the page size of bortox.it. Images were the biggest problem.

## How to convert images to webp and avif on Jekyll

I would venture to say that on Jekyll we almost have 'ready-made food' (:it: common saying) as an excellent plugin comes to our rescue: **Jekyll Picture Tag**, which enables both responsive images and conversion to more modern formats.

### Responsive images

For those who don't know, when images on a site are responsive, several copies of each image are produced in different sizes (e.g. 200x, 400x, 800x, 1200x) and depending on the user's screen, the appropriate ones will be requested by the device.

For example, one of my customers on an IPhone may receive an image 400 pixels wide, while another on a laptop will receive one 1200 pixels wide, as he has a wider screen. In this way the loading of images is 'smarter' and also faster without having a penalty on image quality.

## How to install Jekyll Picture Tag

To install Jekyll Picture Tag just add to the Gemfile the gem _jekyll\_picture\tag_ in the group _jekyll\_plugins_. 

```ruby
group :jekyll_plugins do
	gem 'jekyll_picture_tag', '~> 2.0'
end
```

Next the module is installed, but now we need to **configure it**.

## How to configure Jekyll Picture Tag

To configure the Jekyll Picture Tag module, create the file `_data/picture.yml`. 

First, in the file you must specify the _media queries_ set on the site. 

```ruby
media_queries:
    mobile: 'max-width: 600px
    laptop: 'max-width: 800px'
    wide: 'min-width: 801px'
```

On my site, a device is considered a smartphone if the screen is less than 600 pixels wide, a laptop less than 800px and something else if it is more than 800 pixels wide. I then changed some default parameters:

```ruby
formats: [avif, webp, original] # Order matters!
    format_quality:
      jpg: 80
      png: 85
      webp: 75
      avif: 70

    widths: [200, 400, 800, 1200, 1600] # Image widths, in pixels.
```
I set support for conversion to avif, webp and the original format of files, and different qualities for each format.

### How to choose the quality of converted images?

Normally **75** is a good number for the quality of converted images and is used by default by **Hugo**, the framework for building static sites like this one from Google. On the official site of the conversion to .**avif** (https://avif.io/) the default is **70**, evaluating these parameters I would recommend keeping in the 70 to 80 range for image quality.

For further customisation of picture.yml, I recommend referring to the **documentation** of Jekyll Picture Tag, available at https://rbuchberger.github.io/jekyll_picture_tag/

### Increase build time in exchange for smaller images

```ruby
image_options:
      avif:
        compression: av1
        effort: 7 # Up to 9 from 0, 9=really slow
      png:
        compression: 9 # Up to 9, fast
      webp:
        effort: 5 # Up to 6 from 0, 4=default
```

With these options the effort of image conversion increases to over 100%, for savings of 5-10%. Avif takes like 10 times the time of webp conversion and webp takes longer than png. 

If you build locally and as written below and you remove the JPT converted images folder from the .gitignore it can be an effective idea for better compression, else the build times are too high and leave the default.

More informations in [JPT Documentation (:gb:)](https://rbuchberger.github.io/jekyll_picture_tag/users/presets/image_quality.html) and on [libvips API Documentation (:gb:)](https://www.libvips.org/API/current/VipsForeignSave.html#vips-heifsave) on image compression options.

## Testing Jekyll Picture Tag

As the name implies, Jekyll Picture Tag is a **tag liquid**, so it is added to pages in Markdown more or less like this {% _tag_ %}. 

### Regex to convert Markdown Images in Jekyll Picture Tags

If you use VSCodium like I do, or any tool that supports regex, this is a great command for converting `![Alt text](/data/image.png)` images into picture tags `{% picture /data/image --alt Alt text %}`.

```java
Find: !\[(.*?)\]\((.*?)\)\)
Replace: {% picture $2 --alt $1 %}
```


{{< alert >}}
If you have a picture that uses liquid code like I do, e.g. ` ![Picture of test tubes]({{ "/data/img/chemistry/lss/acids-and-bases/provetteac.jpg" | relative_url }})` you have to **remove it**, because Jekyll Picture Tag needs a path to an existing file from the project root. The exemplary result should be `{% picture /data/img/chemistry/lss/acids-and-bases/provetteac.jpg --alt Picture of test tubes %}`. With some find & replace you get there.
{{</ alert >}}

## Jekyll Picture Tag dependencies

Jekyll Picture Tag uses [**libvips**](https://www.libvips.org/) to process pictures, along with **imagemagick**.

On Ubuntu, just install libvips-tools. On Alpine the package is called _vips_, on Debian Buster with YunoHost (my previous setup) don't even think about it: a hell of a lot of dependencies like obsolete meson to compile and reinstall, libvips, imagemagick...

## Using Jekyll Picture Tag with Github Actions

Fortunately this time help is [in the documentation](https://rbuchberger.github.io/jekyll_picture_tag/users/deployment.html?highlight=svg#github-pages) but it's no good. Since the system is Ubuntu, the repos don't yet have the lipvips version that supports **avif** - as of 2022/07/20 -, so we'll use an Arch-based system, whose repos get updates very quickly.

```yaml
name: Build and Deploy to Github Pages

on:
  push:
    branches:
      - master # Here source code branch is `master`, it could be other branches

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Use GitHub Actions' cache to cache dependencies on servers
      - uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${ runner.os }}-gems-.
      # Use GitHub Deploy Action to build and deploy to Github
      - uses: jeffreytse/jekyll-deploy-action@v0.4.0
        with:
          provider: 'github'
          token: ${{ secrets.GH_TOKEN }} # It's your Personal Access Token(PAT)
          pre_build_commands: pacman -S --noconfirm libvips imagemagick
          repository: '' # Default is current repository
          branch: 'gh-pages' # Default is gh-pages for github provider
          jekyll_src: './' # Default is root directory
          jekyll_cfg: '_config.yml' # Default is _config.yml
          jekyll_baseurl: '' # Default is using _config.yml
          bundler_ver: '>=0' # Default is latest bundler version
          cname: '' # Default is to not use a cname
          actor: '' # Default is the GITHUB_ACTOR
```

This is the build file that works for the setup just shown, just create a token with permission to write to the repos (specifically to the _gh-pages_ branch), set the branch on which a push will enable the action (in my case, _master_)  and add the imagemagick and libvips installation to the pre_build_commands (_pacman -S --noconfirm libvips imagemagick_).

## Speed up local build time by removing converted images from .gitignore

{{< badge >}}
This does not work with GitHub pages
{{</ badge >}}

If you want to speed up local build time, since Jekyll Picture Tag recognises when an image has already been converted, you can add the `_site/generated` (where the converted images are located in different formats) folder to git to avoid reconverting them each time.

```bash
# Cache built images by Jekyll Picture Tag in _site/generated

_site/*
!_site/generated/
```