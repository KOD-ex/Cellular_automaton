var canvas = document.getElementById('canv');
var x_rect;
var y_rect;
var game_state = [];
var connections = [];
var b, s, stop;

var d = new DCanvas(document.getElementById('canv'));;
d.drawGrid();

function filling_arrays() {
	for (var i = 0; i < 30; i++) {
		game_state[i] = [];
		connections[i] = [];
		for (var j = 0; j < 30; j++) {
			game_state[i][j] = 0;
			connections[i][j] = 0;
		}
	}
}

filling_arrays();

function defining_rules() {
	var b1 = $("#birthrate").val();
	var s1 = $("#survival").val();
	b = [];
	s = [];
	var j = 0;

	for (var i = 0; i < b1.length; i++) {
		if (b1[i] != " " && b1[i] != ",") {
			b[j]=b1[i];
			j ++;
		}
	}
	 
	j = 0;

	for (var i = 0; i < s1.length; i++) {
		if (s1[i] != " " && s1[i] != ",") {
			s[j]=s1[i];
			j ++;
		}
	}
}

function fpm(i){
	if(i==0) 
		return false;
	
	return true;
}
function fpp(i){
	if(i==29) 
		return false;
		
	return true;
}

function search_neighbors(i, j) {
	var neighbors = 0;

	if(fpm(i)) if (game_state[i-1][j]==1) neighbors++;//up

	if(fpp(j)) if (game_state[i][j+1]==1) neighbors++;//right

	if(fpp(i)) if (game_state[i+1][j]==1) neighbors++;//bottom

	if(fpm(j)) if (game_state[i][j-1]==1) neighbors++;//left

	if(fpp(j) && fpm(i)) if (game_state[i-1][j+1]==1) neighbors++;

	if(fpp(j) && fpp(i)) if (game_state[i+1][j+1]==1) neighbors++;

	if(fpp(i) && fpm(j)) if (game_state[i+1][j-1]==1) neighbors++;

	if(fpm(i) && fpm(j)) if (game_state[i-1][j-1]==1) neighbors++;

	return neighbors;
}

function startLife() {
	if (stop)
		return;

	defining_rules();

	//моделирование жизни
	for (var i=0; i<30; i++){
		for (var j=0; j<30; j++){

			var neighbors = search_neighbors(i,j);
			connections[i][j] = neighbors;
		}
	}

	//console.log(connections, game_state);

	d.clearWindiw();

	for (var i=0; i<30; i++){
		for (var j=0; j<30; j++){
			if (connections[i][j]<s[0] || connections[i][j] > s[s.length-1]) if (game_state[i][j] == 1){
				game_state[i][j]=0;
				d.clearRect(i*20,j*20);
			}

			if (connections[i][j] == b[0]) if (game_state[i][j] == 0){
				game_state[i][j]=1;
				d.drawRect(i*20,j*20,"black");
			}

			if (connections[i][j] == 2 || connections[i][j] == 3) if (game_state[i][j] == 1)
				d.drawRect(i*20,j*20,"black");
		}
	}
	
	timer = setTimeout(startLife, 100);
}

function DCanvas(el) {
	const ctx = el.getContext('2d');
	const pixel = 20;

	canv.width = 600;
	canv.height = 600;

	this.drawLine = function(x1, y1, x2, y2, color = 'gray') {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 1;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	this.drawRect = function(x, y, color) {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;

		ctx.rect(x+1, y+1, pixel-2, pixel-2);
		ctx.fill();
	}

	this.clearRect = function(x, y) {
		ctx.clearRect(x+1, y+1, pixel-2, pixel-2);
		ctx.fill();
	}

	this.clearWindiw = function() {
		ctx.clearRect(0, 0, 600, 600);
		d.drawGrid();
	}

	this.drawGrid = function() {
		const w = canv.width;
		const h = canv.height;
		const p = w / pixel;

		const xStep = w / p;
		const yStep = h / p;

		for( let x = 0; x < w; x += xStep )
		{
			this.drawLine(x, 0, x, h);
		}

		for( let y = 0; y < h; y += yStep )
		{
			this.drawLine(0, y, w, y);
		}
	}
}

let vector = [];
let net = null;
let train_data = [];

canvas.onclick = function(event){
	x_rect = event.offsetX;
	y_rect = event.offsetY;
	x_rect = Math.floor(x_rect/20); 
	y_rect = Math.floor(y_rect/20); 

	game_state[x_rect][y_rect] = 1;
	d.drawRect(x_rect * 20, y_rect * 20, 'black');
}

function clearLife() {
	connections = [];
	game_state = [];
	d.clearWindiw();
	filling_arrays();
	stop = true;
}

function push_function() {
	stop = false;
	startLife();
}

$(document).ready(function() {
	$("#button_start").click(push_function); 
	$("#button_clear").click(clearLife);
});
