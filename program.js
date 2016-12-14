function newSheet() {
  editingWindowEnabled = true;
  mainSheet = new sheet(defaultPatternWid, defaultPatternHeit);
  mainSheet.directive[0] = 3;
  directiveWindow.reset();
  editing = false;
  showFigure();
  mainSheet.calculateLanding();
}

function changeSheet(i, j) { // TODO: Everything is empty by default. Then full, then question mark.
  if ((i > defaultPatternWid - 1) || (j > defaultPatternHeit - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  mainSheet.calculateLanding();
  drawProg();
}

function saveToB() {
  mainSheet.calculateLanding();
  editingWindowEnabled = false;

  var cshe =  mainSheet.copy();
  cshe.cutSheet();

  if (!editing) {
    program[N_PROG_FIGURE].addPatternToB(cshe);
    editing = true;
    editingSheet = 0;
  }
  else {
    console.log("BUG!");
  }
  alignSheetButtons(N_PROG_FIGURE);
}

function saveException(i) {
	mainSheet.calculateLanding(); //TODO: get rid of the second variable (and do it for other functions too)

    editingWindowEnabled = false;
	
	var cshe =  mainSheet.copy();
    cshe.cutSheet();
	
	program[N_PROG_FIGURE].sheets[i].exceptions.push(cshe);
	
	editing = false;
}

function showException(i) {
  editingWindowEnabled = true;
  directiveWindow.reset(); // clean the directive window
  mainSheet = program[N_PROG_FIGURE].sheets[i].exceptions[0].copyWithShift(defaultPatternWid, defaultPatternHeit);
  showFigure();
}

function deleteException(i) {
	program[N_PROG_FIGURE].sheets[i].exceptions = [];
}

function saveSheet(){
  mainSheet.calculateLanding(); //TODO: get rid of the second variable (and do it for other functions too)

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

// TODO: After loading, open the first nonempty column.
function loadProg(fileContent) {
  for (var j = 0; j < 7; j++) {
    program[j] = new column(j);
  }

  var progra = JSON.parse(fileContent);
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < progra[i].sheets.length; j++) {
      var sh = progra[i].sheets[j];
      var shhh = new sheet(sh.patternWid, sh.patternHeit);
      shhh.copyVars(sh);
      program[i].addPattern(shhh);
    }
  }

  drawProg();
}

function makeSymmetricSheets() {
  for (var i = 0; i < program.length; i++) {
    for (var j = 0; j < program[i].sheets.length; j++) {
      if (program[i].sheets[j].symmetry) {
        program[i].sheets[j].makeSymmetricSheet();
      }
    }
  }
}

// A temporary function for testing the symmetric sheet building function.
function revertSheet() {
  mainSheet.makeSymmetricSheet();
  mainSheet = mainSheet.symmetricSheet;
}

function test(){
  savedGames = [];
  //makeSymmetricSheets();
  makeAllowedFigures();
  if (allowedFigures.length == 0) {return;} // TODO: add some reminder for the player to toggle at least one figure
  gamePaused = false;
  mode = "executing";
  
  results = [];
	
  for (i = 0; i < nOfKeptResults; i++) {  // This can introduce errors, if the number of games is less than the length of this array.
    results.push(0);
  } 
  
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

function veryFastGameLoop() {
	savedGames = [];
	maxNumberofLinesDeleted = 0;
    minNumberofLinesDeleted = 100000000;
	for (i = 0; i < 50000; i++) {
		veryFastNextFigure();
	}

	drawExec();
	var average = totalLinesDeleted * 1.0 / numberOfGamesPlayed;
	print("Average number of lines:");
    print(average);
	
	print("Discrepancy:");
	print(countDiscrepancy());
	
	if (numberOfGamesPlayed < nOfKeptResults) {
		print("THIS IS INACCURATE!");
	}
	
	drawLabel(average.toString(), 20, 20);
	drawLabel(maxNumberofLinesDeleted.toString(), 20, 60);
    drawLabel(minNumberofLinesDeleted.toString(), 20, 100);
}

function lamestGame() {
	if (savedGames.length == 0) {
		return;
	}
	
	fill2DArray(field, 0, true, true);	
	
	sequenceOfTetriminoes = [];
    sequenceOfTetriminoes = savedGames[0];
	savedGames.splice(0, 1);
	newFigureReplay();
}