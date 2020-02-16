'use strict'

let canvas;
let ctx;
let elCanvasContainer;
let gElTextArea;
let elImg;
let canvasWidth;
let canvasHeight;

function onInit() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')
    elImg = document.querySelector('#img-id')
    gElTextArea = document.querySelector('#text-position')
    renderEmoji()
    getAndCreateImg()
    //when elImg is load we create the canvas 
    elImg.onload = () => {
        resetCanvas()
        drawImg()
        createTxts()
        drawText()
        changeTextArea()

    }

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
function resetCanvas() {

    elCanvasContainer = document.querySelector('.canvas-container')
    let containerWidth = elCanvasContainer.offsetWidth
    let containerHeight = elCanvasContainer.offsetHeight
    let imagAspectRatio = elImg.height / elImg.width
    if (imagAspectRatio >= 1) {
        canvas.height = containerHeight
        canvas.width = (1 / imagAspectRatio) * canvas.height
    } else {
        canvas.width = containerWidth
        canvas.height = canvas.width * imagAspectRatio
    }
}


//when select txt
function onChangeTxtIdx(txtIdx) {
    changeEditorElements()
    changeTextArea()
}

function markLine() {
    drawText()
    var txt = getCurrTxt()
    ctx.rect(txt.x, txt.y - txt.size, txt.width, (+txt.size))
    ctx.stroke()

}

//change the value of the buttons/selects by the curr txt
function changeEditorElements() {
    let txt = getCurrTxt()
    document.getElementById("select-font").value = txt.font
    document.getElementById("fill-color").value = txt.color
}

//change the txt area to look like the txt
function changeTextArea() {
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
    changeTextArea()
    drawText()
}

//when click to change the font-size
function onSelectSize(diff) {
    changeSize(diff)
    changeTextArea()
    drawText()
}

//when click to change the color
function onChangeColor(currColor) {
    changeColor(currColor)
    changeTextArea()
    drawText()
}

function onCangeStrokeColor(strokeColor) {
    changeStrokeColor(strokeColor)
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
    drawImg()
    getTxts().forEach((txt, idx) => {
        let currFont = txt.size + 'px ' + txt.font
        ctx.font = currFont
        ctx.fillStyle = txt.color
        ctx.strokeStyle = txt.strokeColor
        // ctx.textAlign = txt.align
        // ctx.textAlign = 'center'
        ctx.fillText(txt.txt, txt.x, txt.y)
        ctx.strokeText(txt.txt, txt.x, txt.y)
        // for moves the words
        let metrics = ctx.measureText(txt.txt)
        txt.width = Math.ceil(metrics.width)
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
    onChangeTxtIdx()
    drawText()
}

// clear the canves
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//when click to add txt
function onAddTxt() {
    addTxt()
    onChangeTxtIdx()
    drawText()
}

function onPutImoji(val) {
    console.log('emoji')
    addEmoji(val)
    onChangeTxtIdx()
    drawText()
}
//onmousedown 
function onFindTouchedTxt(ev) {
    ev.preventDefault()
    let mousePos = findMousePose(ev)
    var TouchedTxt = findTouchedTxt(mousePos.x, mousePos.y)
    if (TouchedTxt) {
        onChangeTxtIdx(getTouchedIdx())
    }
}

function findMousePose(ev) {
    let mouseX = ev.offsetX;
    let mouseY = ev.offsetY;
    let mousePose = {
        x: mouseX,
        y: mouseY
    }
    return mousePose
}
//onmousemove
function onMoveTouchedTxt(ev) {
    ev.preventDefault()
    let mousePos = findMousePose(ev)
    if (getTouchedIdx() || getTouchedIdx() === 0) {
        updateXY(mousePos.x, mousePos.y)
        drawText()
    }
}

//onmouseup
function onStopMovingMem() {
    cleareTouchedIdx()
}

function onscroll(ev) {
    event.preventDefault
}

function renderEmoji() {
    var elEmogiContainer = document.querySelector('.emoji-container')
    var emojies = getEmogiesToShow()
    console.log(emojies)
    var from = 0
    var strHtml = ''
    strHtml += `<img src="./icons/left-arrow.png" onclick="renderMoreEmoji(-1)">`
    for (var i = from; i < 5; i++) {
        strHtml +=`<div class="emoji" onclick="onPutImoji('${emojies[i]}')">${emojies[i]}</div>`
    }
    strHtml += `<img src="./icons/right-arrow.png" onclick="renderMoreEmoji(1)">`
    elEmogiContainer.innerHTML = strHtml
}

function renderMoreEmoji(diff) {
    console.log(diff)
    changeEmojiesRange(diff)
    renderEmoji()
}
