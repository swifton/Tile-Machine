function programmingSetup() {
  newSheet();
}

function newSheet() {
  mainSheet = new sheet(defaultPatternWid, defaultPatternHeit);
  directive.reset();
  editing = false;
  drawProg();
}

function saveSheet(){
  calculateAllLandings();

  var cshe =  mainSheet.copy();
  cutSheet(cshe);

  if (!editing) {
    program[nOfProgFigure].push(cshe);
    editing = true;
    var i = program[nOfProgFigure].length - 1;
    editingSheet = i;
    createSheetButtons(i, nOfProgFigure);
  }
  else {
    program[nOfProgFigure][editingSheet] = cshe;
  }
  drawProg();
}

function editSheet(number, tetr) {
  editingSheet = number; 
  editing = true; 
  directive.reset(); // clean the directive window
  mainSheet.copyWithShift(program[tetr][number]);
  drawProg();
}

function deleteSheet(number, tetr) {
  program[tetr].remove(number);
  progButtons.remove(progButtons.length - 4, progButtons.length); // this button removal relies on the structure of the progButtons array and is not robust
  newSheet();
  drawProg();
}

function deleteSheetButtons() {
  progButtons.remove(progButtons.length - 4, progButtons.length); // this button removal relies on the structure of the progButtons array and is not robust
}

function createSheetButtons(i, nn) {
// these buttons are bound to the place in the program, not to the sheet
  var b = new button("", diam, i * defaultPatternHeit * diam + diam * (i + 1) + programOffset, diam * defaultPatternWid, diam * defaultPatternHeit, function() {editSheet(i, nn)});
  progButtons.push(b);

  b = new button("Delete", diam * (defaultPatternWid + 1) + 5, i * defaultPatternHeit * diam + diam * (i + 1) + programOffset, 100, 19, function() {deleteSheet(i, nn)});
  progButtons.push(b);

  b = new button("^", diam * (defaultPatternWid + 1) + 5, i * defaultPatternHeit * diam + diam * (i + 1) + programOffset + 2 * diam, 100, 19, function() {swapTwoSheets(i, i-1, nn)});
  progButtons.push(b);

  b = new button("v", diam * (defaultPatternWid + 1) + 5, i * defaultPatternHeit * diam + diam * (i + 1) + programOffset + 4 * diam, 100, 19, function() {swapTwoSheets(i, i+1, nn)});
  progButtons.push(b);
}


function createEdit(number) {
  return function() {editSheet(number)};
}

function showFigure(number) {
  for (var i = 0; i < program[nOfProgFigure].length; i++) {deleteSheetButtons();}
  currentDirectiveFigure = number;
  nOfProgFigure = number;
  for (var i = 0; i < program[nOfProgFigure].length; i++) {createSheetButtons(i, nOfProgFigure);}
  directive = new sheet(defaultPatternWid, 4);
  var offset = mainSheet.directives[number][0];
  var rotation = mainSheet.directives[number][1];
  var figure = figures[number][rotation];

  for (i = 0; i < 4; i++) {
    directive.pattern[figure[i][0] + offset][figure[i][1]] = number + 1;
  }

  calculateLanding(mainSheet, number);

  drawProg();
}

function swapTwoSheets(i, j, nn) {
  var ns = program[nn][i];
  program[nn][i] = program[nn][j];
  program[nn][j] = ns;
  newSheet();
  drawProg();
}

// Functions that govern figure directions
function calculateLanding(sh, fignum) {
  var fig = [[0, 0], [0, 0], [0, 0], [0, 0]];

  for (var j = 0; j < 4; j++) {
    fig[j][0] = figures[fignum][sh.directives[fignum][1]][j][0];
    fig[j][1] = figures[fignum][sh.directives[fignum][1]][j][1];
    fig[j][0] += sh.directives[fignum][0];
  }

  if (!checkFig(fig)) {}// this is a shitty pattern. do something about it later.

  for (;checkFig(fig);) {
    for (var i = 0; i < 4; i++) {
      fig[i][1] += 1;
    }
  }
  for (var i = 0; i < 4; i++) {
      fig[i][1] -= 1;
  }
  mainSheet.landing[fignum] = fig;
}

function checkFig(fig) {
  for (var i = 0; i < 4; i++) {
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == undefined) {return false;}
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == 8) {return false;}
  }
  return true;
}

function createShowFigure(number) {
  return function() {showFigure(number)};
}

function checkDirective(number, offset, rotation) {
  for (i = 0; i < 4; i++) {
    if ((figures[number][rotation][i][0] + offset < 0) || (figures[number][rotation][i][0] + offset > defaultPatternWid - 1)) return false;
  }
  return true;
}

