---
title: Come usare gli shaders su MPV per migliorare anime vecchi con Anime4K
description: 
published: true
date: 2021-08-20T21:00:00.000+00:00
tags: 
- shader
- anime
editor: markdown
categories: ['tutorial', 'linux']
---

Per migliorare la qualità di anime come Neon Genesis Evangelion ed altri da 544p a (circa) 2K/4K, dovremo affidarci ad Anime4k,
_un insieme di algoritmi open-source di **upscaling**/denoising di **anime** in tempo reale di alta qualità
che possono essere implementati in qualsiasi linguaggio di programmazione_. 

<!--more-->

In questo caso useremo il lettore video *mpv* per riprodurre gli anime ed applicare le modifiche al video in tempo reale,
sfruttando una scheda grafica sufficientemente potente.

{{< lead >}}
 Requisiti per questo tutorial
{{</ lead >}}

* Scheda grafica con driver aggiornati
* Sistema operativo (Windows/Mac OS/Distro Linux)
* Lettore video mpv
* Shaders di Anime4k


![Confronto delle scene di Neon Genesis Evangelion con shaders anime4k attivi e disattivi](../confronto-upscale.jpg "Confronto delle scene di Neon Genesis Evangelion con shaders anime4k attivi e disattivi")

## Come installare MPV e Anime4K

Utilizzeremo questi algoritmi, anche chiamati **shader** attraverso mpv, un lettore video open-source. Per installare mpv, su distribuzioni Linux Debian-based ( Ubuntu, Kubuntu, Mint, Zorin, AntiX... ) basta scrivere `sudo apt install mpv`, invece su Arch-based (Garuda, Endeavour...) `pacman -S mpv`. 


