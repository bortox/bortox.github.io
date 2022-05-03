---
title : "PCTO Monitoraggio Ambientale - Primo incontro"
description : "xfgdgfggg"
date: 2022-04-07
tags: ['monitoraggio ambientale', 'cambiamento climatico', 'riscaldamento globale', 'atmosfera', 'fisica', 'radiazione']
categories: ['PCTO']
---


Nell'aula di fisica del Liceo Scientifico Anna Maria Enriquez Agnoletti, dalle 15:00 alle 17:00 del 7 Aprile 2022, si è svolta la prima lezione del percorso PCTO "Monitoraggio Ambientale" istituito in collaborazione con il CNR. 

<!--more-->

Si sono presentati due ricercatori, Francesco d'Amato, esperto in spettroscopia e Silvia Viciani, Fisica dei Cambiamenti Climatici. Francesco d'Amato introduce la lezione e se ne va, lo reincontreremo in futuro. Viciani oggi ci fornirà un'introduzione sul percorso.

Inizia la presentazione di un documento di 117 pagine.

Silvia introduce innanzitutto l'importanza di distinguere opinioni, dati misurati e previsioni scientifiche. 

Ad esempio il gruppo IPCC.ch, creato dalle Nazioni Unite, raccoglie dati misurati e produce previsioni scientifiche, ossia opinioni avvalorate da dati misurati.

## Cos'è il cambiamento climatico?

Il **tempo meteorologico** è lo stato meteorologico di una zona in un preciso momento di tempo. 

Lo **stato meteorologico** è definito da una serie di grandezze quali temperatura, pressione, umidità, precipitazioni, vento, nuvolosità...

Il clima, infine, è lo stato medio del tempo meteorologico in un periodo **maggiore di 30 anni**.

Una variazione del clima si può anche chiamare **cambiamento climatico**.

## Cos'è il riscaldamento globale?

Il riscaldamento globale è l'aumento della temperatura media globale in un periodo di 100-150 anni. 

La temperatura media sul mare (**Global Surface Temperature**) è la media della temperatura dell'aria misurata da una stazione meteo non più alta di 2 metri sopra il livello del mare in un certo intervallo di tempo. 

La Temperatura Media Globale (**Global Average Temperature**) è la media delle GST misurate dalle varie stazioni meteorologiche nel mondo.

## Esiste il riscaldamento globale?

In presenza di un'**anomalia di temperatura** si conferma l'esistenza del riscaldamento globale. La formula per calcolare l'anomalia di temperatura è la seguente
{{< katex >}}

{{< badge >}}
$$
    \Delta T = GAT(1 anno) - GAT(30 anni)
$$
{{< /badge >}}

![Alt text](../anomalia-temperatura-globale.png "Andamento dell'anomalia di temperatura dal 1880 al 2020")

Dopo aver **confermato** l'esistenza del cambiamento climatico come riscaldamento globale, introduciamo meglio **come studiare il clima**

## Alcune basi di fisica sulle radiazioni

Al fine di utilizzare un ragionamento deduttivo, abbiamo introdotto alcune definizioni per **comprendere meglio gli scambi di energia** tra Terra, Atmosfera Terrestre e Sole.

