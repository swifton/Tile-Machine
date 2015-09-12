function resizeCanvas(){
  CANVAS_WID = window.innerWidth - 10;
  CANVAS_HEIT = window.innerHeight - 30;
  CANVAS.width = CANVAS_WID;
  CANVAS.height = CANVAS_HEIT;
}

function clear(cnv){
  var context = cnv.getContext('2d');
  context.fillStyle = '#d0e7f9';
  context.clearRect(0, 0, cnv.width, cnv.height);
  context.beginPath();
  context.rect(0, 0, cnv.width, cnv.height);
  context.closePath();
  context.fill();
}

function drawLine(x1, y1, x2, y2, color) {
  var color = color || "black";
  CONTEXT.beginPath();
  CONTEXT.lineWidth = 2;
  CONTEXT.moveTo(x1, y1);
  CONTEXT.lineTo(x2, y2);
  CONTEXT.strokeStyle = color;
  CONTEXT.stroke();
}

function rectangle(LT, length, height, color) {
  var LB = add(LT, [0, height]);
  var RB = add(LB, [length, 0]);
  var RT = add(LT, [length, 0]);

  fourGon(LT, RT, LB, RB, color);
}

function fourGon(LT, RT, LB, RB, color) {
  line(LT, RT, color);
  line(LB, RB, color);
  line(LT, LB, color);
  line(RT, RB, color);
}

function add(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

function line(start, end, color) {
  drawLine(start[0], start[1], end[0], end[1], color);
}

function grid() {
  var diameter = TILE_WID;

  for (var i = 0; i <= CANVAS_WID/TILE_WID; i++) {
    drawLine(i * TILE_WID, 0, i * TILE_WID, CANVAS_HEIT);
  }

  for (var i = 0; i < CANVAS_HEIT/TILE_WID; i++) {
    drawLine(0,i * TILE_WID, CANVAS_WID, i * TILE_WID);
  }
}

function loadAssets() {
  for (i = 1; i < images.length; i++) {
    images[i] = new Image();
    images[i].src = "images/" + i.toString() + ".png";  
  }

  images[9].onload = function() {
    drawProg();
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawLabel(label, x, y) {
  CONTEXT.fillStyle = "blue";
  CONTEXT.font = "bold 20px Arial";
  CONTEXT.fillText(label, x, y);
}

function clickReporter(e) {
  var mousePos = getMousePos(CANVAS, e);
  sheetInput(mousePos);
  buttonPress(mousePos);
}

function copySheet(sheet) {
  var copy = new Array(sheet.length);
  copy[0] = new Array(sheet[0].length);
  reset(copy, 0, false);
  for (var i = 0; i < sheet.length; i++) {
    for (var j = 0; j < sheet[0].length; j++) {
      copy[i][j] = sheet[i][j];
    }
  }
  return copy;
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    loadProg(e.target.result);
  };
  reader.readAsText(file);
}

function print(output) {
  console.log(output);
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
