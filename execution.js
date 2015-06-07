function findCommand() {
  for (i = 0; i < program.length; i++) {
    var c = advancedMatching(program[i]);
    if (c[0] != 0) {
      command = c[0];
      recognitionOffset = c[1];
      recognitionOffsetY = c[2];
      //advancedMatch = i;
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

function advancedMatching(command) {
  matches = [];
  for (var i = 0; i < fieldWid - command.patternWid + 1; i++) {
    for (var j = 0; j < fieldHeit -command.patternHeit + 1; j++) {
      if (comparePatterns(command.pattern, field, i, j, command.patternWid, command.patternHeit, command.patternOffsetX, command.patternOffsetY)) {matches.push([command, i, j])}
    }
  }

  var a = matches[matches.length - 1] || [0, 0, 0];
  return a;

  for (var i = 0; i < matches.length; i++) {
    if (!checkMatch(matches[i], command)) {matches.remove(i, i + 1);}
  }
}

function checkMatch(someMatch, command) {
  var fig = command.landing[nOfFigure];
  p(command.landing);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < someMatch[1] + fig[i][1] - command.up + 1; j++) {
      debugSquare(debugStart(workplace, someMatch[0] + fig[i][0] - command.left - 1, i), i);
      if (field[someMatch[0] + fig[i][0] - command.left - 1][j] != 0) {return false;}
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

