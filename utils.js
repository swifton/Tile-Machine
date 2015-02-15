function resizeCanvas(){
  wid = window.innerWidth;
  heit = window.innerHeight;
  canvas = document.getElementById("c");
  canvas.width = wid;
  canvas.height = heit;
}

function clear(cnv){
	cc = cnv.getContext('2d');
	cc.fillStyle = '#d0e7f9';
	cc.clearRect(0, 0, cnv.width, cnv.height);
	cc.beginPath();
	cc.rect(0, 0, cnv.width, cnv.height);
	cc.closePath();
	cc.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function rectangle(LT, length, height) {
  var LB = add(LT, [0, height]);
  var RB = add(LB, [length, 0]);
  var RT = add(LT, [length, 0]);

  fourGon(LT, RT, LB, RB);
}

function fourGon(LT, RT, LB, RB) {
  line(LT, RT);
  line(LB, RB);
  line(LT, LB);
  line(RT, RB);
}

function add(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

function line(start, end) {
  drawLine(start[0], start[1], end[0], end[1]);
}

function grid() {
  var diameter = 2 * radius;

  for (var i = 0; i <= wid/diameter; i++) {
    drawLine(i*diameter, 0, i*diameter, heit);
  }

  for (var i = 0; i < heit/diameter; i++) {
    drawLine(0,i*diameter, wid, i*diameter);
  }
}

function drawTile(x, y, im, cc) {
  var img = new Image();
  var str = "images/";
  img.src = str.concat(im);
  cc.drawImage(img, x - radius, y - radius); 
}


var updateStats = function(){
/*	ctxv.fillStyle = '#000000';
	ctxv.font = 'bold 20px sans-serif';
	ctxv.textBaseline = 'bottom';
	a = 'Lines ';
	b = 'Pieces ';
	ctxv.fillText(a.concat(linesDeleted.toString()), 30, 40);
	ctxv.fillText(b.concat(figuresReceived.toString()), 30, 80);*/
}

function drawNextFigure(){
	for (var i = 0; i < 4; i++){
//		drawTile(figures[newNOfFigure][i][0] * 2 * radius - 35, 120 + figures[newNOfFigure][i][1] * 2 * radius, images[newNOfFigure],ctxv);
	}
}

function p(output) {
  console.log(output);
}
