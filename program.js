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
  if (mode != "programming") return;
  i = Math.floor((mousePos.x - workplace[0]) / diam);
  j = Math.floor((mousePos.y - workplace[1] - 7 * diam) / diam);
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  drawProg();
}

function scroll(event) {
  if (mode != "programming") return;
  var direction = Math.sign(event.wheelDeltaY);
  var scrollSpeed = 30;
  programOffset += scrollSpeed * direction;
  for (var i = nOfStandardButtons; i < progButtons.length; i++) {
    progButtons[i].y += scrollSpeed * direction;
  }
  drawProg();
}
	  
function saveSheet(){
  cutSheet(mainSheet);

  if (!editing) {
    program.push(mainSheet.copy());
    editing = true;
    var i = program.length - 1;
    editingSheet = i;
    program[i].number = i;
    var b = new button("", diam, i * sheetH * diam + diam * (i + 1) + programOffset, diam * sheetW, diam * sheetH, function() {editSheet(i)});
    progButtons.push(b);
   // b = new button("Delete", diam * (sheetW + 1) + 5, i * sheetH * diam + diam * (i + 1) + programOffset, 100, 19, function() {deleteSheet(i)});
   // progButtons.push(b);
  }
  else {
    program[editingSheet] = mainSheet.copy();
  }
  drawProg();
}

function editSheet(number) {
  editingSheet = number; 
  editing = true; 
  directive.reset(); // clean the directive window
  mainSheet = program[number].copy();
  drawProg();
}

function deleteSheet(number) {
// unfinished
  program.remove(number);
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
  var rotation = mainSheet.directives[number][1];
  var figure = figures[number][rotation];

  for (i = 0; i < 4; i++) {
    directive.pattern[figure[i][0] + offset][figure[i][1]] = number + 1;
  }

  drawProg();
}

function createShowFigure(number) {
  return function() {showFigure(number)};
}

function checkDirective(number, offset, rotation) {
  for (i = 0; i < 4; i++) {
    if ((figures[number][rotation][i][0] + offset < 0) || (figures[number][rotation][i][0] + offset > sheetW - 1)) return false;
  }
  return true;
}

function moveDirectionFigure(where) {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0] + where, mainSheet.directives[currentDirectiveFigure][1])) return;
  mainSheet.directives[currentDirectiveFigure][0] += where;
  showFigure(currentDirectiveFigure);
  drawProg();
}

function rotateDirectionFigure() {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0], (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length)) return;
  mainSheet.directives[currentDirectiveFigure][1] = (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length;
  showFigure(currentDirectiveFigure);
  drawProg();

}

function moveSheet(where) {
  if (where == 1) {moveSheetRight()};
  if (where == -1) {moveSheetLeft()};
  drawProg();
} 

function moveSheetLeft() {
  for (var i = 0; i < sheetW - 1; i++) {
    mainSheet.pattern[i] = mainSheet.pattern[i + 1];
  }
  mainSheet.pattern[sheetW - 1] = new Array(sheetH);
  for (var i = 0; i < sheetH; i++) {
    mainSheet.pattern[sheetW - 1][i] = anything;
  }
}

function moveSheetRight() {
  for (var i = 0; i < sheetW - 1; i++) {
    mainSheet.pattern[sheetW - i - 1] = mainSheet.pattern[sheetW - i - 2];
  }
  mainSheet.pattern[0] = new Array(sheetH);
  for (var i = 0; i < sheetH; i++) {
    mainSheet.pattern[0][i] = anything;
  }
}

function liftSheet() {
  for (var i = 0; i < sheetW; i++) {
    for (var j = 0; j < sheetH - 1; j++) {
      mainSheet.pattern[i][j] = mainSheet.pattern[i][j + 1];
    }
    mainSheet.pattern[i][sheetH - 1] = anything;
  }
  drawProg();
}

function pushSheet() {
  for (var i = 0; i < sheetW; i++) {
    for (var j = 0; j < sheetH - 1; j++) {
      mainSheet.pattern[i][sheetH - j - 1] = mainSheet.pattern[i][sheetH - j - 2];
    }
    mainSheet.pattern[i][0] = anything;
  }
  drawProg();
}

function cutSheet(sheet) {
  sheet.up = findBoundary(sheet.pattern, [0, 0], [0, 1], [1, 0]);
  sheet.down = 1 + sheet.rows - findBoundary(sheet.pattern, [0, sheet.rows], [0, -1], [1, 0]);
  sheet.left = findBoundary(sheet.pattern, [0, 0], [1, 0], [0, 1]);
  sheet.right = sheet.cols - findBoundary(sheet.pattern, [sheet.cols - 1, 0], [-1, 0], [0, 1]);
}

function findBoundary(array, initial, directionGlobal, directionLocal) {
  var k = 0;
  for (var init = initial; array[init[0]] != undefined; init = add(init, directionGlobal)) {
    if (!traverseLine(array, directionLocal, init)) {return k;}
    k++;
  }
  return k;
}

function traverseLine(array, direction, initial) {
  for (var iter = initial; (array[iter[0]] != undefined) && (array[iter[0]][iter[1]] != undefined); iter = add(iter, direction)) {
    if (array[iter[0]][iter[1]] != anything) {return false;}
  }
  return true;
}

function loadProg(contents) {  
  program = JSON.parse(contents);
  drawProg();
  for (var j = 0; j < program.length; j++) {
    var sh = program[j];
    program[j] = new sheet(sh.cols, sh.rows);
    program[j].pattern = sh.pattern;
    program[j].directives = sh.directives;
    progButtons.push(new button("", diam, j * sheetH * diam + diam * (j + 1), diam * sheetW, diam * sheetH, createEdit(j)));
  }
}

function test(){
  gamePaused = false;
  mode = "executing";
  newGame();
  GameLoop();
}
