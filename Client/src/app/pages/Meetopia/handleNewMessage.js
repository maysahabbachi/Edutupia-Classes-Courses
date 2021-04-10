export  function handleNewMessage(socket, user) {
    const ChatBox = document.getElementById('ChatBox')
    const d = new Date()
    socket.on('ChatMessageFromServer', (msg) => { 
    const e = document.createElement('div');
    const userImg = new Image(30, 30)
    const userNameParagraph = document.createElement('h5')
    const timeParagraph = document.createElement('h5')
    const newText = document.createElement('p')

    userImg.src = 'http://localhost:3000/media/users/300_25.jpg'
    userImg.classList.add('rounded-circle')
    userImg.style.float = 'left'
    if( user.firstname === msg.username )
        userImg.style.float = 'right'
    
    e.append(userImg)

    userNameParagraph.innerHTML = msg.username
    userNameParagraph.classList.add('font-weight-bold')
    userNameParagraph.classList.add('pt-2')
    userNameParagraph.classList.add('pl-2')
    userNameParagraph.style.float = 'left'
    console.log('redux: ' + user.firstname + ' & socketio: ' + msg.username)
    e.append(userNameParagraph)

    timeParagraph.innerHTML = d.getHours() + ':' + d.getMinutes()
    timeParagraph.classList.add('font-weight-bold')
    timeParagraph.classList.add('pt-2')
    timeParagraph.style.float = 'right'
    e.append(timeParagraph)

    newText.innerHTML = msg.msg
    newText.style.clear = 'both'
    e.append(newText)
    
    ChatBox.append(e)
    })
}