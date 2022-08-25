---
title: "Fix fastboot error boot partition is smaller than boot image when installing DivestOS on Fairphone"
description: How to fix the errror in fastboot boot partition is smaller than boot image when installing DivestOS on Fairphone
published: true
date: 2022-08-22T16:47:00Z
tags:
- custom rom
- fairphone
categories: ['android', 'tutorial']
---

Following the instructions on the DivestOS official website, after rebooting to the unlocked bootloader one should do:

> If fastboot.zip available: $ fastboot update divested-version-date-dos-device-fastboot.zip
> If recovery.img available: $ fastboot flash recovery divested-version-date-dos-device-recovery.img

I downloaded both files to install DivestOS the fastboot way, but with my Fairphone 3 it didn't work

When trying to do `fastboot update divested-19.1-20220808-dos-FP3-fastboot.zip` 
```shell
--------------------------------------------
Bootloader Version...: 
Baseband Version.....: 
Serial Number........: A123BCEF4567
--------------------------------------------
extracting android-info.txt (0 MB) to RAM...
Checking 'product'                                 OKAY [  0.017s]
Setting current slot to 'b'                        OKAY [  0.020s]
extracting boot.img (64 MB) to disk... took 0.901s
archive does not contain 'boot.sig'
fastboot: error: boot partition is smaller than boot image
```
## How to fix fastboot: error: boot partition is smaller than boot image

According to [the DivestOS developer answer in this community forum](https://forum.f-droid.org/t/divestos-long-term-device-support-with-enhanced-privacy-and-security/10105/759) 

> the fastboot update method is recommended for initial installation, it doesn’t actually seem to work on all devices it is supposed to.

So, that's how to install DivestOS on the Fairphone. The Fastboot update is the **simplest** method, but if it doesn't work, you can just do like this user:

> I couldn’t find helpful advice on the internet, so I went ahead and sideloaded copy-partitions and DivestOS using the already-in-place LineageOS-Recovery (as there was no specific DivestOS Recovery available for FP3). As (probably) expected, the update package signature couldn`t be verified.
> After sideloading, I went back to bootloader and followed the instructions about flashing the custom AVB-keys.

## Step by step guide on how to install DivestOS on the FP3

If you have already [unlocked the bootloader](https://support.fairphone.com/hc/en-us/articles/360048646311-FP3-Manage-the-bootloader) and the fastboot commands don't work, you can install DivestOS in this way:

You can try the commands to install DivestOS in fastboot anyway but they don't work on every device. 

> If fastboot.zip available: $ fastboot update divested-version-date-dos-device-fastboot.zip
> If recovery.img available: $ fastboot flash recovery divested-version-date-dos-device-recovery.img

However the ROM can be installed also **following the steps in the list**, which I first did on my FP3 and then wrote about those here.

* Reboot to recovery (use volume buttons to navigate if on or key combination if off)
* Fairphone doesn't have firmware enabled so: `$ adb sideload copy-partitions-device.zip` (in my case `copy-partitions-fp3-release.zip`, the signature verification will fail)
* Then install DivestOS via sideload:  `$ adb sideload divested-version-date-dos-device.zip` (the signature verification will fail and if you have an OS version older than the DivestOS version it will ask if you want to downgrade your system. Prompt "YES" to the "install anyway?" forms.) This will take long, after _step 1/2_ you'll need to wait about five minutes for the installation.
* While still in the recovery perform a factory reset.
* Reboot to fastboot, then enter the following two commands for :TODO understanding what this does. signature-related things. You can enable ADB in the recovery and then send `adb reboot bootloader` 
* `$ fastboot erase avb_custom_key`
* `$ fastboot flash avb_custom_key avb_pkmd-fp3.bin`
* Reboot into DivestOS. Warning: _If it takes more than 10 minutes to boot something is wrong. Do not let it sit for more than 10 minutes!_. In my case the reboot took about two minutes at most.

Things that went wrong: After reboot DivestOS couldn't drop down the notification bar and had only the back button (triangle) without the home (circle) and the opened apps (square) ones. Installed the latest update and while preparing for the update the other buttons appeared.