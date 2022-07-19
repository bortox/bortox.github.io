---
title : Convertire le immagini di un blog Jekyll in avif e webp
description : Optimize and reduce size of png images with little to no loss using pngquant.
date: 2022-07-19
tags:
- optimization
- image
- avif
- webp
categories: ['tutorial', 'github']
---

Ho un blog con oltre 100 articoli, principalmente [Compiti scolastici](https://bortox.it/Compiti-scolastici), dove ho convertito le immagini anche nei formati recenti .avif e .webp. 

## Perché convertire le immagini in formati moderni?

Perché l'ho fatto? Principalmente per tre ragioni:

* Il punteggio di alcune pagine con molte immagini su PageSpeed a volte era minore di 90/100, mentre normalmente la media è di 99/100.
* Dopo aver abilitato la conversione webp sul mio blog Hugo ho notato una velocità di caricamento migliore e dei risparmi sulla banda e sulla taglia delle immagini.
* Questo articolo sulla [_crisi di obesità_ (:gb:)](https://idlewords.com/talks/website_obesity.htm) del web mi ha convinto a ridurre la taglia delle pagine di bortox.it e le immagini erano il problema più grande.

## Come convertire le immagini in webp e avif su Jekyll

Oserei dire che su Jekyll abbiamo quasi "la pappa pronta" siccome arriva in nostro soccorso un eccellente plugin: **Jekyll Picture Tag**, che abilita sia immagini responsive sia la conversione in formati più moderni.

### Immagini responsive

Per chi non lo sappia, quando le immagini su un sito sono responsive, per ogni immagine vengono prodotte diverse copie di essa di taglie diverse (es 200x, 400x, 800x, 1200x) e secondo lo schermo dell'utilizzatore, saranno richieste dal dispositivo quelle appropriate. Ad esempio un mio cliente su un IPhone può ricevere un'immagine larga 400 pixel, mentre un altro su un laptop riceverà quella larga 1200 pixel, siccome ha uno schermo più largo. In questo modo il caricamento delle immagini è più "intelligente" ed anche più veloce senza avere una penalità sulla qualità delle immagini.

## Come installare Jekyll Picture Tag

Per installare Jekyll Picture Tag basta aggiungere al Gemfile la gem _jekyll\_picture\_tag_ nel gruppo _jekyll\_plugins_. 

```ruby
group :jekyll_plugins do
	gem 'jekyll_picture_tag', '~> 2.0'
end
```

Successivamente il modulo viene installato, ma adesso c'è bisogno di **configurarlo**.

## Come configurare Jekyll Picture Tag

Per configurare il modulo Jekyll Picture Tag basta creare il file `_data/picture.yml`. 

Per prima cosa, nel file bisogna specificare le _media query_ impostate sul sito. 
```ruby
media_queries:
    mobile: 'max-width: 600px'
    laptop: 'max-width: 800px'
    wide: 'min-width: 801px'
```
Nel mio sito, un dispositivo viene considerato uno smartphone se lo schermo ha meno di 600 pixel di larghezza, un laptop con meno di 800px e qualcos'altro se ha più di 800 pixel di larghezza. Successivamente ho cambiato alcuni parametri di default:

```ruby
formats: [avif, webp, original] # Order matters!
    format_quality:
      jpg: 80
      png: 85
      webp: 75
      avif: 70

    widths: [200, 400, 800, 1200, 1600] # Image widths, in pixels.
```
Ho impostato il supporto per la conversione in file avif, webp e jpeg, e diverse qualità per i formati, probabilmente troppo alte. 

### Aumentare il tempo di build in cambio di immagini più piccole

Aggiungendo questi parametri al file picture.yml si può influenzare il tempo di build.

```ruby
image_options:
      avif:
        compression: av1
        effort: 9 # Fino a 9 da 0, 9=veloce. 6 è il valore predefinito
      png:
        compression: 9 # Livello di compressione da 0 a 9, 9=lento.
      webp:
        effort: 6 # Livello di compressione da 0 a 6, 6=lento, 4=predefinito.
```

Con queste opzioni l'effort della conversione delle immagini aumenta oltre il 100%, per risparmi del 5-10%. Notare che la conversione in .avif con effort pari a nove richiede come circa 5-10 immagini in webp a livello 6. Se come scritto sotto rimuovete la cartella delle immagini convertite da JPT dal .gitignore eseguendo le build in locale può essere un'idea efficace per una migliore compressione, altrimenti è troppo lento: circa 30minuti per ogni build con le GitHub Actions.


### Come scegliere la qualità delle immagini convertite?

Normalmente **75** è un buon numero per la qualità delle immagini convertite ed è utilizzato come default da **Hugo**, il framework per costruire siti statici come questo di Google. Sul sito ufficiale della conversione in .**avif** (https://avif.io/) il default è **70**, valutando questi parametri consiglierei di tenersi su un range da 70 ad 80 per la qualità delle immagini.

Per ulteriore personalizzazione di questo file, consiglio di riferirsi alla **documentazione** di Jekyll Picture Tag, disponibile su https://rbuchberger.github.io/jekyll_picture_tag/

## Test di Jekyll Picture Tag

Come dice il nome, Jekyll Picture Tag è un **tag liquid**, quindi viene aggiunto nelle pagine in Markdown più o meno così {% _tag_ %}). Se utilizzate VSCodium come me o qualsiasi strumento che supporti le regex, questo è un'ottimo comando per convertire le immagini `![Alt text](/data/immagine.png)` in picture tag `{% picture /data/immagine --alt Alt text %}`

Find: `!\[(.*?)\]\((.*?)\)`
Replace: `{% picture $2 --alt $1 %}`

{{< alert >}}
Se avete un'immagine che sfrutta codice liquid come me, ad esempio ` ![Foto delle provette]({{ "/data/img/chimica/lss/acidi-e-basi/provetteac.jpg" | relative_url }})` dovete **toglierlo**, perché Jekyll Picture Tag ha bisogno di un path che porti ad un file esistente dalla root del progetto. Il risultato esemplare dovrebbe essere `{% picture /data/img/chimica/lss/acidi-e-basi/provetteac.jpg --alt Foto delle provette %}`. Con qualche find & replace ci si arriva.
{{</ alert >}}


## Dipendenze di Jekyll Picture Tag

Jekyll Picture Tag utilizza [**libvips**](https://www.libvips.org/) per processare le immagini, assieme ad **imagemagick**.

Su Ubuntu basta installare libvips-tools. Su Alpine il pacchetto si chiama _vips_, su Debian Buster con YunoHost (mio setup precedente) invece non pensateci nemmeno: un'inferno di dipendenze tra meson obsoleto, libvips, imagemagick...

## Utilizzare Jekyll Picture Tag con Github Actions

Fortunatamente stavolta un aiuto è [presente nella documentazione](https://rbuchberger.github.io/jekyll_picture_tag/users/deployment.html?highlight=svg#github-pages) ma non va bene. Siccome il sistema è Ubuntu, nelle repo non è ancora presente la versione che supporta **avif**, dunque sfrutteremo un sistema basato su Arch, le cui repo ottengono aggiornamenti molto velocemente.

```yaml
name: Build and Deploy to Github Pages

on:
  push:
    branches:
      - master  # Here source code branch is `master`, it could be other branch

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Use GitHub Actions' cache to cache dependencies on servers
      - uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
      # Use GitHub Deploy Action to build and deploy to Github
      - uses: jeffreytse/jekyll-deploy-action@v0.4.0
        with:
          provider: 'github'
          token: ${{ secrets.GH_TOKEN }} # It's your Personal Access Token(PAT)
          pre_build_commands: pacman -S --noconfirm libvips imagemagick
          repository: ''             # Default is current repository
          branch: 'gh-pages'         # Default is gh-pages for github provider
          jekyll_src: './'           # Default is root directory
          jekyll_cfg: '_config.yml'  # Default is _config.yml
          jekyll_baseurl: ''         # Default is using _config.yml
          bundler_ver: '>=0'         # Default is latest bundler version
          cname: ''                  # Default is to not use a cname
          actor: ''                  # Default is the GITHUB_ACTOR
```

Questo è il file di build che funziona per il setup appena mostrato, basta creare un token con il permesso di scrivere nelle repo (scrive sul branch _gh-pages_) ed aggiungere ai pre_build_commands l'installazione di imagemagick e libvips.

## Velocizzare il tempo di build locale rimuovendo da .gitignore le immagini convertite

{{< badge >}}
Questo non funziona con GitHub pages :(
{{</ badge >}}

Se avete dei minuti di build limitati, siccome Jekyll Picture Tag riconosce quando un'immagine è gia stata convertita, potete aggiungere a git la cartella _site/generated dove si trovano le immagini convertite in formati diversi per evitare di riconvertirle ogni volta.

```bash
# Cache built images by Jekyll Picture Tag in _site/generated

_site/*
!_site/generated/
```

