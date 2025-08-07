import React, { useRef, useEffect } from 'react';

function VideoChat({ localStream, remoteStream }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="video-chat-container">
      <div className="video-wrapper">
        <video ref={localVideoRef} autoPlay muted playsInline />
        <p>You</p>
      </div>
      <div className="video-wrapper">
        <video ref={remoteVideoRef} autoPlay playsInline />
        <p>Stranger</p>
      </div>
    </div>
  );
}

export default VideoChat;
