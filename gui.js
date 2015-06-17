function drawData(data, start, wid, heit){
  var wid = wid || data.length;
  var heit = heit || data[0].length;

  rectangle(start, wid * diam, heit * diam);

  for (var i = 0; i < wid; i++){
    for (var j = 0; j < heit; j++){
      if (data[i][j] != 0) {
        drawTile(start[0] + i * diam + radius, start[1] + j * diam + radius, Math.abs(data[i][j]), ctx);
      }
    }
  }
};

function drawButtons(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
}

function drawLanding() {
  var fig = mainSheet.landing[currentDirectiveFigure];
  if (fig == 0) {return;}
  for (var i = 0; i < 4; i++) {
    drawTile(workplace[0] + fig[i][0] * diam + radius, workplace[1] + fig[i][1] * diam + radius + 7 * diam, currentDirectiveFigure + 1, ctx);
  }
}

function drawFrame(sheet, start) {
  rectangle(add(start, [diam * (sheet.patternOffsetX), diam * (sheet.patternOffsetY)]), diam * (sheet.patternWid), diam * (sheet.patternHeit));
}

function drawProg() {
  clear(c);
  drawData(directive.pattern, add(workplace, [0, diam]));
  drawData(mainSheet.pattern, add(workplace, [0, 7 * diam], mainSheet.patternWid, mainSheet.patternHeit));
  drawFrame(mainSheet, add(workplace, [0, 7 * diam]));

  var heitOffset = 0;
  for (var i = 0; i < program[nOfProgFigure].length; i++) {
    var com = program[nOfProgFigure][i];
    drawData(com.pattern, add([diam, heitOffset * diam + diam * (i + 1) + programOffset], /*[diam * com.patternOffsetX, diam * com.patternOffsetY]*/[0,0]), com.patternWid, com.patternHeit);
    //drawFrame(com, [diam, heitOffset * diam + diam * (i + 1) + programOffset]);
    heitOffset += com.patternHeit;
  }

  drawLanding();

  drawButtons(progButtons);
}

function drawFrames() {
  for (var i = 0; i < matches.length; i++) {
    rectangle(add(workplace, [diam * matches[i][1], diam * matches[i][2]]), diam * command.patternWid, diam * command.patternHeit, "#999");
  }

  for (var i = 0; i < removedMatches.length; i++) {
    rectangle(add(workplace, [diam * removedMatches[i][1], diam * removedMatches[i][2]]), diam * removedMatches[i][3], diam * removedMatches[i][4], "#900");
  }

  for (var i = 0; i < inefficientMatches.length; i++) {
    rectangle(add(workplace, [diam * inefficientMatches[i][1], diam * inefficientMatches[i][2]]), diam * inefficientMatches[i][3], diam * inefficientMatches[i][4], "#990");
  }

  rectangle(add(workplace, [diam * recognitionOffset, diam * recognitionOffsetY]), diam * command.patternWid, diam * command.patternHeit, "#000");
}

function drawExec() {
  drawData(field, workplace);
  drawData(command.pattern, add(workplace, [fieldWid * diam, 0]), command.patternWid, command.patternHeit);
  drawFrames();
  drawButtons(execButtons);
}

function drawTile(x, y, im, cc) {
  cc.drawImage(images[im], x - radius, y - radius); 
}

function buttonPress(mousePos) {
  var x = mousePos.x;
  var y = mousePos.y;

  if (mode == "programming") {
    for (var i = 0; i < progButtons.length; i++) {
      progButtons[i].press(x, y);
    }
  }

  else if (mode == "executing") {
    for (var i = 0; i < execButtons.length; i++) {
      execButtons[i].press(x, y);
    }
  }
}

function sheetInput(mousePos) {
  if (mode != "programming") return;
  i = Math.floor((mousePos.x - workplace[0]) / diam);
  j = Math.floor((mousePos.y - workplace[1] - 7 * diam) / diam);
  if ((i > defaultPatternWid - 1) || (j > defaultPatternHeit - 1) || (i < 0) || (j < 0)) return;
  mainSheet.pattern[i][j] += 1;
  if (mainSheet.pattern[i][j] == 10) {mainSheet.pattern[i][j] = 0;}
  if (mainSheet.pattern[i][j] == 1) {mainSheet.pattern[i][j] = 8;}
  calculateAllLandings()
  drawProg();
}

