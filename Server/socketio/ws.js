module.exports = (io) => { 
  const rooms = []
    io.on('connection', (socket) => {
        socket.on('JoinRoom', ({ thisRoom: roomId, username } ) => { 
          socket.join(roomId)
          const findRoom = rooms.filter( room => room.roomId === roomId )[0]
          
          if(!findRoom){
            if(username === 'admin')
            {
              rooms.push( { roomId, adminID: 'admin', userIDs: [ ] } )
              socket.emit('adminID', username )
            }
            else{
              rooms.push( { roomId, adminID: null, userIDs: [ username ] } )
              socket.emit('adminID', null )
            }
            socket.emit('ParticipantsIDs', [] )
          }
          else{
            socket.emit('ParticipantsIDs', findRoom.userIDs)
            socket.emit('adminID', findRoom.adminID )
            const findUser = findRoom.userIDs.filter( Searchusername => Searchusername === username )[0]
            if( !findUser && username !== 'admin' )
            {
              findRoom.userIDs.push(username)
            }
            else if(username === 'admin')
              findRoom.adminID = 'admin'
          }

          socket.on('ChatMessageToServer', (data) => { io.to(roomId).emit('ChatMessageFromServer', data) } )
          socket.on('WhiteBoardDrawingToServer', (data) => socket.to(roomId).emit('WhiteBoardDrawingFromServer', data));

          socket.on('disconnect', () => {
            const findRoom = rooms.filter( room => room.roomId === roomId )[0]
            if(findRoom)
            {
              if(username !== 'admin' )
                socket.to(roomId).emit('userLeftRoom', username)
              findRoom.userIDs = findRoom.userIDs.filter( Searchusername => Searchusername !== username )
              if(username === 'admin')
                findRoom.adminID = null
              if(findRoom.userIDs.length === 0 && !findRoom.adminID )
                {
                  rooms.splice( rooms.indexOf(findRoom), 1 )
                }
            }
          })
        })
        setInterval( () => console.log(rooms), 2000 )
      })
 }
