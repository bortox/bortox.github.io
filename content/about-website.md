---
title: "Informazioni su bortox.it"
description: "How the site is divided, bortox.it's commitments to sustainability and visitor data privacy."
date: 2022-07-16
---

## Mappa del sito

Il sito (la tana del Borto) si divide in due sezioni: 
* Persona :neutral_face: 
* Scuola :school_satchel:

---
### :neutral_face: Persona

#### Foto :camera:

La **sezione personale** contiene una [collezione di foto :camera:](https://bortox.it/galleria/) scattate da me. La fotografia mi ha sempre interessato, ed ho avuto numerose fotocamere compatte, sin dalle elementari.

#### Blog 💻

Il [blog personale (:it:,:uk:)]({{< ref "/article" >}}) contiene appunti personali, principalmente riguardanti programmi Linux o generatori di siti statici come Hugo e Jekyll. 

---
### :school_satchel: Scuola

#### Compiti e appunti scolastici :memo:

La sezione scolastica contiene il sito [Compiti e appunti scolastici (:it:)](https://bortox.it/Compiti-scolastici/), una raccolta in crescita di tutti gli appunti che ho preso alle superiori anche se ultimamente lo aggiorno meno perché ho meno tempo. Il sito si trova nei risultati di Google e contiene oltre 100 post. Le più visitate restano le Versioni di Latino, perché - detto fra noi - chi traduce dal Latino le versioni con il vocabolario senza mai copiarle online?

##### Contribuire a Compiti e Appunti Scolastici

Se vuoi contribuire - codice, conoscenza o soldi - a _Compiti e appunti scolastici_ puoi vedere le opzioni disponibili su [contribuisci-cs](https://bortox.it/contribuisci-cs/).


#### Trovaparadigmi

[:mag: Trovaparadigmi GUI (:it:)](https://bortox.it/trovaparadigmi/) è un programma per Windows scritto in Python per compilare in modo semplice e veloce una lista completa dei paradigmi presenti in una versione di Latino.

Ho scritto il programma inizialmente per me, poi ho apportato alcuni miglioramenti ed ho distribuito un file .exe ai miei compagni, con l'obiettivo di _fornire a tutti un’opzione più o meno precisa per trovare rapidamente i paradigmi di un’intera versione in latino, e salvarli in un documento di testo_.

#### PCTO Monitoraggio Ambientale :telescope:

Una nuova aggiunta alla sezione scolastica è invece [PCTO Monitoraggio Ambientale (:it:)]({{< ref "posts/pcto-monitoraggio-ambientale" >}}). Il PCTO è un percorso di Fisica in collaborazione con il CNR sul cambiamento climatico ed il monitoraggio dell'ambiente utilizzando la spettroscopia.

## Ecosostenibilità :deciduous_tree:

Una visita a bortox.it produce appena **0.06** grammi di CO<sub>2</sub> - più leggero del 95% dei siti testati - ed il server dal quale viene servito il sito utilizza energia sostenibile!

<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>

In un anno con ~120 000 visite bortox.it produce appena ~9kg di CO<sub>2</sub> :balance_scale:
, l'equivalente di 4.8kg di pasta :spaghetti: oppure di 75km in auto :oncoming_automobile:.

Appena avrò abbastanza soldi, adotterò un albero per il bene dell'ambiente e della popolazione ma anche per compensare le emissioni di CO<sub>2</sub>

### Riduzione del consumo di traffico internet :zap:

bortox.it applica le tecniche più moderne per garantire una navigazione veloce e fluida sul dispositivo ed una taglia leggera :feather: delle pagine. 

* Minificazione del codice
* Service worker per il caching -> Possibile navigare offline
    * Preloading di articoli e post correlati
* Caching lato server con nginx
* Compressione delle immagini
* Utilizzo di formati vettoriali come .svg per le icone

Tali tecniche rendono la **navigazione più etica** perché la fluidità del sito non dipende eccessivamente dalle prestazioni del dispositivo e/o della rete internet.

## Nessuna pubblicità :no_entry:

bortox.it è un sito senza scopo di lucro nonostante le notevoli visite mensili. La navigazione resta veloce e leggera anche grazie all'assenza di pubblicità. 

## Riservatezza dei dati dei visitatori :eyes:

bortox.it rispetta il GDPR e le uniche soluzioni di analytics (statistiche sulle visite) utilizzate sono Matomo (self-hostato in Europa) e GoatCounter (hostato in Europa); entrambi **rispettano il GDPR** e sono impostati in modo tale da **non raccogliere informazioni personali** che permetterebbero l'identificazione di un visitatore, come il suo indirizzo IP. 

Le uniche informazioni memorizzate sul dispositivo di un visitatore del sito web bortox.it sono due:

* Preferenza tema scuro/chiaro nel local storage
* Cache delle pagine già visitate così sono accessibili offline per 1 ora dalla prima visita.

Più informazioni a riguardo nella [Informativa sulla privacy]({{< ref "/privacy" >}})

## Ognuno può collaborare :busts_in_silhouette:

Ognuno può vedere il codice sorgente del sito web e creare un [_pull request_](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) dopo aver eseguito un _fork_. 

Se non siete pratici di _git_ e _repository_, il **modo più semplice** per **proporre una modifica** è compilare il modulo ["_Proponi una modifica_"](https://bortox.it/Compiti-scolastici/proponi-modifica.html). 

Per **segnalare un errore** invece basta compilare il modulo ["_Segnala un errore_"](https://bortox.it/Compiti-scolastici/segnala-errore.html).