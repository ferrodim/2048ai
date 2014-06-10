angular.module('myApp', []).controller('desk', function($scope, $timeout){
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
		if (direction == 0){  //left
			for (var i=0;i<4;i++){
				for (var j=0;j<3;j++){
					for (var s=0;s<3;s++){
						tryMove(i, s+1, i, s);
					}
				}
			}
		} else if (direction == 1){ //rigth
			for (var i=0;i<4;i++){
				for (var j=3;j>0;j--){
					for (var s=3;s>0;s--){
						tryMove(i, s-1, i, s);
					}
				}
			}
		} else if (direction == 2){ //up
			for (var i=0;i<4;i++){
				for (var j=0;j<3;j++){
					for (var s=0;s<3;s++){
						tryMove(s+1, i, s, i);
					}
				}
			}
		} else if (direction == 3){  //down
			for (var i=0;i<4;i++){
				for (var j=3;j>0;j--){
					for (var s=3;s>0;s--){
						tryMove(s-1, i, s, i);
					}
				}
			}
		}
		$timeout($scope.addRandom, 200);
	}
	
	function tryMove(x1, y1, x2, y2){
		if ($scope.data[x2][y2].val == 0){
			$scope.data[x2][y2].val = $scope.data[x1][y1].val;
			$scope.data[x1][y1].val = 0;
		} else if ($scope.data[x2][y2].val == $scope.data[x1][y1].val){
			$scope.data[x2][y2].val *= 2;
			$scope.data[x1][y1].val = 0;
		}
		if ($scope.data[x2][y2].val == 2048){
			alert('you  win!');
		}
	}
	
	function rand(min, max){
		return min + Math.floor(Math.random()*(max-min+1));
	}
});