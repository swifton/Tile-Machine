function sheetgui(sheet, funcs) {
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

  this.place = place;  // unfinished function that is not needed for anything
  function place(x, y) {
    this.x = x;
    this.y = y;

    for (var i = 0; i < this.buttons.length; i++) {

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

    var b = new button("", 0, 0, 0, 0, funcs[1]);
    this.buttons.push(b);

    b = new button("D", 0, 0, 20, 19, funcs[0]);
    this.buttons.push(b);

    b = new button("^", 0, 0, 20, 19, funcs[2]);
    this.buttons.push(b);

    b = new button("v", 0, 0, 20, 19, funcs[3]);
    this.buttons.push(b);

    b = new button("", 0, 0, 20, 19, funcs[4], true, "s");
    this.buttons.push(b);

    b = new button(wls?"":"w", 0, 0, 20, 19, funcs[5], true, wls?"w":"");
    this.buttons.push(b);
  }

  this.createButtons();
}