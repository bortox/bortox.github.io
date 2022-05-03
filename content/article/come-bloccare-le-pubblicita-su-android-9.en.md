---
timeToRead: 3
authors:
- Andrea Bortolotti
title: Change DNS on Android 9+ and block ads
tags:
- adblock
- dns
description: Through private DNS, we can block the majority of advertisements
  on the internet and in apps on Android 9 or higher.
date: 2021-08-31T09:28:00.000+00:00
categories: ['tutorial', 'android']
---
In this article, we will explain a simple and safe strategy to be able to block most advertisements in apps and when surfing the Internet with an Android 9 or higher device via private DNS. <!--more-->


## What is DNS

When you visit a website, e.g. `bortox.co.uk`, your device doesn't know what IP address the page `bortox.co.uk` corresponds to, so it will make a request to a **resolution DNS server**, which will reply with the **home address** of the webpage, e.g. `185.199.108.153` a bit like a **phone book lookup**.

This is only a small part of DNS, or Domain Name System, although for the topics covered in this tutorial it is more than sufficient. For more in-depth information, see the ubiquitous [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System).

Ad blocking works in a very simple way. A DNS resolver with ad-block included, such as BlahDNS, will simply respond to a request for `page-with-advertising.co.uk` `0.0.0.0`, an IP used as a placeholder for an **invalid address**.

## How to enable private DNS on Android 9+

The default DNS resolver server communicates via http, so your requests can be seen by other users in the network, and in particular cases, even manipulated.

In order to communicate with an HTTPS server, i.e. with encrypted requests between you and the server, you need to fiddle around a bit, but fortunately from Android 9 onwards it has become very simple: just enable the **Private DNS** option in the settings.

How to enable private DNS in Android settings](../tutorialaldnsprivato.png "How to enable private DNS in Android settings")

Here's how to do it:

* Open the **Settings** app.
* Click on **Network and Internet**.
* Click on **Advanced** to show the **Private DNS** settings.
* Click on **Private DNS**.
* Paste the private DNS provider (`dns.adguard.com`).
* Click on **save**

To block ads, I personally use [BlahDNS](https://blahdns.com/ "BlahDNS site"), a hobby project of [@ookhangzheng](https://github.com/ookangzheng "GitHub profile ookhangzheng"), as it works fast and blocks everything well.

I can also recommend Adguard's DNS, `dns.adguard.com`, a company dedicated to fighting online advertising and tracking.

If you just want a fast, private DNS without ad blocking, you can use Cloudflare's `one.one.one.one`.

Side note: this will remove most advertisements, but not, for example, YouTube ads, because they are served on the same servers as the videos, so trying to block them would be tantamount to blocking YouTube. I'll write an article about that in the future.