---
timeToRead: 3
authors:
- Andrea Bortolotti
title: Cambiare DNS su Android 9+ e bloccare le pubblicità
tags:
- adblock
- dns
description: Attraverso il DNS privato, possiamo bloccare la maggioranza delle pubblicità
  su internet e nelle app di Android 9 o superiore.
date: 2021-08-31T09:28:00.000+00:00
categories: ['tutorial', 'android']
---
In questo articolo sarà spiegata una semplice e sicura strategia per riuscire a bloccare la maggior parte delle pubblicità presenti nelle app e nella navigazione su internet con un dispositivo Android 9 o superiore attraverso il DNS privato. <!--more-->


## Cos'è il DNS

Quando visiti un sito, ad esempio `bortox.it`, il tuo dispositivo non sa a che indirizzo IP corrisponde la pagina `bortox.it`, dunque effettuerà la richiesta ad un **server DNS risolutore**, il quale risponderà l'**indirizzo di "residenza"** della pagina web, ad esempio `185.199.108.153` un po'come in una **ricerca su un elenco telefonico**.

Questa è solo una piccola parte del DNS, ossia Domain Name System, Sistema Nomi Dominio, anche se per gli argomenti trattati in questo tutorial è più che sufficiente. Per approfondire il tutto c'è l'onnipresente [Wikipedia](https://it.wikipedia.org/wiki/Domain_Name_System).

Il blocco delle pubblicità funziona in modo molto semplice. Un risolutore DNS con ad-block incluso, come BlahDNS, risponderà semplicemente ad una richiesta per `pagina-con-pubblicità.it` `0.0.0.0`, IP utilizzato come segnaposto per un **indirizzo non valido**.

## Come attivare il DNS privato su Android 9+

Il server DNS risolutore preimpostato comunica via http, quindi le vostre richieste possono essere viste da altri utenti nella rete, ed, in particolari casi, anche manipolate.

Per comunicare con un server HTTPS, dunque con richieste criptate tra voi ed il server, serve smanettare un po', fortunatamente da Android 9 in poi è diventato molto semplice: basta attivare l'opzione **DNS privato** nelle impostazioni.

![Come attivare il DNS privato nelle impostazioni Android](/blog/tutorialdnsprivato.png "Come attivare il DNS privato nelle impostazioni Android")

Ecco come fare:

* Aprire l'app **Impostazioni**
* Cliccare la sezione **Rete e Internet**
* Cliccare su **Avanzate** per mostrare le impostazioni **DNS Privato**
* Cliccare su **DNS Privato**
* Incollare il provider DNS privato (`dns.adguard.com`)
* Cliccare su **salva**

Per bloccare le pubblicità, personalmente uso [BlahDNS](https://blahdns.com/ "BlahDNS sito"), un progetto hobby di [@ookhangzheng](https://github.com/ookangzheng "Profilo GitHub ookhangzheng"), siccome funziona velocemente e blocca bene tutto.

Posso consigliare anche il DNS di Adguard,  `dns.adguard.com`, una compagnia che si impegna nella lotta alla pubblicità ed al tracciamento online.

Se invece volete semplicemente un DNS veloce e privato senza blocco pubblicità, potete usare quello di Cloudflare, `one.one.one.one`.

Nota a margine: questo procedimento eliminerà la maggioranza delle pubblicità, ma non, ad esempio, quelle di YouTube, perché vengono servite con gli stessi server dei video, quindi provare a bloccarle equivarebbe a bloccare YouTube. Per quello scriverò un articolo in futuro.