---
title: Trasferire una cartella tra due computer linux sulla stessa rete locale con wget e http.server
description: Righe su come inviare una cartella attraverso un server web Python e wget sul computer ricevente, per due computer sulla stessa rete locale.
published: true
date: 2022-05-01T17:21:00.001Z
tags:
- trasferire
- server
categories: ['tutorial', 'linux']
---

## Comandi necessari

Lista dei comandi necessari per trasferire file tra due computer disponibile subito qui sotto. Continuando l'articolo si trova una spiegazione più approfondita sull'intera procedura e su **ogni parametro utilizzato** di wget.

* Upload

```bash
ip -a #Trova ip computer di upload
python -m http.sever #Avvia un server http che espone i file nella directory corrente
```

* Download

```bash
wget -np -r -l inf -R "index.html*" IP_UPLOAD:8000/Immagini # Usa per IP_UPLOAD l'ip trovato con ip -a
```

## Introduzione

Nei giorni scorsi avevo bisogno di trasferire la mia cartella della musica (~10GB) dal fisso al portatile e non ho trovato nessuna chiavetta attorno. Dunque ho pensato ad un modo veloce per trasferire i file sulla rete locale, entrambi i computer infatti sono connessi alla stessa rete wifi. Sul pc che invia i file ho utilizzato il server http di Python mentre sul ricevente wget per scaricare i file.

## Procedimento sul computer di upload

* Trovare l'IP del computer che invia i file

```bash
ip a
```

* Avviare un server nella cartella da cui si desiderano inviare i file

```bash
python -m http.server
```

## Procedimento sul computer ricevente

* Avviare wget e scaricare tutte le cartelle ed i file del server web

```bash
wget -r -p WEBSITE
```

Il parametro `-r` imposta lo **scaricamento recursivo**. Se per esempio in una pagina ho dei link che riferiscono ad altre pagine, con l'opzione `-r` wget **seguirà quei link e scaricherà anche le altre pagine**.

{{< alert >}}
Il livello di link seguiti - dunque sottocartelle analizzate - con il parametro -r è **limitato a 5**. 

Per un numero maggiore, aggiungi il parametro `-l inf` oppure `-l 0`, ossia **livello di link seguiti** pari a illimitato.
{{< /alert >}}


Nel mio caso, WEBSITE corrisponde ad `192.168.xx.xx:8000`, siccome lo webserver di Python normalmente trasmette su porta 8000 e mi trovo su una comune rete wifi. Ossia, l'ip trovato con il comando `ip a` sul computer di upload e la porta predefinita 8000 dello webserver di Python.

Questo non è il comando corretto, comunque, perché wget scaricherà anche i file `index.html` di ogni cartella, che forniscono la "grafica" del server web. Se lo usi puoi successivamente cancellare i file index.html con il comando :TODO aggiungere comando.

### Non scaricare i file index.html

```bash
wget -r -R "index.html*" WEBSITE
```

Il parametro `-R "index.html*"` indica a wget di **rifiutare** tutti i file che iniziano con index.html, inutili e scomodi: se dobbiamo scaricare un insieme di cartelle con foto, in ogni cartella ci sarà un file index.html senza questo parametro.

### Il parametro no-parent

Questo parametro non dovrebbe servire, ma è sempre meglio non ometterlo per evitare spiacevoli sorprese.

**Scenario di esempio**: sul computer di upload sto condividendo dalla cartella `/home/borto/` ma voglio scaricare solo `/home/borto/Immagini` allora presumbilmente eseguirò `wget -r -R "index.html*" WEBSITE/Immagini`.

C'è un problema. `WEBSITE/Immagini` contiene un link a `WEBSITE`, dunque ai file in `/home/borto`. 

Con l'opzione ricorsiva attiva wget **segue il link**, arriva su `WEBSITE` e scaricherà anche sottocartelle e file presenti in `/home/borto`, occupando **risorse locali e di rete non necessarie**.

```bash
wget -np -r -R "index.html*" WEBSITE/Immagini
```

Grazie al parametro `-np` wget ha il **divieto di ascendere alla direcory superiore** (no parent, parent directory) ma scaricherà solo a partire dalla directory segnata.

---


## Fonti riguardo l'utilizzo del comando wget

* [Stackoverflow, recursively fetch a directory](https://stackoverflow.com/questions/273743/using-wget-to-recursively-fetch-a-directory-with-arbitrary-files-in-it)

* `man wget`
