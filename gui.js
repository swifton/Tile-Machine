function draw(data, canvas, start){
  var context = canvas.getContext('2d');
  var wid = data.length;
  var heit = data[0].length;

  cwid = wid * diam;
  cheit = heit * diam;
  //canvas.width = cwid;
  //canvas.height = cheit;

  clear(c);

  rectangle(workplace, sheetW * diam, sheetH * diam);

  for (var i = 0; i < wid; i++){
    for (var j = 0; j < heit; j++){
      if (data[i][j] != 0) {
        drawTile(start[0] + i * diam + radius, start[1] + j * diam + radius, Math.abs(data[i][j]), context);
      }
    }
  }

  for (i in buttons) {
    buttons[i].draw();
  }
};

function drawTile(x, y, im, cc) {
  cc.drawImage(images[im], x - radius, y - radius); 
}

function buttonPress(mousePos) {
  var x = mousePos.x;
  var y = mousePos.y;

  for (i in buttons) {
    buttons[i].press(x, y);
  }
}

function button(label, x, y, wid, heit, func) {
  this.label = label;
  this.x = x;  
  this.y = y;
  this.wid = wid;
  this.heit = heit;

  this.draw = draw;
  function draw() {
    rectangle([this.x, this.y], this.wid, this.heit);
    drawLabel(this.label, this.x + 1, this.y + this.heit - 2)
  }

  this.press = press;
  function press(pressX, pressY) {
    if ((pressX > this.x) && (pressX < this.x + this.wid) && (pressY > this.y) && (pressY < this.y + this.heit)) {
      this.func()
    }
  }

  this.func = func;
}

function setupButtons() {
  var save = new button("Save sheet", workplace[0], sheetH * diam + 5, 108, 19, saveSheet);
  buttons = [save];
}























