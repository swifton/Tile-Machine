// Initialization functions
function newFigure() {
  nOfFigure = newNOfFigure;
  getNewFigure();

  findCommand();
  var offset = command.directives[nOfFigure][0] - command.patternOffsetX + recognitionOffset;
  var rotation = command.directives[nOfFigure][1];

  for (var j = 0; j < 4; j++) {
    figure[j] = figures[nOfFigure][rotation][j].slice(0);
    figure[j][0] += offset;
  }
  figuresReceived += 1;
}

function getNewFigure() {
  newNOfFigure = allowedFigures[Math.floor(Math.random()*allowedFigures.length)];
}

function nextFigure() {
  clear(c);
  dropFigure();
  updateField();
  drawExec();
}

// Tetris game functions
function reset(data, value, ground) {
  value = value || 0;
  var wid = data.length;
  var hei = data[0].length;

  for (var i = 0; i < wid; i++){
    data[i] = new Array(hei);
    for (var j = 0; j < hei; j++){
      data[i][j] = value;
    }
  }

  if (ground) {
    for (var j = 0; j < wid; j++) {
      data[j][hei-1] = -1;
    }
  }

  linesDeleted = 0;
  figuresReceived = 0;
}

function newGame(){
  reset(field, 0, true);
  if (gamePaused) {pauseGame();}
  newFigure();
}

function pauseGame() {
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } else if (gamePaused) {
    gLoop = setTimeout(GameLoop, 1000 / 4);
    gamePaused = false;
  }
}

// Field processing functions
var updatePosition = function(num){
  for (var i = 0; i < 4; i++){
    field[figure[i][0]][figure[i][1]] = num;
  }
}

function updateField(){
  if (checkMove([0,1])){
    updatePosition(-nOfFigure - 1);
    checkField();
    newFigure();
    checkEnd();
    updatePosition(nOfFigure + 1);
    return 1;
  }
  updatePosition(0);
  for (var i = 0; i < 4; i++){figure[i][1]++;}	
  updatePosition(nOfFigure + 1);
}

// Check functions

var checkEnd = function(){
  var b = 0;
  for (var j = 0; j < fieldWid; j++){
    if (field[j][0] < 0) {b = 1}
  }
  if (b == 1) {newGame();}
}

var checkField = function(){
  var sum;
  for (var i = 0; i < fieldHeit; i++){
    sum = 1;
    for (var j = 0; j < fieldWid; j++){
      sum *= field[j][i];
    }
    if (sum != 0){
      linesDeleted += 1;
      for (var j = 0; j < fieldWid; j++){
        field[j][i] = 0;
      }
      for (var k = i; k > 0; k--){
        for (var j = 0; j < fieldWid; j++){
          field[j][k] = field[j][k-1];
        }
      }
    }
  }
}

var checkMove = function(dir){
  var arr = Array(4);
  for (var i = 0; i < 4; i++){
    arr[i] = [figure[i][0] + dir[0], figure[i][1] + dir[1]];
  }
  return !(checkPosition(arr));
}

var checkPosition = function(arr){
  for (var i = 0; i < 4; i++){
    if (arr[i][1] < 0 || arr[i][0] > fieldWid - 1 || arr[i][0] < 0){ return false; }
    if (field[arr[i][0]][arr[i][1]] < 0){ return false; }
  }
  return true;
}

// Figure operation functions

var moveFigure = function(dir){
  if (checkMove(dir)){ return 1; }
	
  updatePosition(0);
  for (var i = 0; i < 4; i++){
    figure[i][0] += dir[0];
    figure[i][1] += dir[1];
  }
  updatePosition(nOfFigure + 1);
}

var dropFigure = function() {
  var tmp = new Array(4);
  for (var i = 0; i < 4; i++){
    tmp[i] = figure[i].slice(0);
  }
  var k = fieldHeit;
	
  for (var i = 0; i < 4; i++){
    j = 0;
    while (field[tmp[i][0]][tmp[i][1] + j] >= 0){
      j += 1;
    }
    if (j < k) { k = j; }
  }

  moveFigure([0, k -1]);
}

var GameLoop = function() {
  clear(c);
  updateField();
  drawExec();

  gLoop = setTimeout(GameLoop, 1000/8);
}
