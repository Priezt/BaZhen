var current_mode = "set";

$(init);

function switch_mode(mode){
	current_mode = mode;
	if(mode == "set"){
		$("#set_switch").addClass("switch_selected");
		$("#run_switch").removeClass("switch_selected");
		$("#set_ui").show();
		$("#run_ui").hide();
		enter_set();
	}else{
		$("#run_switch").addClass("switch_selected");
		$("#set_switch").removeClass("switch_selected");
		$("#run_ui").show();
		$("#set_ui").hide();
		enter_run();
	}
}

function init(){
	console.log("body loaded");
	load_config();
	$("#set_board").attr("width", conf.set_board.width);
	$("#set_board").attr("height", conf.set_board.height);
	$("#run_board").attr("width", conf.run_board.width);
	$("#run_board").attr("height", conf.run_board.height);
	$("#run_progress").css("width", conf.run_board.width);
	load_piece_list();
	switch_mode("set");
	$("#set_switch").click(function(){
		switch_mode("set");
	});
	$("#run_switch").click(function(){
		switch_mode("run");
	});
	$("#run_toggle").click(function(){
		if(run_toggle_mode == "start"){
			run_toggle_mode = "pause";
			$("#run_toggle").val("pause");
			start_run();
		}else if(run_toggle_mode == "pause"){
			$("#run_toggle").val("resume");
			run_toggle_mode = "resume";
			pause_run();
		}else if(run_toggle_mode == "resume"){
			$("#run_toggle").val("pause");
			run_toggle_mode = "pause";
			resume_run();
		}
	});
	$("#run_reset").click(function(){
		enter_run();
	});
	$("#set_board").click(function(e){
		set_board_click(e.offsetX, e.offsetY);
	});
	$("#set_board").dblclick(function(e){
		set_board_dblclick(e.offsetX, e.offsetY);
	});
	$("#save_zhen").click(set_save_zhen);
	$("#saved_zhen_list").click(zhen_list_selected);
	$("#table_of_zhen_selector").css("width", conf.run_board.width);
	$("#up_zhen").change(up_zhen_select_list_click);
	$("#down_zhen").change(down_zhen_select_list_click);
}

console.log("main.js loaded");