function register_router (app, file, name) {
    app.get(`/${name}`, (req, res) => {
        res.sendFile(`${file}`)
    })
}

module.exports = register_router;