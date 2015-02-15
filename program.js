function programmingSetup() {
  sheet[0] = new Array(sheetH);
  reset(sheet, 9, false);
  clear(c);
}

function sheetInput(mousePos) {
  i = Math.floor((mousePos.x - workplace[0])/(2*radius));
  j = Math.floor((mousePos.y - workplace[1])/(2*radius));
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  sheet[i][j] += 1;
  if (sheet[i][j] == 10) {sheet[i][j] = 0;}
  if (sheet[i][j] == 1) {sheet[i][j] = 8;}
  draw(sheet, c, workplace);
}
	  
function saveSheet(){
  console.log('sheet saved');
}

var test = function(){
	width = fieldW * 25;
	height = fieldH * 25;
	c.width = width;
	c.height = height;
	newGame();
	GameLoop();
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
