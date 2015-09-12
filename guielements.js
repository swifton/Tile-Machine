function button(label, x, y, buttonWid, buttonHeit, func, params, toggle, label2) {
  this.label = label;
  this.x = x;
  this.y = y;
  this.buttonWid = buttonWid;
  this.buttonHeit = buttonHeit;
  this.toggle = toggle;
  this.toggled = false;
  this.label2 = label2;
  this.params = params;

  this.draw = draw;
  function draw() {
    rectangle([this.x, this.y], this.buttonWid, this.buttonHeit, "black");
    drawLabel(this.label, this.x + 1, this.y + this.buttonHeit - 2)
  }

  this.press = press;
  function press(pressX, pressY) {
    if ((pressX > this.x) && (pressX < this.x + this.buttonWid) && (pressY > this.y) && (pressY < this.y + this.buttonHeit)) {
      if (this.toggle) {
        this.toggled = !this.toggled;
        var tmp = this.label;
        this.label = this.label2;
        this.label2 = tmp;
      }

      if (this.params == undefined) {
        this.func();
      }
      else {
        this.func(params);
      }
    }
  }

  this.func = func;
}

// Unfinishied
function buttonTable(startX, startY, wid) {
  this.buttons = [];
  this.startX = startX;
  this.startY = startY;

  this.align = align;
  function align() {
    var buttonHeit = 20;
  }

  this.press = press;
  function press() {
    for (i = 0; i < buttons.length; i++) buttons[i].press();
    // buttons.map(this.press); or something. think about it carefully. look at the docs and add thisArg
  }
}

function drawData(data, start, dataWid, dataHeit){
  var dataWid = dataWid || data.length;
  var dataHeit = dataHeit || data[0].length;

  rectangle(start, dataWid * TILE_WID, dataHeit * TILE_WID);

  for (var i = 0; i < dataWid; i++){
    for (var j = 0; j < dataHeit; j++){
      if (data[i][j] != 0) {
        drawTile(start[0] + i * TILE_WID, start[1] + j * TILE_WID, Math.abs(data[i][j]), CONTEXT);
      }
    }
  }
};

function drawTile(x, y, im, cc) {
  cc.drawImage(images[im], x, y);
}
