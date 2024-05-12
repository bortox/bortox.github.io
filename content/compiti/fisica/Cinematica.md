---
categories: fisica
date: '2020-10-05'
description: 'Diario di Bordo sul Laboratorio del Sapere Scientifico riguardante il
  moto. In questo post sono redatte tabelle e grafici contenenti misurazioni relative
  a tratti di corsa e camminata, ognuna scritta come media da tre cronometri diversi.
  Ci sono dei grafici per ogni moto regolare, con barre di errore. '
externalUrl: https://bortox.it/Compiti-scolastici/compiti/2020/10/05/Cinematica.html
lss: moto
tags:
- post
- lss
- fisica
- diario
- bordo
- moto
- grafici
- matplotlib
- regolare
- barre di errore
- media
title: Fisica, Cinematica | Percorso LSS sul moto
---

<sub> Non avevo carta millimetrata, quindi ho fatto al computer. </sub><br>
<sub> Non mi è riuscito inserire le barre di errore nel primo grafico, poiché se le inserivo le varie tracce dei quattro moti si dividevano in più grafici.  </sub>
<sub> Ho usato il modulo matplotlib  per Python, ma è molto macchinoso da utilizzare e il design non è molto bello.</sub>


##### Le medie delle camminate e delle corse fatte dai miei compagni sotto il portico, misurate da 3 cronometri diversi. Sono tutti dei moti regolari.

{% picture loaded /data/img/fisica/lss/moto/grafici1to4.png --alt Grafici dei moti regolari, dal primo al quarto %}


<svg display="inline-block" float="left" width="345" height="45">
  <rect x="8" y="5" rx="5" ry="5" width="330" height="30" style="fill:orange;stroke:black;stroke-width:.9;opacity:0.7" />
  <text glyph-orientation-horizontal="90" x="16" y="25" fill="black">Moto uno: camminata regolare </text>
</svg>
<svg display="inline-block" float="left" width="345" height="45">
  <rect x="8" y="5" rx="5" ry="5" width="330" height="30" style="fill:lightblue;stroke:black;stroke-width:.9;opacity:0.7" />
  <text glyph-orientation-horizontal="90" x="16" y="25" fill="black">Moto due: corsa lenta </text>
</svg>
<svg display="inline-block" float="left" width="345" height="45">
  <rect x="8" y="5" rx="5" ry="5" width="330" height="30" style="fill:red;stroke:black;stroke-width:.9;opacity:0.7" />
  <text glyph-orientation-horizontal="90" x="16" y="25" fill="black">Moto tre: corsa veloce </text>
</svg>
<svg display="inline-block" float="left" width="345" height="45">
  <rect x="8" y="5" rx="5" ry="5" width="330" height="30" style="fill:lightgreen;stroke:black;stroke-width:.9;opacity:0.7" />
  <text glyph-orientation-horizontal="90" x="16" y="25" fill="black">Moto quattro: camminata dal pilone due. </text>
</svg>

## Tabelle di Macina riscritte con anche il tempo medio.


### 1) Camminata regolare


| N° Pilone | Cronometro 1 | Cronometro 2 | Cronometro 3 | Tempo Medio |
|---|:---:|:---:|:---:|:---:|
0|0|0|0|0s
1|5.44|5.30|5.56|(5.43±0.13)s
2|11.03|11.21|11.25|(11,14±0.11)s
3|16.63|16.64|16.65|(16.64±0.01)s
4|21.83|22.34|21.82|(22.09±0.26)s
5|27.80|27.35|27.28|(27.54±0.26)s

{% picture loaded /data/img/fisica/lss/moto/grafico1.png --alt Grafico di camminata regolare %}



### 2) Corsa lenta

| N° Pilone | Cronometro 1 | Cronometro 2 | Cronometro 3 | Tempo Medio |
|---|:---:|:---:|:---:|:---:|
0|0|0|0|0s
1|2.89|3.08|2.75|(2.92±0.17)s
2|5.90|5.48|5.82|(5.69±0.21)s
3|8.90|8.91|8.99|(8.95±0.04)s
4|11.92|11.34|11.99|(11.66±0.33)s
5|14.50|14.40|14.63|(14.52±0.12)s

{% picture loaded /data/img/fisica/lss/moto/grafico2.png --alt Grafico di corsa lenta %}


### 3) Corsa veloce

| N° Pilone | Cronometro 1 | Cronometro 2 | Cronometro 3 | Tempo Medio |
|---|:---:|:---:|:---:|:---:|
0|0|0|0|0s
1|1.31|1.24|1.90|(1.6±0.29)s
2|2.45|2.30|2.05|(2.25±0.20)s
3|3.49|3.54|3.53|(3.52±0.02)s
4|4.23|4.46|4.57|(4.4±0.17)s
5|5.58|5.64|5.56|(5.6±0.04)s

{% picture loaded /data/img/fisica/lss/moto/grafico3.png --alt Grafico di corsa veloce %}



### 4)  Camminata dal pilone 2

| N° Pilone | Cronometro 1 | Cronometro 2 | Cronometro 3 | Tempo Medio |
|---|:---:|:---:|:---:|:---:|
0|0|0|0|0s
3|5.90|5.95|5.92|(5.94±0.02)s
4|11.40|11.40|12.42|(11.91±0.51)s
5|17.19|17.43|17.28|(17.31±0.12)s

[^1]: Not an Error, non è un errore, non ci sono dati.

{% picture loaded /data/img/fisica/lss/moto/grafico4.png --alt Grafico di camminata regolare dal pilone 2 %}




## Risposte alle domande

> Quante e quali informazioni contiene ciascun punto del grafico?

Ciascun punto del grafico contiene tre informazioni: l'incertezza - attraverso le barre di errore - , la media del numero di secondi passati, sull' asse x, e il numero del pilone su cui è stata effettuata la misurazione. Siccome i piloni sono equidistanti, potremmo chiamare l' asse y l' asse della distanza.

>  Che tipo di andamento hai ottenuto per i moti da 1 a 3? Che cosa puoi dire confrontando i grafici 1), 2), 3) tra loro?

Per i moti da uno a tre ho ottenuto un andamento lineare, direttamente proporzionale alla velocità della camminata. Anche i grafici sono direttamente proporzionali, e sono regolari, poiché tracciando una linea, con un' incertezza, tutti i valori possono essere pressoché compresi in essa.