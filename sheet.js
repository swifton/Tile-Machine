function sheet(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.pattern = new Array(cols);
  this.pattern[0] = new Array(rows);
  this.directives = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]; // 1st coord - offset, 2nd - rotation
  this.up = 0;
  this.down = rows;
  this.left = 0;
  this.right = cols;
  this.landing = [0, 0, 0, 0, 0, 0, 0];

  this.reset = reset;
  function reset() {
    for (var i = 0; i < this.cols; i++){
      this.pattern[i] = new Array(rows);

      for (var j = 0; j < this.rows; j++){
        this.pattern[i][j] = anything;
      }
    }
  }
  
  this.reset();

  this.copy = copy;
  function copy() {
    var copy = new sheet(this.cols, this.rows)
    copy.pattern = new Array(this.cols);
    copy.pattern[0] = new Array(this.rows);
    copy.reset();
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        copy.pattern[i][j] = this.pattern[i][j];
      }
    }

    for (var i = 0; i < this.directives.length; i++) {
      copy.directives[i][0] = this.directives[i][0];
      copy.directives[i][1] = this.directives[i][1];
    }
    copy.down = this.down;
    copy.up = this.up;
    copy.right = this.right;
    copy.left = this.left;

    return copy;
  }
}
