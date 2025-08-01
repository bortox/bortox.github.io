---
title: Snippet di codice per la gestione di Fail2Ban
description: Appunti sulla configurazione ed attivazione di Fail2Ban per proteggere il proprio server da attacchi informatici.
date: 2022-02-28T20:21:02.031Z
tags:
- fail2ban
- server
categories: ['tutorial', 'linux']
editor: markdown
dateCreated: 2022-02-26T15:50:40.394Z
---

Breve guida all'uso di Fail2Ban, appunti personali con diversi snippet. Argomenti trattati in breve:

* Come creare filtri e jail Fail2Ban per i tentativi d'accesso ad un'applicazione web come Wallabag
* Come configurare una jail per gli IP recidivi
* Come ricevere un messaggio via telegram quando un IP viene bannato
* Come modificare le impostazioni predefinite

<!--more-->

## Installare ed abilitare fail2ban

1. Installare fail2ban

`apt install fail2ban`

2. Abilitare il servizio 

`systemctl enable --now fail2ban`

## Controllare gli IP bloccati per ogni jail

```bash
fail2ban-client status | sed -n 's/,//g;s/.*Jail list://p' | xargs -n1 fail2ban-client status
```

## Scrivere una nuova regola per trovare tentativi di accesso da parte di bot

Fail2Ban sfrutta prima dei file formattati per indicare come trovare i tentativi d'accesso falliti in un file di log, che chiameremo **filtri** (in /filters.d), poi sfrutta altri file per indicare come bloccare gli indirizzi IP dopo un certo numero di tentativi falliti, in delle **jail** (in /jail.d), questi file configurano le jail. 

Per prima cosa, `cd /etc/fail2ban`, la cartella di lavoro di fail2ban.

Serve un **filtro** che scannerizza i log (di systemd oppure file testuali) attraverso una regex per trovare linee che corrispondono a tentativi d'accesso falliti da parte di un IP. 

Il filtro trova appunto queste linee e le comunica come "failed" alla jail. 

Se i fallimenti di un IP sono più di un certo valore in un dato periodo di tempo, l'IP viene bannato.

Ogni filtro sta in `/etc/fail2ban/filter.d/nomefiltro.conf`.

## Creare un filtro

Esempio: Creiamo il filtro `wallabag2.conf`

```shell
[INCLUDES]
before = common.conf
[Definition]
failregex = app.ERROR: Authentication failure for user "([\w]+)?", from IP "<HOST>"
ignoreregex =
```

In `failregex` sta la regex che trova le linee contenenti le autenticazioni fallite, tutti gli IP trovati con in `ignoreregex` saranno ignorati

{{< alert >}}
>**NON** cambiare `common.conf`, bensì crea un file `common.local` per applicare modifiche locali. 
{{< /alert >}}

### Controllare se il filtro trova tentativi d'accesso

Per controllare se questo filtro funziona, utilizziamo 
`fail2ban-regex [/path/file-di-log] [/path/filtro]`

In seguito, se fail2ban-regex trova alcuni match di righe **failed**, significa che sono avvenuti dei tentativi d'accesso. 

Possiamo creare un file di log falso con dei tentativi d'accesso falliti per testare questa regola con `fail2ban-regex`.

```bash
# Esempio di test con file di log falso
touch /tmp/error-test.log
echo "[2022-01-23 12:04:53] app.ERROR: Authentication failure for user "admin", from IP "xxx.xxx.xxx.xxx", with UA: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0". [] []" >> /tmp/error/test.log
fail2ban-regex /tmp/error-test.log wallabag2
```

## Attivare una jail per gli IP trovati da un filtro

Continiuamo l'esempio riguardante l'identificazione degli IP che tentano di accedere a Wallabag tramite il filtro appena scritto.

Il file di configurazione per la **jail** degli IP si chiamerà `wallabag2.conf`, non serve un nome particolare.


```shell
[wallabag2]
enabled = true
port = http,https
filter = wallabag2
logpath = /var/www/wallabag2/var/logs/prod.log
maxretry = 5 
```
{{< badge >}}
Tutti i file per configurare le jail hanno un percorso come `jail.d/nome-file.conf`. 
{{< /badge >}}

