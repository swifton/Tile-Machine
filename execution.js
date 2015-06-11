function findCommand() {
  removedMatches = [];
  inefficientMatches = [];

  for (var i = 0; i < program[nOfFigure].length; i++) {
    var c = advancedMatching(program[nOfFigure][i], i);
    if (c != -1) {
      command = program[nOfFigure][c[0]];
      recognitionOffset = c[1];
      recognitionOffsetY = c[2];
      return;
    }
  }
  command = new sheet(defaultPatternWid, defaultPatternHeit, 0, 0);
  recognitionOffset = 0;
}

function advancedMatching(command, n) {
  matches = [];
  for (var i = 0; i < fieldWid - command.patternWid + 1; i++) {
    for (var j = 0; j < fieldHeit -command.patternHeit + 1; j++) {
      if (comparePatterns(command.pattern, field, i, j, command.patternWid, command.patternHeit, command.patternOffsetX, command.patternOffsetY)) {
        var topush = [n, i, j, command.patternWid, command.patternHeit];
        var a = matches.push(topush);
      }
    }
  }

  var rm = removeMatches(matches, checkBorders, command, []);
  removedMatches = removedMatches.concat(rm[0]);
  matches = rm[1];


  var rm = removeMatches(matches, checkLanding, command, []);
  removedMatches = removedMatches.concat(rm[0]);
  matches = rm[1];

  var minHeit = 0;
  for (var i = 0; i < matches.length; i++) {
    if (minHeit < matches[i][2]) {minHeit = matches[i][2]}
  }

  var rm = removeMatches(matches, checkHeit, command, [minHeit]);
  inefficientMatches = inefficientMatches.concat(rm[0]);
  matches = rm[1];

  var a = matches[matches.length - 1] || -1;
  return a;
}

function removeMatches(matchesArray, filterFunction, command, params) {
  var removedMatchesArray = [];
  var newMatchesArray = [];

  for (var i = 0; i < matchesArray.length; i++) {
    if (!filterFunction(matchesArray[i], command, params)) {
      removedMatchesArray.push(matches[i]);
    }
    else {
      newMatchesArray.push(matches[i]);
    }
  }

  return [removedMatchesArray, newMatchesArray];
}

function checkLanding(match, command, params) {
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

function checkBorders(match, command, params) {
  var fig = command.landing[nOfFigure];
  for (var i = 0; i < 4; i++) {
    brk = [fig[i][0] + match[1] - command.patternOffsetX, fig[i][1] + match[2] - command.patternOffsetY];
    if (field[brk[0]] == undefined) {return false;}
  }
  return true;
}

function checkHeit(match, command, params) {
  return match[2] == params[0];
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

