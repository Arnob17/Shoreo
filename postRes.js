module.exports = function (app, path, knex) {
    var _shoreo_data = require('./backend/js/shoreo/blogs.js') || false;

    app.post('/api/view_req_data', (req, res) => {
        let { id } = req.body;
        if (!id) {
            res.status(418).send({ error: 'No Id Provided' })
        } else {
            for (let o of _shoreo_data) {
                if (o.id === id) {
                    res.send(o);
                }
            }
        }
    })

    app.post('/api/posts_data/:data_quantity', (req, res) => {
        let { data_quantity } = req.params;
        if (data_quantity) {
            if (parseInt(data_quantity)) {
                for (let i = 0; i < data_quantity; i = i + i) {
                    let o = [];
                    o.push(_shoreo_data[i]);
                    res.send(o);
                }
            } else {
                res.send(_shoreo_data);
            }
        }
    })

    let Users = require('./backend/js/shoreo/Users.js');
    app.post('/user/:userid', async (req, res) => {
        const { userid } = req.params;
        let a = [];
        for (let x of _shoreo_data) {
            if (userid === x._writer_id) {
                a.push(x);
            }
        }
        let users = await knex('users').where({ userid: userid });
        let obj = {
            _name: `${users[0].user_name}`,
            _avatar: `${users[0].img}`,
            is_verified: `${users[0].is_verified}`,
            _posts: a,
            status: users[0].status || false,
            _role: `${users[0].role}` || false,
        }
        res.send(obj);
    })

    app.post('/api/v1/q', (req, res) => {
        let x = require('./backend/js/shoreo/questions.js');
        res.send(x);
    })
    app.post('/auth/check', async (req, res) => {
        let { id } = req.body;
        let { pass } = req.body;
        let users = await knex('users').where({ userid: id } && { password: pass });
        console.log(users);
        res.send({ _avatar: users[0].img, _name: users[0].user_name, _id: users[0].userid });
    })

    app.post('/auth/signup', async (req, res) => {
        let { username, userid, password } = req.body;
        let availableuser = await knex('users').where({ userid: userid });
        console.log(availableuser);
        if (availableuser.length == 0) {
            await knex('users').insert({
                user_name: `${username}`,
                role: 'লেখক',
                password: `${password}`,
                img: 'https://cdn.discordapp.com/attachments/778294816190103642/1020590907701088296/unknown.png',
                is_verified: 'false',
                userid: `${userid}`
            });
            res.send({id: 182, message: 'successful!'});
        } else {
            res.status(418).send({ error: 'UserAlreadyExists', id: 181 })
        }
    })
}