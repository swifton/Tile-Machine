function programmingSetup() {
  newSheet();
}

function newSheet() {
  mainSheet = new sheet(sheetW, sheetH);
  directive.reset();
  editing = false;
  drawProg();
}

function sheetInput(mousePos) {
  i = Math.floor((mousePos.x - workplace[0]) / diam);
  j = Math.floor((mousePos.y - workplace[1] - 7 * diam) / diam);
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  drawProg();
}

function scroll(event) {
  if (mode == "executing") return;
  var direction = Math.sign(event.wheelDeltaY);
  var scrollSpeed = 30;
  programOffset += scrollSpeed * direction;
  for (var i = nOfStandardButtons; i < progButtons.length; i++) {
    progButtons[i].y += scrollSpeed * direction;
  }
  drawProg();
}
	  
function saveSheet(){
  if (!editing) {
    program.push(mainSheet.copy());
    editing = true;
    var i = program.length - 1;
    editingSheet = i;
    program[i].number = i;
    var b = new button("", diam, i * sheetH * diam + diam * (i + 1) + programOffset, diam * sheetW, diam * sheetH, function() {editSheet(i)});
    progButtons.push(b);
  }
  else {
    program[editingSheet] = mainSheet.copy();
  }
  drawProg();
}

function editSheet(number) {
  editingSheet = number; 
  editing = true; 
  directive.reset();
  mainSheet = program[number].copy();
  drawProg();
}

function createEdit(number) {
  return function() {editSheet(number)};
}

function saveProg() {
  p(JSON.stringify(program));
}

function showFigure(number) {
  currentDirectiveFigure = number;
  directive = new sheet(sheetW, 4);
  var offset = mainSheet.directives[number][0];
  var rotation = mainSheet.directives[number][1];
  var figure = figures[number];

  for (i = 0; i < 4; i++) {
    directive.pattern[figure[i][0] + offset][figure[i][1]] = number + 1;
  }

  drawProg();
}

function createShowFigure(number) {
  return function() {showFigure(number)};
}

function checkDirective(number, offset) {
  for (i = 0; i < 4; i++) {
    if ((figures[number][i][0] + offset < 0) || (figures[number][i][0] + offset > sheetW - 1)) return false;
  }
  
  return true;
}

function moveFigure(where) {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0] + where)) return;
  mainSheet.directives[currentDirectiveFigure][0] += where;
  showFigure(currentDirectiveFigure);
  drawProg();
}

function loadProg(contents) {  
  program = JSON.parse(contents);
  drawProg();
  for (var j = 0; j < program.length; j++) {
    var sh = program[j];
    program[j] = new sheet(sh.cols, sh.rows);
    program[j].pattern = sh.pattern;
    progButtons.push(new button("", diam, j * sheetH * diam + diam * (j + 1), diam * sheetW, diam * sheetH, createEdit(j)));
  }
}

function test(){
  gamePaused = false;
  mode = "executing";
  newGame();
  GameLoop();
}
