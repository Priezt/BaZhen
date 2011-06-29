function Pawn(){
	this.prototype = new Piece();
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
}