function drawExec() {
  drawData(field, workplace);
  drawData(command.pattern, add(workplace, [(fieldWid + 1) * TILE_WID, 0]), command.patternWid, command.patternHeit);
  drawFrames();
  drawButtons(execButtons);

  drawLabel("Maximum: " + maxNumberofLinesDeleted.toString(), 20, 60);
  drawLabel("Minimum: " + minNumberofLinesDeleted.toString(), 20, 100);
  drawLabel("Average: " + averageNumberOfLinesDeleted.toString(), 20, 20);
}

function drawFrames() { // TODO: this is bulshit. Formulas shouldn't be so long. Abstract this into a new function.
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

function setupExecButtons() {
 var buttonHeit = 19;

  var newGameButton = new button("New Game", workplace[0], (fieldHeit + 2) * TILE_WID, 120, buttonHeit, newGame);
  var stopButton = new button("Exit Testing", workplace[0] + newGameButton.buttonWid + 10, (fieldHeit + 2) * TILE_WID, 120, buttonHeit, function() {if (!gamePaused) {pauseGame();} mode = "programming"; drawProg();});
  var pauseGameButton = new button("Pause", workplace[0], (fieldHeit + 5) * TILE_WID, 120, buttonHeit, pauseGame);
  var nextButton = new button("Next Tetromino", workplace[0], (fieldHeit + 3) * TILE_WID, 150, buttonHeit, nextFigure);
  //var nextButton = new button("Next Tetromino", workplace[0], (fieldHeit + 3) * TILE_WID, 150, buttonHeit, dropLowestNextFigure);
  var fastButton = new button("Run", workplace[0], (fieldHeit + 4) * TILE_WID, 120, buttonHeit, launchFast);
  var statsButton = new button("Stats", workplace[0] + fastButton.buttonWid + 10, (fieldHeit + 4) * TILE_WID, 120, buttonHeit, printStats);
  var veryFastButton = new button("Get Stats", workplace[0] + fastButton.buttonWid + 10, (fieldHeit + 4) * TILE_WID, 120, buttonHeit, veryFastGameLoop);
  var lamestGameButton = new button("Lamest Games", 20, 140, 160, buttonHeit, lamestGame);
  var replayNextButton = new button("Next Tetromino", 20, 180, 160, buttonHeit, nextFigureReplay);

  execButtons = [stopButton, newGameButton, nextButton, fastButton, veryFastButton, lamestGameButton, replayNextButton, pauseGameButton];
}