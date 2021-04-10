import React, { useEffect } from "react";
import { ChatBoxComponent } from '../../../components/Meetopia/ChatBoxComponent'
import { VideoComponent } from '../../../components/Meetopia/VideoComponent'
import { WhiteBoardComponent } from '../../../components/Meetopia/WhiteBoardComponent'
import { WhiteBoardToolBoxComponent } from '../../../components/Meetopia/WhiteBoardToolBoxComponent'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { handleNewMessage } from './handleNewMessage'
import { handleWhiteBoard } from './handleWhiteBoard'

export function MeetopiaPage() {
    const history = useHistory()
    const thisRoom = history.location.pathname.split('/')[2]
    const socket = io('http://localhost:5000')
    const user = useSelector(state => state.auth.user)

    socket.on('connection', () => console.log('im connected'))
    
    
    
    if(thisRoom)
        socket.emit('JoinRoom', { thisRoom, username: user.firstname } )
    /*else
        props.history.push('/Meetopia/room1')*/

    useEffect(() => {
        handleNewMessage(socket, user)
        handleWhiteBoard(socket)
        } )
     
    
    
    return (<>
            <div className="row">
                <div className="col-lg-6 col-xxl-9">
                    <VideoComponent socket={socket} className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-3">
                    <ChatBoxComponent username={user.firstname} socket={socket} className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-9">
                    <WhiteBoardComponent className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-3">
                    <WhiteBoardToolBoxComponent className="card-stretch gutter-b"/>
                </div>
            </div>
    </>);
}
