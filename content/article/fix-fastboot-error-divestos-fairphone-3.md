---
title: "Fix fastboot error boot partition is smaller than boot image when installing DivestOS on Fairphone"
description: Questa è una recensione del servizio di CDN ed Object-storage Exoscale. 
published: true
date: 2022-08-22
tags:
- custom rom
- fairphone
categories: ['android', 'tutorial']
---

{{< badge >}}
Ho scritto questo post automaticamente in Inglese, poi l'ho tradotto automaticamente, l'ho ricontrollato e questo è il risultato. Se preferite la versione Inglese, aprite quella cliccando sulla bandiera inglese in alto a sinistra.
{{</ badge >}}

Seguendo le istruzioni sul sito ufficiale di DivestOS, dopo aver riavviato il bootloader sbloccato, si dovrebbe procedere come segue 

> Se fastboot.zip è disponibile: $ fastboot update divested-version-date-dos-device-fastboot.zip
> Se è disponibile il file recovery.img: $ fastboot flash recovery divested-version-date-dos-device-recovery.img

Ho scaricato entrambi i file per installare DivestOS nel modo che utilizza fastboot, ma con il mio Fairphone 3 non ha funzionato.

Quando provo a fare `fastboot update divested-19.1-20220808-dos-FP3-fastboot.zip` succede questo
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

## Come risolvere l'errore in fastboot la partizione di avvio è più piccola dell'immagine di avvio

Secondo [la risposta dello sviluppatore di DivestOS in questo forum](https://forum.f-droid.org/t/divestos-long-term-device-support-with-enhanced-privacy-and-security/10105/759) 

> il metodo di aggiornamento fastboot è consigliato per l'installazione iniziale, ma in realtà non sembra funzionare su tutti i dispositivi.

Ecco come installare DivestOS sul Fairphone. L'update via fastboot è il metodo **più semplice**, ma se non funziona, si può fare come ha fatto questo utente:

> Non sono riuscito a trovare consigli utili su internet, quindi sono andato avanti e ho fatto il sideload di copy-partitions e DivestOS usando la LineageOS-Recovery già presente (dato che non c'era una DivestOS Recovery specifica disponibile per FP3). Come (probabilmente) previsto, non è stato possibile verificare la firma del pacchetto di aggiornamento.
> Dopo il sideloading, sono tornato al bootloader e ho seguito le istruzioni per il flashing delle chiavi AVB personalizzate.

## Guida passo passo su come installare DivestOS sull'FP3

Se avete già [sbloccato il bootloader](https://support.fairphone.com/hc/en-us/articles/360048646311-FP3-Manage-the-bootloader) ed i comandi fastboot non funzionano, potete installare DivestOS in questo modo:

Si può provare con i comandi sottostanti che utilizzano fastboot, il modo più semplice per installare DivestOS, ma su alcuni dispositivi come il Fairphone 3 non funzionano.

> Se fastboot.zip è disponibile: `$ fastboot update divested-version-date-dos-device-fastboot.zip`
> Se è disponibile il file recovery.img: `$ fastboot flash recovery divested-version-date-dos-device-recovery.img`

In ogni caso, la ROM può essere installata anche con altri metodi, semplicemente seguendo i passi dell'elenco sottostante, che ho eseguito personalmente.

* Riavviare alla recovery (usare i tasti del volume per navigare se acceso o la combinazione di tasti se spento).
* Fairphone non ha il firmware abilitato quindi: `$ adb sideload copy-partitions-device.zip` (nel mio caso `copy-partitions-fp3-release.zip`, la verifica della firma fallirà)
* Quindi installare DivestOS tramite sideload:  `$ adb sideload divested-version-date-dos-device.zip` (la verifica della firma fallirà e se avete una versione del sistema operativo più vecchia di quella di DivestOS vi chiederà se volete fare il downgrade del sistema. Rispondere "SI" ai moduli "installare comunque?"). L'operazione richiederà molto tempo, dopo il _passo 1/2_ dovrete attendere circa cinque minuti per l'installazione.
* Mentre si è ancora in recovery, eseguire un reset di fabbrica.
* Riavviare in fastboot, quindi immettere i due comandi seguenti, per preparare il dispositivo ad un futuro relock del bootloader. Per entrare in fastboot si può abilitare ADB nella recovery e poi inviare `adb reboot fastboot`. 
* `$ fastboot erase avb_custom_key`
* `$ fastboot flash avb_custom_key avb_pkmd-fp3.bin`
* Riavviare su DivestOS. Attenzione: Se ci vogliono più di 10 minuti per l'avvio, c'è qualcosa che non va. Non lasciatelo fermo per più di 10 minuti! 

Nel mio caso il riavvio ha richiesto al massimo due minuti.

Cose che sono andate storte: Dopo il riavvio su DivestOS non potevo abbassare la barra delle notifiche e nella barra dei comandi era presente solo il pulsante indietro (triangolo) senza il pulsante home (cerchio) e le applicazioni aperte (quadrato). Ho installato l'ultimo aggiornamento e durante la preparazione per l'aggiornamento sono apparsi gli altri pulsanti.