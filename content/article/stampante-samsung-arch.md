---
title: Installare una stampante Samsung in meno di un minuto su Arch Linux
description: Ecco come utilizzare una stampante Samsung con una distribuzione linux basata su Arch utlizzando cups
date: 2021-06-02T17:00:00.002Z
tags:
- stampa
- cups
categories: ['tutorial', 'linux']
---
Ecco come utilizzare una stampante Samsung con una distro basata su Arch. Il tempo necessario per il procedimento è circa un minuto, poi potrete stampare con la vostra stampante, la quale sarà automaticamente rilevata dal sistema.

<!--more-->

1) Installiamo CUPS, sistema standard di stampa per Linux.

`sudo pacman -S cups`

2) Installiamo i driver per le stampanti Samsung, disponibili nella Arch User Repository

`yay -S samsung-unified-drivers`

3) Con il seguente comando, attraverso `systemd`, avviamo CUPS, il server di stampa, attraverso lo switch `--now` e lo impostiamo per essere avviato ad ogni avvio del sistema con `enable`.

`systemctl enable --now cups`

Tutto è fatto! Adesso la stampante dovrebbe essere rilevata da sola, come nel mio caso quando sono andato nelle impostazioni del DE Gnome, nella sezione _Stampanti_. 