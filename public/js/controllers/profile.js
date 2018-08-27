app.controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$http', '$scope', '$rootScope', '$window'];

function ProfileCtrl($http, $scope, $rootScope, $window){
	var vm = this;
	vm.objectToEdit = null;

	vm.shownPosts = 5;

	$http.get('/api/post/profile/' + vm.shownPosts)
	.success(function(response){
		vm.posts = response.posts;
		vm.count = response.count;
	})
	.error(function(err){
		console.log(err);
	})

	vm.expand = function(){
		if(vm.shownPosts+5 <= vm.count) {
			vm.shownPosts += 5;
		} else {
			vm.shownPosts += (vm.count - vm.shownPosts);
		}

		$http.get('/api/post/profile/' + vm.shownPosts)
		.success(function(response){
			vm.posts = response.posts;
		})
		.error(function(err){
			console.log(err);
		})
	}


           
	// j = jQuery.noConflict();
	// j(window).scroll(function(){
	//    if(window.pageYOffset==j('.embed-container').offset().top)
	//        window.scrollBy(0,-window.pageYOffset);
	// });




	vm.IsLoading = true;

	angular.element(window).ready(function(){
		vm.IsLoading = false;
	});

	// $http.get('/api/post')
	// 	.success(function(response){
	// 		vm.posts = response;
	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	});

	vm.savePost = function() {
		console.log(vm.file);
		var data = new FormData();

		vm.author = $rootScope.session.name;
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
