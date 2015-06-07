function findCommand() {
  for (i = 0; i < program.length; i++) {
    var c = advancedMatching(program[i], i);
    if (c[0] != 0) {
      command = program[c[0]];
      recognitionOffset = c[1];
      recognitionOffsetY = c[2];
      return;
    }
    /*if (checkCommand(program[i])) {
      command = program[i].copy();
      return;
    }*/
  }
  command = new sheet(defaultPatternWid, defaultPatternHeit);
  recognitionOffset = 0;
}

function checkCommand(command) {
    if (comparePatterns(command.pattern, field, 0, 10, defaultPatternWid, defaultPatternHeit, 0, 0)) {return true;}
  return false;
}

function advancedMatching(command, n) {
  matches = [];
  removedMatches = [];
  for (var i = 0; i < fieldWid - command.patternWid + 1; i++) {
    for (var j = 0; j < fieldHeit -command.patternHeit + 1; j++) {
      if (comparePatterns(command.pattern, field, i, j, command.patternWid, command.patternHeit, command.patternOffsetX, command.patternOffsetY)) {matches.push([n, i, j])}
    }
  }

  for (var i = 0; i < matches.length; i++) {
    if (!checkMatch(matches[i], command)) {
      removedMatches.push(matches[i]);
      matches.remove(i, i + 1);
    }
  }

  var a = matches[matches.length - 1] || [0, 0, 0];
  return a;
}

function checkMatch(match, command) {
  var fig = command.landing[nOfFigure];
  for (var i = 0; i < 4; i++) {
    brk = [fig[i][0] + match[1] - command.patternOffsetX, fig[i][1] + match[2] - command.patternOffsetY];

    for (var j = brk[1]; j > -1; j--) {
      if (field[brk[0]][j] != 0) {return false;}
    }
  }
  return true;
}

function comparePatterns (pattern, field, offsetX, offsetY, patternWid, patternHeit, patternLeft, patternUp) {
  for (var i = 0; i < patternWid; i++) {
    for (var j = 0; j < patternHeit; j++) {
      if((field[i + offsetX] == undefined) || (field[i + offsetX][j + offsetY] == undefined)) {
        if (pattern[i + patternLeft][j + patternUp] == anything) {continue;}
        else {return false;}
      }
      if (!compare(pattern[i][j], field[i + offsetX][j + offsetY])) {return false;}
    }
  }
  return true;
}

function compare(pattern, field) {
  if (pattern == 9) {return true;}
  if ((pattern == 0) && (field == 0)) {return true;}
  if ((pattern == 8) && (field != 0)) {return true;} 
  return false;
}

