var conf;
var current_mode = "set";

function load_config(){
	console.log("load config");
	conf = {
	'set_board': {
		width: 300,
		height: 300
	},
	'run_board': {
		width: 400,
		height: 600
	},
};
}

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
}
