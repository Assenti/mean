app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;
	vm.objectToEdit = null;
	

	vm.currentPage = 1;
	vm.pages = [];
	vm.allPages = [];

	$http.get('/api/post/home/' + vm.currentPage)
	.success(function(response){
		vm.posts = response.posts;
		vm.count = response.count;
		vm.allPages = new Array(Math.ceil(vm.count / 5));
		for(var i = 0; i < vm.allPages.length; i++){
			vm.allPages[i] = i;
		}
		vm.pages = vm.allPages.slice(0, 5);
	})
	.error(function(err){
		console.log(err);
	})

	vm.nextPage = function(){
		if(vm.currentPage % 5 == 0 && vm.currentPage < vm.allPages.length){
			vm.pages = vm.allPages.slice(vm.currentPage, vm.currentPage + 5);
			vm.currentPage++;
			vm.getPosts();
		} else if(vm.currentPage < vm.allPages.length){
			vm.currentPage++;
			vm.getPosts();
		}
	}

	vm.prevPage = function(){
		if((vm.currentPage - 1) % 5 == 0 && vm.currentPage > 1){
			vm.currentPage--;
			vm.pages = vm.allPages.slice(vm.currentPage - 5, vm.currentPage);
			vm.getPosts();
		} else if(vm.currentPage > 1){
			vm.currentPage--;
			vm.getPosts();
		}
	}

	vm.getPosts = function() {
	$http.get('/api/post/home/' + vm.currentPage)
		.success(function(response){
			vm.posts = response.posts;
		})
		.error(function(err){
			console.log(err);
		})
	}

	vm.displayPage = function(page){
		vm.currentPage = page;
		vm.getPosts();
	}

	
	vm.setLike = function(id, index){
		$http.put('/api/post/like/' + id)
		.success(function(response){
			vm.posts[index] = response;
		})
		.error(function(err){
			console.log(err);
		});
	}

	vm.IsLoading = true;

	angular.element(window).ready(function(){
		vm.IsLoading = false;
	});

}

// Tasks:
// 1. Spinner on loading posts while pagination
// 2. On scroll pagination
// 3. Pagination on btn - 'show more'



// vm.pages = [];
	// vm.page = 1;
	// vm.end = 5; // we decided to show only 5 page buttons

	// $http.get('/api/post/home/' + vm.page)
	// 	.success(function(response){
	// 		vm.activePage = vm.page;
	// 		vm.posts = response.posts;
	// 		vm.count = response.count;
	// 		vm.allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page
	// 		if(vm.allPages <= vm.end) {
	// 			for(var i = 1; i <= vm.allPages; i++){
	// 				vm.pages.push(i);
	// 			}
	// 		} else {
	// 			for(var i = 1; i <= vm.end; i++){
	// 				vm.pages.push(i);
	// 			}
	// 		}
	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	});

	// vm.nextPage = function(lastPage){
	// 	var start = 0, end = 0;

	// 	$http.get('/api/post/home/' + vm.page)
	// 	.success(function(response){
	// 		vm.posts = response.posts;
	// 		vm.count = response.count;
	// 		var allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page

	// 		if(allPages > parseInt(lastPage)) {
	// 			end = parseInt(lastPage) + 1;
	// 			start = end - 4;
	// 			vm.pages = [];
	// 			for(var i = start; i <= end; i++){
	// 				vm.pages.push(i);
	// 			}
	// 		}
	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	});
	// }

	// vm.prevPage = function(firstPage){
	// 	var start = 0, end = 0;

	// 	$http.get('/api/post/home/' + vm.page)
	// 	.success(function(response){
	// 		vm.posts = response.posts;
	// 		vm.count = response.count;
	// 		var allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page

	// 		if(parseInt(firstPage) > 1) {
	// 			start = parseInt(firstPage) - 1;
	// 			end = start + 4;
	// 			vm.pages = [];
	// 			for(var i = start; i <= end; i++){
	// 				vm.pages.push(i);
	// 			}
	// 		}

	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	});
	// }

	// vm.displayPage = function(page){
	// 	vm.page = parseInt(page);
	// 	vm.activePage = page;

	// 	$http.get('/api/post/home/' + vm.page)
	// 	.success(function(response){
	// 		vm.posts = response.posts;
	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	});
	// }




















