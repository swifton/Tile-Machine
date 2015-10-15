function sheet(patternWid, patternHeit) {
  this.patternWid = patternWid;
  this.patternHeit = patternHeit;
  this.patternOffsetX = 0;
  this.patternOffsetY = 0;
  this.directive = [0, 0]; // 1st coordinate - offset, 2nd - rotation
  this.landing = 0;
  this.symmetry = false;
  this.walls = false;
  //this.symmetricSheet = undefined;

  this.reset = reset;
  function reset() {
    this.pattern = new Array(this.patternWid);
    this.pattern[0] = new Array(this.patternHeit);

    fill2DArray(this.pattern, ANYTHING);
  }
  
  this.reset();

  // Copy all variables from a source sheet to this sheet.
  this.copyVars = copyVars;
  function copyVars(source) {
    this.patternOffsetX = source.patternOffsetX;
    this.patternOffsetY = source.patternOffsetY;
    this.directive[0] = source.directive[0];
    this.directive[1] = source.directive[1];
    this.symmetry = source.symmetry;
    this.walls = source.walls;

    this.reset();

    this.pattern = copy2DArray(source.pattern);
    this.landing = source.landing == 0 ? 0 : copy2DArray(source.landing);
  }

  // Deep copy of an instance of this class.
  this.copy = copy;
  function copy() {
    var copy = new sheet(this.patternWid, this.patternHeit)
    copy.copyVars(this);
    return copy;
  }

  // TODO: Get rid of this and store two patterns: one for editing and one for matching.
  this.copyWithShift = copyWithShift;
  function copyWithShift(pWid, pHeit) {
    var copy = this.copy();

    copy.patternWid = pWid;
    copy.patternHeit = pHeit;
    copy.reset();

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        copy.pattern[i + this.patternOffsetX][j + this.patternOffsetY] = this.pattern[i][j];
      }
    }

    copy.directive[0] += this.patternOffsetX;

    return copy;
  }

/* TODO: This is almost done. I need to make a decent directive architecture and finish this.
  // TODO: Make it possible for a column to have sheets derived from symmetry and sheets drawn specifically for this column.
  this.makeSymmetricSheet = makeSymmetricSheet;
  function makeSymmetricSheet() {
    this.symmetricSheet = this.copy();

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        this.symmetricSheet.pattern[i][j] = this.pattern[this.patternWid - 1 - i][j];
      }
    }

    this.symmetricSheet.directive = [this.patternWid + this.patternOffsetX -this.directive[0] - polyominoLength(N_PROG_FIGURE, this.directive[0]), this.symmetricRotation(N_PROG_FIGURE, this.directive[1])];
    this.symmetricSheet.symmetry = false;
    this.symmetricSheet.calculateLanding();
  }

  // TODO: Create the polyomino class and put it there.
  this.symmetricRotation = symmetricRotation;
  function symmetricRotation(nOF, rotation) {
    if ((nOF == 1) && (rotation == 1)) {return 3}
    if ((nOF == 1) && (rotation == 3)) {return 1}
    return rotation;
  }
*/
  this.calculateLanding = calculateLanding;
  function calculateLanding() {
    var fig = [[0, 0], [0, 0], [0, 0], [0, 0]];

    for (var j = 0; j < 4; j++) { // TODO: Replace with copy2DArray and a better architecture.
      fig[j][0] = figures[N_PROG_FIGURE][this.directive[1]][j][0]; // TODO: N_PROG_FIGURE should be specified in the sheet vars, since it belongs to some figure.
      fig[j][1] = figures[N_PROG_FIGURE][this.directive[1]][j][1];
      fig[j][0] += this.directive[0];
    }

    for (;this.checkFig(fig);) { // TODO: there should be a function for this in the tetris engine.
      for (var i = 0; i < 4; i++) {
        fig[i][1] += 1;
      }
    }
    for (var i = 0; i < 4; i++) {
        fig[i][1] -= 1;
    }
    this.landing = fig;
  }

  this.checkFig = checkFig;
  function checkFig(fig) {
    for (var i = 0; i < 4; i++) {
      if (this.pattern[fig[i][0]][fig[i][1]] == undefined) {return false;}
      //print(fig)
      if (this.pattern[fig[i][0]][fig[i][1]] == 8) {return false;}
    }
    return true;
  }

  // Three functions for cutting sheets
  this.cutSheet = cutSheet;
  function cutSheet() {
    var up = findBoundary(this.pattern, [0, 0], [0, 1], [1, 0]);
    if (up == this.patternHeit) {up = 0; return;}
    var down = this.patternHeit - findBoundary(this.pattern, [0, this.patternHeit - 1], [0, -1], [1, 0]);
    var left = findBoundary(this.pattern, [0, 0], [1, 0], [0, 1]);
    var right = this.patternWid - findBoundary(this.pattern, [this.patternWid - 1, 0], [-1, 0], [0, 1]);
    this.patternOffsetY = up;
    this.directive[0] -= left;
    this.patternOffsetX = left;
    this.patternWid = right - left;
    this.patternHeit = down - up;
    this.copyFromArray(this.pattern);
  }

  this.copyFromArray = copyFromArray;
  function copyFromArray(array) {
    this.reset();

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        this.pattern[i][j] = array[i + this.patternOffsetX][j + this.patternOffsetY];
      }
    }
  }

  function findBoundary(array, initial, directionGlobal, directionLocal) {
    var k = 0;
    for (var init = initial; (array[init[0]] != undefined) && (array[init[0]][init[1]] != undefined); init = add(init, directionGlobal)) {
      if (!traverseLine(array, directionLocal, init)) {return k;}
      k++;
    }
    return k;
  }

  function traverseLine(array, direction, initial) {
    for (var iter = initial; (array[iter[0]] != undefined) && (array[iter[0]][iter[1]] != undefined); iter = add(iter, direction)) {
      if (array[iter[0]][iter[1]] != ANYTHING) {return false;}
    }
    return true;
  }
}
