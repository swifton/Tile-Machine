function changeFigure(number) {
  if (number == N_PROG_FIGURE) {return;}
  N_PROG_FIGURE = number;
  newSheet();
  showFigure();
}

function showFigure() {
  var figure = figures[N_PROG_FIGURE][mainSheet.directive[1]];
  directiveWindow.reset();
  for (i = 0; i < 4; i++) {
    directiveWindow.pattern[figure[i][0] + mainSheet.directive[0]][figure[i][1]] = N_PROG_FIGURE + 1;
  }
}

function moveDirectiveFigure(where) {
  if (!checkDirective(N_PROG_FIGURE, mainSheet.directive[0] + where, mainSheet.directive[1])) return;
  mainSheet.directive[0] += where;
  showFigure();
  calculateLanding(mainSheet);
}

function rotateDirectiveFigure() {
  if (!checkDirective(N_PROG_FIGURE, mainSheet.directive[0], (mainSheet.directive[1] + 1) % figures[N_PROG_FIGURE].length)) return;
  mainSheet.directive[1] = (mainSheet.directive[1] + 1) % figures[N_PROG_FIGURE].length;
  showFigure();
  calculateLanding(mainSheet);
}

function checkDirective(number, directiveShift, rotation) {
  for (i = 0; i < 4; i++) {
    if ((figures[number][rotation][i][0] + directiveShift < 0) || (figures[number][rotation][i][0] + directiveShift > defaultPatternWid - 1)) return false;
  }
  return true;
}

function calculateLanding(sh) {
  var fig = [[0, 0], [0, 0], [0, 0], [0, 0]];

  for (var j = 0; j < 4; j++) {
    fig[j][0] = figures[N_PROG_FIGURE][sh.directive[1]][j][0];
    fig[j][1] = figures[N_PROG_FIGURE][sh.directive[1]][j][1];
    fig[j][0] += sh.directive[0] + sh.patternOffsetX;
  }

  for (;checkFig(fig);) {
    for (var i = 0; i < 4; i++) {
      fig[i][1] += 1;
    }
  }
  for (var i = 0; i < 4; i++) {
      fig[i][1] -= 1;
  }
  mainSheet.landing = fig;
}

function checkFig(fig) {
  for (var i = 0; i < 4; i++) {
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == undefined) {return false;}
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == 8) {return false;}
  }
  return true;
}
