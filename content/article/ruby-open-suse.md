---
title: Installa Ruby e Jekyll su OpenSUSE Tumbleweed
description: Come installare Ruby e Jekyll su OpenSUSE Tumbleweed attraverso rbenv
published: true
date: 2021-09-26T15:07:00+00:00
tags: 
- ruby
- jekyll
- opensuse
categories: ['tutorial', 'linux']
editor: markdown
---

## Introduzione

OpenSuse è una distro che posso consigliare. Veloce e stabile, Europea ed anche facile da personalizzare grazie a YAST.

Nei primi giorni d'uso però ho incontrato un problema: **non riuscivo ad installare Jekyll, il programma scritto in Ruby** che uso per compilare la maggior parte dei miei siti statici. <!--more-->

![opensuse-jekyll-ruby.png](../opensuse-jekyll-ruby.png "Immagine dell'articolo: il camaleonte di OpenSuse si confronta con le gemme di Ruby tra cui Jekyll")

Ruby 2.7 -preinstallato- viene utilizzato anche da YaST ed altri programmi di sistema e per qualche motivo la versione distribuita con OpenSuse non andava molto d'accordo con l'installazione di Jekyll e Bundler.

Fortunatamente, dopo un po' di ricerca, ho trovato una issue su GitHub, in cui *jcayouette* descrive esattamente come fare per risolvere il problema. Ho tradotto il procedimento in Italiano e l'ho scritto qui per renderlo più facile da comprendere e veloce da cercare, comunque sia questo è il link al [tutorial originale](https://github.com/jekyll/jekyll/issues/6852) in inglese.



## Come installare Ruby 3.0 su OpenSuse

Prima di installare Jekyll, dovremo **installare Ruby**, e solo dopo Jekyll, come **"gemma" di Ruby**, ossia codice che è possibile includere in progetti Ruby.

* Installa le dipendenze
```bash
sudo zypper in autoconf libopenssl-devel libyaml-devel readline-devel libxslt-devel ncurses-devel libffi-devel zlib-devel gdbm-devel libgdbm4
```

## Installa rbenv per gestire diverse versioni di Ruby nello stesso sistema

* Clona la repo di rbenv
```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```
* Aggiungi rbenv alla variabile PATH affinché il programma possa essere eseguito ed inizializzato automaticamente

Aggiungi queste linee al file `.bashrc`.

```bash
export PATH="$HOME/.rbenv/bin:$PATH"
export PATH="$HOME/usr/local/bin:$PATH"
eval "$(rbenv init -)"
```

* Esegui source su .bashrc per applicare i cambiamenti

```bash
source ~/.bashrc
```

* Controlla che l'installazione sia andata a buon fine

Esegui il comando rbenv e controlla l'output. Dovrebbe essere qualcosa come:

```bash
rbenv 1.1.2-61-g585ed84
Usage: rbenv <command> [<args>]

Some useful rbenv commands are:
   commands    List all available rbenv commands
   local       Set or show the local application-specific Ruby version
   global      Set or show the global Ruby version
   shell       Set or show the shell-specific Ruby version
   install     Install a Ruby version using ruby-build
   uninstall   Uninstall a specific Ruby version
   rehash      Rehash rbenv shims (run this after installing executables)
   version     Show the current Ruby version and its origin
   versions    List installed Ruby versions
   which       Display the full path to an executable
   whence      List all Ruby versions that contain the given executable

See `rbenv help <command>' for information on a specific command.
For full documentation, see: https://github.com/rbenv/rbenv#readme
```

## Installa Ruby tramite rbenv

* Per usare il comando rbenv install, che semplifica il processo di installazione delle nuove versioni di Ruby, dovresti installare ruby-build, installato come plugin per rbenv attraverso git:

```bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

* Visualizza le ultimi versioni stabili per ogni implementazione di Ruby che possono essere installate.

```bash
rbenv install -l
```

Per visualizzare tutte le versioni installabili, usa

```bash
rbenv install -L
```

In questo caso, installeremo la versione **3.0.2**, anche se dopo che questo articolo sarà scritto, questa non sarà più l'ultima release stabile, mostrata con `rbenv install -l`.

* Installa Ruby 3.0.2 con rbenv


```bash
rbenv install 3.0.2
```

* Imposta la versione di Ruby installata come predefinita

```bash
rbenv global 3.0.2
```

* Controlla se l'installazione di Ruby è andata a buon fine.

```bash
ruby -v
```

Grazie a rbenv, il sistema potrà convivere con la versione installata, mantenendo quella predefinita necessaria, ad esempio, per YaST, dunque da non disinstallare.


* Installa Jekyll

```bash
gem install jekyll
```

Ecco fatto! Adesso abbiamo installato Jekyll senza incorrere in problemi di dipendenze con la versione preinstallata di Ruby!
