var running = false;
var current_frame = 0;
var MAX_FRAME = 100;
var alive_pieces = new Array();
var dead_pieces = new Array();
var run_counter = 0;
var run_toggle_mode = "start";
var tick_interval = 50;

function load_test_pieces(){
	var newPiece = new Pawn();
	newPiece.x = 200;
	newPiece.y = 200;
	newPiece.direction = 180;
	putPiece(newPiece, "up");
	newPiece = new Pawn();
	newPiece.x = 200;
	newPiece.y = 400;
	newPiece.direction = 0;
	putPiece(newPiece, "down");
}

function load_pieces(){
	load_test_pieces();
}

function enter_run(){
	load_pieces();
	clear_board();
	redraw_run_board();
}

function start_run(){
	running = true;
	run_counter = 0;
	window.setTimeout("tick()", tick_interval);
}

function pause_run(){
	running = false;
}

function resume_run(){
	running = true;
	window.setTimeout("tick()", tick_interval);
}

function tick(){
	//console.log("tick: " + run_counter);
	if(running){
		update_all();
		redraw_run_board();
		run_counter++;
		$("#run_counter").val(run_counter);
		window.setTimeout("tick()", tick_interval);
	}
}

function update_all(){
	for(var i=0;i<alive_pieces.length;i++){
		alive_pieces[i].tick();
	}
}

function redraw_run_board(){
	clear_board(c);
	var c = $("#run_board")[0].getContext("2d");
	//console.log("draw alive");
	for(var i=0;i<alive_pieces.length;i++){
		draw_piece(c, alive_pieces[i]);
	}
}

function clear_board(){
	var c = $("#run_board")[0].getContext("2d");
	c.save();
	c.fillStyle = "#8c8";
	c.fillRect(0, 0, conf.run_board.width, conf.run_board.height);
	c.restore();
}
