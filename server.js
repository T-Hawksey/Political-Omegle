const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client/dist')));

const waitingUsers = {
  left: null,
  right: null,
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('political-affiliation', (affiliation) => {
    socket.politicalAffiliation = affiliation;
    const oppositeAffiliation = affiliation === 'left' ? 'right' : 'left';
    const peer = waitingUsers[oppositeAffiliation];

    if (peer) {
      waitingUsers[oppositeAffiliation] = null; // Clear the waiting spot

      const room = `${socket.id}#${peer.id}`;
      peer.join(room);
      socket.join(room);

      // Notify both users they are connected and assign initiator
      peer.emit('peer-connected', { initiator: false, room });
      socket.emit('peer-connected', { initiator: true, room });
    } else {
      waitingUsers[affiliation] = socket;
      socket.emit('waiting');
    }
  });

  // Relay signaling data between peers in a room
  socket.on('signal', (data) => {
    const rooms = Array.from(socket.rooms);
    const chatRoom = rooms.find((room) => room.includes('#'));
    if (chatRoom) {
      socket.to(chatRoom).emit('signal', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // If the user was waiting, remove them from the waiting list
    if (waitingUsers[socket.politicalAffiliation] === socket) {
      waitingUsers[socket.politicalAffiliation] = null;
    }

    // Notify the other user in the room that their peer has left
    const rooms = Array.from(socket.rooms);
    const chatRoom = rooms.find((room) => room.includes('#'));
    if (chatRoom) {
      socket.to(chatRoom).emit('chat end');
    }
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