function moveDirectiveFigure(where) {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0] + where, mainSheet.directives[currentDirectiveFigure][1])) return;
  mainSheet.directives[currentDirectiveFigure][0] += where;
  showFigure(currentDirectiveFigure);
  calculateLanding(mainSheet, currentDirectiveFigure);
  drawProg();
}

function rotateDirectiveFigure() {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0], (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length)) return;
  mainSheet.directives[currentDirectiveFigure][1] = (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length;
  showFigure(currentDirectiveFigure);
  calculateLanding(mainSheet, currentDirectiveFigure);
  drawProg();

}

function calculateAllLandings(){
  for (i = 0; i < 7; i++) {
    calculateLanding(mainSheet, i);
  }
}

// both premature and obsolete stuff for shifting sheets. Doesn't work with advanced matching
function moveSheet(where) {
  if (where == 1) {moveSheetRight()};
  if (where == -1) {moveSheetLeft()};
  calculateAllLandings();
  drawProg();
} 

function moveSheetLeft() {
  for (var i = 0; i < defaultPatternWid - 1; i++) {
    mainSheet.pattern[i] = mainSheet.pattern[i + 1];
  }
  mainSheet.pattern[defaultPatternWid - 1] = new Array(defaultPatternHeit);
  for (var i = 0; i < defaultPatternHeit; i++) {
    mainSheet.pattern[defaultPatternWid - 1][i] = anything;
  }
}

function moveSheetRight() {
  for (var i = 0; i < defaultPatternWid - 1; i++) {
    mainSheet.pattern[defaultPatternWid - i - 1] = mainSheet.pattern[defaultPatternWid - i - 2];
  }
  mainSheet.pattern[0] = new Array(defaultPatternHeit);
  for (var i = 0; i < defaultPatternHeit; i++) {
    mainSheet.pattern[0][i] = anything;
  }
}

function liftSheet() {
  for (var i = 0; i < defaultPatternWid; i++) {
    for (var j = 0; j < defaultPatternHeit - 1; j++) {
      mainSheet.pattern[i][j] = mainSheet.pattern[i][j + 1];
    }
    mainSheet.pattern[i][defaultPatternHeit - 1] = anything;
  }
  calculateAllLandings();
  drawProg();
}

function pushSheet() {
  for (var i = 0; i < defaultPatternWid; i++) {
    for (var j = 0; j < defaultPatternHeit - 1; j++) {
      mainSheet.pattern[i][defaultPatternHeit - j - 1] = mainSheet.pattern[i][defaultPatternHeit - j - 2];
    }
    mainSheet.pattern[i][0] = anything;
  }
  calculateAllLandings();
  drawProg();
}

// Three functions for cutting sheets
function cutSheet(sheet) {
  var up = findBoundary(sheet.pattern, [0, 0], [0, 1], [1, 0]);
  if (up == sheet.patternHeit) {up = 0; return;}
  var down = sheet.patternHeit - findBoundary(sheet.pattern, [0, sheet.patternHeit - 1], [0, -1], [1, 0]);
  var left = findBoundary(sheet.pattern, [0, 0], [1, 0], [0, 1]);
  var right = sheet.patternWid - findBoundary(sheet.pattern, [sheet.patternWid - 1, 0], [-1, 0], [0, 1]);
  sheet.patternOffsetY = up;
  sheet.patternOffsetX = left;
  sheet.patternWid = right - left;
  sheet.patternHeit = down - up;
  sheet.copyFromArray(sheet.pattern);
}

function findBoundary(array, initial, directionGlobal, directionLocal) {
  var k = 0;
  for (var init = initial; (array[init[0]] != undefined) && (array[init[0]][init[1]] != undefined); init = add(init, directionGlobal)) {
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

function saveProg() {
  p(JSON.stringify(program));
}

function loadProg(contents) {
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < program[j].length; i++) {
      deleteSheet(i, j);
    }
  }

  program = JSON.parse(contents);
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < program[i].length; j++) {
      var sh = program[i][j];
      program[i][j] = new sheet(sh.patternWid, sh.patternHeit, sh.patternOffsetX, sh.patternOffsetY);
      program[i][j].pattern = sh.pattern;
      program[i][j].directives = sh.directives;
      program[i][j].landing = sh.landing;
    }
  }

  for (var j = 0; j < program[nOfProgFigure].length; j++) {
    createSheetButtons(j, nOfProgFigure);
  }

  drawProg();
}

function test(){
  gamePaused = false;
  mode = "executing";
  newGame();
  resetStats();
  clear(c);
  newFigure();
  updateField();
  drawExec();
  //GameLoop();
}

function fastGameLoop() {
  nextFigure();
  gLoop = setTimeout(fastGameLoop, 1000/100);
}