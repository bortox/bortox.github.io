---
timeToRead: 3
authors:
- Andrea Bortolotti
title: Show page visitor count on Hugo static site with Congo theme and Goatcounter analytics
tags:
- goatcounter
- congo
- visitor count
- analytics
description: How to show page visitor count on a Hugo static site using the Congo theme and Goatcounter analytics API.
date: 2022-06-13T09:28:00.000+00:00
categories: ['tutorial', 'hugo']
---


In this tutorial I'll use the Goatcounter json api to get the current page views for each article in my hugo static site, and show views in the article meta, in this case next to the reading time, or just below, as you can see. It's like those old sites with a visit counter on the bottom.

<!--more-->

<div>Number of page views: <div id="stats"></div></div>
<script>
    var r = new XMLHttpRequest();
    r.addEventListener('load', function() {
        document.querySelector('#stats').innerText = JSON.parse(this.responseText).count_unique
    })
    r.open('GET', 'https://bortox.goatcounter.com/counter/' + encodeURIComponent(location.pathname) + '.json')
    r.send()
</script>

## The Goatcounter API

GoatCounter is one of the services I use to gather analytics about my website; the other is Matomo self-hosted. 

### Branded visitor counter

{{< alert circle-info >}}
To enable the visitor counter, open GoatCounter settings and check *Allow adding visitor counts on your website.*

More info on GoatCounter's [Documentation](https://bortox.goatcounter.com/help/visitor-counter)
{{< /alert >}}

On the free version you can add a - branded - visitor counter, in SVG/HTML/PNG format, but (in my opinion) it is ugly and needs extra **css code** to work with dark and light theme, instead of a simple text string, obtainable via the **json api**.

{{< highlight html>}}
<script>
    // Append to the <body>; can use a CSS selector to append somewhere else.
    window.goatcounter.visit_count({append: 'body'})
</script>
<script data-goatcounter="https://MYCODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
{{</ highlight >}}

### Visitor counter using JSON API

Another way is to use the JSON API and request how many pageviews -<span id="stats2"></span>- has this webpage by sending a GET request to `https://DOMAIN.goatcounter.com/counter/` + `page path` + `.json`.

<script>
    var r = new XMLHttpRequest();
    r.addEventListener('load', function() {
        document.querySelector('#stats2').innerText = JSON.parse(this.responseText).count_unique
    })
    r.open('GET', 'https://bortox.goatcounter.com/counter/' + encodeURIComponent(location.pathname) + '.json')
    r.send()
</script>
{{< highlight html >}}
<div>Number of visitors: <div id="stats"></div></div>
<script>
    var r = new XMLHttpRequest();
    r.addEventListener('load', function() {
        document.querySelector('#stats').innerText = JSON.parse(this.responseText).count_unique
    })
    r.open('GET', 'https://MYCODE.goatcounter.com/counter/' + encodeURIComponent(location.pathname) + '.json')
    r.send()
</script>
{{</ highlight >}}

## Process on this website

This **works**, but only in this page. If I have a list of pages in Hugo and want to get the visits for each of them, location.pathname will tell me the path of the **current** page, not of the pages **listed** on the current page. Some Hugo magic is needed to make it work also on **cateogry** and **tag** pages.

1) Edit `/layouts/partials/article-meta.html` to add partial `meta/visit-counter.html`
2) Write partial `meta/visit-counter.html`
3) Edit i18n files to add new titles (optional)

### Add visit-counter meta to article-meta

![Article meta](../article-meta.png "This is the article meta, containing page date, word count, reading time and visitor count.")


I copied the original `/layouts/partials/article-meta.html` file from the hugo Congo theme that I am using and added the following lines.

{{< highlight javascript >}}
{{ if and (.Params.showVisitCount | default (.Site.Params.article.showVisitCount | default true)) }}
{{ $meta.Add "partials" (slice (partial "meta/visit-counter.html" .)) }}
{{ end }}
{{</ highlight >}}

These lines basically read: 

* If the `showVisitCount` parameter is true, show the visit-counter.html partial and add it to $meta.

* If `showVisitCount` parameter is not listed, default the condition to true and add visit-counter.html partial to $meta.

I added the lines before the line with `showEdit` since I wanted the visit count before the button to edit the page on Github, like this (2115 visite means 2115 visits):

### Write article-meta.html

{{< highlight javascript>}}
<span id="{{ .File.UniqueID }}" title="{{ i18n "article.visit_title" }}">
    {{- "🙈" | markdownify | emojify -}}
</span>
<script>
    var r = new XMLHttpRequest();
    r.addEventListener('load', function() {
        document.getElementById('{{ .File.UniqueID }}').innerText = JSON.parse(this.responseText).count_unique + ' ' + {{ i18n "article.visit_name" }}
    })
    r.open('GET', 'https://bortox.goatcounter.com/counter/' + encodeURIComponent({{ .RelPermalink }}) + '.json')
    r.send()
</script>
{{- /* Trim EOF */ -}}
{{</ highlight >}}

Since this meta also apperead on category and tag pages, I couldn't use "stats" as the id of the text to be edited, the id **had to be unique** for each page.

So, I made use of Hugo's functionalities and set as id the {{ **.File.UniqueID** }} of every page, basically the MD5-checksum of the content file’s path. 

I used .**RelPermalink** (the relative permanent link for the page) of every page to build the request to Goatcounter API.

There is probably an easier way to do this with cleaner Javascript, if you have some ideas or have to point out that something is not correct, contact me at bortox at bortox dot it.
<sub>I will add soon commenting functionality, but not with Disqus.</sub>

### Translate related strings with i18n

So we have to translate the span title, which is basically the tooltip of the text, and the visit name. For example, if I have English language to set up, I'll edit `i18n/en.yaml` and add the following lines under the article section:

{{< highlight yaml>}}
article:
    visit_title: "Page views"
    visit_name: "visits"
{{</ highlight >}}
