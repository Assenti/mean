app.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$http', '$scope', '$state'];

function PostCtrl($http, $scope, $state){
	var vm = this;

	$http.get('/api/post/' + $state.params.id)
	.success(function(response){
		vm.post = response;
		console.log(response);
	})
	.error(function(err){
		console.log(err);
	})


	vm.saveComment = function(){
		var data = {
			body: vm.body
		}


		$http.post('/api/comment/' + $state.params.id, data)
		.success(function(response){
			console.log(response);
			vm.post.comments.push(response);
		})
		.error(function(err){
			console.log(err);
		})
	}
}

