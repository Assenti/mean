app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;

	$http.get('/api/post')
		.success(function(response){
			vm.posts = response;
			console.log(response);
		})
		.error(function(err){
			console.log(err);
		});

	vm.savePost = function() {
		var data = {
			title: vm.title,
			content: vm.content,
			author: vm.author
		}

		$http.post('/api/post', data)
		.success(function(response){
			vm.posts.push(response);
		})
		.error(function(err){
			console.log(err);
		})
	}


	vm.deletePost = function(post){
		$http.delete('/api/post/' + post._id)
			.success(function(response){
				var index = vm.posts.findIndex(function(item){
					return item._id === post._id
				})

				vm.posts.splice(index, 1);
			})
			.error(function(err){
				console.log(err);
			});
	}
}




