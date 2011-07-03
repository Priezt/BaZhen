var pieces_set = new Array();
var PIECE_PIC_CANVAS_WIDTH = 50;
var set_status = "free";
var current_selected_piece_index;

function enter_set(){
	pieces_set = new Array();
	set_control_board();
	fill_in_piece_board();
	add_general_piece();
	redraw_set_board();
	update_zhen_list();
}

function add_general_piece(){
	var gp = new General();
	gp.x = conf.set_board.width / 2;
	gp.y = conf.set_board.height / 2;
	gp.classname = "General";
	pieces_set.push(gp);
}

function is_empty_on_set_board(x, y, rds){
	for(var i=0;i<pieces_set.length;i++){
		var p = pieces_set[i];
		var r = p.radius;
		if(rds > r){
			r = rds;
		}
		var ax = Math.abs(p.x - x);
		var ay = Math.abs(p.y - y);
		if(ax > r){
			continue;
		}
		if(ay > r){
			continue;
		}
		if((ax * ax + ay * ay) > (r * r)){
			continue;
		}
		return i;
	}
	return -1;
}

function set_board_click(x, y){
	if(set_status == "piece_selected"){
		var class_name = piece_classname_list[current_selected_piece_index];
		console.log(class_name);
		var new_piece = eval("new "+class_name+"()");
		new_piece.classname = class_name;
		new_piece.x = x;
		new_piece.y = y;
		if(is_empty_on_set_board(x, y, new_piece.radius) < 0){
			pieces_set.push(new_piece);
		}
		redraw_set_board();
	}
}

function set_board_dblclick(x, y){
	var idx = is_empty_on_set_board(x, y, 0);
	if(idx >= 0 && pieces_set[idx].classname != "General"){
		pieces_set.splice(idx, 1);
		redraw_set_board();
	}
}

function fill_in_piece_board(){
	$("#piece_board").empty();
	for(var i=0;i<piece_list.length;i++){
		var p = piece_list[i];
		var new_div = $("<div></div>");
		new_div.addClass("piece_select_div");
		new_div.addClass("piece_unselected");
		var piece_pic_canvas = $("<canvas></canvas>");
		piece_pic_canvas.attr("width", PIECE_PIC_CANVAS_WIDTH);
		piece_pic_canvas.attr("height", PIECE_PIC_CANVAS_WIDTH);
		piece_pic_canvas.addClass("piece_icon");
		var c = piece_pic_canvas[0].getContext("2d");
		c.save();
		c.fillStyle = "#8c8";
		c.fillRect(0, 0, PIECE_PIC_CANVAS_WIDTH, PIECE_PIC_CANVAS_WIDTH);
		c.restore();
		c.save();
		c.translate(PIECE_PIC_CANVAS_WIDTH / 2, PIECE_PIC_CANVAS_WIDTH / 2);
		c.fillStyle = "#000";
		c.strokeStyle = "#fff";
		c.lineWidth = 2;
		p.draw(c);
		c.restore();
		new_div.append(piece_pic_canvas);
		var piece_title = $("<div></div>");
		piece_title.addClass("piece_title");
		piece_title.text(p.name+"("+p.cost+")");
		new_div.append(piece_title);
		new_div.click(get_piece_click_function(i));
		$("#piece_board").append(new_div);
	}
}

function get_piece_click_function(i){
	var idx = i;
	return function(){
		var ix = idx;
		console.log("select index: " + ix);
		$(".piece_select_div").removeClass("piece_selected").addClass("piece_unselected");
		$(this).removeClass("piece_unselected").addClass("piece_selected");
		current_selected_piece_index = ix;
		msg("place the piece onto the board");
		set_status = "piece_selected";
		show_piece_info(ix);
	};
}

function set_save_zhen(){
	var zn = $("#new_zhen_name").val();
	console.log("save zhen: " + zn);
	var name_list = new Array();
	var already_contains =  false;
	if(localStorage['zhen_list']){
		name_list = eval(localStorage['zhen_list']);
		for(var i=0;i<name_list.length;i++){
			if(zn == name_list[i]){
				already_contains = true;
				break;
			}
		}
	}
	name_list.unshift(zn);
	localStorage['zhen_list'] = JSON.stringify(name_list);
	save_one_zhen(zn);
	update_zhen_list();
}

