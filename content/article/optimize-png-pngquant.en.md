---
title : Optimize png images with pngquant
description : Optimize and reduce size of png images with little to no loss using pngquant.
date: 2022-07-19
tags:
- optimization
- image
categories: ['tutorial', 'linux']
---


Surfing on F-droid - an open-source app store - I discovered the Atomize app. This app aims to **reduce the size of an image in png format**, often by up to 70%.

In my case, using a few screenshots or manga scans, the reduction often reaches 50% with negligible (unnoticeable) losses in image quality.

I was amazed, so I opened the _About app_ screen where I discovered that the app is simply a front-end of the open-source binary [pngquant](https://pngquant.org/).

The majority of the images on this site have now been optimised with `pngquant` (as if Hugo optimisation wasn't already enough) with resulting qualities ranging from 92 to 100%. 100% quality is unattainable because pngquant does lossy compression.


## Downloading pngquant

Downloading pngquant is very simple. In my case it was already present in the Arch repos, so just run `pacman -S pngquant`, otherwise for those using Windows or Mac-OS other [download possibilities, even some GUIs](https://pngquant.org/#download) are listed on the pngquant site.

## Use pngquant from the command line

``bash
pngquant --skip-if-larger --speed 1 --ext .png --force -Q 92-100 $(find . -name '*.png')
```

Update: this is better because it can use multiple cores, -P8 is the number of CPUs:
```bash
find . -name '*.png' -print0 | xargs -0 -P8 -L1 pngquant --ext .png --force -Q 92-100 --skip-if-larger
```


I have run this command to compress my images, obtaining [good results, often reductions of more than 50% of the original size](https://github.com/bortox/bortox.github.io/commit/66be5b1c05d14b2a1b0e2ef922b4e0d5a5dbae24).

* `--skip-if-larger` If the resulting file is larger than the original one, then it is not saved.

* `speed 1` the **compression speed** is a number between 1 and 11, 1 is the value that ensures a slow but effective compression, 11 on the other hand generates a fast but worse compression ratio, e.g. the resulting file will be larger. 4 is the default value of the `speed` parameter if not specified.

* `-Q 92-100` sets the minimum and maximum quality. If the quality is less than the minimum value - in my case 92 - the file is not saved. On the other hand, if the quality exceeds the maximum value, then fewer colours will be used to compress the file more effectively. This range is rather high, for a **website even `-Q 70-85`** would suffice, as the priority is to reduce the file size, not the detail in the photos.  

* `--ext .png --force` This part **overwrites the processed images** (I use git, so it's not a problem for me) if you want to avoid it, remove the --force suffix or change the extension (i.e. the file suffix) to e.g. `--ext compressed.png`.

* `$(find . -name '*.png')` This code expression uses the [find](https://manned.org/find) command. In this case, it finds all files ending in .png in the current folder (`.`) and subfolders, producing a list which is read by the `pngquant` command. Instead of using `$(find . -name '*.png')`, with `*.png` only the png files in the current directory are processed. If you want to convert a single file you just have to write the filename at the end of the command.


## Sources:

* `pngquant -h`
* `man pngquant`
* [Stackoverflow question on usage for subdirectories](https://stackoverflow.com/questions/9647920/recursively-batch-process-files-with-pngquant/9649214#9649214)
* [Pngquant website](https://pngquant.org/)
* [Atomize F-Droid page](https://f-droid.org/en/packages/com.wrmndfzzy.atomize/)