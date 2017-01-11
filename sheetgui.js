function sheetgui(sheet, funcs, wallsToggled) {
  this.sheet = sheet;
  this.x = 0;
  this.y = 0;

  this.buttons = [];

  this.press = press;
  function press(x, y) {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].press(x, y);
    }
  }

  this.draw = draw;
  function draw() {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }

  this.scroll = scroll;
  function scroll(dist) {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].y += dist;
    }
  }

  this.createButtons = createButtons;
  function createButtons() {
    var wls = this.sheet.walls;
    var labels = ['', 'Delete', '^', 'v', '']; //, '' , 'ex', 'se', 'de'];
    var modes = [false, false, false, false]; //, false, true, false, false, false];

    for (var i = 0; i < labels.length; i++) {
      var b = new button(labels[i], 0, 0, 20, 19, funcs[i], 0, modes[i]);
      this.buttons.push(b);
    }
	this.buttons[4].label2 = 'w';
	this.buttons[4].toggle = true;
	this.buttons[4].toggled = wallsToggled;
	
  }

  this.createButtons();
}