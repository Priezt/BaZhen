function Shield(){
	this.command = "charge";
	this.name = "shield";
	this.full_health = 120;
	this.atk = 8;
	this.def = 15;
	this.speed = 3;
	this.accuracy = 10;
	this.agility = 15;
	this.radius = 10;
	this.critical_damage_rate = 2;
	this.critical_rate = 0.2;
	this.range = 20;
	this.cost = 5;
	this.draw = function(c){
		c.beginPath();
		c.moveTo(-10,-10);
		c.lineTo(10,-10);
		c.lineTo(10,-5);
		c.lineTo(5,-5);
		c.lineTo(5,10);
		c.lineTo(-5,10);
		c.lineTo(-5,-5);
		c.lineTo(-10,-5);
		c.closePath();
		c.fill();
		c.stroke();
	};
	this.charge = charge;
}
Shield.prototype = new Piece();
