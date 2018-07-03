app.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$http', '$scope', '$state', '$rootScope'];

function RegisterCtrl($http, $scope, $state, $rootScope){
	var vm = this;

	vm.register = function(){
		var data = {
			name: vm.name,
			email: vm.email,
			password: vm.password
		}

		$http.post('/api/register', data)
		.success(function(response){
			$state.go('auth');
			console.log(response)
		})
		.error(function(err){
			console.log(err);
		});
	}

}