{{< alert >}}
In un file `.conf` possono essere configurate più jail, ogni jail viene definita dalla riga `[nome-jail]`, in questo caso `[wallabag2]`
{{< /alert >}}

- `enabled`, ovviamente, attiva il filtro.
- `port`, corrisponde alle porte su cui l'indirizzo IP sarà bloccato.
- `filter` indica il nome del filtro, se posizionato in `/etc/fail2ban/filter.d`, altrimenti va bene anche il percorso. Se non viene dichiarato qua, sarà uguale alla variabile tra le parentesi quadre.
- `logpath` indica il percorso dei file da interpretare attraverso il filtro. Io di solito aggiungo un bel `*` alla fine siccome ho la rotazione dei log, tanto per stare sicuri.
- `maxretry` è il numero massimo di tentativi.
- `bantime` è il tempo in cui durerà il ban in secondi. Impostando `-1` il ban è permanente.
- `findtime` indica il tempo in cui è consentito ad un IP fallire fino a `maxretry`.
- `action` indica l'azione da intraprendere quando un IP viene bannato.

## Modificare le impostazioni di jail predefinite.

Come si può vedere, le impostazioni di jail predefinite, stanno in `/etc/fail2ban/jail.conf/`. Come vediamo dalle righe presenti all'inizio del file


> Provide customizations in a jail.local file or a jail.d/customisation.local.

Per applicare i nostri cambiamenti, creiamo il file  `jail.d/customisation.local`; meglio non toccare `/etc/fail2ban/jail.conf/`, sia perché potrebbe cambiare dopo un aggiornamento sia perché nel caso di un errore nella nostra configurazione, basterà -nello scenario peggiore- eliminare `customisation.local` dunque tornare alle impostazioni predefinite contenute in `jail.conf`.

```shell
[sshd]
enabled = true
logpath = /var/log/auth.log*

[DEFAULT]

bantime = 600
findtime = 600
maxretry = 3
backend = auto
usedns = warn
```

### Attivare una jail per gli IP recidivi

Gli IP che sono presenti nel log di Fail2Ban come IP bannati saranno analizzati da un filtro di Fail2Ban stesso ed inseriti in una jail apposita. 

Nel mio caso, una volta che un IP viene bannato per tre volte - dunque quando è **recidivo**, il `bantime` invece di 600 secondi sale ad 864000 secondi (10 giorni).

File del filtro: `filter.d/recidive.conf`
```shell
# Fail2Ban filter for repeat bans
#
# This filter monitors the fail2ban log file, and enables you to add long 
# time bans for ip addresses that get banned by fail2ban multiple times.
#
# Reasons to use this: block very persistent attackers for a longer time, 
# stop receiving email notifications about the same attacker over and 
# over again.
#
# This jail is only useful if you set the 'findtime' and 'bantime' parameters 
# in jail.conf to a higher value than the other jails. Also, this jail has its
# drawbacks, namely in that it works only with iptables, or if you use a 
# different blocking mechanism for this jail versus others (e.g. hostsdeny 
# for most jails, and shorewall for this one).

[INCLUDES]

# Read common prefixes. If any customizations available -- read them from
# common.local
before = common.conf

[Definition]

_daemon = fail2ban\.actions\s*

# The name of the jail that this filter is used for. In jail.conf, name the 
# jail using this filter 'recidive', or change this line!
_jailname = recidive

failregex = ^(%(__prefix_line)s| %(_daemon)s%(__pid_re)s?:\s+)NOTICE\s+\[(?!%(_jailname)s\])(?:.*)\]\s+Ban\s+<HOST>\s*$

ignoreregex = 

[Init]

journalmatch = _SYSTEMD_UNIT=fail2ban.service PRIORITY=5

# Author: Tom Hendrikx, modifications by Amir Caspi 
```

Righe aggiunte per definire la jail, per esempio a `jail.d/my-jails.conf`
```ini
[recidive] # Nome della Jail
enabled = true
maxretry = 3
findtime = 86400
bantime = 864000
banaction = %(banaction_allports)s
action = telegram[name=RECIDIVO]
```


