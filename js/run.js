// Initialization functions
function newFigure() {
  numberOfTilesDropped ++;
  nOfFigure = newNOfFigure;
  getNewFigure();

  findCommand();
  var offset = command.directive[0] + recognitionOffset;
  var rotation = command.directive[1];
  
  sequenceOfTetriminoes.push([nOfFigure, offset, rotation]);

  for (var j = 0; j < 4; j++) {
    figure[j] = figures[nOfFigure][rotation][j].slice(0);
    figure[j][0] += offset;
  }
}

function newFigureReplay() {
  numberOfTilesDropped ++;
  if (sequenceOfTetriminoes.length == 0) {return;}
  var fig = sequenceOfTetriminoes[0];
  sequenceOfTetriminoes.splice(0, 1);
  
  nOfFigure = fig[0];

  findCommand(); // This is for the display of rectangles.
  var offset = fig[1];
  var rotation = fig[2];

  for (var j = 0; j < 4; j++) {
    figure[j] = figures[nOfFigure][rotation][j].slice(0);
    figure[j][0] += offset;
  }
}

function getNewFigure() {
  newNOfFigure = allowedFigures[Math.floor(Math.random()*allowedFigures.length)];
}

function nextFigure() {
  clear();
  dropFigure();
  updateField();
  drawExec();
}

function veryFastNextFigure() {
  clear();
  dropFigure();
  updateField();
}

function nextFigureReplay() {
  clear();
  dropFigure();
  updateFieldReplay();
  drawExec();
}

// Functions that simulate the simple tile game

function newGame(){
  finishGameStats();
  if (numberOfGamesPlayed != 0) {printStats();}
  newGameStats();
  fill2DArray(field, 0, true, true, true);
  if (gamePaused) {pauseGame();}
  sequenceOfTetriminoes = [];
  getNewFigure();
  newFigure();
  updateField();
  clear();
  drawExec();
}

function pauseGame() {
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } else if (gamePaused) {
    //gLoop = setTimeout(GameLoop, 1000 / 4);
    //gamePaused = false;
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

function updateFieldReplay(){
  if (checkMove([0,1])){
    updatePosition(-nOfFigure - 1);
    checkField();
    newFigureReplay();
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
  for (var j = 1; j < fieldWid - 1; j++){ // one block on each side doesn't get checked, since these are walls
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
      numberOfLinesDeleted ++;
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

  moveFigure([0, k - 1]);
}

var GameLoop = function() {
  clear();
  updateField();
  drawExec();

  gLoop = setTimeout(GameLoop, 1000/8);
}
