function Pawn(){
	this.command = "charge";
	this.name = "pawn";
	this.full_health = 100;
	this.atk = 20;
	this.def = 5;
	this.speed = 5;
	this.accuracy = 10;
	this.agility = 10;
	this.radius = 10;
	this.critical_damage_rate = 2;
	this.critical_rate = 0.2;
	this.range = 20;
	this.cost = 5;
	this.draw = function(c){
		c.beginPath();
		c.moveTo(0,-10);
		c.lineTo(10,0);
		c.lineTo(10,10);
		c.lineTo(-10,10);
		c.lineTo(-10,0);
		c.closePath();
		c.fill();
		c.stroke();
	};
	this.charge = charge;
}
Pawn.prototype = new Piece();
