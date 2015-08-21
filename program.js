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
  cshe.cutSheet();

  if (!editing) {
    program[nOfProgFigure].addPattern(cshe);
    editing = true;
    var i = program[nOfProgFigure].length - 1;
    editingSheet = i;
  }
  else {
    program[nOfProgFigure].sheets[editingSheet] = cshe;
  }
  alignSheetButtons(nOfProgFigure);
  drawProg();
}

function toggleFigure(num) {
  var ind = allowedFigures.indexOf(num);
  if (ind == -1) {
    allowedFigures.push(num);
  }
  else {
    allowedFigures.remove(ind);
  }
  drawProg();
}

function createToggleFigure(num) {
  return function() {toggleFigure(num)};
}

function saveProg() {
  var pr = JSON.stringify(program);
  var blob = new Blob([pr], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "program");
}

function loadProg(contents) {
  for (var j = 0; j < 7; j++) {
    program[j] = new column(j);
  }

  progra = JSON.parse(contents);
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < progra[i].sheets.length; j++) {
      var sh = progra[i].sheets[j];
      var shhh = new sheet(sh.patternWid, sh.patternHeit, sh.patternOffsetX, sh.patternOffsetY);
      shhh.pattern = sh.pattern;
      shhh.directive = sh.directive;
      shhh.landing = sh.landing;
      shhh.symmetry = sh.symmetry;
      shhh.walls = sh.walls;
      program[i].addPattern(shhh);
    }
  }

  drawProg();
}

function makeSymmetricSheets() {
  for (var i = 0; i < program.length; i++) {
    for (var j = 0; j < program[i].sheets.length; j++) {
      if (program[i].sheets[j].symmetry) {
        program[i].sheets[j].makeSymmetricSheet(i);
      }
    }
  }
}

function test(){
  //makeSymmetricSheets();
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