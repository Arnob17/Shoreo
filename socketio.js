function live_olympiad(app, knex, io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
}

module.exports = live_olympiad;