function run_share(titolo,descrizione,permalink,testocondividi) {
    var n = document.createElement("share-menu");
    n.setAttribute("title",titolo);
    n.setAttribute("text", descrizione);
    n.setAttribute("url", permalink);
    n.setAttribute("dialog-title", testocondividi);
    n.setAttribute("id", "shareMenu");
    document.body.appendChild(n);
    shareMenu.share();
    _paq.push(['trackEvent', 'Share', 'Share webpage', '{{ .Title }}']);
    window.goatcounter.count({
        path: 'share',
        title: 'Share menu',
        event: true,
    });
}

function condividipagina(titolo, descrizione, permalink, testocondividi) {
    if (document.contains(document.getElementById("shareMenu"))) {
        document.getElementById("shareMenu").remove();
    }
    if (document.contains(document.getElementById("share-script"))) {
        run_share(titolo, descrizione, permalink, testocondividi);
    }   else {
        var share_script = document.createElement('script');
        share_script.type = 'module';
        share_script.id = 'share-script'
        share_script.src = 'https://bortox.it/Compiti-scolastici/js/share-menu.min.js';
        document.body.appendChild(share_script);
        share_script.addEventListener('load', run_share(titolo, descrizione, permalink, testocondividi)
    }
    
}