'use strict'

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d')
const gElTextArea = document.querySelector('#text-position')

let elImg = document.querySelector('#img-id')
const elCanvasContainer = document.querySelector('.canvas-container')

let canvasWidth;
let canvasHeight;

function onInit() {
    getAndCreateImg()
    //when elImg is load we create the canvas 
    elImg.onload = () => {
        createCanvas()
        drawImg()
        createTxts()
    }
    // addEventListener('touchstart', function(e) {
    //     console.log('touch')
    //     e.preventDefault();
    // });
}

function getAndCreateImg() {
    // get img url from local storage
    if (getImgUrl()) {
        let imgUrl = getImgUrl()
        //create element with img (display:none)
        elImg.src = imgUrl
    } else {
        alert('You did not pick an image you will be to redirect to gallery. if it is a mistake please report admin on about.html page')
        setTimeout(window.location.assign("index.html"), 3000)
    }
}

//updating the width and height of the canvas
function createCanvas() {
    var aspectRatio = document.querySelector('#img-id').width / document.querySelector('#img-id').height
    // canvasWidth = Math.min(vw(), document.querySelector('#img-id').naturalWidth)
    // canvasHeight = Math.min(vh(), document.querySelector('#img-id').naturalHeight) - 20;
    canvas.height = canvas.width * aspectRatio
    canvas.width = canvas.height * aspectRatio
    // elCanvasContainer.height = canvas.height
    // elCanvasContainer.width = canvas.width

}

//when select txt
function onChangeTxtIdx() {
    let txtIdx = document.querySelector('#line-choose').value
    changeGcurrTxtIdx(txtIdx)
    // gcurrTxtIdx = +txtIdx
    changeEditorElements()
    changeTextArea()
}

//change the value of the buttons/selects by the curr txt
function changeEditorElements() {
    // let txt = gTxts[gcurrTxtIdx]
    let txt = getCurrTxt()
    document.getElementById("size").innerHTML = txt.size
    document.getElementById("select-font").value = txt.font
    document.getElementById("fill-color").value = txt.color
}

//change the txt area to look like the txt
function changeTextArea() {
    // let txt = gTxts[gcurrTxtIdx]
    let txt = getCurrTxt()
    gElTextArea.value = txt.txt
    gElTextArea.style = `color:${txt.color}; font-family:${txt.font};`
}

//draw the img on the canvas
function drawImg() {
    ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
}

//when click to change the font
function onChangeFont(currFont) {
    changeFont(currFont)
    // gTxts[gcurrTxtIdx].font = currFont
    changeTextArea()
    drawText()
}

//when click to change the font-size
function onSelectSize(currSize) {
    document.getElementById("size").innerHTML = currSize
    changeSize(currSize)
    changeTextArea()
    drawText()
}

//when click to change the color
function onChangeColor(currColor) {
    changeColor(currColor)
    changeTextArea()
    drawText()
}

//when change the text
function onChangeTxt(el) {
    let txtVal = el.value
    changeText(txtVal)
    drawText()
    ctx.save()
}

function drawText() {
    clearCanvas()
    getTxts().forEach(txt => {
        let currFont = txt.size + 'px ' + txt.font
        ctx.font = currFont
        ctx.fillStyle = txt.color
        ctx.strokeStyle = '#000000'
        // ctx.textAlign = txt.align
        ctx.fillText(txt.txt, txt.x, txt.y)
        ctx.strokeText(txt.txt, txt.x, txt.y)
        // for moves the words
        let metrics = ctx.measureText(txt.txt)
        txt.width = Math.ceil(metrics.width)
    })
    getStickers().forEach(s => {
        onPutSticker(s.el)
    })
}

function onDeleteChar(event) {
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 8:
            deleteOneChar()
            break;
        case 46:
            deleteOneChar()
            break;
        default:
            break;
    }
}

//when delete the text - reset the text
function onDeleteTxt() {
    //delete in the service
    deleteTxt()
    changeTextArea()
    changeEditorElements()
    drawText()
}

// clear the canves
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawImg()
}

//when click to add txt
function onAddTxt() {
    addTxt()
    //add option in the select
    let currSelectors = document.querySelector('#line-choose').innerHTML
    let HTMLSelectors = `<option value="${gTxts.length - 1}"> ${gTxts.length}</option>`
    let elSelcetMem = document.querySelector('#line-choose')
    elSelcetMem.innerHTML = currSelectors + HTMLSelectors
}

//onmousedown 
function onFindTouchedTxt(ev) {
    ev.preventDefault()
    // event.preventDefault()
    console.log('chen')
    const { offsetX, offsetY } = ev
    findTouchedTxtId(offsetX, offsetY)
}

//onmousemove
function onMoveTouchedTxt(ev) {
    ev.preventDefault()
        // console.log('chen2')
    const { offsetX, offsetY } = ev
    if (getTouchedIdx() || getTouchedIdx() === 0) {
        updateXY(offsetX, offsetY)
        drawText()
    }
}

//onmouseup
function onStopMovingMem() {
    // console.log('chen3')
    cleareTouchedIdx()
}

function onscroll(ev) {
    event.preventDefault
}

function onPutImoji(val) {
    ctx.fillText(val, canvas.width / 2, canvas.height / 2)
    ctx.font = '120px'
}

function onPutSticker(el) {
    addSticker(el)
    ctx.drawImage(el, canvas.height / 3, canvas.height / 3, canvas.height / 3, canvas.height / 3)
}
