'use strict'
let gCurrLang = 'en'

let gKeywords = {
    'happy': 12,
    'man': 1,
    'woman': 3,
    'angry': 8,
    'child': 5
}

let gImgs = [{
    id: 1,
    url: 'big/19.jpg',
    keywords: ['man', 'angry']
}, {
    id: 2,
    url: 'big/2.jpg',
    keywords: ['woman', 'happy']
}, {
    id: 3,
    url: 'big/5.jpg',
    keywords: ['child']
}, {
    id: 4,
    url: 'big/8.jpg',
    keywords: ['happy', 'man']
}, {
    id: 5,
    url: 'big/9.jpg',
    keywords: ['happy', 'child']
}, {
    id: 6,
    url: 'big/12.jpg',
    keywords: ['man']
}, {
    id: 7,
    url: 'big/003.jpg',
    keywords: ['man', 'angry']
}, {
    id: 8,
    url: 'big/004.jpg',
    keywords: ['happy', 'dog']
}, {
    id: 9,
    url: 'big/005.jpg',
    keywords: ['dog', 'child']
}, {
    id: 10,
    url: 'big/006.jpg',
    keywords: ['cat']
}, {
    id: 11,
    url: 'big/img5.jpg',
    keywords: ['child', 'happy']
}, {
    id: 12,
    url: 'big/leo.jpg',
    keywords: ['man', 'happy']
}];


//save the img url in local storage
function imgClicked(imgBigUrl){
    saveToStorage('img', imgBigUrl)
}


//get key words from local storage
function getKeyWords(){
    return loadFromStorage('gKeywords')
}

//update the times that search keyWord
function updateGkeywords(keyword) {
    for (var currKeyword in gKeywords) {
        var keywordCount = gKeywords[currKeyword]
        if (currKeyword === keyword) {
            keywordCount++
            gKeywords[keyword] = keywordCount

        } else if (!gKeywords[keyword]) {
            gKeywords[keyword] = 1
        }
    }
    saveToStorage('gKeywords', gKeywords)
}

//get imgs
function getImgs() {
    return gImgs
}

//filter the imges by keyword
function searchByKeyword(keyword) {
    // let imgs = getImgs()
    const result = gImgs.filter((word) => {
        return (word.keywords.indexOf(keyword) !== -1);
    });
    return result
}

// load the 80s imgs
function loadTag(loadData) {
    const { folder, keywords } = loadData
    //change the global imgs to the 80s imgs
    gImgs = []
    // HERE WE CAN DEFINE THE IMG COUNT OF ANY FOLDER
    if (folder === '80') { var count = 7 }
    count++
    for ( count > 1 ; --count ;) {
        let id = count
        //make the url for the imgs
        let url = folder + '/' + folder + '-0' + id + '.jpeg'
        gImgs.push(createImg(id, url, keywords))
    }
    return gImgs
}

function createImg(id, url, keywords) {
    return {
        id: id++,
        url: url,
        keywords: keywords
    }
}