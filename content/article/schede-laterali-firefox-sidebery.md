---
title: Schede laterali personalizzate su Firefox con Sidebery
description: Come abilitare le schede a lato dello schermo su Firefox, attraverso l'estensione Sidebery. Modifica dell'userChrome.css per rifiniture finali.
published: true
date: 2021-09-26T22:00:00.001Z
tags:
- sidebery
- schede laterali
- gruppi
- css
categories: ['tutorial', 'firefox']
---

Questo articolo è una semplice guida su come **abilitare le schede a lato dello schermo** su Firefox, attraverso l'estensione Sidebery. Grazie a questo _semplice accorgimento_, riuscirete a tenere aperte contemporaneamente oltre **cento schede** ed il titolo di ognuna delle cento. Inoltre con Sidebery si possono anche **suddividere in categorie** gruppi di schede, per esempio la categoria mail.

<!--more-->

Personalmente ho uno **schermo 21:9** e mi trovo significativamente meglio navigando su internet rispetto a prima, grazie alle schede a lato.

Nella **prima parte** del tutorial, spiegherò come **aggiungere una lista delle schede aperte a lato** e come suddividere le schede in **gruppi**, in base ai **nomi dei siti aperti**. 

Nella **seconda parte** sarà spiegato come **personalizzare Firefox** e togliere la **barra delle schede aperte** sopra la barra degli indirizzi, insieme ad un insieme di **scorciatoie da tastiera** che velocizzeranno la vostra navigazione quotidiana. 

## Prima parte

