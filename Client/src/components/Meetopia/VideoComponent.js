import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import Peer from 'peerjs';

export function VideoComponent({ socket, className }) {
  var connectedUsers
  var adminID
  var calls = []
  setInterval( () => console.log(calls), 2000 )
  socket.on('ParticipantsIDs', (data) => connectedUsers = data )
  socket.on('adminID', (data) => adminID = data )
  socket.on('userLeftRoom', (data) => { 
    const callToDestroy = calls.filter( (call) => call.call.peer === data )[0]
    callToDestroy.call.close()
    callToDestroy.myscreen.style.display = 'none';
    calls = calls.filter( (call) => call.call.peer !== data ) 
  })
  
  const result = useSelector(state => state.auth.user)
  const doItOnce = { done: 0 }
	const peer = new Peer(result.firstname, { host: 'localhost', port: '9000' });
	peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  });

function giveStreamOnRequest_Student(stream){
peer.on('call', function(call) {
  const myscreen = document.createElement('video')
    call.answer(stream);
    call.on('stream', function( remoteStream ) {
      if(doItOnce.done == 1){
        if(call.peer === 'admin'){
          const mainScreen = document.getElementById('myVid')
          mainScreen.srcObject = remoteStream
          mainScreen.muted = true
          mainScreen.addEventListener('loadedmetadata', () => {mainScreen.play()})
        }else{
          myscreen.srcObject = remoteStream
        myscreen.muted = true
        myscreen.width = 250
        myscreen.height = 200
        myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
        document.getElementById('webCams').append(myscreen)
        }
        doItOnce.done = 0}
        else if(doItOnce.done == 0) doItOnce.done = 1
    });
    calls.push( { call, myscreen } )
});}

function giveStreamOnRequest_Professor(stream){
  const myscreen = document.createElement('video')
  peer.on('call', function(call) {
      call.answer(stream);
      call.on('stream', function(remoteStream) {
        if(doItOnce.done == 1){
        myscreen.srcObject = remoteStream
        myscreen.muted = true
        myscreen.width = 250
        myscreen.height = 200
        myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
        document.getElementById('webCams').append(myscreen)
        doItOnce.done = 0}
        else if(doItOnce.done == 0) doItOnce.done = 1
      });
      calls.push( { call, myscreen } )
  });}

function requestWebcamStreams(user_id, stream){
  var call = peer.call(user_id, stream);
  const myscreen = document.createElement('video')
  call.on('stream', function(remoteStream) {
  if(doItOnce.done == 1){
  myscreen.srcObject = remoteStream
  myscreen.muted = true
  myscreen.width = 250
  myscreen.height = 200
  myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
  document.getElementById('webCams').append(myscreen)
  doItOnce.done = 0}
  else if(doItOnce.done == 0) doItOnce.done = 1
  });
  calls.push( { call, myscreen } )
}

  function shareDesktop(user_id, stream){
    var call = peer.call(user_id, stream);
    const myscreen = document.createElement('video')
    call.on('stream', function(remoteStream) {
    if(doItOnce.done == 1){
    myscreen.srcObject = remoteStream
    myscreen.muted = true
    myscreen.width = 250
    myscreen.height = 200
    myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
    document.getElementById('webCams').append(myscreen)
    doItOnce.done = 0}
    else if(doItOnce.done == 0) doItOnce.done = 1
    });
    calls.push( { call, myscreen } )
  }

  function requestDesktopStream(user_id, stream){
    var call = peer.call(user_id, stream);
    const myscreen = document.createElement('video')
    call.on('stream', function(remoteStream) {
    if(doItOnce.done == 1){
        const mainScreen = document.getElementById('myVid')
        mainScreen.srcObject = remoteStream
        mainScreen.muted = true
        mainScreen.addEventListener('loadedmetadata', () => {mainScreen.play()})
        doItOnce.done = 0}
        else if(doItOnce.done == 0) doItOnce.done = 1
    });
  }

  useEffect(() => {
    const waitForUsers = setInterval(() => { console.log('adminid: ' + adminID); if(connectedUsers && ( adminID===null || adminID ) ) clearInterval(waitForUsers) }, 100)
    
    const myVid = document.getElementById('myVid')
    const myVidfds = document.createElement('video')
    const webCams = document.getElementById('webCams')

    myVidfds.addEventListener('loadedmetadata', () => {myVidfds.play()})
    myVidfds.width = 250
    myVidfds.height = 200
    myVidfds.muted = true

  if(result.firstname ==='admin'){
    navigator.mediaDevices.getDisplayMedia({video: true, audio: true}).then( (stream) => {
      myVid.srcObject = stream
      myVid.muted = true
      giveStreamOnRequest_Professor(stream)
      connectedUsers.forEach( (userID) => shareDesktop(userID, stream) )
      } )
    }
  else 
  {
    navigator.mediaDevices.getDisplayMedia({video: true, audio: true}).then( (stream) => {console.log('guest sees: ' + connectedUsers)
      myVidfds.srcObject = stream
      requestDesktopStream(adminID, stream)
      giveStreamOnRequest_Student(stream)
      connectedUsers.forEach( (userID) => requestWebcamStreams(userID, stream) )
      webCams.append(myVidfds)
    })
  }

})
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Video
          </span>
        </h3>
        <div className="card-toolbar">
        
        </div>
      </div>
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
            <video id="myVid" controls autoPlay style={{ width: "100%" }}/>
        </div>
        <div className="d-flex justify-content-around flex-wrap" id="webCams" >
        </div>
      </div>
    </div>
  );
}
