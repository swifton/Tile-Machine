function drawButtons(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
}

function buttonPress(mousePos) {
  var x = mousePos.x;
  var y = mousePos.y;

  if (mode == "programming") {
    pressButtons(progButtons, x, y);

    if (editingWindowEnabled) {
      pressButtons(editingWindow, x, y);
    }

    program[N_PROG_FIGURE].press(x, y);
  }

  else if (mode == "executing") {
    pressButtons(execButtons, x, y);
  }

  if (mode == "programming") {drawProg();}
}

function pressButtons(buttonsArray, x, y) {
  for (var i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].press(x, y);
  }
}

function setupButtons() {
  setupProgButtons();
  setupExecButtons();
}
