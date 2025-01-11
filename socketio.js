function live_olympiad(app, knex, io) {
    const rooms = {};
    // io.on('connection', async (socket) => {
    //     const sockets = await io.fetchSockets();
    //     for (let x in sockets) {
    //         console.log(x)
    //     }
    //     socket.on ('userid', async (token) => {
    //         let user = await knex('users').where({token: token.token});
    //         io.emit('user_joined', user);
    //     })
    // });
    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ room, username }) => {
            socket.join(room);
        
            // Add user to the room
            if (!rooms[room]) rooms[room] = [];
            rooms[room].push({ id: socket.id, username });
        
            // Notify other users in the room
            socket.to(room).emit('userConnected', { id: socket.id, username });
        
            // Send the list of users in the room to the new user
            io.to(socket.id).emit('roomUsers', rooms[room]);
        });
        socket.on('disconnect', () => {
            for (const room in rooms) {
              rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
        
              // Notify other users in the room
              socket.to(room).emit('userDisconnected', { id: socket.id });
        
              // Delete room if empty
              if (rooms[room].length === 0) delete rooms[room];
            }
        
            console.log(`User disconnected: ${socket.id}`);
        });
    })
}

module.exports = live_olympiad;