function save_one_zhen(zn){
	var zhen = {
		pieces: []
	};
	for(var i=0;i<pieces_set.length;i++){
		var x = pieces_set[i].x - (conf.set_board.width / 2);
		var y = -(pieces_set[i].y - (conf.set_board.height / 2));
		zhen.pieces.push({
			'x': x,
			'y': y,
			'type': pieces_set[i].classname
		});
	}
	localStorage["zhen_"+zn] = JSON.stringify(zhen);
}

function load_zhen_by_name(zn){
	$("#new_zhen_name").val(zn);
	console.log("load zhen: " + zn);
	pieces_set = new Array();
	var json = localStorage["zhen_"+zn];
	console.log(json);
	var zhen = JSON.parse(json);
	console.log("piece count: " + zhen.pieces.length);
	for(var i=0;i<zhen.pieces.length;i++){
		console.log("type: " +  zhen.pieces[i].type);
		var new_piece = eval("new " + zhen.pieces[i].type + "()");
		new_piece.classname = zhen.pieces[i].type;
		new_piece.x = (conf.set_board.width / 2) + zhen.pieces[i].x;
		new_piece.y = (conf.set_board.height / 2) - zhen.pieces[i].y;
		pieces_set.push(new_piece);
	}
}

function show_piece_info(ix){
	var p = piece_list[ix];
	$("#piece_info").hide();
	$("#piece_info_name td").last().text(p.name);
	$("#piece_info_health td").last().text(p.full_health);
	$("#piece_info_atk td").last().text(p.atk);
	$("#piece_info_def td").last().text(p.def);
	$("#piece_info_speed td").last().text(p.speed);
	$("#piece_info_accuracy td").last().text(p.accuracy);
	$("#piece_info_agility td").last().text(p.agility);
	$("#piece_info_range td").last().text(p.range);
	$("#piece_info_cost td").last().text(p.cost);
	$("#piece_info").show();
}

function set_control_board(){
	$("#piece_board").css("width", conf.set_board.width);
	$("#piece_board").css("height", conf.set_board.height);
	$("#strategy_board").css("width", conf.set_board.width);
	$("#strategy_board").css("height", conf.set_board.height);
	$("#set_message").hide();
	$("#piece_info").hide();
	$("#ability_info").hide();
	set_status = "free";
	$("#piece_info tr").each(function(){
		$(this).find("td").first().addClass("piece_info_key");
		$(this).find("td").last().addClass("piece_info_value");
	});
}

function redraw_set_board(){
	clear_set_board();
	var c = $("#set_board")[0].getContext("2d");
	for(var i=0;i<pieces_set.length;i++){
		draw_set_piece(c, pieces_set[i]);
	}
}

function draw_set_piece(c, piece_to_draw){
	c.save();
	c.translate(piece_to_draw.x, piece_to_draw.y);
	if(piece_to_draw.side == "up"){
		c.fillStyle = "#fff";
		c.strokeStyle = "#000";
	}else{
		c.fillStyle = "#000";
		c.strokeStyle = "#fff";
	}
	c.lineWidth = 2;
	piece_to_draw.draw(c);
	c.restore();
}

function clear_set_board(){
	var c = $("#set_board")[0].getContext("2d");
	c.save();
	c.fillStyle = "#8c8";
	c.fillRect(0, 0, conf.set_board.width, conf.set_board.height);
	c.restore();
}

function msg(msg_text){
	$("#set_message").hide();
	$("#set_message").text(msg_text);
	$("#set_message").show();
}

function update_zhen_list(){
	$("#saved_zhen_list").empty();
	if(localStorage['zhen_list']){
		var zhen_list = eval(localStorage['zhen_list']);
		console.log(zhen_list.length + " zhen found");
		for(var i=0;i<zhen_list.length;i++){
			var opt = $("<option></option>");
			opt.val(zhen_list[i]);
			opt.text(zhen_list[i]);
			$("#saved_zhen_list").append(opt);
		}
	}
}

function zhen_list_selected(){
	var zn = $("#saved_zhen_list").val();
	console.log("selected zhen: " + zn);
	load_zhen_by_name(zn);
	redraw_set_board();
}

console.log("set.js loaded");