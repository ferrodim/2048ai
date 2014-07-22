myApp.controller('bot', function($scope, $timeout){

	$timeout(makeRandomMove, 800);

	function makeRandomMove(){
		if ($scope.isBotActite){
			$scope.move(rand(0, 3));
		}
		$timeout(makeRandomMove, 800);
	}

	function rand(min, max){
		return min + Math.floor(Math.random()*(max-min+1));
	}
});