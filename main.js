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
	}else{
		$("#run_switch").addClass("switch_selected");
		$("#set_switch").removeClass("switch_selected");
		$("#run_ui").show();
		$("#set_ui").hide();
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
}
