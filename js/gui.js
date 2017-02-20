function drawButtons(buttons, upTo) {
  for (var i = 0; i < buttons.length; i++) {
	if (upTo && i == upTo) {break}
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
  
  else if (mode == "challenges") {
    pressButtons(challengeButtons, x, y);
  }

  if (mode == "programming") {drawProg();}
  
  if (mode == "challenges") {drawChallenges();}
}

function pressButtons(buttonsArray, x, y) {
  for (var i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].press(x, y);
  }
}

function setupButtons() {
  setupProgButtons();
  setupExecButtons();
  setupChallengeButtons();
}
