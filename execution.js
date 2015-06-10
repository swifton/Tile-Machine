function findCommand() {
  removedMatches = [];

  for (var i = 0; i < program.length; i++) {
    var c = advancedMatching(program[i], i);
    if (c != -1) {
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
  for (var i = 0; i < fieldWid - command.patternWid + 1; i++) {
    for (var j = 0; j < fieldHeit -command.patternHeit + 1; j++) {
      if (comparePatterns(command.pattern, field, i, j, command.patternWid, command.patternHeit, command.patternOffsetX, command.patternOffsetY)) {matches.push([n, i, j, command.patternWid, command.patternHeit])}
    }
  }

  var rm = removeMatches(matches, checkMatch, command);
  removedMatches = removedMatches.concat(rm[0]);
  matches = rm[1];

  var a = matches[matches.length - 1] || -1;
  return a;
}

function removeMatches(matchesArray, filterFunction, command) {
  var removedMatchesArray = [];
  var toRemove = [];

  for (var i = 0; i < matchesArray.length; i++) {
    if (!filterFunction(matchesArray[i], command)) {
    p('filter function invoked');
      removedMatchesArray.push(matches[i]);
      toRemove.push(i);
    }
  }

  for (var i = 0; i < toRemove.length; i++) {
    matchesArray.remove(i, i + 1);
  }

  return [removedMatchesArray, matchesArray];
}

function checkMatch(match, command) {
  var fig = command.landing[nOfFigure];
  for (var i = 0; i < 4; i++) {
    brk = [fig[i][0] + match[1] - command.patternOffsetX, fig[i][1] + match[2] - command.patternOffsetY];
    debugField(brk[0], brk[1], i);

    for (var j = brk[1]; j > -1; j--) {
      if (field[brk[0]][j] != 0) {return false;}
    }
  }
  return true;
}

function comparePatterns(pattern1, pattern2, offsetX, offsetY, patternWid, patternHeit, patternLeft, patternUp) {
  for (var i = 0; i < patternWid; i++) {
    for (var j = 0; j < patternHeit; j++) {
      if((pattern2[i + offsetX] == undefined) || (pattern2[i + offsetX][j + offsetY] == undefined)) {
        p('undefined field invoked');
        if (pattern1[i + patternLeft][j + patternUp] == anything) {continue;}
        else {return false;}
      }
      if (!compare(pattern1[i][j], pattern2[i + offsetX][j + offsetY])) {return false;}
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

