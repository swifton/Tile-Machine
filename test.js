function debugStart(start, i, j) {
  return add(start, [i * diam, j * diam]);
}

function debugSquare(start, n) {
  var colors = ['red', 'green', 'blue', 'black'];
  rectangle(add(start, [(1 + 3*(n%2))*diam/6, (1 + 3*(((n-n%2)/2)%2))*diam/6]), diam/6, diam/6 , colors[n % colors.length]);
}
