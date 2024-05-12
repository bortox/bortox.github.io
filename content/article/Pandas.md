---
categories: ['tutorial', 'Python']
date: '2020-10-19'
description: Come creare medie, differenze e altri tipi di manipolazioni dei dati
  con Pandas in Python.
externalUrl: https://bortox.it/Compiti-scolastici/tutorial/2020/10/19/Pandas.html
lastmod: 2020-10-19 21:54:30
tags: lss moto irregolare tabelle incertezze cronometro secondi discussione
title: Pandas | Come creare e gestire tabelle con incertezze.
---

### Tabella originale:

| N° Pilone | Cronometro 1 | Cronometro 2 | Cronometro 3 | Tempo Medio |
|---|:---:|:---:|:---:|:---:|
0|0|0|0|0s
1|5.44|5.30|5.56|(5.43±0.13)s
2|11.03|11.21|11.25|(11,63±0.11)s
3|16.63|16.64|16.65|(16.64±0.01)s
4|21.83|22.34|21.82|(22.09±0.26)s
5|27.80|27.35|27.28|(27.54±0.26)s


### Tabella dopo manipolazioni con Pandas:

| Istante di Tempo   | Intervallo di Tempo   | Posizione   | Spostamento   | Velocità       |
|:-------------------|:----------------------|:------------|:--------------|:---------------|
| (0.0±0.0)s         | (0.0±0.0)s            | (0±0.0)m    | (0.0±0.0)m    | (nan±nan)m/s   |
| (5.43±0.13)s       | (5.43±0.13)s          | (1±0.01)m   | (1.0±0.01)m   | (0.18±0.01)m/s |
| (11.14±0.11)s      | (5.71±0.24)s          | (2±0.01)m   | (1.0±0.02)m   | (0.18±0.01)m/s |
| (16.64±0.01)s      | (5.5±0.12)s           | (3±0.01)m   | (1.0±0.02)m   | (0.18±0.01)m/s |
| (22.08±0.26)s      | (5.44±0.27)s          | (4±0.01)m   | (1.0±0.02)m   | (0.18±0.01)m/s |
| (27.54±0.26)s      | (5.46±0.52)s          | (5±0.01)m   | (1.0±0.02)m   | (0.18±0.02)m/s |

## Come sono state generate queste tabelle

> Per queste tabelle ho usato il modulo Pandas, utile nell' elaborazione di dati, scrivendo un codice in Python. Python è un linguaggio di programmazione semplice.

#### Si consiglia una conoscenza basica di Python per capire questo codice.
#### [Un ottimo libro per iniziare si può scaricare gratuitamente in PDF cliccando qui. Lo consiglio. È anche in Italiano.](https://github.com/AllenDowney/ThinkPythonItalian/raw/master/thinkpython_italian.pdf)
Per prima cosa, importiamo Pandas
{% highlight python %}
import pandas as pd
{% endhighlight %}

Poi leggiamo le tabelle. Nel mio caso sono tabelle in un file HTML.

{% highlight python %}
dfull = pd.read_html(r'/home/borto/Notable - Export (6EBA)/Cinematica.html')
{% endhighlight %}

Ho 7 tabelle in questo file HTML, ripeterò l' azione sette volte; ordunque inizio un loop:

{% highlight python %}
for i in range(7):
{% endhighlight %}

Tutti gli elementi partecipi al loop devono essere indentati di quattro spazi, potete farlo anche premendo il tasto tab.

Innanzitutto, queste tabelle contengono solo 4 colonne utili, che dovro "processare" per ottenere i dati che mi interessano:

- La misurazione del primo cronometro
- La misurazione del secondo cronometro
- La misurazione del terzo cronometro
- Il numero del pilone

Da questi dati, ipotizzando che tra un pilone e l' altro ci sia una distanza di un metro, troverò la **velocità media** del moto tra un pilone e l' altro, l' **intervallo di tempo passato** e lo **spostamento**. Ovviamente **includendo le incertezze**.

