
function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

var gTrans = {
    title: {
        en: ' Meme Creator',
        he: 'עורך ממים'
    },
    searching: {
        en: 'filter by keywords',
        he: 'חיפוש על ידי מילות מפתח'
    },
    search: {
        en: 'search',
        he: 'חיפוש'
    },
    chen: {
        en: 'Chen Mordechai',
        he: 'חן מרדכי'
    },
    'load-80s': {
        en: ` load "The Years of 80's" `,
        he: 'טען את שנות ה-80'
    },
    niv: {
        en: 'Niv Bakelmane',
        he: 'ניב בקלמן'
    },
    // 'lorem-niv': {
    //     en: 'language',
    //     he: 'שפה'
    // },
    contact: {
        en: 'Get in touch',
        he: 'צור  קשר'
    },
    'p-contact': {
        en: 'In order to get in touch use the contactform below',
        he: 'כדי לשמור על קשר מלא את הטופס למטה'
    },
    mail: {
        en: 'Your E-mail',
        he: 'האימייל שלך'
    },
    sub: {
        en: 'Subject',
        he: 'נושא'
    },
    msg: {
        en: 'Message body',
        he: 'גוף ההודעה'
    },
    happy: {
        en: 'happy',
        he: 'שמח'
    }, man: {
        en: 'man',
        he: 'איש'
    }, woman: {
        en: 'woman',
        he: 'אישה'
    }, angry: {
        en: 'angry',
        he: 'כועס'
    }, child: {
        en: 'child',
        he: 'ילד'
    },



}
