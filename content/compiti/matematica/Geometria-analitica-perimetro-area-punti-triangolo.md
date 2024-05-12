---
categories: matematica
date: '2021-02-23'
description: Dopo aver rappresentato il triangolo di vertici A(-1,1), B(2,0), C(1,4)
  determina il suo perimetro e la sua area.
externalUrl: https://bortox.it/Compiti-scolastici/compiti/2021/02/23/Geometria-analitica-perimetro-area-punti-triangolo.html
math: esattamente
tags: geometria analitica triangolo vertici area perimetro determina coefficiente
  angolare distanza formula area rette equazioni
title: Determina perimetro e area di un triangolo dati i vertici. Geometria analitica.
---

## Esercizio 3

> Dopo aver rappresentato il triangolo di vertici $A(-1,1), B(2,0), C(1,4)$ determina la misura del suo perimetro e la sua area.


### Calcoliamo il perimetro

Per calcolare il perimetro dovremo trovare la lunghezza dei lati di ABC.

#### Calcolare la distanza tra due punti

Per trovare la lunghezza di ogni lato bisogna calcolare la distanza tra i due estremi del segmento. Ecco la formula:

$d(A_{1},A_{2}) = \sqrt{(x_{2}-x_{1})^2,({y_{2}-y_{1})^2}}$


#### Calcoliamo la lunghezza di AB.

$ AB = \sqrt{(-1-2)^2+(1-0))^2} $

$ AB = \sqrt{9+1} $

$ AB = \sqrt{10} $


#### Calcoliamo la lunghezza di BC.

$ BC = \sqrt{(2-1)^2+(0-4))^2} $

$ BC = \sqrt{1+16} $

$ BC = \sqrt{17} $


#### Calcoliamo la lunghezza di CA.

$ CA = \sqrt{(-1-1)^2+(1-4))^2} $

$ CA = \sqrt{4+9} $

$ CA = \sqrt{13} $

#### Otteniamo la lunghezza del perimetro

Avendo ottenuto la lunghezza di ogni lato, possiamo calcolare il perimetro.

$2p = AB + BC + CA$

$2p = \sqrt{10}+\sqrt{17}+\sqrt{13}$

---

### Calcoliamo l' area

La **formula** dell' **area** è $ A = \frac{h * b}{2} $.

Consideriamo AB come **base** del triangolo.

#### Come troviamo l' altezza

Per trovare l' altezza **relativa** alla base AB dobbiamo trovare il segmento HC. H è un punto **appartenente ad AB** e C è il **vertice opposto**. Il punto H è l' **intersezione** tra le rette AB e HC. HC è perpendicolare ad AB poiché altezza, quindi il coefficiente angolare della retta HC sarà l' antireciproco di quello di AB.

##### Formula del coefficiente angolare

$$ m = \frac{y_{A}-y_{B}}{x_{A}-{x_{B}}} $$

Innanzitutto, troviamo il coefficiente angolare di AB.

$ m_{AB} = \frac{1-0}{-1-2} = -\frac{1}{3} $

L' altezza è perpendicolare, quindi la retta HC dovrà avere un coefficiente angolare **antireciproco** a quello della retta AB.

$ m_{h} = 3 $

##### Equazioni delle rette HC  e AB

Equazione della retta **HC** imponendo il passaggio per C(1,4):

$ y = 3x + q $

$ 4 = 3x + q $

$ q = 1 $

Quindi

$ y = 3x + 1 $

Equazione della retta passante per **AB**:

$$ \frac{y-y_{A}}{y_{B}-{y_{A}}} = \frac{x-x_{A}}{x_{B}-{x_{A}}} $$

$$ \frac{y-1}{0-1} = \frac{x+1}{-2+1} $$

$$ -y-1 = \frac{-x+1}{3} $$

$$ y = -\frac{1}{3}x+\frac{2}{3} $$

##### Troviamo il punto H, intersezione tra le rette HC e AB.


Per trovare il punto d' intersezione, mettiamo a sistema le due rette

$$ \begin{cases}
y = -\frac{1}{3}x+\frac{2}{3} \\
y = 3x + 1
\end{cases} $$

$$ \begin{cases}
3x + 1 = -\frac{1}{3}x+\frac{2}{3} \\
y = 3x + 1
\end{cases} $$

$$ \begin{cases}
9x + 3 = -x + 2 \\
y = 3x + 1
\end{cases} $$

$$ \begin{cases}
10x = -1 \Rightarrow x = -\frac{1}{10} \\
y = 3\times(-\frac{1}{10}) + 1
\end{cases} $$

$$ \begin{cases}
x = -\frac{1}{10} \\
y = -\frac{3}{10}+\frac{10}{10}
\end{cases} $$


$$ \begin{cases}
x = -\frac{1}{10} \\
y = \frac{7}{10}
\end{cases} $$

Con le coordinate $ H(-\frac{1}{10},\frac{7}{10}) $ e $ C(1,4) $

##### Calcoliamo l' altezza CH

$ CH = \sqrt{(1+\frac{1}{10})^2+(4-\frac{7}{10})^2} $

$ CH = \sqrt{(\frac{11}{10})^2+(\frac{33}{10})^2} $

$ CH = \sqrt{\frac{121}{10}} $

#### Calcoliamo finalmente l' area.

$ A = \frac{CH \times AB }{2} $

$ A = \frac{\sqrt{10}\times\frac{11}{10}\times\sqrt{10}}{2} $

$ A = \frac{10\times\frac{11}{10}}{2} $

$ A = \frac{11}{2} $