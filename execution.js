function findCommand() {
  for (i = 0; i < program.length; i++) {
    //advancedMatching(program[i])
    if (matches != []){
      advancedMatch = i;
    //  return;
    }
    if (checkCommand(program[i])) {
      command = program[i].copy();
      return;
    }
  }
  command = new sheet(sheetW, sheetH);
}

function checkCommand(command) {
    if (comparePatterns(command.pattern, field, 0, 10, sheetW, sheetH, 0, 0)) {return true;}
  return false;
}

function advancedMatching(command) {
  matches = [];
  var patternWid = command.right - command.left;
  var patternHeit = command.down - command.up;
  for (var i = 0; i < fieldW - patternWid + 1; i++) {
    for (var j = 0; j < fieldH - patternHeit + 1; j++) {
      if (comparePatterns(command.pattern, field, i, j, patternWid, patternHeit, command.left, command.up)) {matches.push([i, j])}
    }
  }

  for (var i = 0; i < matches.length; i++) {
    if (!checkMatch(matches[i], command)) {matches.remove(i, i + 1);}
  }
}

function checkMatch(someMatch, command) {
  var fig = command.landing[nOfFigure];
  p(command.landing);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < someMatch[1] + fig[i][1] - command.up + 1; j++) {
      debugSquare(debugStart(workplace, someMatch[0] + fig[i][0] - command.left - 1, j), i);
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
      if (!compare(pattern[i + patternLeft][j + patternUp], field[i + offsetX][j + offsetY])) {return false;}
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

