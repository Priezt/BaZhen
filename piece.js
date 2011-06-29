function Piece(){
	this.x = 0;
	this.y = 0;
	this.direction = 0;
	this.alive = true;
	this.side = "down";
	this.draw = function(c){};
}

function putPiece(newPiece, side){
	alive_pieces.push(newPiece);
	newPiece.side = side;
}

function draw_piece(c, piece_to_draw){
	//console.log("draw piece");
	c.save();
	c.translate(piece_to_draw.x, piece_to_draw.y);
	c.rotate(Math.PI * piece_to_draw.direction / 180);
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