Dunque, **come prima cosa**, dovremo **aggiungere le schede a lato** della finestra di Firefox. Per fare ciò, ci avvarremo dell'aiuto di un'**estensione** [rigorosamente Open Source](https://github.com/mbnuqw/sidebery "Sidebery GitHub"): Sidebery. Possiamo installarla dal sito web degli addons di Firefox.

Non appena Sidebery viene installata, dovremmo veder comparire una lista delle schede aperte **nel lato sinistro** dello schermo. Nonostante ciò, le cose migliori non sono mai _plug & play_, dunque iniziamo esplorando le **impostazioni di Sidebery**, successivamente, nella seconda parte, quelle di Firefox, per **rimuovere la barra contenente le schede** e **spostare i pulsanti di chiusura nella riga inferiore**.


### Personalizzare Sidebery

Iniziamo dalla personalizzazione dell'aspetto di Sidebery,  premendo il pulsante a forma d'ingranaggio: per prima cosa possiamo disabilitare lo **sfondo granuloso**, _frosted background_ e cambiare la **grandezza dei caratteri** a nostro piacimento. Io ho impostato Small.

Cliccando invece su _edit styles_ possiamo **modificare il colore di ogni singolo elemento** di Sidebery attraverso il linguaggio CSS.

Tuttavia ritengo che il tema scuro predefinito possa soddisfare la maggior parte degli utenti.

### Impostare vari gruppi di schede

È proprio così: attraverso Sidebery possiamo persino **creare gruppi di schede**. Ad esempio, caratterizzato da un'**icona play** ▶️, possiamo creare il gruppo **Multimedia** che conterrà Youtube, Twitch, Netflix ed altri siti di **streaming video**.

Ognuno può creare quanti **gruppi** vuole, personalmente ne ho uno per le **caselle email**, uno per **reddit** ed uno per la **musica**.

Inoltre, ognuno può stilare la **lista predefinita di siti**, che saranno spostati nel gruppo, personalizzabile a proprio piacimento.

Ecco come **creare un gruppo di schede**.

* Apriamo le impostazioni di Sidebery, attraverso l'icona per le impostazioni.
* Clicchiamo su _panels_, menù contenente le impostazioni per appunto suddividere le schede aperte in vari _pannelli_.
* Clicchiamo su _Create panel_ e poi sul nome del pannello appena creato. Si aprirà un popup che ci consentirà di impostare **colore**, **icona** e **nome** del nuovo pannello.

* Scorrendo in giù, possiamo vedere _Move tabs with matched urls to this panel_. Impostiamo questo interruttore come attivo, cliccando su _on._ Dovremo dare un'autorizzazione a Sidebery, quella di _accedere ai dati dei siti web_, affinché ciò funzioni.
* Dopo che la permission _Access Websites Data_ è attiva, possiamo cliccare su _Panels_ e tornare al pannello che stavamo modificando. Aggiungiamo i nomi dei siti web, uno per linea.

Yay! Hai appena creato il tuo primo pannello!

Adesso, per fare una prova, puoi provare ad andare, ad esempio, su tutanota.com e vedere cosa succede a Sidebery.

Per tornare al **pannello** predefinito, puoi **cliccare l'icona a forma di lista**, situata accanto a quella della posta elettronica con le sembianze di una lettera, oppure **scorrere con la rotella del mouse** sopra le icone dei pannelli.

Sotto si trova la **seconda parte** di questo tutorial, che spiega come rimuovere le **schede dalla barra superiore**, **eclissare la scritta Sidebery** sopra alle schede ed infine spostare i **pulsanti di chiusura della finestra**, grazie alla flessibilità di personalizzazione di Firefox.

## Seconda parte

> Rimuovere la scritta Sidebery e le schede nella barra superiore con il file *userChrome.css*


Qua iniziamo ad addentrarci in un argomento **più complicato**, ciònonstante spiegato in modo comprensibile _passo dopo passo_ in questo post.

Per queste modifiche, ossia **rimuovere la scritta Sidebery** ed anche **le schede dalla barra superiore**, dovremo **cambiare il design di Firefox**, attraverso il file **userChrome.css**. Tranquilli, non sarà troppo difficile!

Per prima cosa, dobbiamo capire cos'è il file userChrome.css: un **foglio di stile** per **cambiare l'apparenza** delle applicazioni Mozilla, come, in questo caso, Firefox.

Ecco cosa dovremo fare:

* **Creare** userChrome.css
* **Abilitare** l'interpretazione di userChrome.css da parte di Firefox
* **Modificare** userChrome.css
* Chiudere ed aprire Firefox per **applicare le modifiche**

#### Come e dove creare il file userChrome.css

Per prima cosa, apriamo Firefox, sulla pagina `about:support`.

Una volta là, scorriamo giù fino a vedere la voce _Cartella del Profilo_ per poi cliccare su _Apri percorso_.

Nella cartella del nostro profilo Firefox, sarà necessario aggiungere la cartella `chrome` nella quale salveremo il file `userChrome.css`.


Una volta creata la cartella, entriamo in essa ed aggiungiamo il file `userChrome.css`.

Ecco fatto. Ricordiamoci che l'estensione del file non deve essere .txt ma **.css**

#### Attivare la lettura del file userChrome.css su Firefox

A partire dalla versione 69, al fine di migliorare le performance, Firefox non leggerà automaticamente il contenuto di userChrome.css.

Questo per noi non va bene, siccome **attraverso** userChrome.css cambieremo **l'apparenza di Firefox** per **togliere** la **barra** **superiore** contenente le **schede** lasciando solo quelle **laterali**, ad esempio.

Dunque, quest'opzione **non è stata rimossa**, altrimenti una piccola percentuale di utenti che amano personalizzare il proprio setup non avrebbero avuto alcuna speranza, infatti è attivabile impostando la preferenza `toolkit.legacyUserProfileCustomizations.stylesheets` nella pagina `about:config` su `True` per permettere la lettura e l'interpretazione del foglio di stile.

#### Come rimuovere la scritta Sidebery dalle schede aperte in gruppo:

Aggiungi queste linee per nascondere la scritta Sidebery sopra alle schede laterali

```css
#sidebar-header, #sidebar-splitter {
    display: none;
}
```

#### Come nascondere barra del titolo, pulsanti e barra delle schede su Firefox

Per risparmiare ancora più spazio, eliminando la barra del titolo, la barra superiore contenente le schede ed anche i pulsanti di chiusura, possiamo aggiungere le lineee sottostanti al file userChrome.css

```css

/*Nascondi la barra contenente le schede*/
#TabsToolbar { visibility: collapse !important; } 


/*Nascondi la barra del titolo */
#titlebar { 
  visibility: collapse !important;
  display: none;
}
```

Per chiudere una scheda, senza controlli della finestra puoi usare le scorciatoie da tastiera.

* **CTRL+E** per **mostrare** o **nascondere** la **lista di schede laterali**
* **CTRL+W** per **chiudere** una scheda.
* **CTRL+T** per **aggiungerne** una.
* **CTRL+Shift+W** per **chiudere tutte le schede**, ossia chiudere la finestra.

### Applicare i cambiamenti su Firefox

Per prima cosa, dopo aver **salvato** il file _userChrome.css_, dobbiamo **chiudere** e **riaprire** Firefox, per applicare le modifiche applicate nel foglio di stile. Una volta fatto ciò, tutto funzionerà **come desiderato**.
