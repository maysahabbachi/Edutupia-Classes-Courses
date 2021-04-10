export function handleWhiteBoard (socket) {
    var canvas = document.getElementsByClassName('whiteboard')[0];
    var writingColor = document.getElementById('WritingColor');
    var clearWhiteBoard = document.getElementById('ClearWhiteBoard');
    var downloadWhiteBoard = document.getElementById('DownloadWhiteBoard');
  var context = canvas.getContext('2d');
  canvas.style.backgroundColor = '#FFF'

  var current = { color: writingColor.value };
  var drawing = false;

  writingColor.onchange =  () => current.color = writingColor.value
  clearWhiteBoard.onclick = () => context.clearRect(0, 0, canvas.width, canvas.height)
  downloadWhiteBoard.onclick = () => {
    var img    = canvas.toDataURL("image/png");
    var btn = document.createElement("a");
    btn.href = img;         
    btn.download = "";
    btn.id = "downloadHref"
    document.body.appendChild(btn); 
    var x0sp = document.getElementById("downloadHref")
    x0sp.click()
    x0sp.remove()
  }

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  socket.on('WhiteBoardDrawingFromServer', onDrawingEvent);

  //window.addEventListener('resize', onResize, false);
  onResize();

  function drawCircle(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    }

  function drawRectangle(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.rect(x0, y0, x1, y1);
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
    }

  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('WhiteBoardDrawingToServer', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  function onMouseDown(e){
     //alert(WritingColor.value)
    //drawCircle()
    drawing = true;
    var rect = e.target.getBoundingClientRect();
    current.x = e.clientX - rect.left;
    current.y = e.clientY - rect.top;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    var rect = e.target.getBoundingClientRect();
    drawing = false;
    drawLine(current.x, current.y, e.clientX - rect.left, e.clientY - rect.top, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    var rect = e.target.getBoundingClientRect();
    drawLine(current.x, current.y, e.clientX - rect.left, e.clientY - rect.top, current.color, true);
    current.x = e.clientX - rect.left;
    current.y = e.clientY - rect.top;
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  function onResize() {
    canvas.width = 900 ;
    canvas.height = 500 ;
  }
}