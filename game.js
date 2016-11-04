// Global TODO list:
// Get rid of stupid variables like shhh
// Make walls and symmetry buttons persist when sheet is edited.
// 

// TODO: When there is no floor, where should the landing be?

// Initialization of global variables and launch of functions that prepare the game for playing
var mode = "programming";
//grid();

var gLoop;

// global variables for drawing
var CANVAS = document.getElementById('canvas');
var CONTEXT = CANVAS.getContext('2d');
var TILE_WID = 25;

var CANVAS_WID, CANVAS_HEIT;

resizeCanvas();



var defaultPatternHeit = 10, defaultPatternWid = 10;
var fieldHeit = 19 + 1, fieldWid = 10 + 2;
var workplace = [Math.floor((CANVAS_WID - defaultPatternWid * TILE_WID)/2), 0];

// button setup
var progButtons;
var execButtons;
var editingWindow;
var FIGURE_BUTTONS = []; // Array of toggle buttons needed to make the array of allowed figures
setupButtons();
var nOfStandardButtons = progButtons.length;

// global variables for programming environment
var mainSheet = new sheet(defaultPatternWid, defaultPatternHeit);
var directiveWindow = new sheet(defaultPatternWid, 4);
// The number of the figure whose column is now being edited
var N_PROG_FIGURE = 0;
var nOfFigures = 7;  // TODO: replace this and nOfFigure with new vars carefully
var program = [];
for (var i = 0; i < nOfFigures; i++) {
  program.push(new column(i));
}

var editingSheet;
var editing;
var editingWindowEnabled = false;
var ANYTHING = 9;

// Recognition variables. It's convenient to make them global, because several parts of the game use them.
var recognitionOffset = 0;
var recognitionOffsetY = 0;
var matches = [];
var removedMatches = [];
var inefficientMatches = [];

// asset load
var images = new Array(10);
loadAssets();

// global variables for running environment
var figure = [[0,0],[0,0],[0,0],[0,0]];
var field = new Array(fieldWid);
field[0] = new Array(fieldHeit + 1);
var nOfFigure;
var gamePaused = true;
var command = new sheet(defaultPatternWid, defaultPatternHeit);

// TODO: adopt a unified enumeration of all polyominoes.
var figure1 = [[[0,0],[1,0],[2,0],[3,0]], [[2,1],[2,2],[2,3],[2,0]]], // line
    figure2 = [[[0,0],[1,0],[2,0],[1,1]], [[1,0],[1,1],[2,1],[1,2]], [[1,1],[2,1],[3,1],[2,0]], [[2,0],[2,1],[1,1],[2,2]]], // T
    figure3 = [[[3,0],[2,0],[2,1],[1,1]], [[1,0],[1,1],[2,1],[2,2]]], // z
    figure4 = [[[0,0],[1,0],[1,1],[2,1]], [[2,0],[1,2],[1,1],[2,1]]], // s
    figure5 = [[[2,0],[1,0],[2,1],[1,1]]], // block
    figure6 = [[[0,0],[2,0],[1,0],[2,1]], [[1,0],[1,1],[1,2],[2,0]], [[1,0],[3,1],[2,1],[1,1]], [[2,0],[2,1],[2,2],[1,2]]], // G
    figure7 = [[[3,0],[1,0],[2,0],[1,1]], [[1,0],[1,1],[1,2],[2,2]], [[2,1],[0,1],[1,1],[2,0]], [[2,0],[2,1],[2,2],[1,0]]], // L
    figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];
var allowedFigures = [];

//newSheet();

document.getElementById('file-input').addEventListener('change', readSingleFile, false);

CANVAS.addEventListener('mousedown', clickReporter, false);
CANVAS.addEventListener('mousewheel',function(event){scroll(event); return false;}, false);
