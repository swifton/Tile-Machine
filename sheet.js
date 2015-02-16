function sheet(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.pattern = new Array(cols);
  this.pattern[0] = new Array(rows);

  this.reset = reset;
  function reset() {
    for (var i = 0; i < this.cols; i++){
      this.pattern[i] = new Array(rows);

      for (var j = 0; j < this.rows; j++){
        this.pattern[i][j] = 9;
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
    return copy;
  }
}
