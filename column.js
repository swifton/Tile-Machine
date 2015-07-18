// column is the set of patterns that correspond to one figure (polyomino)

function column(tetrNum) {
  this.sheets = [];
  this.gui = [];
  this.programOffset = 0;
  this.heitOffset = 0; // sum of heits of all patterns in the column
  this.funcs = [];
  this.tetrNum = tetrNum;

  this.draw = draw;
  function draw() {
    for (var i = 0; i < this.sheets.length; i++) {
      this.gui[i].draw();
    }

    var heitOffset = 0;
    for (var i = 0; i < this.sheets.length; i++) {
      var com = this.sheets[i];
      drawData(com.pattern, add([diam, heitOffset * diam + diam * (i + 1) + this.programOffset], /*[diam * com.patternOffsetX, diam * com.patternOffsetY]*/[0,0]), com.patternWid, com.patternHeit);
      //drawFrame(com, [diam, heitOffset * diam + diam * (i + 1) + programOffset]);
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

    this.gui.push(new sheetgui(pattern, [del, editt, up, down, twalls, tsym]));
    this.sheets.push(pattern);
    alignSheetButtons(this.tetrNum);
  }

}