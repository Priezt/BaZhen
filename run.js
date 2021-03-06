var running = false;
var MAX_FRAME = 100;
var alive_pieces = new Array();
var dead_pieces = new Array();
var run_counter = 0;
var max_counter = 300;
var run_toggle_mode = "start";
var tick_interval = 50;
var up_zhen_name = "";
var down_zhen_name = "";

function load_test_pieces(){
	var newPiece;
	newPiece = new Shield();
	newPiece.x = -40;
	newPiece.y = 20;
	putPiece(newPiece, "up");
	newPiece = new Shield();
	newPiece.x = 0;
	newPiece.y = 20;
	putPiece(newPiece, "up");
	newPiece = new Shield();
	newPiece.x = 40;
	newPiece.y = 20;
	putPiece(newPiece, "up");
	newPiece = new Pawn();
	newPiece.x = -40;
	newPiece.y = 20;
	putPiece(newPiece, "down");
	newPiece = new Pawn();
	newPiece.x = 0;
	newPiece.y = 20;
	putPiece(newPiece, "down");
	newPiece = new Pawn();
	newPiece.x = 40;
	newPiece.y = 20;
	putPiece(newPiece, "down");
}

function load_selected_zhen(){
	if(up_zhen_name != ""){
		var z = JSON.parse(localStorage["zhen_" + up_zhen_name]);
		for(var i=0;i<z.pieces.length;i++){
			var p = z.pieces[i];
			var new_piece = eval("new "+p.type+"()");
			new_piece.classname = p.type;
			new_piece.x = p.x;
			new_piece.y = p.y;
			putPiece(new_piece, "up");
		}
	}
	if(down_zhen_name != ""){
		var z = JSON.parse(localStorage["zhen_" + down_zhen_name]);
		for(var i=0;i<z.pieces.length;i++){
			var p = z.pieces[i];
			var new_piece = eval("new "+p.type+"()");
			new_piece.classname = p.type;
			new_piece.x = p.x;
			new_piece.y = p.y;
			putPiece(new_piece, "down");
		}
	}
}

function load_pieces(){
	alive_pieces = new Array();
	dead_pieces = new Array();
	load_selected_zhen();
	//load_test_pieces();
}

function up_zhen_select_list_click(){
	up_zhen_name = $("#up_zhen").val();
	console.log("up zhen changed to: " + up_zhen_name);
	enter_run();
}

function down_zhen_select_list_click(){
	down_zhen_name = $("#down_zhen").val();
	console.log("down zhen changed to: " + down_zhen_name);
	enter_run();
}

function load_zhen_select_list_in_run(){
	var zlist = new Array();
	if(localStorage["zhen_list"]){
		zlist = JSON.parse(localStorage["zhen_list"]);
	}
	$("#up_zhen").empty();
	$("#down_zhen").empty();
	$("#up_zhen").append($("<option value=\"\">----</option>"));
	for(var i=0;i<zlist.length;i++){
		var opt = $("<option></option>");
		opt.val(zlist[i]);
		opt.text(zlist[i]);
		$("#up_zhen").append(opt);
	}
	$("#down_zhen").append($("<option value=\"\">----</option>"));
	for(var i=0;i<zlist.length;i++){
		var opt = $("<option></option>");
		opt.val(zlist[i]);
		opt.text(zlist[i]);
		$("#down_zhen").append(opt);
	}
	$("#up_zhen").val(up_zhen_name);
	$("#down_zhen").val(down_zhen_name);
}

function enter_run(){
	console.log("enter run");
	run_counter = 0;
	run_toggle_mode = "start";
	$("#run_toggle").val("start");
	$("#run_counter").val(run_counter);
	$("#run_progress").val(0);
	$("#run_toggle").show();
	load_zhen_select_list_in_run();
	pause_run();
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

function end_of_run(){
	running = false;
	$("#run_toggle").hide();
}

function tick(){
	//console.log("tick: " + run_counter);
	if(running){
		update_all();
		redraw_run_board();
		update_counter();
		if(run_counter >= max_counter){
			end_of_run();
		}else{
			window.setTimeout("tick()", tick_interval);
		}
	}
}

function update_counter(){
	run_counter++;
	$("#run_counter").val(run_counter);
	$("#run_progress").val(parseInt(run_counter * 100 / max_counter));
}

function clear_damage(){
	for(var i=0;i<alive_pieces.length;i++){
		alive_pieces[i].on_damage = false;
	}
	for(var i=0;i<dead_pieces.length;i++){
		dead_pieces[i].on_damage = false;
	}
}

function update_all(){
	clear_damage();
	for(var i=0;i<alive_pieces.length;i++){
		alive_pieces[i].tick();
	}
	check_alive();
}

function check_alive(){
	var new_alive_pieces = new Array();
	for(var i=0;i<alive_pieces.length;i++){
		if(alive_pieces[i].health <= 0){
			alive_pieces[i].health = 0;
			alive_pieces[i].alive = false;
			dead_pieces.push(alive_pieces[i]);
		}else{
			new_alive_pieces.push(alive_pieces[i]);
		}
	}
	alive_pieces = new_alive_pieces;
}

function redraw_run_board(){
	clear_board();
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

console.log("run.js loaded");