function programmingSetup() {
  newSheet();
}

function newSheet() {
  mainSheet.reset();
  editing = false;
  drawEverything();
}

function sheetInput(mousePos) {
  i = Math.floor((mousePos.x - workplace[0]) / diam);
  j = Math.floor((mousePos.y - workplace[1]) / diam);
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  drawEverything();
}

function scroll(event) {
  var direction = Math.sign(event.wheelDeltaY);
  var scrollSpeed = 30;
  programOffset += scrollSpeed * direction;
  for (var i = nOfStandardButtons; i < buttons.length; i++) {
    buttons[i].y += scrollSpeed * direction;
  }
  drawEverything();
}
	  
function saveSheet(){
  if (!editing) {
    program.push(mainSheet.copy());
    editing = true;
    var i = program.length - 1;
    editingSheet = i;
    program[i].number = i;
    var b = new button("", diam, i * sheetH * diam + diam * (i + 1) + programOffset, diam * sheetW, diam * sheetH, function() {editSheet(i)});
    buttons.push(b);
  }
  else {
    program[editingSheet] = mainSheet.copy();
  }
  drawEverything();
}

function editSheet(number) {
  editingSheet = number; 
  editing = true; 
  mainSheet = program[number].copy();
  drawEverything();
}

function createEdit(number) {
  return function() {editSheet(number)};
}

function saveProg() {
  p(JSON.stringify(program));
}

function loadProg(contents) {  
  program = JSON.parse(contents);
  drawEverything();
  for (var j = 0; j < program.length; j++) {
    var sh = program[j];
    program[j] = new sheet(sh.cols, sh.rows);
    program[j].pattern = sh.pattern;
    buttons.push(new button("", diam, j * sheetH * diam + diam * (j + 1), diam * sheetW, diam * sheetH, createEdit(j)));
  }
}

function test(){
  
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
