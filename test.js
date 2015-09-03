function debugStart(start, i, j) {
  return add(start, [i * TILE_WID, j * TILE_WID]);
}

function debugSquare(start, n) {
  var colors = ['red', 'green', 'blue', 'black'];
  rectangle(add(start, [(1 + 3*(n%2))*TILE_WID/6, (1 + 3*(((n-n%2)/2)%2))*TILE_WID/6]), TILE_WID/6, TILE_WID/6 , colors[n % colors.length]);
}

function debugField(i, j, n) {
  debugSquare(debugStart(workplace, i, j), n);
}