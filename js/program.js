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
	//mainSheet.calculateLanding();

    editingWindowEnabled = false;
	
	var cshe =  mainSheet.copy();
    cshe.cutSheet();
	
	// TODO: Handle the case when the pattern fits in two different places of an exception.
	//var matchI;
	//var matchJ;
	
	var parentSheet = program[N_PROG_FIGURE].sheets[i];
	//var tmp = true;
	
	// This didn't work because of my crappy architecture
	/*for (var i = 0; i < cshe.patternWid; i++) {
		for (var j = 0; j < cshe.patternHeit; j++) {
			if (comparePatterns(parentSheet.pattern, cshe.pattern, i, j, parentSheet.patternWid, parentSheet.patternHeit, parentSheet.patternOffsetX, parentSheet.patternOffsetY)) {
				matchI = i;
				matchJ = j;
				console.log("MathcI, MatchJ");
				console.log(matchI);
				console.log(matchJ);
				tmp = false;
			}
		}
	}
	
	if (tmp) {
		console.log("The exception doesn't match the pattern");
	}
	else {
		parentSheet.exceptionOffset = [matchI, matchJ];
	}*/
	
	parentSheet.exceptions.push(cshe);
	
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

function resetProgram() {
  if (confirm("This will delete both the program that you see and its copy in the local memory of the browser. You will only keep programs that you have downloaded.")) {
    for (var j = 0; j < 7; j++) {
      program[j] = new column(j);
    }
  }
  localStorage.removeItem("program");
}

function saveProgramLocal() {
	var pr = JSON.stringify(program);
	localStorage.setItem("program", pr);
}

function loadProgramLocal() {
	pr = localStorage.getItem("program");
	if (pr) {
		loadProg(pr);
	}
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
  if (allowedFigures.length == 0) {alert("Turn on at least one tetromino by checking the radiobutton next to it."); return;}
  gamePaused = true;
  mode = "executing";
  
  results = [];
	
  for (i = 0; i < nOfKeptResults; i++) {  // This can introduce errors, if the number of games is smaller than the length of this array.
    results.push(0);
  } 
  
  newGame();
  resetStats();
  clear();
  //newFigure(); Uncommenting this field not only spawns an extra figure, but also causes bugs with region rectangles. Find out why. 
  updateField();
  drawExec();
}

function launchFast() {
	if (!gamePaused) {return;}
	gamePaused = false;
	fastGameLoop();
}

function fastGameLoop() {
  if (gamePaused) {return;}
  nextFigure();
  gLoop = setTimeout(fastGameLoop, 1000/100);
}

function veryFastGameLoop(chal) {
	if (!gamePaused) {return;}
	gamePaused = false;
	savedGames = [];
	maxNumberofLinesDeleted = 0;
    minNumberofLinesDeleted = 100000000; // Fix this later.
	
	var tt0 = performance.now();
	
	for (i = 0; i < sampleSize; i++) {
		if (chal) {
			challengeNextFigure();
		} else {
			veryFastNextFigure();
		}
	}
	
	var tt1 = performance.now();
	
	console.log("totalTime");
	console.log(tt1 - tt0);
	
	console.log("totalDropTime");
	console.log(totalDropTime);
	console.log("totalUpdateTime");
	console.log(totalUpdateTime);
	/*
		console.log("totalUpdatePositionTime");
	console.log(totalUpdatePositionTime);
		console.log("totalCheckFieldTime");
	console.log(totalCheckFieldTime);*/
		console.log("totalNewFigureTime");
	console.log(totalNewFigureTime);
	console.log("matchingTime");
	console.log(matchingTime);
		console.log("matchSearchingTime");
	console.log(matchSearchingTime);
		console.log("matchRemovingTime");
	console.log(matchRemovingTime);
	console.log("comparePatternsTime");
	console.log(comparePatternsTime);
		/*console.log("totalCheckEndTime");
	console.log(totalCheckEndTime);
		console.log("totalUpdateTime");
	console.log(totalUpdatePositionTime + totalCheckFieldTime + totalNewFigureTime + totalCheckEndTime);
	*/
	
	if (numberOfGamesPlayed == 0) {finishGameStats();}

	averageNumberOfLinesDeleted = totalLinesDeleted * 1.0 / numberOfGamesPlayed;
	print("Average number of lines:");
    print(averageNumberOfLinesDeleted);
	
	if (!chal) {clear(); drawExec();}
	
	print("Discrepancy:");
	print(countDiscrepancy());
	
	if (numberOfGamesPlayed < nOfKeptResults) {
		print("THIS IS INACCURATE!");
	}
	gamePaused = true;
}

function lamestGame() {
	if (savedGames.length == 0) {
		return;
	}
	
	fill2DArray(field, 0, true, true);	
	
	sequenceOfTetriminoes = [];
    sequenceOfTetriminoes = savedGames[0];
	console.log(sequenceOfTetriminoes);
	savedGames.splice(0, 1);
	newFigureReplay();
	updateField();
	clear();
	drawExec();
}

function runChallenges() {
	mode = "challenges";
}