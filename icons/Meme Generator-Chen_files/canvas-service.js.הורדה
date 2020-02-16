'use strict'
let gTxts = []
let gCurrTxtIdx = 0;
let gId = 0
let gimgId = 0
let gTouchedIdx;
let gEmojies = createEmojies()
var gEmojiesRange = 0
var gNumOfEmogies = 5


const gDefaultFontSize = 42;
const gDefaultFont = 'impact'
const gDefaultColor = document.getElementById("fill-color").value
const gDefaultStrokeColor = 'black'

function createTxts() {
    //top txt
    gTxts.push(creteTxt(canvas.width / 10, canvas.height / 7))
    // bottom txt
    gTxts.push(creteTxt(canvas.width / 10, canvas.height - 30))
}

function createEmoji(x, y, val) {
    return {
        x: x,
        y: y,
        val: val,
        size: gDefaultFontSize
    }
}
function creteTxt(x, y, txt = 'New Line', size = gDefaultFontSize, font = gDefaultFont, align = 'left', width = 0, color = gDefaultColor, strokeColor = gDefaultStrokeColor) {
    return {
        x: x,
        y: y,
        id: gId++,
        txt: txt,
        size: size,
        font: font,
        width: width,
        align: align,
        color: color,
        strokeColor: strokeColor,
        onEditor: false

    }
}

//get img url from local storage
function getImgUrl() {
    return loadFromStorage('img')
}
function getTxts() {
    return gTxts
}
function getTouchedIdx() {
    return gTouchedIdx
}

function findCurrTxtIdx(id) {
    return gTxts.findIndex(txt => {
        return txt.id === id
    })
}

function findCurrTxt(id) {
    return gTxts.find(txt => {
        return txt.id === id
    })
}

function getCurrTxt() {
    return gTxts[gCurrTxtIdx]
}

function changeFont(currFont) {
    gTxts[gCurrTxtIdx].font = currFont
}

function changeSize(diff) {
    gTxts[gCurrTxtIdx].size += diff
}

function changeColor(currColor) {
    gTxts[gCurrTxtIdx].color = currColor
}

function changeStrokeColor(strokeColor) {
    gTxts[gCurrTxtIdx].strokeColor = strokeColor
}

function changeText(txtVal) {
    gTxts[gCurrTxtIdx].txt = txtVal

}

//when click on delete
function deleteOneChar() {
    gTxts[gCurrTxtIdx].txt = gElTextArea.value
    //after the textarea value change its call the function onChangeTxt()
}

function deleteTxt() {
    gTxts.splice(gCurrTxtIdx, 1)
    gCurrTxtIdx = 0
}

//add txt to the gTxt
function addTxt() {
    gTxts.push(creteTxt(canvas.width / 10, canvas.height / 2))
    gCurrTxtIdx = gTxts.length - 1
}

function addEmoji(val) {
    gTxts.push(creteTxt(canvas.width / 10, canvas.height / 2, val))
    gCurrTxtIdx = gTxts.length - 1
}

function findTouchedTxt(offsetX, offsetY) {
    let factor = 5
    const clickedTxt = gTxts.find(txt => {
        return (
            offsetX - factor >= txt.x
            && offsetX <= txt.x + txt.width
            && offsetY <= txt.y
            && offsetY >= txt.y - (+txt.size)
        )
    })
    if (clickedTxt) {
        gTouchedIdx = findCurrTxtIdx(clickedTxt.id)
        gCurrTxtIdx = findCurrTxtIdx(clickedTxt.id)
    }
    return clickedTxt
}

function updateXY(offsetX, offsetY) {
    gTxts[gTouchedIdx].x = offsetX
    gTxts[gTouchedIdx].y = offsetY
}

function cleareTouchedIdx() {
    gTouchedIdx = null
}
function createEmojies() {
    return ['🎉', '💯', '😂', '🐶', '🌸', '🎸', '🔍', '💖️', '🎀']
}
function changeEmojiesRange(diff) {
    if (gEmojiesRange === 0 && diff < 0) return
    if (gEmojiesRange === gEmojies.length - gNumOfEmogies && diff > 0) return
    gEmojiesRange += diff
}
function getEmogiesToShow() {
    var emogiesToShow = gEmojies.slice(gEmojiesRange, gNumOfEmogies + gEmojiesRange)
    return emogiesToShow
}
