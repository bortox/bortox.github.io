---
title : Sei offline, controlla la connessione ad internet.
description : Offline
date: 2022-06-21
showVisitCount: false
---

* :mobile_phone_off: Sei offline. Controlla la tua connessione ad internet.

* bortox.it **funziona anche offline**. 

## Come funziona bortox.it offline

Siccome bortox.it è una PWA (Progressive Web App) in parte è navigabile anche offline, siccome ogni pagina che visiti viene mantenuta in memoria per 3600 secondi, ossia un'ora.

![Bortox.it come PWA](/pwa.png)

Ogni volta che visiti una pagina, un _service worker_ copia per un'ora sul dispositivo:

* la pagina stessa
* le pagine collegate a quella pagina

## Pagine usufruibili offline:

{{< badge >}}
Queste pagine sono disponibili per un'ora sul tuo dispositivo. Ogni pagina pesa circa 0.05 MB, ed il massimo immagazzinabile è 50MB, circa 1000 pagine visitate in un'ora. Questo accade per via di un service worker, sia Google che Mozilla consigliano di aggiungerne uno sul proprio sito web.
{{</ badge >}}

<div id="cached">Nessuna pagina salvata :sad:</div>
<script>
var root = document.getElementById("cached");
if (navigator && navigator.serviceWorker) {
    caches.open('content-v1.13').then(function (cache) {
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

Buona navigazione offline!