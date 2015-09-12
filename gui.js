// TODO: GUI is very messy. Need to make it more abstract.
function drawButtons(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
}

function drawLanding() { // TODO: Write code for drawing something starting at a given point. Or abstract this mess somehow.
  var fig = mainSheet.landing;
  if (fig == 0) {return;}
  for (var i = 0; i < 4; i++) { // TODO: Also, make the landing transparent.
    drawTile(workplace[0] + fig[i][0] * TILE_WID, workplace[1] + fig[i][1] * TILE_WID + 7 * TILE_WID, N_PROG_FIGURE + 1, CONTEXT);
  }
}

function drawFrame(sheet, start) { // TODO: WTF is this?!
  rectangle(add(start, [TILE_WID * (sheet.patternOffsetX), TILE_WID * (sheet.patternOffsetY)]), TILE_WID * (sheet.patternWid), TILE_WID * (sheet.patternHeit));
}

function drawProg() {
  clear(CANVAS);
  drawData(directiveWindow.pattern, add(workplace, [0, TILE_WID]));
  drawData(mainSheet.pattern, add(workplace, [0, 7 * TILE_WID], mainSheet.patternWid, mainSheet.patternHeit));
  //drawFrame(mainSheet, add(workplace, [0, 7 * TILE_WID]));  // TODO: fix the frame drawing code and enable this

  program[N_PROG_FIGURE].draw();

  drawLanding();

  drawButtons(progButtons);
}

function drawFrames() { // TODO: this is bulshit. Formulas shouldn't be so long.
  for (var i = 0; i < matches.length; i++) {
    rectangle(add(workplace, [TILE_WID * matches[i][1], TILE_WID * matches[i][2]]), TILE_WID * command.patternWid, TILE_WID * command.patternHeit, "#999");
  }

  for (var i = 0; i < removedMatches.length; i++) {
    rectangle(add(workplace, [TILE_WID * removedMatches[i][1], TILE_WID * removedMatches[i][2]]), TILE_WID * removedMatches[i][3], TILE_WID * removedMatches[i][4], "#900");
  }

  for (var i = 0; i < inefficientMatches.length; i++) {
    rectangle(add(workplace, [TILE_WID * inefficientMatches[i][1], TILE_WID * inefficientMatches[i][2]]), TILE_WID * inefficientMatches[i][3], TILE_WID * inefficientMatches[i][4], "#990");
  }

  rectangle(add(workplace, [TILE_WID * recognitionOffset, TILE_WID * recognitionOffsetY]), TILE_WID * command.patternWid, TILE_WID * command.patternHeit, "#000");
}

function drawExec() {
  drawData(field, workplace);
  drawData(command.pattern, add(workplace, [fieldWid * TILE_WID, 0]), command.patternWid, command.patternHeit);
  drawFrames();
  drawButtons(execButtons);
}

function buttonPress(mousePos) {
  var x = mousePos.x;
  var y = mousePos.y;

  if (mode == "programming") {
    for (var i = 0; i < progButtons.length; i++) {
      progButtons[i].press(x, y);
    }

    program[N_PROG_FIGURE].press(x, y);
  }

  else if (mode == "executing") {
    for (var i = 0; i < execButtons.length; i++) {
      execButtons[i].press(x, y);
    }
  }

  if (mode == "programming") {drawProg();}
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

function setupButtons() {
  var buttonHeit = 19;
  var save = new button("Save sheet", workplace[0], (defaultPatternHeit + 8) * TILE_WID + 5, 115, buttonHeit, saveSheet);
  var newSheetButton = new button("New sheet", workplace[0] + save.buttonWid + TILE_WID, (defaultPatternHeit + 8) * TILE_WID + 5, 108, buttonHeit, newSheet);
  var saveProgram = new button("Save program", workplace[0], (defaultPatternHeit + 9) * TILE_WID + 10 + 20, 140, buttonHeit, saveProg);
  var testButton = new button("Test", workplace[0] + saveProgram.buttonWid + TILE_WID, (defaultPatternHeit + 8) * TILE_WID + 10 + 20, 50, buttonHeit, test);
  var copySheet = new button("Copy Sheet", workplace[0], (defaultPatternHeit + 8) * TILE_WID + 10 + 20, 140, buttonHeit, function() {mainSheet = mainSheet.copy(); editing = false;});
  //var loadProgram = new button("Load", workplace[0] + saveProgram.buttonWid + TILE_WID, (defaultPatternHeit + 9) * TILE_WID + 10 + 20, 60, buttonHeit, readSingleFile);

  var dirLeft = new button("<---------", workplace[0], 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, moveDirectiveFigure, -1);
  var rotate = new button("Rotate", workplace[0] + dirLeft.buttonWid + TILE_WID/2, 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, rotateDirectiveFigure);
  var dirRight = new button("--------->", workplace[0] + 7 * TILE_WID, 5 * TILE_WID + 3, 3 * TILE_WID, buttonHeit, moveDirectiveFigure, 1);

  progButtons = [save, newSheetButton, saveProgram, testButton, dirLeft, rotate, dirRight, copySheet];

  var figureLabels = ["Line", 'T', 'S', 'Z', 'Block', 'G', 'L'];

  for (var i = 0; i < 7; i++) {
    var figureButton = new button(figureLabels[i], workplace[0] + defaultPatternWid * TILE_WID + TILE_WID, TILE_WID * (i + 1), 60, buttonHeit, changeFigure, i);
    progButtons.push(figureButton);
    var figureToggle = new button("", workplace[0] + defaultPatternWid * TILE_WID + TILE_WID + figureButton.buttonWid + 5, TILE_WID * (i + 1), buttonHeit, buttonHeit, drawProg, undefined, true, "+");
    progButtons.push(figureToggle);
    FIGURE_BUTTONS.push(figureToggle);
  }

  var newGameButton = new button("New Game", workplace[0], (fieldHeit + 2) * TILE_WID, 120, buttonHeit, newGame);
  var stopButton = new button("Stop", workplace[0] + newGameButton.buttonWid + 10, (fieldHeit + 2) * TILE_WID, 100, buttonHeit, function() {if (!gamePaused) {pauseGame();} mode = "programming"; drawProg();});
  var pauseGameButton = new button("Pause", workplace[0], (fieldHeit + 3) * TILE_WID, 120, buttonHeit, pauseGame);
  var nextButton = new button("Next", workplace[0] + pauseGameButton.buttonWid + 10, (fieldHeit + 3) * TILE_WID, 120, buttonHeit, nextFigure);
  var fastButton = new button("Fast", workplace[0], (fieldHeit + 4) * TILE_WID, 120, buttonHeit, fastGameLoop);
  var statsButton = new button("Stats", workplace[0] + fastButton.buttonWid + 10, (fieldHeit + 4) * TILE_WID, 120, buttonHeit, printStats);

  execButtons = [stopButton, newGameButton, pauseGameButton, nextButton, fastButton, statsButton];
}
