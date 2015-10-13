function sheet(patternWid, patternHeit) {
  this.patternWid = patternWid;
  this.patternHeit = patternHeit;
  this.patternOffsetX = 0;
  this.patternOffsetY = 0;
  this.directive = [0, 0]; // 1st coord - offset, 2nd - rotation
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

  // TODO: the following functions are not DRY enough.

  // Deep copy of an instance of this class.
  this.copy = copy;
  function copy() {
    var copy = new sheet(this.patternWid, this.patternHeit)

    copy.patternOffsetX = this.patternOffsetX;
    copy.patternOffsetY = this.patternOffsetY;
    copy.directive[0] = this.directive[0];
    copy.directive[1] = this.directive[1];
    copy.symmetry = this.symmetry;
    copy.walls = this.walls;

    copy.reset();

    copy.pattern = copy2DArray(this.pattern);
    copy.landing = this.landing == 0 ? 0:copy2DArray(this.landing);

    return copy;
  }

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



/*
  this.makeSymmetricSheet = makeSymmetricSheet;  //unfinished
  function makeSymmetricSheet(nOfFig) {
    this.symmetricSheet = new sheet(this.patternWid, this.patternHeit, defaultPatternWid - this.sheetOffsetX - this.sheetWid, this.sheetOffsetY);
    this.symmetricSheet.walls = this.walls;

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        this.symmetricSheet.pattern[i][j] = this.pattern[this.patternWid - 1 - i][j];
      }
    }

    this.symmetricSheet.directive = [this.patternWid + this.patternOffsetX -this.directive[0], this.symmetricRotation(this.directive[1])];
    this.symmetricSheet.landing = 0;
    this.symmetricSheet.landing = [0,0,0,0];
    for (var j = 0; j < 4; j++) {
      this.symmetricSheet.landing[j] = [this.patternWid + this.patternOffsetX - this.landing[j][0], this.landing[j][1]];
    }
    this.symmetricSheet.walls = this.walls;
  }

  this.symmetricRotation = symmetricRotation;
  function symmetricRotation(nOF, rotation) {
    if ((nOF == 1) && (rotation == 1)) {return 3}
    if ((nOF == 1) && (rotation == 3)) {return 1}
    return rotation;
  }

  */

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
