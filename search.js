var search_nearest_target = null;
var search_nearest_distance_pow = 99999999;

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

function has_feature(target, feature_name){
	if(target.feature.indexOf(feature_name) >= 0){
		return true;
	}
	return false;
}

function check_nearest(target, source){
	var dist_pow = Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2);
	if(dist_pow < search_nearest_distance_pow){
		search_nearest_distance_pow = dist_pow;
		search_nearest_target = target;
	}
}

function get_nearest(){
	search_nearest_distance_pow = 99999999;
	return search_nearest_target;
}

console.log("search.js loaded");
