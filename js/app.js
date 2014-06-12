var myApp = angular.module('myApp', []);
myApp.controller('desk', function($scope, $timeout){
	$scope.data = [];
	for (var i=0;i<4;i++){
		$scope.data[i] = [];
		for (var j=0;j<4;j++){
			$scope.data[i][j] = {val: '', id:i*4+j};
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
		if (direction == 0){  //left
			for (var i=0;i<4;i++){  // for each line
				for (var j=1;j<4;j++){  // for each element, exept first
					if (d[i][j].val){
						var moveDistance=0;
						while (moveDistance < j){
							moveDistance++;
							if (d[i][j-moveDistance].val == ''){
								
							} else if (d[i][j-moveDistance].val == d[i][j].val){
								break;
							} else {
								moveDistance--;
								break;
							}
						}
						if (moveDistance > 0){
							tryMove(i, j, i, j-moveDistance);
						}
					}
				}
			}
		} else if (direction == 1){ //rigth
			for (var i=0;i<4;i++){
				for (var j=2;j>=0;j--){
					if (d[i][j].val){
						var moveDistance=0;
						while (j+moveDistance < 3){
							moveDistance++;
							if (d[i][j+moveDistance].val == ''){
								
							} else if (d[i][j+moveDistance].val == d[i][j].val){
								break;
							} else {
								moveDistance--;
								break;
							}
						}
						if (moveDistance > 0){
							tryMove(i, j, i, j+moveDistance);
						}
					}
				}
			}
		} else if (direction == 2){ //up
			for (var i=1;i<4;i++){
				for (var j=0;j<4;j++){
					if (d[i][j].val){
						var moveDistance=0;
						while (moveDistance < i){
							moveDistance++;
							if (d[i-moveDistance][j].val == ''){
							} else if (d[i-moveDistance][j].val == d[i][j].val){
								break;
							} else {
								moveDistance--;
								break;
							}
						}
						if (moveDistance > 0){
							tryMove(i, j, i-moveDistance, j);
						}
					}
				}
			}
		} else if (direction == 3){  //down
			for (var i=2;i>=0;i--){
				for (var j=0;j<4;j++){
					if (d[i][j].val){
						var moveDistance=0;
						while (i+moveDistance < 3){
							moveDistance++;
							if (d[i+moveDistance][j].val == ''){
								
							} else if (d[i+moveDistance][j].val == d[i][j].val){
								break;
							} else {
								moveDistance--;
								break;
							}
						}
						if (moveDistance > 0){
							tryMove(i, j, i+moveDistance, j);
						}
					}
					/*for (var s=3;s>0;s--){
						tryMove(s-1, i, s, i);
					}*/
				}
			}
		}
		$timeout($scope.addRandom, 200);
	}
	
	function tryMove(x1, y1, x2, y2){
		if ($scope.data[x2][y2].val == ''){
			$scope.data[x2][y2].val = $scope.data[x1][y1].val;
			$scope.data[x1][y1].val = '';
		} else if ($scope.data[x2][y2].val == $scope.data[x1][y1].val){
			$scope.data[x2][y2].val *= 2;
			$scope.data[x1][y1].val = '';
		}
		if ($scope.data[x2][y2].val == 2048){
			alert('you  win!');
		}
	}
	
	function rand(min, max){
		return min + Math.floor(Math.random()*(max-min+1));
	}
});