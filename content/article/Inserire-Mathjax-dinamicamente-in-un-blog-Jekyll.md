---
categories: ['tutorial', 'github']
date: '2020-10-10'
description: Vuoi formattare in un modo decente espressioni e formule? Aggiungi il
  CDN con lo script di Mathjax, impara la sintassi basica, e inserisci le tue espressioni
  tra $$
externalUrl: https://bortox.it/Compiti-scolastici/tutorial/appunti/2020/10/10/Inserire-Mathjax-dinamicamente-in-un-blog-Jekyll.html
math: 'yes'
redirect_from: /appunti/2020/10/10/Inserire-Mathjax-dinamicamente-in-un-blog-Jekyll.html
tags: Mathjax jekyll liquid aggiungere head front matter cdn
title: Come aggiungere Mathjax ad un sito Jekyll dinamicamente
---

#### 1 ) Prepara le pagine

Siccome non vogliamo che lo script di Mathjax venga caricato - inutilmente - per ogni pagina,[^1] useremo la sintassi liquid per farlo caricare solo quando serve. 

Nei post in cui dovrai caricare Mathjax, aggiungi l' attributo `math: 'yes'` nel [Front Matter](https://jekyllrb.com/docs/front-matter/).

Questo attributo servirà per inserire un blocco if else con liquid nel file `_/includes/head.html` ( o nel tag head del file html di default per le tue pagine ) per caricare dinamicamente lo script di Mathjax.

#### 2) Copia l' indirizzo del CDN dello script di Mathjax con lo script liquid incluso.

    {{ "{% if page.math == 'yes' " }}%}<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-MML-AM_CHTML"></script>{{ "{% else " }}%}{{ "{% endif "}}%}

#### 2.5) Osserva la sintassi basica di Mathjax ( Latex, siccome Mathjax è basato su di esso )

> [Ecco un interessante PDF sui simboli matematici in Mathjax](https://www.caam.rice.edu/~heinken/latex/symbols.pdf)


> Se non riesci a trovare dei simboli matematici, puoi provare a disegnarli [QUI](http://detexify.kirelabs.org/classify.html) e troverai la sintassi Mathjax e Unicode.

#### 3) Osserva la meravigliosità di Mathjax

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$

$$
  \begin{pmatrix}
    a & b\\
    c & d\\
  \hline
    1 & 0\\
    0 & 1
  \end{pmatrix}
$$

$$S_A = \rho \cdot V_{corpo}*{g}$$
Per farlo funzionare, devi chiudere le tue espressioni tra due segni del dollaro. **Esempio**:

    $$S_A = \rho_{fluido} \cdot V_{corpo}*{g}$$


[^1]: Facendoci inoltre perdere punteggio su Page Speed Insights