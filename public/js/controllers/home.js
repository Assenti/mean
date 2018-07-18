app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;
	vm.objectToEdit = null;
	$http.get('/api/post')
		.success(function(response){
			vm.posts = response;
		})
		.error(function(err){
			console.log(err);
		});

	

}




