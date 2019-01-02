var canvasDemo = document.getElementById('canvasDemo');
var context = canvasDemo.getContext('2d');
var lineWidth = 5;
autoCanvasSize(canvasDemo);
listenToUser(canvasDemo);
function listenToUser(canvas) {

  var using = false;
  var lastPoint = { x: undefined, y: undefined }
  //特性检测 是否能够支持这个特性!
  if (document.body.ontouchstart !== undefined) {
    //触屏设备 
    canvas.ontouchstart = function (aaa) {
      console.log("start touch me !");
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      console.log(x, y);
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = { x: x, y: y }
      }
    }

    canvas.ontouchmove = function (aaa) {
      console.log("start touch move !");
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      console.log(x, y);
      if (!using) { return; }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    }

    canvas.ontouchend = function () {
      console.log('touch end!');
      using = false;
    }
  } else {
    //非触屏设备
    //当canvasDemo鼠标按下的时候 调用的方法!
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = { x: x, y: y }
      }
    }

    //当canvasDemo鼠标移动的时候 调用的方法!
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      if (!using) { return; }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }

    }

    //当canvasDemo鼠标松开的时候 调用的方法!
    canvas.onmouseup = function (aaa) {
      using = false;
    }
  }

}



function autoCanvasSize(canvas) {
  // canvas 布局宽高适应! 
  setCanvasSize();
  window.onresize = function () {
    setCanvasSize();
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
//画圆
function drwaCicle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}


//画线
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.lineWidth = lineWidth;
  context.fillStyle = 'black';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

var eraserEnabled = false;
pen.onclick = function () {
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function () {
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
}
//设置 填充色和描边色 还有设置当前值的时候将其余的两种颜色的擦老实说List删除
red.onclick = function () {
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  red.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  black.classList.remove('active');
}
//设置 填充色和描边色 还有设置当前值的时候将其余的两种颜色的擦老实说List删除
green.onclick = function () {
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
  green.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');
  black.classList.remove('active');
}
//设置 填充色和描边色 还有设置当前值的时候将其余的两种颜色的擦老实说List删除
blue.onclick = function () {
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
  blue.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  black.classList.remove('active');
}
//设置 填充色和描边色 还有设置当前值的时候将其余的两种颜色的擦老实说List删除
black.onclick = function () {
  context.fillStyle = 'black';
  context.strokeStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}


//线条加粗
thick.onclick = function () {
  lineWidth = 10;
  thick.classList.add('active');
  thin.classList.remove('active');
}

//线条变细
thin.onclick = function () {
  lineWidth = 3;
  thin.classList.add('active');
  thick.classList.remove('active');
}

//清除画板内容!
clear.onclick = function () {
  context.clearRect(0, 0, canvasDemo.width, canvasDemo.height);
}
//给定当前滑画板的图片保存下载功能!
download.onclick = function () {
  //拿到当前canvasDemo的数据URL链接 并且是img/png格式的!
  var url = canvasDemo.toDataURL('img/png');
  //在文档里面创建一个a元素!
  var downloadlink = document.createElement('a');
  //设置锚点元素的href为当前canvasDemo的URL
  downloadlink.href = url;
  //记得给定当前图片的 可用时间戳或者是URL内容按照指定长度截取
  downloadlink.download = 'xxxx.png';
  //将A标签添加到document中!
  document.body.appendChild(downloadlink);
  //调用click方法下载完毕!
  downloadlink.click();
  //从document中删除!
  document.body.removeChild(downloadlink);
}


