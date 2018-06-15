var app = angular.module('decode', []);

app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http'];

function MainCtrl($http){
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
