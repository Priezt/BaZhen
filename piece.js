var increment_id = 1;

function Piece(){
	// status
	this.x = 0;
	this.y = 0;
	this.direction = 0;
	this.alive = true;
	this.side = "down";
	this.command = "nothing";
	this.morale = 0;
	this.cooldown = 0;
	// attributes
	this.name = "";
	this.health = 0;
	this.atk = 0;
	this.def = 0;
	this.speed = 0;
	this.accuracy = 0;
	this.agility = 0;
	this.radius = 0;
	// functions
	this.draw = function(c){};
	this.tick = function(){
		if(this[this.command]){
			this[this.command]();
		}
		this.cooldown--;
	};
	this.move = function(tx, ty){
		//console.log("move");
		if(isEmpty(tx, ty, this)){
			//console.log("move success");
			this.x = tx;
			this.y = ty;
		}
	};
}

function putPiece(newPiece, side){
	alive_pieces.push(newPiece);
	newPiece.side = side;
	newPiece.uid = increment_id;
	increment_id++;
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

function isEmpty(x, y, self){
	for(var i=0;i<alive_pieces.length;i++){
		if((alive_pieces[i].uid != self.uid) && isInPiece(x, y, alive_pieces[i])){
			return false;
		}
	}
	return true;
}

function isInPiece(x, y, p){
	var px = p.x;
	var py = p.y;
	var r = p.radius;
	var dx = Math.abs(x - px);
	var dy = Math.abs(y - py);
	if(dx >= r){
		return false;
	}
	if(dy >= r){
		return false;
	}
	if((dx * dx + dy * dy) >= (r * r)){
		return false;
	}
	return true;
}

function forward(){
	//console.log("forward");
	var tx = this.x + this.speed * Math.sin(this.direction * Math.PI / 180);
	var ty = this.y - this.speed * Math.cos(this.direction * Math.PI / 180);
	//console.log("("+this.x+","+this.y+")->("+tx+","+ty+")");
	this.move(tx, ty);
}

function charge(){
	
}
