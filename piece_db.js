var piece_list = new Array();
var piece_classname_list = [
	'Pawn',
	'Shield',
	'Captain'
];

function load_piece_list(){
	for(var i=0;i<piece_classname_list.length;i++){
		var class_name = piece_classname_list[i];
		var new_piece = eval("new "+class_name+"()");
		new_piece.classname = class_name;
		piece_list.push(new_piece);
	}
}

console.log("piece_db.js loaded");