function scroll(event) {
  if (mode != "programming") return;
  var direction = Math.sign(event.wheelDeltaY);
  var scrollSpeed = 30;
  programOffset += scrollSpeed * direction;
  for (var i = nOfStandardButtons; i < progButtons.length; i++) {
    progButtons[i].y += scrollSpeed * direction;
  }
  drawProg();
}

function button(label, x, y, wid, heit, func) {
  this.label = label;
  this.x = x;  
  this.y = y;
  this.wid = wid;
  this.heit = heit;

  this.draw = draw;
  function draw() {
    rectangle([this.x, this.y], this.wid, this.heit, "black");
    drawLabel(this.label, this.x + 1, this.y + this.heit - 2)
  }

  this.press = press;
  function press(pressX, pressY) {
    if ((pressX > this.x) && (pressX < this.x + this.wid) && (pressY > this.y) && (pressY < this.y + this.heit)) {
      this.func()
    }
  }

  this.func = func;
}

function setupButtons() {
  var buttonHeit = 19;
  var sheetLeft = new button("<---------", workplace[0], (defaultPatternHeit + 7) * diam + 3, 3 * diam, buttonHeit, function() {moveSheet(-1)});
  var sheetRight = new button("--------->", workplace[0] + 7 * diam, (defaultPatternHeit + 7) * diam + 3, 3 * diam, buttonHeit, function() {moveSheet(1)});
  var sheetUp = new button("^", workplace[0] - diam, (7) * diam + 3, buttonHeit, diam, liftSheet);
  var sheetDown = new button("v", workplace[0] - diam, (9 + 7) * diam + 3, buttonHeit, diam, pushSheet);
  var save = new button("Save sheet", workplace[0], (defaultPatternHeit + 8) * diam + 5, 115, buttonHeit, saveSheet);
  var newSheetButton = new button("New sheet", workplace[0] + save.wid + diam, (defaultPatternHeit + 8) * diam + 5, 108, buttonHeit, newSheet);
  var saveProgram = new button("Save program", workplace[0], (defaultPatternHeit + 8) * diam + 10 + 20, 140, buttonHeit, saveProg);
  var testButton = new button("Test", workplace[0] + saveProgram.wid + diam, (defaultPatternHeit + 8) * diam + 10 + 20, 50, buttonHeit, test);
  var copySheet = new button("Copy Sheet", workplace[0], (defaultPatternHeit + 9) * diam + 10 + 20, 140, buttonHeit, function() {mainSheet = mainSheet.copy(); editing = false;});

  var dirLeft = new button("<---------", workplace[0], 5 * diam + 3, 3 * diam, buttonHeit, function() {moveDirectiveFigure(-1)});
  var rotate = new button("Rotate", workplace[0] + dirLeft.wid + radius, 5 * diam + 3, 3 * diam, buttonHeit, rotateDirectiveFigure);
  var dirRight = new button("--------->", workplace[0] + 7 * diam, 5 * diam + 3, 3 * diam, buttonHeit, function() {moveDirectiveFigure(1)});

  progButtons = [sheetLeft, sheetRight, sheetUp, sheetDown, save, newSheetButton, saveProgram, testButton, dirLeft, rotate, dirRight, copySheet];

  var figureLabels = ["Line", 'T', 'S', 'Z', 'Block', 'G', 'L'];

  for (var i = 0; i < 7; i++) {
    var figureButton = new button(figureLabels[i], workplace[0] + defaultPatternWid * diam + diam, diam * (i + 1), 60, buttonHeit, createShowFigure(i));
    progButtons.push(figureButton);
  }

  var newGameButton = new button("New Game", workplace[0], (fieldHeit + 2) * diam, 120, buttonHeit, newGame);
  var stopButton = new button("Stop", workplace[0] + newGameButton.wid + 10, (fieldHeit + 2) * diam, 100, buttonHeit, function() {if (!gamePaused) {pauseGame();} mode = "programming"; drawProg();});
  var pauseGameButton = new button("Pause", workplace[0], (fieldHeit + 3) * diam, 120, buttonHeit, pauseGame);
  var nextButton = new button("Next", workplace[0] + pauseGameButton.wid + 10, (fieldHeit + 3) * diam, 120, buttonHeit, nextFigure);
  var fastButton = new button("Fast", workplace[0], (fieldHeit + 4) * diam, 120, buttonHeit, fastGameLoop);
  var statsButton = new button("Stats", workplace[0] + fastButton.wid + 10, (fieldHeit + 4) * diam, 120, buttonHeit, printStats);

  execButtons = [stopButton, newGameButton, pauseGameButton, nextButton, fastButton, statsButton];
}
