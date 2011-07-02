function is_alive(target){
	if(! target.alive){
		return false;
	}
	if(target.health <= 0){
		return false;
	}
	return true;
}

function is_enemy(target, source){
	return (target.side != source.side);
}

function is_ally(target, source){
	return (target.side == source.side);
}

function is_in_range(target, x, y, r){
	var tx = target.x;
	var ty = target.y;
	var ax = Math.abs(tx - x);
	var ay = Math.abs(ty - y);
	if(ax > r){
		return false;
	}
	if(ay > r){
		return false;
	}
	if((ax * ax + ay * ay) > (r * r)){
		return false;
	}
	return true;
}

function is_in_view(target, source){
	var ang2 = Math.atan2(target.x - source.x, -(target.y - source.y));
	var ang1 = source.direction * Math.PI / 180;
	var ang_dist = minus_angle(ang1, ang2);
	if(ang_dist <= Math.PI / 4){
		return true;
	}
	return false;
}

console.log("search.js loaded");