Creiamo un nuovo dataframe ( sostanzialmente, una tabella ) dalla tabella numero `i` ( i è specificato nel loop `for i in range(7):` ) del file html precedentemente importato.

{% highlight python %}
df = dfull[i]
{% endhighlight %}

Per prima cosa, troviamo la **media** dell' **intervallo di tempo.** Per trovarla, invece di fare la media, ho deciso di proseguire in un modo abbastanza astruso: prima trovo il minimo del valore tra le tre misure, poi il massimo, l' incertezza con (massimo - minimo) / 2 e infine la media con minimo + incertezza. 

Da qui il codice inizia a farsi **disordinato** ( come me ) .

{% highlight python %}
# Trova il minimo nell' asse x tra queste tre colonne.
df['minimo'] = df[['Cronometro 1','Cronometro 2','Cronometro 3']].apply(min, axis=1).round(decimals=2)
# Trova il massimo nell' asse x tra queste tre colonne.
df['massimo'] = df[['Cronometro 1','Cronometro 2','Cronometro 3']].apply(max,axis=1).round(decimals=2)
# Trova l' incertezza : ( massimo - minimo ) / 2.
df['incertezza_istante_di_tempo'] = ((df['massimo'] - df['minimo'])/2).round(decimals=2)
df['valore_istante_di_tempo'] = (df['minimo'] + df['incertezza_istante_di_tempo']).round(decimals=2)
{% endhighlight %}

Ovviamente tutti i dati sono arrotondati alla seconda cifra perché così mi è stato chiesto, ma potete anche evitarlo togliendo `.round(..)` tutte le volte che lo vedrete.

Ora dobbiamo scrivere l' **Istante di Tempo** con l' **incertezza** in un formato decente. Dopo un po' di browsing su StackOverflow ho trovato la soluzione giusta: una f-string formattata con i valori x e y come incertezza e valore dell' istante di tempo.

{% highlight python %}
df['Istante di Tempo'] = [f'({x}±{y})s' for x, y in zip (df['valore_istante_di_tempo'].round(decimals=2), df['incertezza_istante_di_tempo'].round(decimals=2))]
{% endhighlight %}

Da qui uscirà il testo (x±y)s


Successivamente dobbiamo trovare anche il **valore dell' intervallo di tempo**, uguale al tempo di arrivo - il tempo di partenza.

Per questo ho usato un comando semplice, ossia `.diff(),` che esegue la differenza tra un valore e quello precedente del dataframe. Se il valore è il primo restituisce NaN, Not A Number, che però non è vero, quindi specifichiamo l' opzione `.fillna(0)`

{% highlight python %}
df['valore_intervallo_di_tempo'] = df['valore_istante_di_tempo'].diff().fillna(0)
{% endhighlight %}

Per calcolare l' incertezza di questo valore, faremo una cosa particolare: prendiamo in considerazione le ultime due celle dell' incertezza sull' istante di tempo, con `rolling(2)` e poi sommiamole con `sum()`.

{% highlight python %}
df['incertezza_intervallo_di_tempo'] = df['incertezza_istante_di_tempo'].rolling(2).sum().fillna(0)
{% endhighlight %}

Successivamente scriviamo l' Intervallo di Tempo in modo decente, creando una nuova colonna. 

{% highlight python %}
df['Intervallo di Tempo'] = [f'({x}±{y})s' for x, y in zip (df['valore_intervallo_di_tempo'].round(decimals=2), df['incertezza_intervallo_di_tempo'].round(decimals=2))]
{% endhighlight %}

Per calcolare la posizione, siccome la distanza tra ogni pilone è un metro, allora daremo alla colonna _posizione_ i valori di _N° Pilone_.

{% highlight python %}
df['valore_posizione']  = df['N° Pilone']
{% endhighlight %}

La sua incertezza è invece 0.01

{% highlight python %}
df['incertezza_posizione'] = 0.01
{% endhighlight %}

