function editSheet(number, tetr) {
  editingSheet = number;
  editing = true;
  directive.reset(); // clean the directive window
  mainSheet.copyWithShift(program[tetr].sheets[number]);
  drawProg();
}

function deleteSheet(number, tetr) {
  program[tetr].heitOffset -= program[tetr].sheets[number].heitOffset;
  program[tetr].sheets.remove(number);
  program[tetr].gui.remove(program[tetr].gui.length - 1);
  alignSheetButtons(tetr);
  newSheet();
  drawProg();
}

function toggleSymmetry(i, nn) {
  program[nn].sheets[i].symmetry = !program[nn].sheets[i].symmetry;
  drawProg();
}

function toggleWalls(i, nn) {
  program[nn].sheets[i].walls = !program[nn].sheets[i].walls;
  drawProg();
}

function swapTwoSheets(i, j, nn) {
  var ns = program[nn].sheets[i];
  program[nn].sheets[i] = program[nn].sheets[j];
  program[nn].sheets[j] = ns;
  alignSheetButtons(nn);
  newSheet();
  drawProg();
}

function alignSheetButtons(tetr) {
  var col = program[tetr];
  var heitOffset = 0;
  var programOffset = col.programOffset;

  for (var i = 0; i <  col.sheets.length; i++) {
    var shsh = col.sheets[i];
    var pWid = shsh.patternWid + 1;
    var pHeit = shsh.patternHeit;
    var wls = shsh.walls;
    var sym = shsh.symmetry;

    var xs = [diam, diam * pWid + 5, diam * (pWid + 1) + 5, diam * (pWid + 1) + 5 + 1 * diam, diam * (pWid + 1) + 5 + 2 * diam, diam * (pWid + 1) + 5 + 3 * diam, diam * (pWid + 1) + 5 + 4 * diam];
    var ys = [heitOffset * diam + diam * (i + 1) + programOffset, heitOffset * diam + diam * (i + 1) + programOffset, heitOffset * diam + diam * (i + 1) + programOffset, heitOffset * diam + diam * (i + 1) + programOffset, heitOffset * diam + diam * (i + 1) + programOffset, heitOffset * diam + diam * (i + 1) + programOffset];

    buts = col.gui[i].buttons;

    for (var j = 0; j < buts.length; j++) {
      buts[j].x = xs[j];
      buts[j].y = ys[j];
    }

    buts[0].wid = diam * (pWid - 1);
    buts[0].heit = diam * pHeit;

    buts[4].label = sym?"s":"";
    buts[4].label2 = sym?"":"s";
    buts[5].label = wls?"w":"";
    buts[5].label2 = wls?"":"w";

    heitOffset += pHeit;
  }
}
