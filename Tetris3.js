var gLoop,
	c = document.getElementById('c'),
	cv = document.getElementById('cv'),	
	ctx = c.getContext('2d');
	ctxv = cv.getContext('2d');
	
	cv.width = 150;
	cv.height = 190;
	
var figure1 = [[3,0],[4,0],[5,0],[6,0]], 
	figure2 = [[3,0],[4,0],[5,0],[4,1]], 
	figure3 = [[5,0],[4,0],[4,1],[3,1]], 
	figure4 = [[3,0],[4,0],[4,1],[5,1]], 
	figure5 = [[3,0],[4,0],[3,1],[4,1]],
	figure6 = [[3,0],[5,0],[4,0],[5,1]],
	figure7 = [[5,0],[3,0],[4,0],[3,1]],
	figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];
	
var fieldH = 20, fieldW = 10, radius = 12.5;
width = fieldW * 2 * radius;
height = fieldH * 2 * radius;
c.width = width;
c.height = height;

var clear = function(ctx){
	ctx.fillStyle = '#d0e7f9';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

var drawTile = function(x, y, im, cc){
	var img=new Image();
	var str = "images/";
	img.src= str.concat(im);
	cc.drawImage(img, x - radius, y - radius); 
}

var newFigure = function(){
	nOfFigure = newNOfFigure;
	newNOfFigure = Math.floor(Math.random()*7);
	for (var j = 0; j < 4; j++)
	{
		figure[j] = figures[nOfFigure][j].slice(0);
	}
	figuresReceived += 1;
}

var resetField = function(){
	for (var i = 0; i < fieldW + 1; i++){
		field[i] = new Array(fieldH + 1);
		for (var j = 0; j < fieldH; j++){
			field[i][j] = 0;
		}
	}

	for (var j = 0; j < fieldW; j++){
			field[j][fieldH] = -1;
	}
	linesDeleted = 0;
	figuresReceived = 0;
}

function pauseGame() {
console.log(gamePaused);
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } else if (gamePaused) {
    gLoop = setTimeout(GameLoop, 1000 / 4);
    gamePaused = false;
  }
}

function NewGame(){
	resetField();
	newFigure();
	if (gamePaused == true){ pauseGame(); }
}

var figure = [[0,0],[0,0],[0,0],[0,0]];
var linesDeleted, figuresReceived;
var images = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png"]
var field = new Array(fieldW);
resetField();
var nOfFigure;
var newNOfFigure = Math.floor(Math.random()*7);
newFigure();
var gamePaused = false;


var draw = function(){
	
	for (var i = 0; i < fieldW; i++){
		for (var j = 0; j < fieldH; j++){
			if (field[i][j] != 0){
				drawTile(i * 2 * radius + radius, j * 2 * radius + radius, images[Math.abs(field[i][j]) - 1],ctx);
			}
		}
	}
};

var paint = function(num){
	for (var i = 0; i < 4; i++){
		field[figure[i][0]][figure[i][1]] = num;
	}
}

var check = function(dir){
	for (var i = 0; i < 4; i++){
		if (figure[i][0] + dir[0] > fieldW - 1 || figure[i][0] + dir[0] < 0){
			return true;
		}
		if (field[figure[i][0] + dir[0]][figure[i][1] + dir[1]] < 0){
			return true;
		}
	}
	return false;
}

var checkEnd = function(){
	var b = 0;
	for (var j = 0; j < fieldW; j++){
		if (field[j][0] < 0) {b = 1}
	}
	if (b == 1) {resetField();}
}

var updateField = function(){
	

	if (check([0,1])){
		paint(-nOfFigure - 1);
		checkField();
		checkEnd();
		newFigure();
		paint(nOfFigure + 1);
		return 1;
	}
	paint(0);
	for (var i = 0; i < 4; i++){figure[i][1]++;}	
	paint(nOfFigure + 1);
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

var moveFigure = function(dir){
	if (check(dir)){ return 1; }
	
	paint(0);
	for (var i = 0; i < 4; i++){
		figure[i][0] += dir[0];
		figure[i][1] += dir[1];
	}
	paint(nOfFigure + 1);
}

var checkP = function(arr){
	for (var i = 0; i < 4; i++){
		if (arr[i][1] < 0) { return false; }
		if (arr[i][0] > fieldW - 1 || arr[i][0] < 0 || field[arr[i][0]][arr[i][1]] < 0){ return false; }
	}
	return true;
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
	if (checkP(tmp)){
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
	paint(0);
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
	paint(nOfFigure + 1);
	clear(ctx);
	Draw();
}

var update = function(){
	ctxv.fillStyle = '#000000';
	ctxv.font = 'bold 20px sans-serif';
	ctxv.textBaseline = 'bottom';
	a = 'Lines ';
	b = 'Pieces ';
	ctxv.fillText(a.concat(linesDeleted.toString()), 30, 40);
	ctxv.fillText(b.concat(figuresReceived.toString()), 30, 80);
}

function drawNextFigure(){
	for (i = 0; i < 4; i++){
		drawTile(figures[newNOfFigure][i][0] * 2 * radius - 35, 120 + figures[newNOfFigure][i][1] * 2 * radius, images[newNOfFigure],ctxv);
	}
}

var GameLoop = function(){
	clear(ctx);
	updateField();
	draw();
	clear(ctxv);
	update();
	drawNextFigure();

	gLoop = setTimeout(GameLoop, 1000 / 4);
}

paint(nOfFigure + 1);
window.addEventListener( "keydown", doKeyDown, true);

GameLoop();