// Inizializzazione Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'it',
        includedLanguages: 'it,en',
        autoDisplay: false
    }, 'google_translate_element');
}

function toggleLanguage() {
    var checkBox = document.getElementById("lang-toggle");
    var lang = checkBox.checked ? 'en' : 'it';

    // Funzione interna per tentare la traduzione
    function applyTranslation() {
        var selectField = document.querySelector(".goog-te-combo");
        if (selectField) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        } else {
            // Se Google non è pronto, riprova tra 200ms
            setTimeout(applyTranslation, 200);
        }
    }

    applyTranslation();
}

// hamburger menu toggle
function toggleMenu() {
    const ul = document.querySelector('.nav-container ul');
    const btn = document.querySelector('.hamburger');
    if (ul) ul.classList.toggle('open');
    if (btn) {
        btn.classList.toggle('open');
        // aria-expanded per accessibilità
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
    }
}

// chiude il menu se si clicca fuori (mobile)
document.addEventListener('click', function (e) {
    const btn = document.querySelector('.hamburger');
    const ul = document.querySelector('.nav-container ul');
    if (!btn || !ul) return;
    if (!btn.contains(e.target) && !ul.contains(e.target)) {
        if (ul.classList.contains('open')) {
            ul.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    }
});

// Forza lo switch a "OFF" (Italiano) quando ricarichi la pagina
window.addEventListener('load', function () {
    var checkBox = document.getElementById("lang-toggle");
    if (checkBox) checkBox.checked = false;
});

// --- FIX DEFINITIVO ANTI-BARRA ---
(function () {
    function killGoogleBar() {
        // 1. Forza il body e l'html in cima
        document.documentElement.style.paddingTop = '0px';
        document.body.style.top = '0px';
        document.body.style.position = 'static';

        // 2. Nasconde l'iframe della barra se esiste
        var googleBar = document.querySelector(".goog-te-banner-frame");
        if (googleBar) {
            googleBar.style.display = "none";
            googleBar.style.visibility = "hidden";
        }
    }

    // Crea un "osservatore" che controlla ogni micro-cambiamento del sito
    var observer = new MutationObserver(function (mutations) {
        killGoogleBar();
    });

    // Inizia a osservare l'intero documento
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Controllo di sicurezza ogni 100ms
    setInterval(killGoogleBar, 100);
})();