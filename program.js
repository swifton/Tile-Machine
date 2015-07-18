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
    program[nOfProgFigure].addPattern(cshe);
    editing = true;
    var i = program[nOfProgFigure].length - 1;
    editingSheet = i;
  }
  else {
    program[nOfProgFigure][editingSheet] = cshe;
  }
  drawProg();
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

  var heitOffset = 0;
  for (var j = 0; j < program[nOfProgFigure].length; j++) {
    var com = program[nOfProgFigure][j];
    createSheetButtons(j, nOfProgFigure, com.patternHeit, heitOffset, com.patternWid);
    heitOffset += com.patternHeit;
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