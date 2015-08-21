function sheet(patternWid, patternHeit, patternOffsetX, patternOffsetY) {
  this.patternWid = patternWid;
  this.patternHeit = patternHeit;
  this.patternOffsetX = patternOffsetX || 0;
  this.patternOffsetY = patternOffsetY || 0;
  this.directive = [0, 0]; // 1st coord - offset, 2nd - rotation
  this.landing = [0, 0, 0, 0, 0, 0, 0];
  this.symmetry = false;
  this.walls = false;
  this.symmetricSheet = undefined;

  this.reset = reset;
  function reset() {
    this.pattern = new Array(this.patternWid);
    this.pattern[0] = new Array(this.patternHeit);

    for (var i = 0; i < this.patternWid; i++){
      this.pattern[i] = new Array(this.patternHeit);

      for (var j = 0; j < this.patternHeit; j++){
        this.pattern[i][j] = anything;
      }
    }
  }
  
  this.reset();

  this.copy = copy;
  function copy() {
    var copy = new sheet(this.patternWid, this.patternHeit)
    copy.reset();
    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        copy.pattern[i][j] = this.pattern[i][j];
      }
    }

    copy.directive[0] = this.directive[0];
    copy.directive[1] = this.directive[1];

    for (var i = 0; i < 7; i++) {
      if (this.landing[i] != 0) {
        copy.landing[i] = [];
        for (var j = 0; j < 4; j++) {
          copy.landing[i].push([this.landing[i][j][0], this.landing[i][j][1]]);
        }
      }
      else {
        copy.landing[i] = 0;
      }
    }

    copy.down = this.down;
    copy.up = this.up;
    copy.right = this.right;
    copy.left = this.left;

    return copy;
  }

  function copyFromArray(array) {
    this.reset();

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        this.pattern[i][j] = array[i + this.patternOffsetX][j + this.patternOffsetY];
      }
    }
  }
  this.copyFromArray = copyFromArray;

  this.copyWithShift = copyWithShift;
  function copyWithShift(sourceSheet) {
    this.reset();

    for (var i = 0; i < sourceSheet.patternWid; i++) {
      for (var j = 0; j < sourceSheet.patternHeit; j++) {
        this.pattern[i + sourceSheet.patternOffsetX][j + sourceSheet.patternOffsetY] = sourceSheet.pattern[i][j];
      }
    }

    this.directive[0] = sourceSheet.directive[0];
    this.directive[1] = sourceSheet.directive[1];

    for (var i = 0; i < 7; i++) {
    if (sourceSheet.landing[i] != 0) {
      this.landing[i] = [];
      for (var j = 0; j < 4; j++) {
        this.landing[i][j] = [sourceSheet.landing[i][j][0], sourceSheet.landing[i][j][1]];
      }
    }
    else {
      this.landing[i] = 0;
    }
    }
  }

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
    this.symmetricSheet.landing = [0, 0, 0, 0, 0, 0, 0];
    this.symmetricSheet.landing[nOfFig] = [0,0,0,0];
    for (var j = 0; j < 4; j++) {
      this.symmetricSheet.landing[nOfFig][j] = [this.patternWid + this.patternOffsetX - this.landing[nOfFig][j][0], this.landing[nOfFig][j][1]];
    }
    this.symmetricSheet.walls = this.walls;
  }

  this.symmetricRotation = symmetricRotation;
  function symmetricRotation(nOF, rotation) {
    if ((nOF == 1) && (rotation == 1)) {return 3}
    if ((nOF == 1) && (rotation == 3)) {return 1}
    return rotation;
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
    this.patternOffsetX = left;
    this.patternWid = right - left;
    this.patternHeit = down - up;
    this.copyFromArray(this.pattern);
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
      if (array[iter[0]][iter[1]] != anything) {return false;}
    }
    return true;
  }
}
