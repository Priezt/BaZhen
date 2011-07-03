function General(){
	this.command = "direct";
	this.name = "general";
	this.full_health = 300;
	this.atk = 20;
	this.def = 20;
	this.speed = 5;
	this.accuracy = 15;
	this.agility = 15;
	this.radius = 15;
	this.critical_damage_rate = 2;
	this.critical_rate = 0.2;
	this.range = 30;
	this.cost = 0;
	this.feature = ['leader'];
	this.draw = function(c){
		c.beginPath();
		c.moveTo(-10,-15);
		c.lineTo(10,-15);
		c.lineTo(5,-5);
		c.lineTo(15,-10);
		c.lineTo(15,10);
		c.lineTo(5,5);
		c.lineTo(10,15);
		c.lineTo(-10,15);
		c.lineTo(-5,5);
		c.lineTo(-15,10);
		c.lineTo(-15,-10);
		c.lineTo(-5,-5);
		c.closePath();
		c.fill();
		c.stroke();
	};
	this.direct = direct;
}
General.prototype = new Piece();

function direct(){
	
}
