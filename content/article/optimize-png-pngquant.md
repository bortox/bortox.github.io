---
title : Comprimere e ottimizzare immagini png con pngquant
description : Optimize and reduce size of png images with little to no loss using pngquant.
date: 2022-07-19
showVisitCount: false
---

Navigando su F-droid - uno store di app open-source - ho scoperto l'app Atomize. Tale app ha lo scopo di **ridurre la taglia di un'immagine in formato png**, spesso fino al 70%.

Nel mio caso, utilizzando qualche screenshot o scan scaricata, la riduzione spesso raggiunge il 50% con perdite irrisorie (non si nota) nella qualità dell'immagine.

Mi ha stupito, dunque ho aperto la schermata _About app_ dove ho scoperto che l'app è semplicemente un front-end del binario open-source [pngquant](https://pngquant.org/).

La maggioranza delle immagini di questo sito sono state ottimizzate con `pngquant` con qualità risultanti variabili dal 92 al 100%. Il 100% di qualità è irraggiungibile perché pngquant fa compressione lossy.


## Scaricare pngquant

Scaricare pngquant è molto semplice. Nel mio caso era già presente nelle repo di Arch, quindi bastava eseguire un `pacman -S pngquant`, altrimenti per chi usa Windows o Mac-OS sono elencate altre [possibilità di download, anche alcune GUI](https://pngquant.org/#download) sul sito di pngquant.

## Utilizzare pngquant da linea di comando

```bash
pngquant --skip-if-larger --speed 1 --ext .png --force -Q 92-100 $(find . -name '*.png')
```


Aggiornamento: il comando sottostante è migliore perché sfrutta più processori, -P**16** è il numero di processori.
```bash
find . -name '*.png' -print0 | xargs -0 -P16 -L1 pngquant --ext .png --force -Q 92-100 --skip-if-larger
```

Io ho eseguito questo comando per comprimere le mie immagini, ottenendo [buoni risultati, spesso riduzioni superiori al 50% delle dimensioni originali](https://github.com/bortox/bortox.github.io/commit/66be5b1c05d14b2a1b0e2ef922b4e0d5a5dbae24).

* `--skip-if-larger` Se il file risultante è più grande di quello iniziale, allora non viene salvato.

* `speed 1` la **velocità di compressione** è un numero compreso tra 1 ed 11, 1 è il valore che assicura una compressione lenta ma efficace, 11 invece genera una compressione veloce ma di ratio peggiore, ad esempio il file risultante sarà più grande. 4 è il valore predefinito del parametro `speed` se non specificato.

* `-Q 92-100` imposta la qualità minima e massima. Se la qualità è minore del valore minimo - nel mio caso 92 - il file non viene salvato. Invece se la qualità supera il valore massimo, allora verranno utilizzati meno colori per comprimere più efficacemente il file. Questo range è piuttosto alto, per un **sito web basterebbe anche `-Q 70-85`** siccome la priorità è ridurre la grandezza dei file, non la visione di dettagli nelle foto.  

* `--ext .png --force` Questa parte **sovrascrive le immagini processate** (io uso git quindi per me non è un problema) se volete evitare togliete il suffisso --force oppure cambiate l'estensione (quindi il suffisso del file) ad esempio in `--ext compressed.png`.

* `$(find . -name '*.png')` Questa espressione di codice utilizza il comando [find](https://manned.org/find). In questo caso trova tutti i file che finiscono in .png nella cartella corrente (`.`) e nelle sottocartelle, producendone una lista che viene letta dal comando `pngquant`. Con invece di find `*.png` vengono processati solo i file png presenti nella cartella corrente.

## Sources:

* `pngquant -h`
* `man pngquant`
* [Domanda di StackOverflow sull'utilizzo di pngquant per file in sottocartelle](https://stackoverflow.com/questions/9647920/recursively-batch-process-files-with-pngquant/9649214#9649214)
* [Sito web di pngquant](https://pngquant.org/)
* [Pagina F-Droid di Atomize](https://f-droid.org/en/packages/com.wrmndfzzy.atomize/)