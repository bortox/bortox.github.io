function run_share(evt) {
    var n = document.createElement("share-menu");
    n.setAttribute("title",evt.currentTarget.titolo);
    n.setAttribute("text", evt.currentTarget.descrizione);
    n.setAttribute("url", evt.currentTarget.permalink);
    n.setAttribute("dialog-title", evt.currentTarget.testocondividi);
    n.setAttribute("id", "shareMenu");
    document.body.appendChild(n);
    shareMenu.share();
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
        document.getElementById("share-script").remove()
    }
    var share_script = document.createElement('script');
    share_script.type = 'module';
    share_script.id = 'share-script'
    share_script.src = 'https://bortox.it/Compiti-scolastici/js/share-menu.min.js';
    share_script.titolo = titolo
    share_script.descrizione = descrizione
    share_script.permalink = permalink
    share_script.testocondividi = testocondividi
    document.body.appendChild(share_script);
    share_script.addEventListener('load', run_share, false);
}

const btns = document.querySelectorAll('button[class^=sharebtn]')

btns.forEach(btn => {
   btn.addEventListener('click', event => {
        condividipagina( event.currentTarget.getAttribute('share_title'), event.currentTarget.getAttribute('share_description'), event.currentTarget.getAttribute('share_permalink'), event.currentTarget.getAttribute('share_dialogue') );
   });
});
