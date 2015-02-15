//Draw functions

function draw(data, canvas, start){
  var context = canvas.getContext('2d');
  var wid = data.length;
  var heit = data[0].length;

  cwid = 2 * wid * radius;
  cheit = 2 * heit * radius;
  //canvas.width = cwid;
  //canvas.height = cheit;

  clear(c);

  rectangle(workplace, sheetW * radius * 2, sheetH * radius * 2);

  for (var i = 0; i < wid; i++){
    for (var j = 0; j < heit; j++){
      if (data[i][j] != 0) {
        drawTile(start[0] + i * 2 * radius + radius, start[1] + j * 2 * radius + radius, images[Math.abs(data[i][j]) - 1], context);
      }
    }
  }
};

// Initialization functions

var newFigure = function() {
	nOfFigure = newNOfFigure;
	newNOfFigure = Math.floor(Math.random()*7);
	for (var j = 0; j < 4; j++)
	{
		figure[j] = figures[nOfFigure][j].slice(0);
	}
	figuresReceived += 1;
}

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
	newFigure();
	if (gamePaused == true){ pauseGame(); }
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

var updateField = function(){
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
	for (var j = 0; j < fieldW; j++){
		if (field[j][0] < 0) {b = 1}
	}
	if (b == 1) {newGame();}
}

var checkField = function(){
	var sum;
	for (var i = 0; i < fieldH; i++){
		sum = 1;
		for (var j = 0; j < fieldW; j++){
			sum *= field[j][i];
		}
		if (sum != 0){
			linesDeleted += 1;
			for (var j = 0; j < fieldW; j++){
				field[j][i] = 0;
			}
			for (var k = i; k > 0; k--){
				for (var j = 0; j < fieldW; j++){
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
		if (arr[i][1] < 0 || arr[i][0] > fieldW - 1 || arr[i][0] < 0){ return false; }
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

var rotateFigure = function(){
	if (nOfFigure == 4) { return 1; }
	tmp = new Array(4);
	var a;
	for (var i = 0; i < 4; i++){
		tmp[i] = figure[i].slice(0);
		tmp[i][0] -= figure[1][0];
		tmp[i][1] -= figure[1][1];
		if (nOfFigure == 0){
			a = tmp[i][0];
			tmp[i][0] = tmp[i][1];
			tmp[i][1] = a;
		}
	}
	if (nOfFigure == 1){
		tmp = [tmp[3],tmp[1],[-tmp[3][0],-tmp[3][1]],tmp[2]]
	}
	
	if (nOfFigure == 2 || nOfFigure == 3){
		tmp = [[-tmp[2][0],-tmp[2][1]],tmp[1],tmp[0],[tmp[0][0]+tmp[2][0],tmp[0][1]+tmp[2][1]]]
	}
	
	if (nOfFigure == 5){
		tmp = [tmp[3],[-tmp[3][0],-tmp[3][1]],tmp[1],[-tmp[3][0]-tmp[2][0],-tmp[3][1]-tmp[2][1]]]
	} 
	
	if (nOfFigure == 6){
		tmp = [[-tmp[3][0],-tmp[3][1]],tmp[3],tmp[1],[tmp[3][0]+tmp[2][0],tmp[3][1]+tmp[2][1]]]
	}
	 
	for (var i = 0; i < 4; i++){
		tmp[i][0] += figure[1][0];
		tmp[i][1] += figure[1][1];
	}
	if (checkPosition(tmp)){
		for (var i = 0; i < 4; i++){
			figure[i] = tmp[i].slice(0);
		}
	}	
}

var dropFigure = function(){
	var tmp = new Array(4);
	for (var i = 0; i < 4; i++){
		tmp[i] = figure[i].slice(0);
	}
	var k = fieldH;
	
	for (var i = 0; i < 4; i++){
		j = 0;
		while (field[tmp[i][0]][tmp[i][1] + j] >= 0){
			j += 1;
		}
		if (j < k) { k = j; }
	}
	
	moveFigure([0, k -1]);
}

function doKeyDown(e) {
	if (gamePaused == true) {return;}
	var i = e.keyCode;
	//console.log(i);
	updatePosition(0);
	if (i == 37){
		moveFigure([-1, 0]);
	}
	if (i == 39){
		moveFigure([1, 0]);
	}
	if (i == 38){
		rotateFigure();
	}
	if (i == 40){
		dropFigure();
	}
	updatePosition(nOfFigure + 1);
	clear(c);
	draw(field, c);
}

var GameLoop = function(){
	clear(c);
	updateField();
	draw(field, c);
	drawNextFigure();

	gLoop = setTimeout(GameLoop, 1000 / 4);
}
