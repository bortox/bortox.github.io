---
title: Minare punti Twitch AFK con Twitch Channel Points Miner
description: 
date: 2021-08-23T11:05:00.000+00:00
tags: 
- script
editor: markdown
categories: ['tutorial', 'python']
---

Per questo semplice tutorial, useremo [**Twitch-Channel-Points-Miner-v2**](https://github.com/Tkd-Alex/Twitch-Channel-Points-Miner-v2)**,** un semplice script che **guarderà una stream al posto tuo e guadagnerà punti canale**.

Successivamente sarà trattato anche un **approfondimento** sulle **strategie** di scommessa nei **pronostici**, utilizzate da questo programma.

<!--more-->

Questo script è **multipiattaforma**, funziona su Linux, Windows e MacOS.

Se avete fortuna, funzionerà anche su Android con Termux.

Inoltre questo programma usa l'**API di Twitch**, quindi non ha bisogno di tenere aperto un browser con la diretta, questo accade solo per i pronostici, quindi **non occuperete potenza di calcolo del processore e banda internet per guardare le stream**, infatti questo programma potrà **funzionare senza causare rallentamenti** anche su un **vecchio portatile**.

Cito l'autore, TKD_Alex, traducendo l'avviso in italiano: _Questo progetto non è accompagnato da alcuna garanzia o assicurazione. Sei responsabile di qualsiasi cosa accada usando questo progetto. È possibile essere bannati in modo morbido o duro usando questo progetto se non si sta attenti. Questo è un progetto personale e non è in alcun modo affiliato a Twitch._

Normalmente, ci sono tre possibili **entrate** quando guardate una diretta su Twitch:

* **450 punti** all'**inizio** della diretta.
* **250 punti** per ogni **raid** a fine diretta.
* **50-400 punti** per un **bonus** dovuto al tempo in cui abbiamo assistito alla diretta.

Tutte le **sopracitate** sono **entrate sicure**, non c'è la possibilità di perdere punti, ma solo di guadagnarne.

Invece un'interessante funzione è il fatto che lo script può **puntare nei pronostici** con diverse strategie, quindi attivandola avrete una sicura **perdita** di punti ma anche una possibile **entrata sostanziosa**. 

Nelle righe successive **spiegherò meglio** anche in base a quali parametri funziona il puntamento nei pronostici.

## Installazione

### Linux, Windows e MacOS

Assicuratevi di aver installato:

* [Python3](https://python.org/) (linguaggio in cui è scritto Twitch-Channel-Points-Miner-v2)
* [Git](https://git-scm.com/) (programma di version control, serve per scaricare Twitch-Channel-Points-Miner-v2.

Li potete **scaricare dai rispettivi siti ufficiali** con i **collegamenti soprastanti**.

Successivamente **aprite un terminale** (Windows Terminal per Windows, per MacOS e Linux quello preinstallato nel vostro sistema) e scrivete innanzitutto

`git clone https://github.com/Tkd-Alex/Twitch-Channel-Points-Miner-v2 && cd Twitch-Channel-Points-Miner-v2`

Il comando `git clone [url]` serve per scaricare la repository disponibile all'indirizzo fornito, in questo caso `https://github.com/Tkd-Alex/Twitch-Channel-Points-Miner-v2`.

Successivamente, potete scrivere `pip3 install -r requirements.txt` per **installare i moduli Python necessari al programma per funzionare**.

## Configurazione

Successivamente è necessario **collegare il proprio account** di Twitch al programma, quindi modificarne le impostazioni. Per fare ciò, dovrete modificare il file _example.py_ nella cartella _Twitch-Channel-Points-Miner-v2_ ed inserite il vostro **username** e la vostra **password**.

Ecco alcune delle opzioni più interessanti nel file di configurazione:

* **join_chat**=True # Scegli, se entrare nella chat perché sia contato lo watchtime ottenuto attraverso lo script. Questa opzione è attiva in modo predefinito, ma se non volete **essere nella lista delle persone in chat**, potete impostarla su False.
* **follow_raid**=True # Scegli se **entrare nei raid** per guadagnare 250 punti
* **watch_streak**=True # Cerca di ottenere sempre i 450 punti per aver guardato uno streamer per almeno 5 minuti consecutivi [spiegato meglio qui](https://github.com/Tkd-Alex/Twitch-Channel-Points-Miner-v2/issues/11)

Queste tre impostazioni sopra, così come le strategie di scommessa, sono **personalizzabili per ogni streamer**, come potete vedere nelle ultime righe del file.

* **emoji**=True # Su **Windows** c'è un **problema** con la scrittura di **emoji nel terminale**. Se avete Windows, **disattivate questa opzione**, impostandola su False

## Strategie di scommesse nei pronostici

Un pronostico ha solo **due possibili risposte tra cui scegliere**, le strategie di questo programma sono quattro:

* **MOST_VOTED**: Scommetti sull'opzione più popolare, non quella con più punti scommessi ma quella votata da più persone.
* **HIGH_ODDS**: Scommetti sull'opzione con una ricompensa maggiore rispetto ai punti spesi - quindi, quella in cui sono stati puntati meno punti.
* **PERCENTAGE**: Seleziona l'opzione con la percentuale maggiore secondo Twitch, ossia quella con più punti scommessi.
* **SMART**: Opzione predefinita. Calcola la percentuale in base al numero di utenti che ha scommesso su ogni opzione. Se la differenza tra la maggiore e la minore è più alta di `percentage_gap` seleziona la percentuale più alta, altrimenti quella con ricompensa maggiore rispetto ai punti scommessi.

### FilterCondition: inserire delle condizioni nelle scommesse.

Il filtro FilterCondition consiste in **tre parti**. Se non capite ora, non preoccupatevi, sotto ci sono **alcuni esempi per comprendere meglio il tutto**.

La prima è **by**, quella definisce **la condizione da rispettare**, che può essere

```bash
PERCENTAGE_USERS
ODDS_PERCENTAGE
ODDS
DECISION_USERS
DECISION_POINTS
TOP_POINTS
TOTAL_USERS
TOTAL_POINTS
```

La seconda è **where**, definisce **quando la condizione viene rispettata**, ossia se il valore è maggiore (GT), minore (LT), maggiore o uguale (GTE) oppure minore o uguale (LTE).

La terza è **value**, definisce **il valore che deve avere la condizione da rispettare**

Ecco qua alcuni esempi, per **capire come viene utilizzata** questa **funzione** di filtraggio.

```python
FilterCondition(by=OutcomeKeys.TOTAL_USERS, where=Condition.GT, value=200)
```

In questo modo il programma scommetterà **solo se un numero maggiore di 200 utenti** ha già scommesso.

```python
FilterCondition(by=OutcomeKeys.ODDS, where=Condition.GTE, value=1.3)
```

La scommessa sarà effettuata **solo se la ricompensa in caso di vittoria è maggiore o uguale di 1.3**, ossia il 130%

```python
FilterCondition(by=OutcomeKeys.TOP_POINTS, where=Condition.LT, value=2000)
```

La scommessa sarà compiuta solo **se sono stati investiti meno di 2000 punti** nell' opzione.

### DelayMode: quando scommettere nei pronostici

DelayMode, ossia **modalità di attesa**, consente di definire **quanto aspettare prima di piazzare** una scommessa.

```python
delay_mode=DelayMode.FROM_END,      # When placing a bet, we will wait until `delay` seconds before the end of the timer
delay=6,
```

L'impostazione **predefinita**, contenuta nel codice soprastante che potete trovare in _example.py_, consiste nell'aspettare fino a quando mancano sei secondi (delay=6) alla fine del pronostico (DelayMode.FROM_END)  al fine di ottenere **una vista più ampia possibile sulle opzioni favorite ed ignorate dalla maggioranza**.

DelayMode può essere impostata in **tre modi diversi**, ognuno dei quali tarato a dovere con il valore `delay`.

* FROM_START: aspetta `delay` **secondi dall' inizio** per piazzare la scomessa.
* FROM_END: attendi `delay` **secondi dalla fine** per puntare.
* PERCENTAGE: attendi `delay`, valore **compreso tra 0 ed 1**, moltiplicato per la durata totale del pronostico,  per scommettere punti canale. Quindi se il pronostico dura due minuti, con `delay=0.2`  e `delay_mode=DelayMode.FROM_END` il programma attenderà 24 secondi per piazzare.

Di solito l'opzione predefinita funziona **senza problemi**, ma almeno adesso sapete come **cambiarla ed impostarla** secondo le vostre preferenze!

## Avviare il programma

Dopo aver modificato il file _example.py_ possiamo **rinominarlo** in _run.py_ ed **eseguirlo** con

```bash
python3 run.py
```

Adesso il programma inizierà a funzionare e non sarà necessario nessun intervento, tranne CTRL+C per fermarlo.

Attenzione, però: se è la prima volta deve **memorizzare i cookies** di accesso, e per accedere dovrà ottenere il codice dell'autenticazione a due fattori, quindi, al **primo avvio**, scrivete il **codice** che avete **ricevuto via email da Twitch** per **completare l'accesso** ed inizializzare il tutto.

### Schermata di analytics

![Twitch Channel Points Miner Analytics](/blog/analytics-twitch-channel-points-miner.png)

Per mostrare un'interessante schermata con le statistiche dei punti guadagnati ed anche per quale ragione (watch_streak, raid...) potete aggiungere la funzione

```python
twitch_miner.analytics(host="127.0.0.1", port=5000, refresh=30)
```

sopra alla riga contenente `twitch_miner.mine`.

Tale funzione creerà un piccolo web-server disponibile all'indirizzo [http://127.0.0.1:5000/](http://127.0.0.1:5000/) con Flask, che aggiornerà i grafici ogni 30 secondi.

Tale pagina web conterrà dei **grafici** per **visualizzare i punti guadagnati** con **ogni streamer**, che possono essere **ingranditi o rimpiccioliti** e persino **salvati come immagini**. C'è anche la modalità scura, la reputo una funzionalità abbastanza utile, inoltre Flask è abbastanza leggero quindi non rallenterà il vostro computer.

Questo tutorial finisce qui, se avete altre domande scrivetele via mail oppure nei commenti, dopo aver registrato un account da appunti.bortox.it/login .