function sheetgui(sheet, prog, heitOffset, programOffset, proglen, funcs) {
  this.sheet = sheet;
  this.prog = prog;
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
    var pWid = this.sheet.patternWid;
    var pHeit = this.sheet.patternHeit;
    var wls = this.sheet.walls;

    var b = new button("", diam, heitOffset * diam + diam * (proglen + 1) + programOffset, diam * pWid, diam * pHeit, funcs[1]);
    this.buttons.push(b);

    b = new button("D", diam * (pWid + 1) + 5, heitOffset * diam + diam * (proglen + 1) + programOffset, 20, 19, funcs[0]);
    this.buttons.push(b);

    b = new button("^", diam * (pWid + 1) + 5 + 1 * diam, heitOffset * diam + diam * (proglen + 1) + programOffset, 20, 19, funcs[2]);
    this.buttons.push(b);

    b = new button("v", diam * (pWid + 1) + 5 + 2 * diam, heitOffset * diam + diam * (proglen + 1) + programOffset, 20, 19, funcs[3]);
    this.buttons.push(b);

    b = new button("", diam * (pWid + 1) + 5 + 3 * diam, heitOffset * diam + diam * (proglen + 1) + programOffset, 20, 19, funcs[4], true, "s");
    this.buttons.push(b);

    b = new button(wls?"":"w", diam * (pWid + 1) + 5 + 4 * diam, heitOffset * diam + diam * (proglen + 1) + programOffset, 20, 19, funcs[5], true, wls?"w":"");
    this.buttons.push(b);
  }

  this.createButtons();
}