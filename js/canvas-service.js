'use strict'
let gTxts = []
let gcurrTxtIdx = 0;
let gId = 0
let gimgId = 0
let gTouchedIdx;
let gStickers = []

const gDefaultFontSize = '36';
const gDefaultFont = 'impact'
const gDefaultColor = document.getElementById("fill-color").value

function createTxts() {
    //top txt
    gTxts.push(creteTxt(canvas.width / 10, canvas.height / 7))
    // bottom txt
    gTxts.push(creteTxt(canvas.width / 10, canvas.height - 30))
}

function creteTxt(x, y, txt = '', size = gDefaultFontSize, font = gDefaultFont, align = 'left', width = 0, color = gDefaultColor) {
    return {
        x: x,
        y: y,
        id: gId++,
        txt: txt,
        size: size,
        font: font,
        width: width,
        align: align,
        color: color
    }
}

//get img url from local storage
function getImgUrl() {
    return loadFromStorage('img')
}
function getTxts() {
    return gTxts
}
function getTouchedIdx(){
    return gTouchedIdx
}

function getStickers() {
    return gStickers
}

function changeGcurrTxtIdx(txtIdx) {
    gcurrTxtIdx = +txtIdx
}
function getGcurrTxtIdx() {
    return gcurrTxtIdx
}

function getCurrTxt() {
    return gTxts[gcurrTxtIdx]
}

function changeFont(currFont) {
    gTxts[gcurrTxtIdx].font = currFont
}

function changeSize(currSize) {
    gTxts[gcurrTxtIdx].size = currSize
    // gTxts[gcurrTextIdx].y += currSize
}

function changeColor(currColor) {
    gTxts[gcurrTxtIdx].color = currColor
}

function changeText(txtVal) {
    gTxts[gcurrTxtIdx].txt = txtVal

}

//when click on delete
function deleteOneChar() {
    gTxts[gcurrTxtIdx].txt = gElTextArea.value
    //after the textarea value change its call the function onChangeTxt()
}

function deleteTxt() {
    let txt = gTxts[gcurrTxtIdx]
    txt.txt = ''
    txt.size = gDefaultFontSize
    txt.color = gDefaultColor
    txt.font = gDefaultFont
}

//add txt to the gTxt
function addTxt() {
    gTxts.push(creteTxt(canvasWidth / 10, canvasHeight / 2))
}

function addSticker(el) {
    gStickers.push({ el: el, imgId:gimgId++ , x:canvas.height/3 , y:canvas.height/3 })
}

function findTouchedTxtId(offsetX, offsetY) {
    // console.log('in chen entered')
    let factor = 5
    const clickedTxt = gTxts.find(txt => {
        // console.log('txt', txt)
        // console.log('offsetX, offsetY', offsetX, offsetY)
        return (
            offsetX - factor >= txt.x && offsetX <= txt.x + txt.width
            &&
            offsetY <= txt.y && offsetY >= txt.y - (+txt.size)
        )
    })
    // console.log('click oof', clickedTxt)
    if (clickedTxt) {
        // console.log('in chen found txt')
        gTouchedIdx = clickedTxt.id
    }
   
}

function updateXY(offsetX, offsetY) {
    console.log('update x y')
    gTxts[gTouchedIdx].x = offsetX
    gTxts[gTouchedIdx].y = offsetY
}

function cleareTouchedIdx() {
    gTouchedIdx = null
}