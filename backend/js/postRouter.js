module.exports = class PostRoute {

    constructor(e) {
        this.app = e;
    }

    post(r, f) {
        this.app.post(`${r}`, (req, res) => {f(req, res)});
    }

}