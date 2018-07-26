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

	vm.search = function(){
		// var my_regExp = new RegExp(`${vm.query}`, 'i');
		if(!vm.query){
			return
		}
		$http.get('/api/post/search/' + vm.query)
		.success(function(response){
			console.log(response);
			vm.query_result = response;
		})
		.error(function(err){
			console.log(err);
		})
	}
}

// debounce