function Captain(){
	this.command = "defend";
	this.name = "captain";
	this.full_health = 200;
	this.atk = 20;
	this.def = 15;
	this.speed = 5;
	this.accuracy = 15;
	this.agility = 10;
	this.radius = 12;
	this.critical_damage_rate = 2;
	this.critical_rate = 0.4;
	this.range = 30;
	this.cost = 25;
	this.feature = ['leader'];
	this.draw = function(c){
		c.beginPath();
		c.moveTo(0,-12);
		c.lineTo(12,0);
		c.lineTo(6,12);
		c.lineTo(-6,12);
		c.lineTo(-12, 0);
		c.closePath();
		c.fill();
		c.stroke();
	};
	this.learn(['charge', 'defend']);
}
Captain.prototype = new Piece();
