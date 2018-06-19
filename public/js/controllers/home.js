app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;
	vm.savePost = function() {
		var data = {
			title: vm.title,
			content: vm.content,
			author: vm.author
		}

		$http.post('/api/post', data)
		.success(function(response){
			console.log(response);
		})
		.error(function(err){
			console.log(err);
		})
	}
}

