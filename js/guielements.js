function button(label, x, y, buttonWid, buttonHeit, func, params, toggle, label2) {
  this.label = label;
  this.x = x;
  this.y = y;
  this.buttonWid = buttonWid;
  this.buttonHeit = buttonHeit;
  this.toggle = toggle;
  this.toggled = false;
  this.label2 = label2;
  this.func = func;
  this.params = params;
  this.visible = true;
  this.color = "yellow"

  this.draw = draw;
  function draw() {
	if (this.visible) {
		rectangle([this.x, this.y], this.buttonWid, this.buttonHeit, "black");
		var labelToDraw = this.toggled?this.label2:this.label;
		drawLabel(labelToDraw, this.x + 1, this.y + this.buttonHeit - 2, this.color);
	}
  }

  this.press = press;
  function press(pressX, pressY) {
	if (this.visible) {
		if ((pressX > this.x) && (pressX < this.x + this.buttonWid) && (pressY > this.y) && (pressY < this.y + this.buttonHeit)) {
		  if (this.toggle) {
			this.toggled = !this.toggled;
			this.draw();
		  }

		  if (this.params == undefined) {
			this.func();
		  }
		  else {
			this.func(params);
		  }
		  saveProgramLocal(); // This can make the app less responsive, if the program is large.
		}
	}
  }
}

// TODO: Unfinishied
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

function drawData(data, start, dataWid, dataHeit){ // TODO: do we really need to pass dataWid and dataHeit parameters?
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

function drawFrame(sheet, start) { // TODO: WTF is this?!
  rectangle(add(start, [TILE_WID * (sheet.patternOffsetX), TILE_WID * (sheet.patternOffsetY)]), TILE_WID * (sheet.patternWid), TILE_WID * (sheet.patternHeit));
}