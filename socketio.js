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
    let questions = [
        {
            title: 'Who is the current president of USA?',
            options: {
                a: 'Donald Trump',
                b: 'Joe Biden',
                c: 'Tom Cruise',
                d: 'Arnob Rahman'
            },
            description: 'Few days ago, a new election occured, who is the new president?'
        },
        {
            title: 'Who is the current president of USA2?',
            options: {
                a: 'Donald Trump',
                b: 'Joe Biden',
                c: 'Tom Cruise',
                d: 'Arnob Rahman'
            },
            description: 'Few days ago, a new election occured, who is the new president?'
        },
        {
            title: 'Who is the current president of USA3?',
            options: {
                a: 'Donald Trump',
                b: 'Joe Biden',
                c: 'Tom Cruise',
                d: 'Arnob Rahman'
            },
            description: 'Few days ago, a new election occured, who is the new president?',
            correct_answer: 'a'
        },
    ]
    io.on('connection', (socket) => {
        socket.on('joinRoom', async ({ room, username, role }) => {
            let user = await knex('users').where({token: username});
            socket.join(room);
        
            // Add user to the room
            if (!rooms[room]) rooms[room] = [];
            rooms[room].push({ id: socket.id, user: user[0], role: role });
        
            // Notify other users in the room
            socket.to(room).emit('userConnected', { id: socket.id, user: user[0], role: role});
            // socket.to(room).emit('userConnected', rooms[room]);
        
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
        let i = 0;
        socket.on('check', (role, state) => {
            socket.emit('point', (role, state='true'?11:-11));
            i=i+1;
            socket.emit('question', questions[i]);
        })
        console.log(i);
        socket.emit('question', questions[i]);
    })
}

module.exports = live_olympiad;