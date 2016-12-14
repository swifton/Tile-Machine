/*
   Column is the set of patterns that correspond to one figure (polyomino).
   This class contains both the essential functions for basic operations with the column
   and the gui functions for displaying the column and taking input from the player.
*/

function column(tetrNum) {
  this.sheets = [];
  this.gui = [];
  this.programOffset = 0;
  this.heitOffset = 0; // sum of heits of all patterns in the column
  this.tetrNum = tetrNum;

  this.addPattern = addPattern;
  function addPattern(pattern) {
    var l = this.sheets.length;
    var t = this.tetrNum;
    var del = function() {deleteSheet(l, t)};
    var editt = function() {editSheet(l, t)};
    var up = function() {swapTwoSheets(l-1, l, t)};
    var down = function() {swapTwoSheets(l+1, l, t)};
    var twalls = function() {toggleWalls(l, t)};
    var tsym = function() {toggleSymmetry(l, t)};
	var saveEx = function() {saveException(l)};
	var showEx = function() {showException(l)};
	var delEx = function() {deleteException(l)};

    this.gui.push(new sheetgui(pattern, [editt, del, up, down, tsym, twalls, saveEx, showEx, delEx]));
    this.sheets.push(pattern);
    alignSheetButtons(this.tetrNum);
  }
  
  this.addPatternToB = addPatternToB;
  function addPatternToB(pattern) {
    var l = 0;
    var t = this.tetrNum;
    var del = function() {deleteSheet(l, t)};
    var editt = function() {editSheet(l, t)};
    var up = function() {swapTwoSheets(l-1, l, t)};
    var down = function() {swapTwoSheets(l+1, l, t)};
    var twalls = function() {toggleWalls(l, t)};
    var tsym = function() {toggleSymmetry(l, t)};
	var saveEx = function() {saveException(l)};
	var showEx = function() {showException(l)};
	var delEx = function() {deleteException(l)};

    this.gui.unshift(new sheetgui(pattern, [editt, del, up, down, tsym, twalls, saveEx, showEx, delEx]));
    this.sheets.unshift(pattern);
    alignSheetButtons(this.tetrNum);
  }

  // GUI functions

  this.draw = draw;
  function draw() {
    for (var i = 0; i < this.sheets.length; i++) {
      this.gui[i].draw();
    }

    var heitOffset = 0;
    for (var i = 0; i < this.sheets.length; i++) {
      var com = this.sheets[i];
      drawData(com.pattern, [TILE_WID, heitOffset * TILE_WID + TILE_WID * (i + 1) + this.programOffset], com.patternWid, com.patternHeit);
      heitOffset += com.patternHeit;
    }
  }

  this.press = press;
  function press(x, y) {
    for (var i = 0; i < this.gui.length; i++) {
      this.gui[i].press(x, y);
    }
  }

  this.scroll = scroll;
  function scroll(direction) {
    var scrollSpeed = 30;
    this.programOffset += scrollSpeed * direction;
    for (var i = 0; i < this.sheets.length; i++) {
      this.gui[i].scroll(scrollSpeed * direction);
    }
  }
}