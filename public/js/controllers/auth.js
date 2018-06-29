app.controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$http', '$scope', '$state', '$rootScope'];

function AuthCtrl($http, $scope, $state, $rootScope){
	var vm = this;

	vm.login = function(){
		var data = {
			email: vm.email,
			password: vm.password
		}

		$http.post('/api/auth', data)
		.success(function(response){
			$rootScope.session = response;
			$state.go('home');
		})
		.error(function(err){
			console.log(err);
		});
	}

}