myApp.controller('keyboard', function($scope, $timeout){

	window.onkeypress=function(e){
		switch (e.keyCode){
			case 37: $scope.move(0); break;
			case 38: $scope.move(2); break;
			case 39: $scope.move(1); break;
			case 40: $scope.move(3); break;
		}
	}
});