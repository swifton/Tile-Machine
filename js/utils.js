function resizeCanvas(){
// TODO: make it fit the window size and prevent it from creating scrollbars and empty borders on all screen sizes. Or make the window background have the same color.
  CANVAS_WID = window.innerWidth - 15;
  CANVAS_HEIT = window.innerHeight - 39;
  CANVAS.width = CANVAS_WID;
  CANVAS.height = CANVAS_HEIT;
}

function clear(){
  CONTEXT.fillStyle = '#222222';
  CONTEXT.clearRect(0, 0, CANVAS_WID, CANVAS_HEIT);
  CONTEXT.beginPath();
  CONTEXT.rect(0, 0, CANVAS_WID, CANVAS_HEIT);
  CONTEXT.closePath();
  CONTEXT.fill();
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

function filledRectangle(LT, wid, heit, color) {
  CONTEXT.fillStyle = color;
  CONTEXT.beginPath();
  CONTEXT.rect(LT[0], LT[1], wid, heit);
  CONTEXT.closePath();
  CONTEXT.fill();
}

function rectangle(LT, length, height, color) {
  var LB = add(LT, [0, height]);
  var RB = add(LB, [length, 0]);
  var RT = add(LT, [length, 0]);

  tetraGon(LT, RT, LB, RB, color);
}

function tetraGon(LT, RT, LB, RB, color) {
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

function drawLabel(text, x, y) {
  CONTEXT.fillStyle = "yellow";
  CONTEXT.font = "bold 20px Arial";
  CONTEXT.fillText(text, x, y);
}

function clickReporter(e) {
  var mousePos = getMousePos(CANVAS, e);
  sheetInput(mousePos);
  buttonPress(mousePos);
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

function fill2DArray(data, value, ground, walls, logo) {
  value = value || 0;
  var dataWid = data.length;
  var dataHeit = data[0].length;

  for (var i = 0; i < dataWid; i++){
    data[i] = new Array(dataHeit);
    for (var j = 0; j < dataHeit; j++){
      data[i][j] = (walls && (i == 0 || i == dataWid - 1))?(-1):value;
    }
  }

  if (ground) {
    for (var j = 0; j < dataWid; j++) {
      data[j][dataHeit - 1] = -1;
    }
  }
  
  if (logo) {
	//makeLogo(data);
  }
}

function makeLogo(data) {
	data[2][11] = 2;
	data[3][11] = 2;
	data[4][11] = 2;
	data[5][11] = 2;
	data[6][11] = 2;
	
	data[4][11] = 2;
	data[4][12] = 2;
	data[4][13] = 2;
	data[4][14] = 2;
	data[4][15] = 2;
//	data[4][16] = 2;
	
	//a = -2;
	//b = 2;
	
	a = 0;
	b = 0;
	
	data[a + 8][b + 11] = 1;
	data[a + 9][b + 11] = 1;
	data[a + 10][b + 11] = 1;
	data[a + 10][b + 12] = 1;
	data[a + 10][b + 13] = 1;
	data[a + 9][b + 13] = 1;
	data[a + 8][b + 14] = 1;
	data[a + 8][b + 12] = 1;
	data[a + 8][b + 13] = 1;
	data[a + 8][b + 15] = 1;
//	data[a + 8][b + 16] = 1;
	
	//a = -4;
	//b = 6;
	
	data[a + 12][b + 11] = 3;
	data[a + 12][b + 12] = 3;
	data[a + 12][b + 13] = 3;
	data[a + 12][b + 14] = 3;
	data[a + 12][b + 15] = 3;
//	data[a + 12][b + 16] = 3;
	data[a + 16][b + 11] = 3;
	data[a + 16][b + 12] = 3;
	data[a + 16][b + 13] = 3;
	data[a + 16][b + 14] = 3;
	data[a + 16][b + 15] = 3;
//	data[a + 16][b + 16] = 3;
	data[a + 13][b + 12] = 3;
	data[a + 14][b + 13] = 3;
	data[a + 15][b + 12] = 3;
	
}

function copy2DArray(sourceArray) {
  var result = new Array(sourceArray.length);

  for (var i = 0; i < sourceArray.length; i++){
      result[i] = new Array(sourceArray[0].length);
      for (var j = 0; j < sourceArray[0].length; j++){
        result[i][j] = sourceArray[i][j];
      }
    }

  return result;
}

//TODO: This is complete bullshit. This is by no means a polyomino length. Replace this by a decent architecture for directives and make a tool to match landings.
function polyominoLength(n, rotation) {
  if (n == 0) {
    if (rotation == 0) {
      return 4;
    }
    else {
      return 5;
    }
  }

  if (n == 4) {return 2;}

  if (rotation == 0 || rotation == 2) {
    return 3;
  }

  if (rotation == 1 || rotation == 3) {
      return 2;
  }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
