---
title : Sei offline
description : Offline
date: 2022-06-21
showVisitCount: false
---

No internet connection available. 

## How does bortox.it work offline?

Since bortox.it is a PWA (Progressive Web App) it can be partly browsed even offline! Every page you visit online is stored for one hour in the browser's cache.

![Bortox.it come PWA](/pwa.png)

Every time you visit a webpage on bortox.it, a _service worker_ copies temporarily on the device:

* the page you are visiting
* the pages linked in the page you are visiting

## Available offline pages:

{{< badge >}}
These pages are available for one hour on your device. Each page weighs about 0.05 MB, and the maximum that can be stored is 50MB, about 1000 page views in an hour. This happens because of a service worker, both Google and Mozilla recommend adding one on your website.
{{</ badge >}}

<div id="cached">No page saved offline</div>
<script>
var root = document.getElementById("cached");
if (navigator && navigator.serviceWorker) {
    caches.open('content-v1.09').then(function (cache) {
        cache.keys().then(function (keys) {
            root.innerHTML =
                '<ul>' +
                    keys.map(function(key) {
                        if (key.url.includes(".html") || key.url.endsWith('/'))  {
                            return '<li><a href="' + key.url + '">' + key.url + '</a></li>';
                        }
                    }).join('') +
                '</ul>';
        });
    });
}
</script>

Enjoy your offline surfing!