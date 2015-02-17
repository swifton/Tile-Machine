function drawData(data, start){
  var wid = data.length;
  var heit = data[0].length;

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

function drawProg() {
  clear(c);
  drawData(mainSheet.pattern, workplace);
  for (i = 0; i < program.length; i++) {
    drawData(program[i].pattern, [diam, i * sheetH * diam + diam * (i + 1) + programOffset]);
  }

  drawButtons(progButtons);
}

function drawExec() {
  drawData(field, workplace);
  drawData(command.pattern, add(workplace, [sheetW * diam, 0]));
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

function button(label, x, y, wid, heit, func) {
  this.label = label;
  this.x = x;  
  this.y = y;
  this.wid = wid;
  this.heit = heit;

  this.draw = draw;
  function draw() {
    rectangle([this.x, this.y], this.wid, this.heit);
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
  var save = new button("Save sheet", workplace[0], sheetH * diam + 5, 115, 19, saveSheet);
  var newSheetButton = new button("New sheet", workplace[0] + save.wid + diam, sheetH * diam + 5, 108, 19, newSheet);
  var saveProgram = new button("Save program", workplace[0], sheetH * diam + 10 + 20, 140, 19, saveProg);
 // var loadProgram = new button("Load", workplace[0] + saveProgram.wid + diam, sheetH * diam + 10 + 20, 80, 19, loadProg);
  var testButton = new button("Test", workplace[0] + saveProgram.wid + diam, sheetH * diam + 10 + 20, 50, 19, test);
  progButtons = [save, newSheetButton, saveProgram, testButton];
  execButtons = [];
}























