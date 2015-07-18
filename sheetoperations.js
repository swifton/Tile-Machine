// both premature and obsolete stuff for shifting sheets
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
