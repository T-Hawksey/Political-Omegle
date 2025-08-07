import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Landing from './components/Landing';
import VideoChat from './components/VideoChat';

const socket = io();

function App() {
  const [politicalAffiliation, setPoliticalAffiliation] = useState(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerRef = useRef();

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  useEffect(() => {
    if (politicalAffiliation) {
      startLocalVideo().then(stream => {
        if (stream) {
          socket.emit('political-affiliation', politicalAffiliation);

          socket.on('waiting', () => {
            setWaiting(true);
          });

          socket.on('peer-connected', ({ initiator }) => {
            setWaiting(false);
            setChatStarted(true);

            peerRef.current = new Peer({
              initiator,
              trickle: false,
              stream: stream,
            });

            peerRef.current.on('signal', (data) => {
              socket.emit('signal', data);
            });

            peerRef.current.on('stream', (remoteStream) => {
              setRemoteStream(remoteStream);
            });

            peerRef.current.on('close', () => {
              setChatStarted(false);
              setRemoteStream(null);
              setPoliticalAffiliation(null);
              localStream.getTracks().forEach(track => track.stop());
            });

            socket.on('signal', (data) => {
              peerRef.current.signal(data);
            });
          });

          socket.on('chat end', () => {
            if (peerRef.current) {
              peerRef.current.destroy();
            }
          });
        }
      });
    }

    return () => {
      socket.off('waiting');
      socket.off('peer-connected');
      socket.off('signal');
      socket.off('chat end');
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [politicalAffiliation]);

  const handleStartChat = (affiliation) => {
    setPoliticalAffiliation(affiliation);
  };

  return (
    <div className="App">
      {!politicalAffiliation ? (
        <Landing onStartChat={handleStartChat} />
      ) : waiting ? (
        <div className="waiting-screen">
          <h1>Waiting for a debate partner...</h1>
        </div>
      ) : chatStarted ? (
        <VideoChat localStream={localStream} remoteStream={remoteStream} />
      ) : null}
    </div>
  );
}

export default App;