Attenzione, però: al **pilone zero**, ossia con 0 metri percorsi, non c'è **alcuna incertezza** sul dato. Inseriamo questa **condizione** con df.loc

_Se N° Pilone corrisponde a zero, allora incertezza posizione è zero_


{% highlight python %}
df.loc[df['N° Pilone'] == 0, 'incertezza_posizione'] = 0
{% endhighlight %}

Formattiamo decentemente la scrittura della posizione.

{% highlight python %}
df['Posizione'] = [f'({x}±{y})m' for x, y in zip (df['valore_posizione'].round(decimals=2), df['incertezza_posizione'].round(decimals=2))]
{% endhighlight %}

Calcoliamo il valore dello spostamento con `.diff()` sul valore della posizione. Così come abbiamo fatto con l' intervallo di tempo. Calcoliamo anche l' incertezza con lo stesso metodo. 

{% highlight python %}
df['valore_spostamento'] = df['valore_posizione'].diff().fillna(0)
df['incertezza_spostamento'] = df['incertezza_posizione'].rolling(2).sum().fillna(0)
{% endhighlight %}

Formattiamo decentemente lo spostamento.

{% highlight python %}
df['Spostamento'] = [f'({x}±{y})m' for x, y in zip (df['valore_spostamento'].round(decimals=2), df['incertezza_spostamento'].round(decimals=2))]
{% endhighlight %}

Per calcolare la velocità, dobbiamo dividere lo spostamento in metri con l' intervallo di tempo. 

{% highlight python %}
df['valore_velocità'] = df['valore_spostamento']/df['valore_intervallo_di_tempo'].fillna(0).round(decimals=3)
{% endhighlight %}

Per calcolare l' incertezza sulla velocità, siccome il valore è derivato da una **divisione**, allora calcoleremo gli **errori relativi** delle due grandezze, li sommeremo e moltiplicheremo il risultato per il risultato della divisione.

{% highlight python %}
df['errore_relativo_spostamento'] = df['incertezza_spostamento']/df['valore_spostamento']
df['errore_relativo_intervallo_di_tempo'] = df['incertezza_intervallo_di_tempo']/df['valore_intervallo_di_tempo']
df['errore_relativo_velocità'] = df['errore_relativo_intervallo_di_tempo'] + df['errore_relativo_spostamento']
df['incertezza_velocità'] = (df['errore_relativo_velocità'] * df['valore_velocità']).round(decimals=3)
{% endhighlight %}

Formattiamo decentemente il valore della velocità.

{% highlight python %}
df['Velocità'] = [f'({x}±{y})m/s' for x, y in zip (df['valore_velocità'].round(decimals=2), df['incertezza_velocità'].round(decimals=2))]
{% endhighlight %}

Cancelliamo tutte le colonne che non ci servono, siccome ne abbiamo create una ventina. 

{% highlight python %}
del df['N° Pilone']
del df['Cronometro 1']
del df['Cronometro 2']
del df['Cronometro 3']
del df['valore_posizione']
del df['valore_spostamento']
del df['incertezza_spostamento']
del df['incertezza_posizione']
del df['valore_istante_di_tempo']
del df['incertezza_istante_di_tempo']
del df['valore_velocità']
del df['errore_relativo_spostamento']
del df['errore_relativo_intervallo_di_tempo']
del df['errore_relativo_velocità']
del df['incertezza_velocità']
del df['minimo']
del df['massimo']
del df['incertezza_intervallo_di_tempo']
del df['valore_intervallo_di_tempo']
del df['Tempo Medio']
{% endhighlight %}

Esportiamo il risultato come una tabella csv con il comando 

{% highlight python %}
df.to_csv(f'data{i+1}_long.csv', index=False)
{% endhighlight %}

i+1 siccome tutti gli indici in Python iniziano con 0, quindi la tabella 0 sarà quella del moto 1. 
    
___Andrea Bortolotti___