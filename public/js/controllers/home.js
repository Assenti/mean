app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;
	vm.objectToEdit = null;
	$http.get('/api/post')
		.success(function(response){
			vm.posts = response;
			console.log(response);
		})
		.error(function(err){
			console.log(err);
		});

	vm.savePost = function() {
		console.log(vm.file);
		var data = new FormData();

		data.append('title', vm.title);
		data.append('content', vm.content);
		data.append('author', vm.author);
		data.append('file', vm.file);

		$http.post('/api/post', data, {
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		})
		.success(function(response){
			console.log(response)
			vm.posts.push(response);
		})
		.error(function(err){
			console.log(err);
		});

		// var data = {
		// 	title: vm.title,
		// 	content: vm.content,
		// 	author: vm.author
		// }

		// $http.post('/api/post', data)
		// .success(function(response){
		// 	vm.posts.push(response);
		// })
		// .error(function(err){
		// 	console.log(err);
		// })
	}

	vm.editPost = function() {
		$http.put('/api/post', vm.objectToEdit)
		.success(function(response){
			vm.closeModal();
			console.log(response);
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

	vm.makeEditable = function(post){
		vm.objectToEdit = post;
	}

	vm.closeModal = function(){
		vm.objectToEdit = null;	
	}

}




