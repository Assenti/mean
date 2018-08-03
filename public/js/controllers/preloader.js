app.controller('PreloaderCtrl', PreloaderCtrl);

PreloaderCtrl.$inject = ['$http', '$scope'];

function PreloaderCtrl($http, $scope){
	var vm = this;
	$scope.IsLoading = true;

	angular.element(window).ready(function(){
		$scope.IsLoading = false;
	});
}