var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 5
//设置canvas宽高
autoSetCancasSize(canvas)

//监听用户动作
listenUser(canvas)

//橡皮擦
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

//清除
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//保存
download.onclick = function () {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的图画'
    a.click()
}

//画笔颜色
black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
}
//画笔大小
thin.onclick = function () {
    lineWidth = 5
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 8
    thick.classList.add('active')
    thin.classList.remove('active')
}


//工具函数
var drawLine = function (x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
var drawPoint = function (x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
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
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (xxx) {
            var x = xxx.touches[0].clientX
            var y = xxx.touches[0].clientY
            using = true
            drawPoint(x, y, lineWidth / 2)
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
    } else {
        var using = false
        var lastPoint = {x: undefined, y: undefined}

        canvas.onmousedown = function (xxx) {
            var x = xxx.clientX
            var y = xxx.clientY
            using = true
            drawPoint(x, y, lineWidth / 2)
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