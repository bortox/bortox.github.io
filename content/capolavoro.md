---
title: "Capolavoro di Andrea Bortolotti"
description: "How the site is divided, bortox.it's commitments to sustainability and visitor data privacy."
date: 2024-02-11
layout: profile
draft: true
---

In occasione dell'**Esame conclusivo del secondo ciclo d'Istruzione** ho deciso di presentare il mio sito web, bortox.it, come **Capolavoro**. 

## I numeri di *Compiti e Appunti Scolastici*



Il sito ha totalizzato **oltre 400 000 visite** dal 15 Settembre 2020.

![Visite bortox.it](scuola/capolavoro/visite.png)

Ecco le tre pagine più visitate di sempre **in tempo reale**:


{{< visitcounter link="https://bortox.it/Compiti-scolastici/compiti/2021/02/23/Geometria-analitica-perimetro-area-punti-triangolo.html" title="Determina perimetro e area di un triangolo dati i vertici. Geometria analitica">}}
{{< visitcounter link="http://bortox.it/Compiti-scolastici/compiti/2020/01/27/Parafrasi-Proemio-Iliade.html" title="Parafrasi del Proemio dell' Iliade">}}
{{< visitcounter link="http://bortox.it/Compiti-scolastici/appunti/2021/03/26/Le-quattro-coniugazioni.html" title="Lista delle quattro coniugazioni latine, modo indicativo, attivo e passivo">}}

## Competenze digitali europee

Creare un sito web e prepararlo ad un ampio traffico internet non è qualcosa che si completa in un giorno. Bortox.it è **GDPR-Compliant**, attento alla privacy dei propri utenti. Nella [Privacy Policy]({{< ref "/privacy" >}}) viene spiegato q Viene utilizzato *goatcounter* per calcolare statistiche, mentre le pagine sono ottimizzate per essere più sostenibili possibile. 

### Ecosostenibilità :deciduous_tree:

Una visita a bortox.it produce appena **0.01** grammi di CO<sub>2</sub> - più leggero del 95% dei siti testati - ed il server dal quale viene servito il sito utilizza energia sostenibile!

<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>

In un anno con ~120 000 visite bortox.it produce appena ~9kg di CO<sub>2</sub> :balance_scale:
, l'equivalente di 4.8kg di pasta :spaghetti: oppure di 75km in auto :oncoming_automobile:.

### Riduzione del consumo di traffico internet :zap:

bortox.it applica le tecniche più moderne per garantire una navigazione veloce e fluida sul dispositivo ed una taglia leggera :feather: delle pagine. 

* Minificazione del codice
* Service worker per il caching -> Possibile navigare offline
    * Preloading di articoli e post correlati
* Caching lato server con nginx
* Compressione delle immagini
* Utilizzo di formati vettoriali come .svg per le icone

Tali tecniche rendono la **navigazione più etica** perché la fluidità del sito non dipende eccessivamente dalle prestazioni del dispositivo e/o della rete internet.

### Nessuna pubblicità :no_entry:

bortox.it è un sito senza scopo di lucro nonostante le notevoli visite mensili. La navigazione resta veloce e leggera anche grazie all'assenza di pubblicità. 

### Riservatezza dei dati dei visitatori :eyes:

bortox.it rispetta il GDPR e le uniche soluzioni di analytics (statistiche sulle visite) utilizzate sono Matomo (self-hostato in Europa) e GoatCounter (hostato in Europa); entrambi **rispettano il GDPR** e sono impostati in modo tale da **non raccogliere informazioni personali** che permetterebbero l'identificazione di un visitatore, come il suo indirizzo IP. 

Le uniche informazioni memorizzate sul dispositivo di un visitatore del sito web bortox.it sono due:

* Preferenza tema scuro/chiaro nel local storage
* Cache delle pagine già visitate così sono accessibili offline per 1 ora dalla prima visita.

Più informazioni a riguardo nella [Informativa sulla privacy]({{< ref "/privacy" >}})

### Ognuno può collaborare :busts_in_silhouette:

Ognuno può vedere il codice sorgente del sito web e creare un [_pull request_](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) dopo aver eseguito un _fork_. 

Se non siete pratici di _git_ e _repository_, il **modo più semplice** per **proporre una modifica** è compilare il modulo ["_Proponi una modifica_"](https://bortox.it/Compiti-scolastici/proponi-modifica.html). 

Per **segnalare un errore** invece basta compilare il modulo ["_Segnala un errore_"](https://bortox.it/Compiti-scolastici/segnala-errore.html).