---
title: Create a Discord Webhook and send messages with Python
description: How to create a Discord webhook with Python and send messages through it
published: true
date: 2021-10-16T14:47:00Z
tags:
- discord
- webhook
editor: markdown
categories: ['tutorial', 'python']
---


In this article I will expose the fastest method to create a Discord webhook, that is a link that can be used with Python to send messages in specific channels of a server. 

<!--more-->

![discord-webhook-python-guida.png](/blog/discord-webhook-python-guida.png)

## What is a Webhook?

Explained simply without using technical jargon, a webhook is a link from the web to Discord, i.e. an easy way to post messages to Discord from other apps, through the magic of the internet!

## Let's create our first Webhook!

To create a Webhook just open Discord, go into the settings of a channel of your choice, and then click on *Create Webhook*.

![Create a webhook](/blog/creare-webhook.png)

Let's start with the **customization** of the bot's avatar, that is the one that will have all the messages sent by this webhook on Discord, so let's change **name** and **image**.

![Message sent with a webhook](/blog/inviare-messaggio-webhook.png)

In the example above,result of how I customized my first Webhook, the name &egrave; **Classviva Tasks** and the logo &egrave; that of **Classviva**, like the unofficial bot of the same name on Telegram, @ClasseVivaIT\_Bot.

### Send a message with Python through the Discord webhook

Python is one of the easiest programming languages to use, and the ability to install modules written by others makes it even easier.

```python
from discord_webhook import DiscordWebhook
message = 'Test Webhook'
url = 'urlwebho.ok'
webhook = DiscordWebhook(url=url, content=message)
response = webhook.execute()
```

Just install discord_webhook with `pip3 install discord_webhook` and run in only two lines the code to send a message!

```python
from discord_webhook import DiscordWebhook
DiscordWebhook(url='myurl', content='message').execute()
```

Well, this is &egrave; the tutorial on how to write in the fastest way a Discord Webhook with Python. 