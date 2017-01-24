





var sampleSize = 50000;
var sizeOfLamestGames = 10;









/* 
Global TODO list:
Replace stupid variable names like shhh.
Make a decent directive architecture.
Make a polyomino class. 
Make a graph of the average number of deleted lines. 
Make a graph of game length distribution in one run. 
Handling of 'mousewheel' input event was delayed for 2555 ms due to main thread being busy. Consider marking event handler as 'passive' to make the page more responsive.
Make a more advanced UI. I don't want to click a lot when I add a new pattern into the middle of a long column. 
Clean up existing UI code. 
Move Tetromino toggles to the execution mode. 
Rename a sheet into a pattern. 
Fix bugs: deleting the first pattern in a column raises an error. Moving the last pattern up raises an error. 
Count how frequently each pattern is used.
Prevent polyominoes from spawning inside a wall.
Finish exclusions. 
For some reason, the default pattern is only drawn at the very top. Fix this or introduce default directives. 
When there is no floor, where should the landing be?

Programming ideas:
Display the last frame of each game. 
Let the player play the streaks with the fastest height growth.
Equivalent patterns with random choice.
Graph the average game lengths. 
Make sheets 12 wide?
Make sheets infinite?
Make the playfield of variable size. 
Try dropping into the lowest position.
Or some other greedy algorithm. Dropping into the place where a line will be deleted.

At the very end: 
Make it run faster (maybe?) by counting full tiles in every line of the field and trying only when the number of full tiles is at least as in the directive. Same for empty.
Nice pictures instead of labels for polyominoes.
Can I ask the browser for more computing resourses?
Make sure that the UI is monkey-proof.
Animate buttons. 
Use a ui library?
Add some keyboard controls.
*/



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

var savedGames;
var sequenceOfTetriminoes;

var defaultPatternHeit = 10, defaultPatternWid = 10;
var fieldHeit = 29 + 1, fieldWid = 30 + 2;
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

var minNumberOfLinesDeleted = 0;
var maxNumberOfLinesDeleted = 0;
var averageNumberOfLinesDeleted = 0;

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
