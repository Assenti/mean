app.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$http', '$scope', '$state'];

function PostCtrl($http, $scope, $state){
	var vm = this;

	$http.get('/api/post/' + $state.params.id)
	.success(function(response){
		vm.post = response;
	})
	.error(function(err){
		console.log(err);
	})
}

