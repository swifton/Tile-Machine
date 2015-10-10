// TODO: GUI is very messy. Need to make it more abstract. Make one file for each screen.
function drawButtons(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
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

function setupButtons() {
  setupProgButtons();
  setupExecButtons();
}
