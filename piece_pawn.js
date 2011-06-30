function Pawn(){
	this.command = "forward";
	this.name = "pawn";
	this.health = 100;
	this.atk = 20;
	this.def = 5;
	this.speed = 5;
	this.accuracy = 10;
	this.agility = 10;
	this.radius = 10;
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
	this.forward = forward;
}
Pawn.prototype = new Piece();
