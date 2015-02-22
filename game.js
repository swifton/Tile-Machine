var mode = "programming";
//grid();

var gLoop;

// global variables for drawing
var c = document.getElementById('c');
var ctx = c.getContext('2d');
var radius = 12.5;
var diam = 2 * radius;

var wid, heit;

resizeCanvas();

var sheetH = 10, sheetW = 10;
var fieldH = 20, fieldW = 10;
var workplace = [Math.floor((wid - sheetW * diam)/2), 0];

// button setup
var progButtons;
var execButtons;
setupButtons();
var nOfStandardButtons = progButtons.length;

// global variables for programming environment
var mainSheet = new sheet(sheetW, sheetH);
var directive = new sheet(sheetW, 4);
var currentDirectiveFigure = 0;
var program = [];
var editingSheet;
var editing;
var programOffset = 0;

// asset load
var images = new Array(10);
loadAssets();

programmingSetup();
c.addEventListener('mousedown', clickReporter, false);

// global variables for running environment

width = fieldW * 2 * radius;
height = fieldH * 2 * radius;
var figure = [[0,0],[0,0],[0,0],[0,0]];
var linesDeleted, figuresReceived;
var field = new Array(fieldW);
field[0] = new Array(fieldH + 1);
var nOfFigure;
var newNOfFigure = Math.floor(Math.random()*7);
var gamePaused = true;
var command = new sheet(sheetW, sheetH);

var figure1 = [[3,0],[4,0],[5,0],[6,0]], // line
    figure2 = [[3,0],[4,0],[5,0],[4,1]], // T
    figure3 = [[5,0],[4,0],[4,1],[3,1]], // z
    figure4 = [[3,0],[4,0],[4,1],[5,1]], // s
    figure5 = [[3,0],[4,0],[3,1],[4,1]], // block
    figure6 = [[3,0],[5,0],[4,0],[5,1]], // L
    figure7 = [[5,0],[3,0],[4,0],[3,1]], // G
    figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];

var contents;

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

this.canvas.addEventListener('mousewheel',function(event){
    scroll(event);
    return false;
}, false);



















