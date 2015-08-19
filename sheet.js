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
      copy.landing[i] = [];
      for (var j = 0; j < 4; j++) {
        copy.landing[i].push([this.landing[i][j][0], this.landing[i][j][1]]);
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

    for (var i = 0; i < this.directives.length; i++) {
      this.directives[i][0] = sourceSheet.directives[i][0];
      this.directives[i][1] = sourceSheet.directives[i][1];
    }

    for (var i = 0; i < 7; i++) {
      this.landing[i] = [];
      for (var j = 0; j < 4; j++) {
        this.landing[i][j] = [sourceSheet.landing[i][j][0], sourceSheet.landing[i][j][1]];
      }
    }
  }

  this.makeSymmetricSheet = makeSymmetricSheet;  //unfinished
  function makeSymmetricSheet() {
    this.symmetricSheet = new sheet(this.patternWid, this.patternHeit);
    this.symmetricSheet.walls = this.walls;

    for (var i = 0; i < this.patternWid; i++) {
      for (var j = 0; j < this.patternHeit; j++) {
        this.symmetricSheet.pattern[i][j] = this.pattern[i][j];
      }
    }
  }
}
