var myApp = angular.module('myApp', []);
myApp.controller('desk', function($scope, $timeout){
	$scope.data = [];
	for (var i=0;i<4;i++){
		$scope.data[i] = [];
		for (var j=0;j<4;j++){
			$scope.data[i][j] = {val: 0, id:i*4+j};
		}
	}
	
	$scope.addRandom = function(){
		var x = rand(0,3);
		var y = rand(0,3);
		var randItem = $scope.data[x][y];
		if (randItem.val){
			// вероятностная защита от зацикливания
			if (rand(0, 100)){
				$scope.addRandom();
			}
		} else {
			randItem.val = 2;
		}
	}

	$scope.addRandom();
	$scope.addRandom();

	$scope.move = function(direction){
		var d = $scope.data;
		for (var i=0;i<4;i++){
			if (direction == 0){  //left
				tryMove(d[i][0], d[i][1], d[i][2], d[i][3]);
			} else if (direction == 1){ //right
				tryMove(d[i][3], d[i][2], d[i][1], d[i][0]);
			} else if (direction == 2){ //up
				tryMove(d[0][i], d[1][i], d[2][i], d[3][i]);
			} else if (direction == 3){  //down
				tryMove(d[3][i], d[2][i], d[1][i], d[0][i]);
			}
		}
		$scope.totalSum = 0;
		for (var i=0;i<4;i++){
			for (var j=0;j<4;j++){
				$scope.totalSum += d[i][j].val | 0;
			}
		}
		$timeout($scope.addRandom, 300);
	}

	function findNextNonEmpty(items, startIndex){
		for (var i=startIndex+1;i<4;i++){
			if (items[i].val !== 0){
				return i;
			}
		}
		return false;
	}

	function tryMove(a,b,c,d){
		var items = [a,b,c,d];
		for (var i=0;i<4;i++){
			if (items[i].val == 0){
				var j = findNextNonEmpty(items, i);
				if (j !== false){
					items[i].val = items[j].val;
					items[j].val = 0;
				} else {
					//return false;
				}
			}
			var toGlued = findNextNonEmpty(items, i);
			if (toGlued !== false){
				if (items[toGlued].val == items[i].val){
					items[i].val += items[toGlued].val;
					items[toGlued].val = 0;
				}
			}
		}
	}
	
	function rand(min, max){
		return min + Math.floor(Math.random()*(max-min+1));
	}
});