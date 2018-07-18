app.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$http', '$scope', '$state'];

function PostCtrl($http, $scope, $state){
	var vm = this;
	vm.objectToEdit = null;

	$http.get('/api/post/' + $state.params.id)
	.success(function(response){
		vm.post = response;

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
			vm.post.comments.push(response);
			console.log(response);
		})
		.error(function(err){
			console.log(err);
		})
	}

	vm.editComment = function() {
		$http.put('/api/comment', vm.objectToEdit)
		.success(function(response){
			console.log(response);
		})
		.error(function(err){
			console.log(err);
		})
	}

	// OTHER VERSION
	// vm.editComment_Other = function(){
	// 	vm.commentToSend = {
	// 		_id: vm.currentCommentId,
	// 		body: vm.currentCommentText
	// 	}
	// 	$http.put('/api/comment', vm.commentToSend)
	// 	.success(function(response){
	// 		console.log(response);
	// 		vm.post.comments[vm.currentComment] = response;
	// 		vm.cancel();
	// 	})
	// 	.error(function(err){
	// 		console.log(err);
	// 	})
	// }


	vm.deleteComment = function(index, comment){
		$http.delete('/api/comment/' + comment._id + '/' + comment.post)
			.success(function(response){
				vm.post.comments.splice(index, 1);
			})
			.error(function(err){
				console.log(err);
			});
	}

	vm.makeEditable = function(comment){
		vm.objectToEdit = comment;
	}

	// Open comment edit block
	vm.selectComment = function(index, comment){
		vm.currentComment = index;
		vm.currentCommentText = comment.body;
		vm.currentCommentId = comment._id;
	}

	// Cancel - comment edit block disapears
	vm.cancel = function(){
		vm.currentComment = null;
	}


}

