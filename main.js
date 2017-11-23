var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

//设置canvas宽高
autoSetCancasSize(canvas)

//监听用户动作
listenUser(canvas)

//橡皮擦
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}


//工具函数
var drawLine = function (x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
var drawPoint = function (x,y,radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI*2)
    context.fill()
}

function autoSetCancasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenUser(canvas) {
    if(document.body.ontouchstart!==undefined){
        canvas.ontouchstart = function (xxx) {
            var x = xxx.touches[0].clientX
            var y = xxx.touches[0].clientY
            using = true
            drawPoint(x,y,3)
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = {x: x, y: y}
            }
        }
        canvas.ontouchmove = function (xxx) {
            var x = xxx.touches[0].clientX
            var y = xxx.touches[0].clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                } else {
                    var newPoint = {x: x, y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    }else{
        var using = false
        var lastPoint = {x: undefined, y: undefined}

        canvas.onmousedown = function (xxx) {
            var x = xxx.clientX
            var y = xxx.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = {x: x, y: y}
            }
        }
        canvas.onmousemove = function (xxx) {
            var x = xxx.clientX
            var y = xxx.clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                } else {
                    var newPoint = {x: x, y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function () {
            using = false
        }
    }
}