### Azione per inviare un messaggio Telegram quando un IP viene bannato


C'è anche un altro tipo di file interessante. che configura l'azione da prendere una volta bloccato l'IP. Questo file viene invocato con la riga `action` nei file della configurazione della jail, una volta che un IP viene rinchiuso nella jail. Con un file action ,ad esempio, posso farmi inviare un messaggio via Telegram quando un IP viene bloccato, oppure segnalare l'IP a Cloudflare. Questi file stanno in `action.d`. 

File: `action.d/telegram.conf`

```shell
[Definition]
chat_id = Find by sending message to @get_id_bot
token = Create new bot and get token by messaging @BotFather

actionstart = /usr/bin/curl -sSf -X POST https://api.telegram.org/bot%(token)s/sendMessage --data chat_id=%(chat_id)s --data text="[F2B] - Jail <name> avviata sul server."
actionstop  = /usr/bin/curl -sSf -X POST https://api.telegram.org/bot%(token)s/sendMessage --data chat_id=%(chat_id)s --data text="[F2B] - Jail <name> fermata sul server."
actioncheck =
actionban   = /usr/bin/curl -sSf -X POST https://api.telegram.org/bot%(token)s/sendMessage --data chat_id=%(chat_id)s --data text="[F2B] - <IP> appena bannato da Fail2ban dopo <failures> tentativi contro la jail <name> sul server."
actionunban = /usr/bin/curl -sSf -X POST https://api.telegram.org/bot%(token)s/sendMessage --data chat_id=%(chat_id)s --data text="[F2B] - <IP> appena sbannato dal server."

[Init]
init = "Fail2ban Telegram è attivo"
```

- `actionstart` quando una jail viene attivata 

Per esempio dopo `systemctl start fail2ban`

- `actionstop` quando una jail viene fermata

Per esempio dopo `systemctl stop fail2ban`

- `actionban` quando un IP viene bannato

Quando ha superato `maxretry` tentativi in `findtime` sarà bannato per `bantime`.

- `actionunban`

Quando un IP viene sbannato, dopo che è trascorso `bantime` dal momento in cui è stato bannato.

- `actioncheck` comando eseguito prima di qualsiasi azione.

---

Per attivare quest'azione, inserire la riga `action = telegram[nome-jail]` nel file di configurazione di una jail. 

Esempio in un potenziale file file `jails.conf`

```shell
[sshd]
enabled = true
action = telegram[name=SSHD]

[postfix]
enabled = true
action = telegram[name=POSTFIX]
```


---

Per questa azione si invoca curl ad inviare un messaggio POST all'API di Telegram per un BOT che dovrà inviare un messaggio diretto a noi, con chat_id. Questo metodo è stato brutalmente copiato (con un paio di semplificazioni al file dell'azione) da [Receive messages on Telegram from Fail2ban](https://illuad.fr/2020/10/28/receive-messages-on-telegram-from-fail2ban.html).

## Fonti

Manpages di Debian su Fail2Ban:
- [Fail2Ban](https://manpages.debian.org/testing/fail2ban)
- [Fail2Ban-regex](https://manpages.debian.org/testing/fail2ban/fail2ban-regex.1.en.html)
- [jail.conf](https://manpages.debian.org/testing/fail2ban/jail.conf.5.en.html#actioncheck)

Messaggio via Telegram quando IP bannati
- [Receive messages on Telegram from Fail2ban](https://illuad.fr/2020/10/28/receive-messages-on-telegram-from-fail2ban.html)
- [How Fail2Ban works (filter and jail configuration)](https://www.digitalocean.com/community/tutorials/how-fail2ban-works-to-protect-services-on-a-linux-server)


DigitalOcean su Fail2Ban

- [Fail2Ban on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-protect-an-nginx-server-with-fail2ban-on-ubuntu-14-04)

Altro

- [Fail2Ban 404](https://www.burlutsky.su/security/fail2ban-http-404-error-rules-for-web-frontends-nginx-haproxy-http/)

Altro, in Italiano:

- [Fail2Ban e Postfix](https://www.nickworlds.it/fail2ban-e-postfix/)



