app.controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$http', '$scope', '$state', '$rootScope','$cookies'];

function HeaderCtrl($http, $scope, $state, $rootScope, $cookies){
	var vm = this;

	if($cookies.getObject('session')){
		$rootScope.session = $cookies.getObject('session');
	}

	vm.logout = function(){
		$http.post('/api/logout')
		.success(function(response){
			$rootScope.session = undefined;
			$state.go('home');
		})
		.error(function(err){
			console.log(err);
		});
	}

	
}