TERMINE|DEFINIZIONE
|---|---|
Radiazione|Trasporto di energia nello spazio, insieme di lunghezze d'onda
Spettro elettromagnetico|Insieme di tutte le lunghezze d'onda che compongono la radiazione elettromagnetica
Frequenza di un'onda [Hz] | Numero di cicli della forma d'onda al secondo
Lunghezza d'Onda [m]|Ampiezza di un ciclo della forma d'onda (distanza tra due punte dell'onda)

![Rappresentazione grafica di un'onda](../frequenza-onde.gif "Rappresentazione grafica di un'onda e della sua frequenza in Hertz")

{{< alert >}}
**Ogni corpo emette una radiazione elettromagnetica che dipende dalla sua temperatura**, descritta dalla legge di Planck nel caso ideale di un *corpo nero*.
{{< /alert >}}

## Il bilancio energetico della Terra

La temperatura media della superficie terrestre sarebbe il risultato di un equilibrio tra la radiazione solare che incide sulla terra e la radiazione irraggiata dalla terra verso lo spazio, infatti si stabilizzerebbe ad un certo valore. 


Tale valore si attesta a **-19 C°** secondo la legge di Planck, considerando la Terra come un corpo nero, ossia un corpo in cui i due flussi di energia \\(\Phi_{IN}\\) e \\(\Phi_{OUT}\\) si equivalgono. 

{{< badge >}}
$$
    \Phi_{IN} = \Phi_{OUT}
$$
{{< /badge >}}


Sulla Terra, però, la temperatura media non è -19C°, infatti dobbiamo considerare anche le azioni dell'atmosfera terrestre.

## Il ruolo dell'atmosfera

Per comprendere il ruolo dell'atmosfera terrestre, innanzitutto, abbiamo considerato la particolare formazione gassosa dei essa.

Formula|Gas|%
|---|---|---|
\\(N_2\\) | Azoto | 78%
\\(O_2\\) | Ossigeno | 21%
\\(Ar\\) | Argon | 0,9%
\\(CO_2\\) | Anidride carbonica | 0,04%
\ | Altri gas | 0,06%

{{< alert >}}
**Ogni gas assorbe radiazione** ed ogni gas assorbe **solo certe lunghezze d'onda**
{{< /alert >}}

### Il ruolo delle nuvole

Le nuvole sono delle zone dell'atmosfera con forte presenza di acqua (\\(H_2O\\)).

Le nuvole riflettono la luce, dunque la radiazione elettromagnetica.

Le nuvole si formano attraverso il deposito di piccole gocce d'acqua sopra particelle di particolato - anche chiamato Aerosol - minori di 1 picometro [\\(pm = m^{-12}\\)]. 

I motori degli aerei producono particolato in funzionamento, infatti formano delle scie nel cielo.

### Il bilancio energetico tra superficie terrestre e spazio


{{< alert >}}
La radiazione riflessa verso lo spazio si definisce **albedo**.
{{< /alert >}}
 Deserti e ghiaccio, in Terra, riflettono le radiazioni, mentre in atmosfera le nubi riflettono le radiazioni verso lo spazio.

 Dunque, non ho più un'equilibrio nell'energia ricevuta ed inviata \\(\Phi_{IN} = \Phi_{OUT}\\) ma, per l'assorbimento di energia da parte dei gas e l'energia riflessa nello spazio, ossia l'albedo, ottengo:

$$
    \Phi_{IN_{superficie}} = \Phi_{Sole-Atmosfera} - \Phi_{Albedo} - \Phi_{Assorbita}
$$

{{< alert >}}
La differenza tra energia ricevuta dalla terra attraverso l'atmosfera ed energia trasmessa dalla terra in atmosfera si chiama **forcing radiativo**
{{< /alert >}}

$$
    \Delta \Phi = \Phi_{IN_{(ATM-T)}} - \Phi_{OUT_{(T-ATM)}}
$$

Se ho \\(\Delta \Phi > 0\\) allora ottengo un riscaldamento della terra, invece con \\(\Delta \Phi < 0\\) ottengo un raffreddamento della Terra.

### L'effetto serra

Come scritto prima, ogni gas assorbe specifiche frequenze di radiazione, lasciando la radiazione **intrappolata nell'atmosfera**. Questo si chiama "effetto serra". 

Ogni strato dell'atmosfera contiene diversi gas, dunque sia assorbe radiazione sia riemette radiazione in tutte le direzioni: sia verso la terra, dove può essere assorbita, sia negli strati adiacenti dell'atmosfera.

Un aumento di gas serra nell'atmosfera, provoca di conseguenza anche un aumento dell'effetto serra, perché una maggiore concentrazione di gas nell'atmosfera intrappola una maggiore quantità di radiazione. 

Possiamo formulare una definizione dell'effetto serra partendo dai suoi effetti:

{{< alert >}}
Effetto serra: la maggior parte della radiazione emessa dalla superficie terrestre resta intrappolata nell’atmosfera e contribuisce ad aumentare la temperatura della terra
{{< /alert >}}

Un aumento di gas serra aumenta il valore del **forcing radiativo** perché una quantità maggiore di radiazioni viene catturata dai gas nell'atmosfera.

Per via degli effetti combinati di **effetto serra**, **nuvole** e **riflessione terrestre**, il bilancio radiativo tra atmosfera e Terra apparentemente non ha entrate ed uscite uguali. 

![Bilancio Energetico Terrestre](../bilancio-energetico.png "Bilancio energetico tra superficie terrestre, atmosfera e spazio")

In realtà il bilancio coincide, ad esempio tramite l'emissione di calore latente dalla Terra e la convezione entrate ed uscite si equivalgono.

La temperatura media della Terra, grazie soprattutto all'effetto serra, è di **15 C°**, dunque secondo la legge di Planck dei corpi neri emette radiazioni verso lo spazio principalmente nel campo dell'infrarosso (IR).



![Emissione atmosferica terrestre](../emissione-atmosferica-gas.png "Emissione di radiazioni dall'atmosfera terrestre verso lo spazio")

In verde viene evidenziata l'emissione radiativa ideale di un corpo nero a 15 C° di temperatura, in rosso le misurazioni effettuate dal CNR attraverso FIRMOS in Germania. 

Troviamo minori concentrazioni di radiazione in uscita dalla Terra ad esempio tra il lontano ed il medio infrarosso, dove l'anidride carbonica la assorbe. 

La **finestra atmosferica** è dove la radiazione attraversa quasi indisturbata l’atmosfera (a parte l’assorbimento dell’ozono) e viene irraggiata nello spazio.

### Confronto tra i principali gas serra

Gas serra | Permanenza in atmosfera (anni) | GWP (su 100 anni) |concentrazione attuale (ppm)
|---|---|---|---|
\\(CO_2\\) | 100 ÷ 200 | 1 | 400
\\(CH_4\\) | 12 | 22 ÷ 28 | 1.8
\\(N_2O\\) | 120 | 260 | 0.33

{{< alert >}}
La capacità di un gas serra nell'intrappolare la radiazione infrarossa, rispetto alla capacità della \\(CO_2\\), si definisce **GWP** (Global Warming Potential).
{{< /alert >}}

Per comprendere il potenziale d'inquinamento di un gas serra dobbiamo considerare il **tempo di permanenza** in atmosfera di esso, il potenziale di **intrappolare calore** e la **concentrazione attuale** nell'atmosfera. 

### Il buco nell'Ozono

Si tratta di una riduzione ciclica dello strato di Ozono - utile per noi terrestri perché blocca le radiazioni ultraviolette - che si verifica principalmente in primavera, sopra le regioni polari. 


![Andamento di CFC e HCFC in atmosfera](../cfc-hcfc.png "Presenza di CFC ed HCFC nell'atmosfera terrestre")


Gli alocarburi (CFC) erano i principali responsabili del buco nell'Ozono. 

I CFC erano utilizzati largamente nelle bombolette spray, nei solventi ed in alcuni collanti. Nel 1987 il _Protocollo di Montreal_ ha fissato il progressivo abbandono di CFC, sostituiti presto da HCFC, non dannosi per l'ozono.

![Riduzione del buco nell'Ozono](../buco-ozono.png "Conseguente riduzione nel buco nell'Ozono nell'Antartide in seguito all'abbandono di CFC")

### Previsioni ed analisi sul riscaldamento globale 

Comunque sia, adesso abbiamo un grosso problema: la concentrazione della \\(CO_2\\) è ai **massimi storici** da 800 000 anni fa.

![Andamento della concentrazione di CO2 in atmosfera](../andamento-co2.png "Andamento della concentrazione di CO2 in atmosfera")

La misurazione è stata effettuata attraverso  carotaggi di strati di ghiaccio antichi. 

{{< alert >}}
Il **permafrost** è il terreno perennemente ghiacciato, presente essenzialmente nelle regioni artiche, formatosi principlamente durante le glaciazioni di circa 2.6 milioni di anni fa.
{{< /alert >}}

Inoltre il riscaldamento globale porta ad uno **scioglimento parziale del permafrost**, contenente una grande quantità di carbonio potrebbe rilasciare in atmosfera anidride carbonica e metano.

Se l'uomo sia responsabile di tale cambiamento dopo la rivoluzione industriale è un'**opinione**, però l'aumento anomalo dell'anomalia di temperatura e della concentrazione di gas serra negli ultimi 200 anni è un dato derivato da una misurazione, non opinabile. 



## Misurare il monossido di carbonio in atmosfera: COLD

Dopo una prima parte esplicativa ed introduttiva dell'incontro riguardo al monitoraggio dell'ambiente e del clima, Silvia Viciani presenta le spedizioni del CNR nel mondo riguardanti l'ambito Climatico. 

Silvia spiega il funzionamento di [FIRMOS](https://earth.esa.int/eogateway/documents/20142/37627/FIRMOS-D8-final-report-v3.6.pdf), spettrometro nel lontano infrarosso per misurare l'emissione atmosferica e di COLD.

COLD è un misuratore di monossido di carbonio (CO) per piattaforme stratosferiche. 

Semplificando, funziona nel seguente modo:

* Viene prelevato dell'aria (miscela di gas) dall'ambiente circostante tramite una pompa
* L'aria viene spinta in una camera vetrata
* Viene preparato un laser di una certa lunghezza d'onda perché venga assorbito da un gas presente nella miscela
* Il laser entra nella camera e rimbalza nelle pareti più volte, prima di uscire dalla camera
* Un apparecchio misura quanta luce del laser - quindi radiazione - resta e, di conseguenza, quanta è stata assorbita dal gas, in questo caso il monossido di carbonio. 

COLD può essere montato su un aereo, su un pallone oppure lasciato a terra.

### Un modello matematico sul monossido di carbonio

{{< alert >}}
L'unico modo per valutare un modello matematico - una sorta di previsione scientifica basata su dati - è misurare le grandezze previste dal modello e confrontare **teoria ed esperimenti**.
{{< /alert >}}

Nel 2017, a bordo dell'aereo stratosferico sovietico **M55 Geopyhsica**, capace di raggiungere i 22km di altezza e dunque la stratosfera, è stato montato **COLD**, per misurare la concentrazione del monossido di carbonio.

![Modello climatico sugli spostamenti di CO in atmosfera a confronto con misure sperimentali](../modello-co.png "Concentrazione di CO registrata dall'aereo (in basso) a confronto con modello atmosferico sulla provenienza di CO (in alto)")

Nel seguente grafico vediamo che quando la concentrazione di CO misurata da COLD a bordo di M55 si alza, il modello atmosferico del CNR prevede la maggioranza dell'aria (in rosso) proveniente dal sud della Cina, area altamente industrializzata.

---

In conclusione è stata una lezione altamente interessante. Personalmente sono un appassionato di clima ed anche da piccolo leggevo spesso -sia su internet sia brevi libri- sulle differenze tra meteo e clima, sull'uso di energie rinnovabili.

Grazie alla presentazione adesso ho più chiare le definizioni sul clima e posso parlare con più cognizione di causa sul tema, inoltre il fatto che **ogni gas assorbe radiazione in un intervallo di lunghezze d'onda** rende più chiara la comprensione dell'effetto serra.

Spesso quando scrivo diari di bordo sono molto confusi e disordinati, ma scrivere questo incontro è stato più semplice del previsto, incredibile, data appunto la difficoltà intrinseca degli argomenti  (esempi [1](https://earth.esa.int/eogateway/documents/20142/37627/FIRMOS-D8-final-report-v3.6.pdf),[2](https://eospso.nasa.gov/sites/default/files/eo_pdfs/Nov_Dec06.pdf)).