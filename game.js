var mode = "programming";
//grid();

var gLoop;

// global variables for drawing
var c = document.getElementById('c');
var ctx = c.getContext('2d');
var radius = 12.5;

var wid, heit;

resizeCanvas();

// global variables for programming environment
var sheetH = 10, sheetW = 10;
var sheet = new Array(sheetW);
var program = [];
var workplace = [Math.floor((wid - sheetW * radius * 2)/2), 0];


programmingSetup();
c.addEventListener('mousedown', clickReporter, false);

// asset load
var images = new Array(10);
for (i = 1; i < images.length; i++) {
  images[i] = new Image();
  images[i].src = "images/" + i.toString() + ".png";  
}

images[9].onload = function() {
  draw(sheet, c, workplace);
}


// global variables for running environment

var fieldH = 20, fieldW = 10;

width = fieldW * 2 * radius;
height = fieldH * 2 * radius;
var figure = [[0,0],[0,0],[0,0],[0,0]];
var linesDeleted, figuresReceived;
var field = new Array(fieldW);
field[0] = new Array(fieldH + 1);
var nOfFigure;
var newNOfFigure = Math.floor(Math.random()*7);
var gamePaused = false;
//newGame();


var figure1 = [[3,0],[4,0],[5,0],[6,0]], 
    figure2 = [[3,0],[4,0],[5,0],[4,1]], 
    figure3 = [[5,0],[4,0],[4,1],[3,1]], 
    figure4 = [[3,0],[4,0],[4,1],[5,1]], 
    figure5 = [[3,0],[4,0],[3,1],[4,1]],
    figure6 = [[3,0],[5,0],[4,0],[5,1]],
    figure7 = [[5,0],[3,0],[4,0],[3,1]],
    figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];
	

//updatePosition(nOfFigure + 1);
//window.addEventListener( "keydown", doKeyDown, true);

//GameLoop();
