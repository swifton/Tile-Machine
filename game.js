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

var defaultPatternHeit = 10, defaultPatternWid = 10;
var fieldHeit = 20, fieldWid = 10;
var workplace = [Math.floor((wid - defaultPatternWid * diam)/2), 0];

// button setup
var progButtons;
var execButtons;
setupButtons();
var nOfStandardButtons = progButtons.length;

// global variables for programming environment
var mainSheet = new sheet(defaultPatternWid, defaultPatternHeit);
var directive = new sheet(defaultPatternWid, 4);
var currentDirectiveFigure = 0;
var program = [[], [], [], [], [], [], []];
var nOfProgFigure = 0;
var editingSheet;
var editing;
var programOffset = 0;
var anything = 9;
var recognitionOffset = 0;
var recognitionOffsetY = 0;

// asset load
var images = new Array(10);
loadAssets();

programmingSetup();
c.addEventListener('mousedown', clickReporter, false);

// global variables for running environment

width = fieldWid * 2 * radius;
height = fieldHeit * 2 * radius;
var figure = [[0,0],[0,0],[0,0],[0,0]];
var linesDeleted, figuresReceived;
var field = new Array(fieldWid);
field[0] = new Array(fieldHeit + 1);
var nOfFigure;
var matches = [];
var removedMatches = [];
var inefficientMatches = [];
var gamePaused = true;
var command = new sheet(defaultPatternWid, defaultPatternHeit);

var figure1 = [[[3,0],[4,0],[5,0],[6,0]], [[5,1],[5,2],[5,3],[5,0]]], // line
    figure2 = [[[3,0],[4,0],[5,0],[4,1]], [[4,0],[4,1],[5,1],[4,2]], [[4,1],[5,1],[6,1],[5,0]], [[5,0],[5,1],[4,1],[5,2]]], // T
    figure3 = [[[6,0],[5,0],[5,1],[4,1]], [[4,0],[4,1],[5,1],[5,2]]], // z
    figure4 = [[[3,0],[4,0],[4,1],[5,1]], [[5,0],[4,2],[4,1],[5,1]]], // s
    figure5 = [[[5,0],[4,0],[5,1],[4,1]]], // block
    figure6 = [[[3,0],[5,0],[4,0],[5,1]], [[4,0],[4,1],[4,2],[5,0]], [[4,0],[6,1],[5,1],[4,1]], [[5,0],[5,1],[5,2],[4,2]]], // G
    figure7 = [[[6,0],[4,0],[5,0],[4,1]], [[4,0],[4,1],[4,2],[5,2]], [[5,1],[3,1],[4,1],[5,0]], [[5,0],[5,1],[5,2],[4,0]]], // L
    figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];
var allowedFigures = [0, 1, 4];
getNewFigure();

var contents;

document.getElementById('file-input').addEventListener('change', readSingleFile, false);

this.canvas.addEventListener('mousewheel',function(event){scroll(event); return false;}, false);
