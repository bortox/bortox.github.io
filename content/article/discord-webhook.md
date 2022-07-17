---
title: Creare un Discord Webhook ed inviare messaggi con Python
description: 
published: true
date: 2021-10-16T14:47:00Z
tags:
- discord
- webhook
editor: markdown
categories: ['tutorial', 'python']
---

In questo articolo esporrò il metodo più veloce per creare uno webhook Discord, ossia un collegamento da sfruttare con Python per inviare messaggi in canali specifici di un server. 

<!--more-->

![discord-webhook-python-guida.png](/blog/discord-webhook-python-guida.png)

## Cos'&egrave; un Webhook?

Spiegato semplicemente senza utilizzare lessico tecnico, uno webhook &egrave; un collegamento dal web a Discord, ossia un modo semplice per pubblicare messaggi su Discord da altre app, attraverso la magia di internet\!

## Creiamo il nostro primo Webhook\!

Per creare uno Webhook basta aprire Discord, andare nelle impostazioni di un canale a scelta, e successivamente cliccare su *Creare Webhook*.

![Creare uno webhook](/blog/creare-webhook.png)

Iniziamo con la **personalizzazione** dell'avatar del BOT, ossia quello che avranno tutti i messaggi inviati da questo webhook su Discord, quindi cambiamo **nome** ed **immagine**.

![Messaggio inviato con uno webhook](/blog/inviare-messaggio-webhook.png)

Nell'esempio soprastante,risultato di come ho personalizzato il mio primo Webhook, il nome &egrave; **Compiti Classeviva** ed il logo &egrave; quello di **Classeviva**, come l'omonimo bot non ufficiale su Telegram, @ClasseVivaIT\_Bot.

### Inviare un messaggio con Python attraverso lo Webhook Discord

Python &egrave; uno dei linguaggi di programmazione pi&ugrave; semplici da utilizzare, inoltre la possibilit&agrave; di installare moduli scritti da altri semplifica il tutto ancora di pi&ugrave;.

```python
from discord_webhook import DiscordWebhook
messaggio = 'Prova Webhook'
url = 'urlwebho.ok'
webhook = DiscordWebhook(url=url, content=messaggio)
response = webhook.execute()
```

Basta installare discord\_webhook con `pip3 install discord_webhook` ed eseguire in solo due righe il codice per inviare un messaggio\!

```python
from discord_webhook import DiscordWebhook
DiscordWebhook(url='myurl', content='messaggio').execute()
```

Beh, questo &egrave; il tutorial su come scrivere nel modo più veloce un Discord Webhook con Python. 