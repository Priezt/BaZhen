var increment_id = 1;
var DISPLAY_HEALTH = true;

function Piece(){
	// status
	this.classname = "";
	this.x = 0;
	this.y = 0;
	this.direction = 0;
	this.alive = true;
	this.side = "down";
	this.command = "nothing";
	this.morale = 0;
	this.cooldown = 0;
	this.on_damage = false;
	this.health = 0;
	// attributes
	this.name = "";
	this.full_health = 0;
	this.atk = 0;
	this.def = 0;
	this.speed = 0;
	this.accuracy = 0;
	this.agility = 0;
	this.radius = 0;
	this.critical_damage_rate = 0;
	this.critical_rate = 0;
	this.range = 0;
	this.cost = 0;
	this.feature = [];
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
		if(tx < 0){
			tx = 0;
		}
		if(tx >= conf.run_board.width){
			tx = conf.run_board.width - 1;
		}
		if(ty < 0){
			ty = 0;
		}
		if(ty >= conf.run_board.height){
			ty = conf.run_board.height - 1;
		}
		if(isEmpty(tx, ty, this)){
			//console.log("move success");
			this.x = tx;
			this.y = ty;
		}
	};
	this.attack = function(target){
		var bonus = get_direction_bonus(this, target);
		var source_atk = this.atk + this.morale;
		if(source_atk < 0){
			source_atk = 0;
		}
		var target_def = target.def + target.morale;
		if(target_def < 0){
			target_def = 0;
		}
		target_def = target_def / bonus;
		var source_accuracy = this.accuracy + this.morale;
		if(source_accuracy < 0){
			source_accuracy = 0;
		}
		var target_agility = target.agility + target.morale;
		if(target_agility < 0){
			target_agility = 0;
		}
		target_agility = target_agility / bonus;
		var hit_total = source_accuracy + target_agility;
		if(hit_total <= 0){
			return;
		}
		if(Math.random() > (source_accuracy / hit_total)){
			//console.log("miss");
			return;
		}
		target.on_damage = true;
		var damage = source_atk - target_def;
		if(damage <= 1){
			damage = 1;
		}
		if(Math.random() <= this.critical_rate){
			damage *= this.critical_damage_rate;
		}
		target.health -= damage;
		if(target.health <= 0){
			target.alive = false;
		}
	};
	this.forward = forward;
	this.offend = offend;
}

function get_direction_bonus(source, target){
	var ang2 = Math.atan2(source.x - target.x, -(source.y - target.y));
	var ang1 = target.direction * Math.PI / 180;
	var abs_ang_dist = minus_angle(ang1, ang2);
	if(abs_ang_dist <= Math.PI / 4){
		return 1;
	}else if(abs_ang_dist <= 3 * Math.PI / 4){
		return 1.5;
	}else{
		return 2;
	}
}

function putPiece(newPiece, side){
	alive_pieces.push(newPiece);
	newPiece.side = side;
	newPiece.uid = increment_id;
	init_piece(newPiece);
	increment_id++;
}

function init_piece(p){
	p.health = p.full_health;
	if(p.side == "up"){
		p.direction = 180;
	}else{
		p.direction = 0;
	}
	if(p.side == "up"){
		var center_x = conf.run_board.width / 2;
		var center_y = conf.run_board.height * 0.25;
		p.x = center_x - p.x;
		p.y = center_y + p.y;
	}else{
		var center_x = conf.run_board.width / 2;
		var center_y = conf.run_board.height * 0.75;
		p.x = center_x + p.x;
		p.y = center_y - p.y;
	}
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
	if(piece_to_draw.on_damage){
		c.strokeStyle = "#f00";
	}
	c.lineWidth = 2;
	piece_to_draw.draw(c);
	if(DISPLAY_HEALTH){
		//draw_health(piece_to_draw, c);
		draw_health_bar(piece_to_draw, c);
	}
	c.restore();
}

function draw_health_bar(piece_to_draw, c){
	var l = piece_to_draw.radius * piece_to_draw.health / piece_to_draw.full_health;
	c.save();
	c.strokeStyle = "#282";
	c.lineWidth = 3;
	c.beginPath();
	c.moveTo(-l, piece_to_draw.radius + 3);
	c.lineTo(l, piece_to_draw.radius + 3);
	c.stroke();
	c.restore();
}

function draw_health(piece_to_draw, c){
	c.save();
	c.textAlign = "center";
	c.textBaseline = "top";
	c.font = "12px sans-serif";
	c.fillText(parseInt(piece_to_draw.health).toString(), 0, piece_to_draw.radius);
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

function offend(){
	var enemies = new Array();
	for(var i=0;i<alive_pieces.length;i++){
		var target = alive_pieces[i];
		if(is_enemy(target, this) && is_alive(target) && is_in_range(target, this.x, this.y, this.range) && is_in_view(target, this)){
			enemies.push(target);
		}
	}
	if(enemies.length == 0){
		return false;
	}
	var idx = parseInt(enemies.length * Math.random());
	this.attack(enemies[idx]);
	return true;
}

function charge(){
	if(this.offend()){
		return;
	}
	this.forward();
}

console.log("pieces.js loaded");