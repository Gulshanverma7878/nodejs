const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    // Create a namespace for private chat
    const chatNamespace = io.of('/private-chat');
    
    chatNamespace.on('connection', (socket) => {
        console.log('A user connected with ID:', socket.id);
    
        // Listen for private chat messages
        socket.on('private message', ({ message, recipient }) => {
            socket.to(recipient).emit('private message', message);
        });
    });
    res.sendFile(__dirname + '/index.html',{socket: socket.id});
});

app.get("chat",)




const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
