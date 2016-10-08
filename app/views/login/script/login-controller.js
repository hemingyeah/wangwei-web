app.controller('loginCtrl',['$scope','$state', function($scope, $state) {
	$scope.event = {
		login: function () {
			$state.go("ipps.dashboard");
		}
	}
}])