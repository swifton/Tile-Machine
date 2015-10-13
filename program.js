function newSheet() {
  editingWindowEnabled = true;
  mainSheet = new sheet(defaultPatternWid, defaultPatternHeit);
  mainSheet.directive[0] = 3;
  directiveWindow.reset();
  editing = false;
  showFigure();
  calculateLanding(mainSheet);
}

function changeSheet(i, j) { // TODO: Everything is empty by default. Then full, then question mark.
  if ((i > defaultPatternWid - 1) || (j > defaultPatternHeit - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  calculateLanding(mainSheet);
  drawProg();
}

function saveSheet(){
  calculateLanding(mainSheet, N_PROG_FIGURE); //TODO: get rid of the second variable (and do it for other functions too)

  editingWindowEnabled = false;

  var cshe =  mainSheet.copy();
  cshe.cutSheet();

  if (!editing) {
    program[N_PROG_FIGURE].addPattern(cshe);
    editing = true;
    var i = program[N_PROG_FIGURE].sheets.length - 1;
    editingSheet = i;
  }
  else {
    program[N_PROG_FIGURE].sheets[editingSheet] = cshe;
  }
  alignSheetButtons(N_PROG_FIGURE);
}

function makeAllowedFigures() {
  allowedFigures = [];
  for (i = 0; i < FIGURE_BUTTONS.length; i++) {
    if (FIGURE_BUTTONS[i].toggled == true) {allowedFigures.push(i);}
  }
}

function saveProg() {
  var pr = JSON.stringify(program);
  var blob = new Blob([pr], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "program");
}

function loadProg(fileContent) {
  for (var j = 0; j < 7; j++) {
    program[j] = new column(j);
  }

  progra = JSON.parse(fileContent);
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < progra[i].sheets.length; j++) {
      var sh = progra[i].sheets[j];
      var shhh = new sheet(sh.patternWid, sh.patternHeit);
      shhh.copyVars(sh);
      shhh.pattern = sh.pattern;
      shhh.landing = sh.landing;

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
  makeAllowedFigures();
  if (allowedFigures.length == 0) {return;} // TODO: add some reminder for the player to toggle at least one figure
  gamePaused = false;
  mode = "executing";
  newGame();
  resetStats();
  clear();
  newFigure();
  updateField();
  drawExec();
  //GameLoop();
}

function fastGameLoop() {
  nextFigure();
  gLoop = setTimeout(fastGameLoop, 1000/100);
}