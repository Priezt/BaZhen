var running = false;
var current_frame = 0;
var MAX_FRAME = 100;

function start_run(){
	window.setTimeout("tick()", 200);
}

function tick(){
	update_all();
	redraw_run_board();
	window.setTimeout("tick()", 200);
}

function update_all(){
	
}

function redraw_run_board(){
	
}
