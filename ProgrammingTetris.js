var sheetH = 10, sheetW = 10;

var mode = "programming";
var sheet = new Array(sheetW);
sheet[0] = new Array(sheetH);
reset(sheet, 9, false);
var program = [];
var workplace = [Math.floor((wid - sheetW * radius * 2)/2), 0];
clear(c);
draw(sheet, c, workplace);

//grid();

c.addEventListener('mousedown', clickReporter, false);

function clickReporter(e) {
  var mousePos = getMousePos(c, e);
  i = Math.floor((mousePos.x - workplace[0])/(2*radius));
  j = Math.floor((mousePos.y - workplace[1])/(2*radius));
  sheet[i][j] += 1;
  if (sheet[i][j] == 10) {sheet[i][j] = 0;}
  if (sheet[i][j] == 1) {sheet[i][j] = 8;}
  draw(sheet, c, workplace);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var cutSheet = function(){
	for (var i = 0; ; i++){
		b = 1;
		for (var j = 0; j < sheetH - 1; j++){
			if (sheet[i][j] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var k = sheetW - 1; ; k--){
		b = 1;
		for (var j = 0; j < sheetH - 1; j++){
			if (sheet[k][j] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var p = 0; ; p++){
		b = 1;
		for (var j = 0; j < sheetW - 1; j++){
			if (sheet[j][p] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var s = sheetH - 1; ; s--){
		b = 1;
		for (var j = 0; j < sheetW - 1; j++){
			if (sheet[j][s] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var r = 0; r < sheetW - 1; r++){
		sheet[r] = sheet[r].slice(p,s+1)
	}
	sheet = sheet.slice(i,k+1);
	return [k+1-i,s+1-p];
}	  
	  
var saveSheet = function(){
	var a = cutSheet();
	clear(cv);
	draw(sheet,cv);
	a.push(detectTile());
	program.push([sheet, a]);
	sheet = new Array(sheetW);
	sheet[0] = new Array(sheetH + 1);
	reset(sheet);
	clear(c);
	nOfSheets += 1;
}

var test = function(){
	width = fieldW * 25;
	height = fieldH * 25;
	c.width = width;
	c.height = height;
	newGame();
	GameLoop();
}

var detectTile = function(){
	if (sheet[3][0] == 3) {return 0;}
	if (sheet[4][0] != 3) {return 2;}
	if (sheet[4][1] == 3 && sheet[5][1] == 3) {return 4;}
	if (sheet[6][0] != 3) {return 3;}
	if (sheet[5][1] == 3) {return 1;}
	if (sheet[7][1] == 3) {return 5;}
	if (sheet[5][1] == 3) {return 6;}
}

var findPosition = function(){
	var sh, bool;
	var WofSh;
	var HofSh;
	for (i = 0; i < NofSheets; i++){
		if (program[i][1][2] != NofTile) {continue;}
		sh = program[i][0];
		WofSh = program[i][1][0];
		HofSh = program[i][1][1];
		for (var k = 0; k < FieldW - WofSh; k++){
			for (var l = 0; l < FieldH - HofSh; l++){
				bool = 1;
				for (var m = 0; m < WofSH; m++){
					for (var n = 0; n < HofSH; n++){
						if (sh[m][n] != field[k+m][l+n]) {bool = 0;}
					}	
				}
				if (bool == 1) {return k;}
			}	
		}
	}
	return 0;
}
