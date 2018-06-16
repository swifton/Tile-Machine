function drawProg() {
  clear();
  //drawFrame(mainSheet, add(workplace, [0, 7 * TILE_WID]));  // TODO: fix the frame drawing code and enable this

  program[N_PROG_FIGURE].draw();

  if (editingWindowEnabled) {
    filledRectangle([workplace[0] - 10, workplace[1] + 15], TILE_WID * defaultPatternWid + 20, TILE_WID * (defaultPatternHeit + 10), '#444444');
    rectangle([workplace[0] - 10, workplace[1] + 15], TILE_WID * defaultPatternWid + 20, TILE_WID * (defaultPatternHeit + 10));
    drawData(directiveWindow.pattern, add(workplace, [0, TILE_WID]));
    drawData(mainSheet.pattern, add(workplace, [0, 7 * TILE_WID], mainSheet.patternWid, mainSheet.patternHeit));
    drawLanding();
    drawButtons(editingWindow);
  }

  drawButtons(progButtons);
  
  //drawStuff();
}

function drawStuff() {
	/*drawData([[8], [8], [0], [0], [0], [8], [0], [8], [0], [0], [8]], [10,10]);
	drawLabel("1", 15, 60, "white");
	drawLabel("1", 40, 60, "white");
	drawLabel("0", 65, 60, "white");
	drawLabel("0", 90, 60, "white");
	drawLabel("0", 115, 60, "white");
	drawLabel("1", 140, 60, "white");
	drawLabel("0", 165, 60, "white");
	drawLabel("1", 190, 60, "white");
	drawLabel("0", 215, 60, "white");
	drawLabel("0", 240, 60, "white");
	drawLabel("1", 265, 60, "white");*/
	
	drawLabel("0", 15, 60, "white");
	drawLabel("0", 40, 60, "white");
	drawLabel("0", 65, 60, "white");
	drawLabel("1", 15, 85, "white");
	drawLabel("0", 40, 85, "white");
	drawLabel("1", 65, 85, "white");
	drawLabel("0", 15, 110, "white");
	drawLabel("1", 40, 110, "white");
	drawLabel("0", 65, 110, "white");
}

function drawLanding() { // TODO: Write code for drawing something starting at a given point. Or abstract this mess somehow.
  var fig = mainSheet.landing;
  if (fig == 0) {return;}
  for (var i = 0; i < 4; i++) { // TODO: Also, make the landing transparent.
    drawTile(workplace[0] + fig[i][0] * TILE_WID, workplace[1] + fig[i][1] * TILE_WID + 7 * TILE_WID, N_PROG_FIGURE + 1, CONTEXT);
  }
}

function sheetInput(mousePos) {
  if (mode != "programming") return;
  i = Math.floor((mousePos.x - workplace[0]) / TILE_WID);
  j = Math.floor((mousePos.y - workplace[1] - 7 * TILE_WID) / TILE_WID);
  changeSheet(i, j);
}

function scroll(event) {
  if (mode != "programming") return;
  var direction = Math.sign(event.wheelDeltaY);
  program[N_PROG_FIGURE].scroll(direction);
  drawProg();
}

function setupProgButtons() {
  var buttonHeit = 19;
  var saveSh = new button("Save pattern", workplace[0], (defaultPatternHeit + 8) * TILE_WID + 5, 130, buttonHeit, saveSheet);
  var saveToBButton = new button("Save to Beginning", workplace[0], (defaultPatternHeit + 9) * TILE_WID + 5, 185, buttonHeit, saveToB);
  var cancelSheet = new button("Cancel", workplace[0] + saveSh.buttonWid + 15, (defaultPatternHeit + 8) * TILE_WID + 5, 105, buttonHeit, function() {editingWindowEnabled = false;} );
 // var clearSheet = new button("Clear", workplace[0], (defaultPatternHeit + 9) * TILE_WID + 5, 115, buttonHeit, function() {} ); // TODO: write a function
  var newSheetButton = new button("New pattern", workplace[0] + 12 * TILE_WID, TILE_WID, 120, buttonHeit, newSheet);
 // var revertSheetButton = new button("Revert", workplace[0], (defaultPatternHeit + 9) * TILE_WID + 5, 115, buttonHeit, revertSheet);
  //var copySheet = new button("Copy Sheet", workplace[0], (defaultPatternHeit + 8) * TILE_WID + 10 + 20, 140, buttonHeit, function() {mainSheet = mainSheet.copy(); editing = false;});
  //var loadProgram = new button("Load", workplace[0] + saveProgram.buttonWid + TILE_WID, (defaultPatternHeit + 9) * TILE_WID + 10 + 20, 60, buttonHeit, readSingleFile);

  var dirLeft = new button("<---------", workplace[0], 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, moveDirectiveFigure, -1);
  var rotate = new button("Rotate", workplace[0] + dirLeft.buttonWid + TILE_WID/2, 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, rotateDirectiveFigure);
  var dirRight = new button("--------->", workplace[0] + 7 * TILE_WID, 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, moveDirectiveFigure, 1);

  var saveProgram = new button("Download Program", CANVAS_WID - 200, CANVAS_HEIT - 30, 190, buttonHeit, saveProg);
  var resetProgramButton = new button("Reset Program", CANVAS_WID - 200, CANVAS_HEIT - 60, 190, buttonHeit, resetProgram);
  var testButton = new button("Test Program", CANVAS_WID - 150, TILE_WID * 9, 140, buttonHeit, test);
  var challengesButton = new button("Challenges", CANVAS_WID - 130, TILE_WID * 10, 120, buttonHeit, runChallenges);

  editingWindow = [saveSh, dirLeft, rotate, dirRight, cancelSheet, saveToBButton];
  progButtons = [newSheetButton, saveProgram, testButton, challengesButton, resetProgramButton];

    for (var i = 0; i < 7; i++) {
      var figureButton = new button(figureLabels[i], CANVAS_WID - 90, TILE_WID * (i + 1), 80, buttonHeit, changeFigure, i);
      progButtons.push(figureButton);
      var figureToggle = new button("", CANVAS_WID - 115, TILE_WID * (i + 1), buttonHeit, buttonHeit, drawProg, undefined, true, "+");
      progButtons.push(figureToggle);
      FIGURE_BUTTONS.push(figureToggle);
    }
}