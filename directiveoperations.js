function checkDirective(number, offset, rotation) {
  for (i = 0; i < 4; i++) {
    if ((figures[number][rotation][i][0] + offset < 0) || (figures[number][rotation][i][0] + offset > defaultPatternWid - 1)) return false;
  }
  return true;
}

function showFigure(number) {
  currentDirectiveFigure = number;
  nOfProgFigure = number;
  directive = new sheet(defaultPatternWid, 4);
  var offset = mainSheet.directives[number][0];
  var rotation = mainSheet.directives[number][1];
  var figure = figures[number][rotation];

  for (i = 0; i < 4; i++) {
    directive.pattern[figure[i][0] + offset][figure[i][1]] = number + 1;
  }

  calculateLanding(mainSheet, number);

  drawProg();
}

function moveDirectiveFigure(where) {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0] + where, mainSheet.directives[currentDirectiveFigure][1])) return;
  mainSheet.directives[currentDirectiveFigure][0] += where;
  showFigure(currentDirectiveFigure);
  calculateLanding(mainSheet, currentDirectiveFigure);
  drawProg();
}

function rotateDirectiveFigure() {
  if (!checkDirective(currentDirectiveFigure, mainSheet.directives[currentDirectiveFigure][0], (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length)) return;
  mainSheet.directives[currentDirectiveFigure][1] = (mainSheet.directives[currentDirectiveFigure][1] + 1) % figures[currentDirectiveFigure].length;
  showFigure(currentDirectiveFigure);
  calculateLanding(mainSheet, currentDirectiveFigure);
  drawProg();
}

function calculateLanding(sh, fignum) {
  var fig = [[0, 0], [0, 0], [0, 0], [0, 0]];

  for (var j = 0; j < 4; j++) {
    fig[j][0] = figures[fignum][sh.directives[fignum][1]][j][0];
    fig[j][1] = figures[fignum][sh.directives[fignum][1]][j][1];
    fig[j][0] += sh.directives[fignum][0];
  }

  if (!checkFig(fig)) {}// this is a shitty pattern. do something about it later.

  for (;checkFig(fig);) {
    for (var i = 0; i < 4; i++) {
      fig[i][1] += 1;
    }
  }
  for (var i = 0; i < 4; i++) {
      fig[i][1] -= 1;
  }
  mainSheet.landing[fignum] = fig;
}

function checkFig(fig) {
  for (var i = 0; i < 4; i++) {
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == undefined) {return false;}
    if (mainSheet.pattern[fig[i][0]][fig[i][1]] == 8) {return false;}
  }
  return true;
}

function createShowFigure(number) {
  return function() {showFigure(number)};
}

function calculateAllLandings(){
  for (i = 0; i < 7; i++) {
    calculateLanding(mainSheet, i);
  }
}
