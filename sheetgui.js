function sheetgui(sheet, funcs, params) {
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
    var labels = ['', 'D', '^', 'v', '', ''];
    var modes = [false, false, false, false, true, true];

    for (var i = 0; i < 6; i++) {
      var b = new button(labels[i], 0, 0, 20, 19, funcs[i], params, modes[i]);
      this.buttons.push(b);
    }
  }

  this.createButtons();
}