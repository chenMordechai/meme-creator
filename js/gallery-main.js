'use strict'

function init() {
    let imgs = getImgs()
    renderImgs(imgs)
    renderKeyWords()
}

//i18
function onSelectLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}

//submit contact form
function onSubmit() {
    let subject = document.querySelector('.input-subject').value
    let message = document.querySelector('.input-text').value
    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chen100030@gmail.com.com&su=${subject}&body=${message}&.com&tf=1`)

}

//when click on the tag - load the 80s imegs
function onLoadTag(folder) {
    folder = folder.dataset.loc
    let imgs = loadTag({ folder: folder, keywords: ['The 80s TV', '80s'] })
    //render the 80s imegs
    renderImgs(imgs)
    // renderKeyWord()
}

// filter with enter
function checkEnter(ev) {
    if (event.keyCode === 13) onSearch()
}

//when click on search
function onSearch() {
    let elSearch = document.querySelector('.search')
    let keyword = elSearch.value.toLowerCase()
    //update the object
    updateGkeywords(keyword)
    //render the new keywords
    renderKeyWords()
    //render the fultered imgs
    renderImgs(searchByKeyword(keyword))
}

//when click on keyWord
function onSearchByKeywords(keyword) {
    updateGkeywords(keyword)
    renderKeyWords()
    renderImgs(searchByKeyword(keyword))
}

//render the gallery
function renderImgs(imgs) {
    let htmlImg = imgs.map(img => {
        return `<div class="img-${img.id}">
        <img onclick="onImgClicked('${img.url}')" src="img/${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}

//when click on img
function onImgClicked(imgUrl) {
    let imgBigUrl = `img/${imgUrl}`
    //save the img url in local storage
    imgClicked(imgBigUrl)
    //go to th editor
    window.location.replace("editor.html")
}

//render the key words
function renderKeyWords() {
    var strHtml = ''
    //get key words from local storage
    var keywords = getKeyWords()
    for (var keyword in keywords) {
        var fontSize = 15 + keywords[keyword] * 2
        strHtml += `<div onclick="onSearchByKeywords('${keyword}')" data-trans="${keyword}" style="font-size: ${fontSize}px" class="keyword ${keyword}">${keyword}</div>`
    }
    document.querySelector('.keyword-search').innerHTML = strHtml
}


