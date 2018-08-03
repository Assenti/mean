app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', '$scope'];

function MainCtrl($http, $scope){
	var vm = this;
	vm.objectToEdit = null;
	vm.pages = [];
	vm.page = 1;
	vm.end = 5; // we decided to show only 5 page buttons

	$http.get('/api/post/home/' + vm.page)
		.success(function(response){
			vm.activePage = vm.page;
			vm.posts = response.posts;
			vm.count = response.count;
			vm.allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page
			if(vm.allPages <= vm.end) {
				for(var i = 1; i <= vm.allPages; i++){
					vm.pages.push(i);
				}
			} else {
				for(var i = 1; i <= vm.end; i++){
					vm.pages.push(i);
				}
			}
		})
		.error(function(err){
			console.log(err);
		});

	vm.nextPage = function(lastPage){
		var start = 0, end = 0;

		$http.get('/api/post/home/' + vm.page)
		.success(function(response){
			vm.posts = response.posts;
			vm.count = response.count;
			var allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page

			if(allPages > parseInt(lastPage)) {
				end = parseInt(lastPage) + 1;
				start = end - 4;
				vm.pages = [];
				for(var i = start; i <= end; i++){
					vm.pages.push(i);
				}
			}
		})
		.error(function(err){
			console.log(err);
		});
	}

	vm.prevPage = function(firstPage){
		var start = 0, end = 0;

		$http.get('/api/post/home/' + vm.page)
		.success(function(response){
			vm.posts = response.posts;
			vm.count = response.count;
			var allPages = Math.ceil(vm.count / 5); //5 - because we want to show 5 posts in a page

			if(parseInt(firstPage) > 1) {
				start = parseInt(firstPage) - 1;
				end = start + 4;
				vm.pages = [];
				for(var i = start; i <= end; i++){
					vm.pages.push(i);
				}
			}

		})
		.error(function(err){
			console.log(err);
		});
	}

	vm.displayPage = function(page){
		vm.page = parseInt(page);
		vm.activePage = page;

		$http.get('/api/post/home/' + vm.page)
		.success(function(response){
			vm.posts = response.posts;
			vm.count = response.count;
			vm.allPages = Math.ceil(vm.count / 5);
		})
		.error(function(err){
			console.log(err);
		});
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

}


// $http.get('/api/post/home/' + vm.page)
// 		.success(function(response){
// 			vm.posts = response.posts;
// 			vm.count = response.count;
// 			vm.allPages = Math.ceil(vm.count / 5);
// 			if(vm.allPages <= vm.end) {
// 				vm.pages = new Array(vm.allPages - (vm.page - 1));
// 			} else {
// 				vm.pages = new Array(vm.end - (vm.page - 1));
// 			}

// 			vm.pages = new Array(vm.end - (vm.page - 1));

// 		})
// 		.error(function(err){
// 			console.log(err);
// 		});


// vm.setPage = function(page){
// 		vm.end = vm.end + page - 1;
// 		$http.get('/api/post/home/' + vm.page)
// 		.success(function(response){
// 			vm.posts = response.posts;
// 			vm.count = response.count;
// 			vm.allPages = Math.ceil(vm.count / 5);

// 			if(vm.allPages < vm.end) {
// 				if(5 > vm.allPages - vm.page) {
// 					vm.page = 5 - (vm.allPages - vm.page);
// 					vm.pages = new Array(vm.page);

// 				} else {
// 					vm.pages = new Array(vm.allPages - vm.page);

// 				}
// 			// } else if(vm.allPages == vm.end) {
// 			// 	vm.pages = vm.end;
// 			} else {
// 				vm.page = page;

// 				vm.pages = new Array(vm.end - (vm.page - 1));
// 			}

// 		})
// 		.error(function(err){
// 			console.log(err);
// 		});
// 	}


// vm.setPage = function(page){
// 		vm.page = parseInt(page);
// 		var start = parseInt(page), end = 0;
// 		vm.activePage = page;

// 		$http.get('/api/post/home/' + vm.page)
// 		.success(function(response){
// 			vm.posts = response.posts;
// 			vm.count = response.count;
// 			vm.allPages = Math.ceil(vm.count / 5);

// 			if(vm.allPages >= start + 5) {
// 				end = start + 5;
// 			} else {
// 				end = vm.allPages; 
// 			}

// 			if(vm.allPages <= end){
// 				vm.pages = [];
// 				for(var i = start; i <= end; i++){
// 					vm.pages.push(i);
// 				}
// 				console.log('all pages less than end', vm.page, page, end);
// 			} else if(vm.allPages === end){
// 				vm.pages = [];
// 				for(var i = start; i < end; i++){
// 					vm.pages.push(i);
// 				}
// 				console.log('all pages equal to end', vm.page, page, end);
// 			} else {
// 				vm.pages = [];
// 				for(var i = start; i < end; i++){
// 					vm.pages.push(i);
// 				}
// 				console.log('all pages greater than end', vm.page, start, end);
// 			}


// 		})
// 		.error(function(err){
// 			console.log(err);
// 		});
// 	}




