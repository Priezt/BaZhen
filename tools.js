function minus_angle(ang1, ang2){
	var ang_dist = ang2 - ang1;
	while(ang_dist > Math.PI){
		ang_dist -= Math.PI * 2;
	}
	while(ang_dist < -Math.PI){
		ang_dist += Math.PI * 2;
	}
	return Math.abs(ang_dist);
}

console.log("tools.js loaded");
