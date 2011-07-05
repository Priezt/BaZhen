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

function get_relative_angle(source, target){
	var ang = Math.atan2(target.x - source.x, -(target.y - source.y));
	return ang;
}

console.log("tools.js loaded");
