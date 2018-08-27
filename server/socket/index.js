const Message = require('../models/Message')
const User = require('../models/User')
const Room = require('../models/Room')

let socketEvents = (io)=> {
	io.sockets.on('connection', (socket)=> {
		console.log('Sockets connected...')

		socket.on('roomentered', (data)=> {
			Room.findById(data.room_id).exec((err, room)=> {
				if(err) return socket.emit('updateroom', 'SERVER', err.message)
				socket.room = room._id
				socket.join(socket.room)
				User.findById(data.user_id).exec((err, user)=> {
					if(err) return socket.emit('updateroom', 'SERVER', err.message)
					socket.userName = user.name
					socket.emit('updateroom', 'SERVER', 'Вы присоединились к группе '+ room.name)
					socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', 'Пользователь '+ socket.userName + 'присоединился к чату.')
				})
			})
		})

		socket.on('changeroom', (data)=> {
			socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', 'Пользователь '+ socket.userName + 'покинул чат.')
			socket.leave(socket.room)
			socket.room = data.room._id
			socket.join(socket.room)
			socket.emit('updateroom', 'SERVER', 'Вы присоединились к группе '+ data.room.name)
			socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', 'Пользователь '+ socket.userName + 'присоединился к чату.')
		})

		socket.on('newroom', (data)=> {
			User.findById(data.user_id).exec((err, user)=> {
				let room = new Room({
					name: data.name,
					users: []
				})
				room.users.push(data.user_id)
				room.save((err, room)=> {
					user.rooms.push(room._id)
					user.save((err, user)=> {
						socket.emit('updateroomslist', room)
						socket.broadcast.emit('updateroomslist', room)
					})
				})
			})
		})

		socket.on('newmessage', (data)=> {
			User.findById(data.user_id).exec((err, user)=> {
				if(err) return socket.emit('updateroom', 'SERVER', err.message)
				let message = new Message({
					author: user._id,
					author_name: user.name,
					text: data.text,
					room: data.room_id
				})
				message.save((err, message)=> {
					if(err) return socket.emit('updateroom', 'SERVER', err.message)
					Room.findById(data.room_id).exec((err, room)=> {
						if(err) return socket.emit('updateroom', 'SERVER', err.message)
						room.messages.push(message._id)
						socket.broadcast.to(socket.room).emit('updateroom', user.name, data.text)
						socket.emit('updateroom', user.name, data.text)
					})
				})
			})
		})

		socket.on('getrooms', (data)=> {
			Room.find({ users: data.user_id }).exec((err, rooms)=> {
				socket.emit('displayrooms', rooms)
			})
		})

		socket.on('getmessages', (data)=> {
			Message.find({ room: data.room_id }).exec((err, messages)=> {
				socket.emit('displaymessages', messages);
			})
		})
	})
}

module.exports = socketEvents