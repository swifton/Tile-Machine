// Initialization functions
var matchingTime = 0;
function newFigure() {
  numberOfTilesDropped ++;
  nOfFigure = newNOfFigure;
  getNewFigure();
  var s0 = performance.now();
  findCommand();
  var s1 = performance.now();
  matchingTime += s1 - s0;
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

function dropLowestNextFigure() {
  clear();
  dropFigure();
  dropLowestUpdateField();
  drawExec();
}

function dropLowestUpdateField(){
  if (checkMove([0,1])){
	    var p0 = performance.now();
    updatePosition(-nOfFigure - 1);
	  var p1 = performance.now();
    checkField();
	  var p2 = performance.now();
    dropLowestNewFigure();
	  var p3 = performance.now();
    checkEnd();
	  var p4 = performance.now();
    updatePosition(nOfFigure + 1);
	  var p5 = performance.now();
	  
	  totalUpdatePositionTime += p1 - p0;
	  totalCheckFieldTime += p2 - p1;
	  totalNewFigureTime += p3 - p2;
	  totalCheckEndTime += p4 - p3;
	  totalUpdatePositionTime += p5 - p4;
	  
    return 1;
  }
  updatePosition(0);
  for (var i = 0; i < 4; i++){figure[i][1]++;}	
  updatePosition(nOfFigure + 1);
}

function dropLowestNewFigure() {
  numberOfTilesDropped ++;
  nOfFigure = newNOfFigure;
  getNewFigure();
  lowestPosition = findLowestPosition(figures[nOfFigure]);
  
  var offset = lowestPosition[2];
  var rotation = lowestPosition[1];
  
  sequenceOfTetriminoes.push([nOfFigure, offset, rotation]);
  
  for (var j = 0; j < 4; j++) {
    figure[j][0] = figures[nOfFigure][rotation][j][0] + offset;
	figure[j][1] = figures[nOfFigure][rotation][j][1];
  }
  
}

function findLowestPosition(figureWithRotations) {
	var depthsOfDrop = [];
	var figure;

	for (var rotation = 0; rotation < figureWithRotations.length; rotation ++) {
		figure = figureWithRotations[rotation];

		for (shift = -14; shift < fieldWid + 14; shift++) {
			tmp = false;
			
			for (tile = 0; tile < 4; tile++) {
				
				if (figure[tile][0] + shift < 1 || figure[tile][0] + shift >= fieldWid - 1) {tmp = true;}
			}
			if (tmp) {continue;}
			
			var currentDepth = dropLowestCheckLanding([rotation, shift, 0], figure);
			
			depthsOfDrop.push([currentDepth, rotation, shift]);
		}
	}

	var result = depthsOfDrop[0];
	
	for (var i = 0; i < depthsOfDrop.length; i++) {
		if (depthsOfDrop[i][0] > result[0]) {result = depthsOfDrop[i];}
	}
	
	var acceptableDrops = [];
	
	for (var i = 0; i < depthsOfDrop.length; i++) {
		if (depthsOfDrop[i][0] == result[0]) {acceptableDrops.push(depthsOfDrop[i]);}
	}
	
	var indexOfAnswer = Math.floor(Math.random()*acceptableDrops.length);
	
	return acceptableDrops[indexOfAnswer];
}

function dropLowestCheckLanding(match, figure) {
  var maxDepth = [0,0,0,0];
  var depth = 0;
  var brk = [0,0,0,0];
  for (var i = 0; i < 4; i++) {
    brk[i] = [figure[i][0] + match[1], figure[i][1]];
  }
  var tmp = false;
  for (var j = 0; j < fieldHeit; j++) {
	for (var i = 0; i < 4; i++) {
	  if (field[figure[i][0] + match[1]][j + figure[i][1]] != 0) {
		depth = j;
		tmp = true;
	  }
	}
	if (tmp) {break;}
  }
  
  for (var i = 0; i < 4; i++) {
	maxDepth[i] = j + figure[i][1];
  }
  
  //var result = maxDepth[0];
  //for (var i = 0; i < maxDepth.length; i++) {
//		if (maxDepth[i] > result) {result = maxDepth[i];}
  //}
  
  var result = 0;
  for (var i = 0; i < maxDepth.length; i++) {
		result += maxDepth[i];
  }

  return result;
}

var totalDropTime = 0;
var totalUpdateTime = 0;

function veryFastNextFigure() {
  var t0 = performance.now();
  dropFigure();
  var t1 = performance.now();
  updateField();
  //dropLowestUpdateField();
  var t2 = performance.now();
  totalDropTime += t1 - t0;
  totalUpdateTime += t2 - t1;
  
//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

function challengeNextFigure() {
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

var totalUpdatePositionTime = 0;
var totalCheckFieldTime = 0;
var totalNewFigureTime = 0;
var totalCheckEndTime = 0;


function updateField(){
  if (checkMove([0,1])){
	    var p0 = performance.now();
    updatePosition(-nOfFigure - 1);
	  var p1 = performance.now();
    checkField();
	  var p2 = performance.now();
    newFigure();
	  var p3 = performance.now();
    checkEnd();
	  var p4 = performance.now();
    updatePosition(nOfFigure + 1);
	  var p5 = performance.now();
	  
	  totalUpdatePositionTime += p1 - p0;
	  totalCheckFieldTime += p2 - p1;
	  totalNewFigureTime += p3 - p2;
	  totalCheckEndTime += p4 - p3;
	  totalUpdatePositionTime += p5 - p4;
	  
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