In ogni caso, troverete informazioni anche [sul loro sito ufficiale](https://mpv.io/installation/).

Dopo aver installato mpv, possiamo installare gli shader di Anime4K. Per farlo, basterà scaricare l'ultima versione da GitHub all'indirizzo [https://github.com/bloc97/Anime4K/releases](https://github.com/bloc97/Anime4K/releases "https://github.com/bloc97/Anime4K/releases"), cliccando, come illustrato nell'immagine sottostante, su *Anime4K_v4.0.zip* per scaricare la versione 4.0. 

Cercate di scaricare l'ultima versione, perché di solito è la più performante e veloce!

![screenshot_2021-12-11_at_18-51-45_bloc97_anime4k_a_high-quality_real_time_upscaler_for_anime_video.png](/screenshot_2021-12-11_at_18-51-45_bloc97_anime4k_a_high-quality_real_time_upscaler_for_anime_video.png)

Dovremo scaricare il file in formato zip, ed estrarlo in `~/.config/mpv/shaders` su Linux, mentre su Windows in `%AppData%\mpv\shaders`. Se la cartella _shaders_ dentro la cartella mpv non esiste, non preoccupatevi e createla.

## Collegare gli shaders alle scorciatoie da tastiera

Infine, dovremo creare il file `input.conf` per collegare alle scorciatoie da tastiera ( come CTRL+1 ) l'avvio degli shaders. Questo è il contenuto del mio file `input.conf`

```ini
F1 no-osd change-list glsl-shaders clr ""; show-text "Nessuno shader attivo"
F2 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_VL.glsl"; show-text "⬆ 1x (CH + RM_VL)"
F3 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_VL.glsl:~~/shaders/Anime4K_Upscale_CNN_x2_L.glsl"; show-text "⬆ 2x (CH + RM_VL + UP_L)"
F4 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_VL.glsl:~~/shaders/Anime4K_Upscale_CNN_x2_L.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_L.glsl"; show-text "⬆ 2x (CH + RM_VL + UP_L + RM_L)"
F5 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_VL.glsl:~~/shaders/Anime4K_Upscale_CNN_x2_L.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_L.glsl:~~/shaders/Anime4K_Upscale_CNN_x2_L.glsl:~~/shaders/Anime4K_Restore_CNN_Moderate_L.glsl"; show-text "⬆ 4x (CH + RM_VL + UP_L + RM_L + UP_L + RM_L) [Optimised for Evangelion]"
F6 seek 85; show-text "Intro anime skippata"
```
* Se non avete una GPU (scheda video) buona, rinunciate a questo progetto. 

* Se avete Linux/MacOS ed una GPU buona potete copiare il contenuto del file così com'è scritto sopra. 

* Se avete Windows, **sostituite** tutti i `:` nel testo con `;`.

Come potete vedere, i comandi da F2 a F5 corrispondo a degli shader sempre più precisi per aumentare la definizione.


## Accelerazione Hardware di MPV su Linux

Oh, quasi dimenticavo. Se usate Linux, in questo caso per schede AMD è ottimale Vulkan come API per l'accelerazione hardware. Io ho una RX 5500 XT ed ho seguito le istruzioni della Wiki di Arch Linux per impostare l'accelerazione hardware. Ovviamente su Linux questo passaggio è essenziale. 

Con Windows e MacOS non dovreste avere problemi, ma **assicuratevi di avere una GPU decente** ed i driver più recenti. 

Nel mio portatile del 2015 con 4GB di RAM ed un A8 quad core (nessuna GPU) mpv crasha se abilito gli shader.

TL;DR: Dovete usare una scheda grafica ed impostare l'**accelerazione hardware**. Se siete su Linux, seguite la [Wiki di Arch](https://wiki.archlinux.org/title/Hardware_video_acceleration).

## Come scegliere gli shader ottimali

Se avete una scheda video uscita negli ultimi 3 anni, non dovreste avere alcun problema con questa configurazione, potete andare al titolo "Esempi di configurazioni per alcuni anime" per vedere le configurazioni che personalmente preferisco.

---

Ricordo che gli anime sono **progettati** per essere visti su schermi di definizione all'incirca **720P**, quindi direi di provare a **non** spingersi **oltre il 2K**.

Già con un video 1080P ben definito non noterete molti miglioramenti con l'upscaling, anzi, magari anche dei peggioramenti, come degli sfondi sfocati che vengono resi più "nitidi", rovinando l'animazione, oppure strane chiazze come in un disegno impressionista ad olio.

Il carico sulla GPU è moderato, ma ad esempio se uso le impostazioni di Evangelion (scaling 4x, molteplici ottimizzazioni delle linee ) su un anime in 720p/1080p non solo è inutile, ma tramuta anche il mio fisso in un aereo grazie alle ventole.

Prediligete la qualità L dei filtri, è un buon bilanciamento tra qualità ed utilizzo della GPU.

Se la **definizione originale è bassa**, meglio limitarsi ad **upscalare una sola volta** con Anime4K, due di fila spesso garantiscono un lieve vantaggio rispetto ad un pesante utilizzo di risorse.

Se avete una **definizione sufficiente**, ma **anche se ne avete una bassa** lo shader **Clamp_Highlights** prima di ogni altro, fornisce sempre un netto miglioramento sull'immagine, riduce soprattutto il rumore e le luci eccessive.

Inoltre un bel **_Restore_CNN_Moderate_** dopo ogni upscaling applicato non fa mai male, migliora la qualità dell'immagine. Oserei dire che **aggiungere** uno shader **Restore** è **più utile del fare upscaling**.

Gli ultimi due filtri migliorano sensibilmente l'immagine, sono più importanti di un upscaling cieco

Io ho provato la maggior parte degli shaders, quelli più validi secondo il mio umile parere,  sono citati qua sopra. Per approfondire il tutto potete consultare la [pagina GitHub di Anime4K](https://github.com/bloc97/Anime4K).

### Esempi di configurazioni per alcuni anime

Ecco una lista di possibili configurazioni ottimali per uno schermo 2K 21:9, 29 pollici.

* HunterXHunter 2011, AoT (720p): F2 ( ottimizzazione linee ) oppure F1 (nessuna modifica)
* Evangelion Neon Genesis (544p): F4 oppure F5 (upscaling 2x molto definito, upscaling 4x ) , se lo avete in 720p magari F2 (ottimizzazione linee) o F3 ( upscaling 2x sufficientemente definito )
* Shiroi Suna No Aquatope(720p): F1 nessuna modifica, oppure F2, migliora le linee. Spingendosi oltre si rovina la scena.

Di solito, con un anime di media qualità vanno bene F1,F2 o F3, con uno di bassa qualità F4 o F5.