app.controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$http', '$scope', '$rootScope', '$state', 'Socket'];

function ChatCtrl($http, $scope, $rootScope, $state, Socket){
	var vm = this;

	Socket.forward('updateroom', $scope);
	Socket.forward('updateroomslist', $scope);
	Socket.forward('displayrooms', $scope);
	Socket.forward('displaymessages', $scope);

	vm.notAuth = false;

	if($rootScope.session == null){
		vm.notAuth = true;
		$state.go('auth');
	} else {
		Socket.emit('getrooms', { user_id: $rootScope.session._id });
		$scope.$on('socket:displayrooms', function(evt, rooms){
			vm.rooms = rooms;
			vm.activeRoom = vm.rooms[0];
			Socket.emit('getmessages', { room_id: vm.activeRoom._id });
			Socket.emit('roomentered', { user_id: $rootScope.session._id, room_id: vm.activeRoom._id });
		});

		$scope.$on('socket:displaymessages', function(evt, messages){
			vm.messages = messages;
		});
		
		$scope.$on('socket:updateroomslist', function(evt, room){
			vm.rooms.push(room);
		});

		$scope.$on('socket:updateroom', function(evt, author, text){
			var message = {
				author_name: author,
				text: text
			}
			vm.messages.push(message);
		});	

		
		
		vm.modal = false;
		vm.openRoomCreator = function(){
			vm.modal = true;
		}
		vm.closeRoomCreator = function(){
			vm.modal = false;
			vm.roomName = '';
		}

		vm.createRoom = function(){
			Socket.emit('newroom', { user_id: $rootScope.session._id, name: vm.roomName })
			vm.closeRoomCreator();
		}
			
		vm.changeRoom = function(room){
			vm.activeRoom = room;
			Socket.emit('getmessages', { room_id: room._id });
			Socket.emit('changeroom', { room: room })
		}

		vm.sendMessage = function(){
			Socket.emit('newmessage', {
				user_id: $rootScope.session._id,
				text: vm.text,
				room_id: vm.activeRoom._id
			})
			vm.text = '';
		}

		vm.searchRooms = function(){
			if(!vm.search){
				return
			}
			$http.get('/api/roomsearch/' + vm.search)
			.success(function(response){
				console.log(response);
				vm.search_result = response;
			})
			.error(function(err){
				console.log(err);
			})
		}

		vm.chooseRoom = function(){
			vm.search_result = [];
			vm.search = '';
		}

	}

	
}