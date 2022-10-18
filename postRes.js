module.exports = function (app, path, knex) {

    app.post('/api/view_req_data', async (req, res) => {
        let _shoreo_data = await knex('posts');
        if (_shoreo_data.length == 0) { return; }
        let { id } = req.body;
        if (!id) {
            res.status(418).send({ error: 'No Id Provided' })
        } else {
            let x = await knex('posts').where({ id: id });
            if (!x[0]) { return; }
            res.send({
                id: x[0].id,
                _tag: x[0].tag,
                Gtag: x[0].Gtag,
                _type: x[0].type,
                _title: x[0].title,
                _writer: x[0].user_name,
                _writer_id: x[0].authorid,
                _document: x[0].document
            });
        }
    })

    app.post('/api/posts_data/:data_quantity', async (req, res) => {
        let _shoreo_data = await knex('posts') || false;
        if (_shoreo_data.length == 0) { return; }
        let { data_quantity } = req.params;
        let arr = [];
        for (let x of _shoreo_data) {
            arr.push(
                {
                    id: x.id,
                    _tag: x.tag,
                    Gtag: x.Gtag,
                    _type: x._type,
                    _title: x.title,
                    _writer: x.user_name,
                    _writer_id: x.authorid,
                    _document: x.document,
                    img: x.thumbnail
                }
            )
        }
        res.send(arr);
    })

    let Users = require('./backend/js/shoreo/Users.js');
    app.post('/user/:userid', async (req, res) => {
        const { userid } = req.params;
        let _shoreo_data = await knex('posts');
        let a = [];
        for (let x of _shoreo_data) {
            if (userid === x.authorid) {
                a.push(x);
            }
        }
        let users = await knex('users').where({ userid: userid });
        if (users.length == 0) { return; }
        let obj = {
            _name: `${users[0].user_name}`,
            _avatar: `${users[0].img}`,
            is_verified: `${users[0].is_verified}`,
            _posts: a,
            status: users[0].status || false,
            _role: `${users[0].role}` || false,
        }
        console.log(obj)
        res.send(obj);
    })

    app.post('/api/v1/q', async (req, res) => {
        let x = await knex('questions');
        let arr = [];
        for (let y of x) {
            arr.push(
                {
                    q: y.title,
                    qid: y.id,
                    a: []
                }
            )
        }
        for (let x of arr) {
            let answer = await knex('answers').where({ question_id: `${x.qid}` })
            let o = answer;
            if (o.length > 0) {
                for (let i of answer) {
                    x.a.push(i);
                }
            }
        }
        res.send(arr);
    })
    app.post('/auth/check', async (req, res) => {
        let { id } = req.body;
        let { pass } = req.body;
        let user = await knex('users').where({ userid: id });
        let password = await knex('users').where({ password: pass });
        if (user.length == 0) { return; } else if (password.length == 0) { return; }
        if (user[0].userid == password[0].userid) {
            res.send({ _avatar: user[0].img, _name: user[0].user_name, _id: user[0].userid });
        }
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
            res.send({ id: 182, message: 'successful!' });
        } else {
            res.status(418).send({ error: 'UserAlreadyExists', id: 181 })
        }
    })
    app.post('/api/q/answer', async (req, res) => {
        let { answer, qid, authorid } = req.body;
        let { post_token } = req.body;
        let answer_db = await knex('answers');
        if (qid && post_token && answer && authorid) {
            await knex('answers').insert({
                answer: String(answer),
                question_id: `${qid}`,
                authorid: `${authorid}`,
                upvote: '0',
                downvote: '0'
            })
        }
        res.send({ id: 001, message: 'Done' });
    })
    app.post('/api/v1/ask_a_question', async (req, res) => {
        let { title, authorid, type } = req.body;
        // if (!title && !authorid && !type) {return;};
        await knex('questions').insert({ title: `${title}`, authorid: `${authorid}`, type: `${type}` });
        res.send({ x: 'done' });
    })
    app.post('/api/post', async (req, res) => {
        let { document, authorid, _type, title, img } = req.body;
        if (!document && !authorid && !_type && !title && !img) { return; }
        if (await knex('users').where({ userid: authorid }).length == 0) { return; }
        let user = await knex('users').where({ userid: `${authorid}` });
        let a = {
            document: document,
            authorid: authorid,
            _type: _type,
            Gtag: _type == '_science' ? 'বিজ্ঞান' : 'সাহিত্য',
            title: title,
            user_name: user[0].user_name,
            thumbnail: img
        }
        await knex('posts').insert(a);
        res.send({ c: 1 });
    })

    app.post('/edit/:id', async (req, res) => {
        let { id } = req.params;
        if (!id) {
            res.send({error: 01});
        }
        let x = await knex('posts').where({id: id});
        if(x.length==0){return;}
        res.send(x[0]);
    })
    app.post('/api/update', async (req,res) => {
        let { id, document } = req.body;
        if (!id && !document) {return}
        console.log(document);
        await knex('posts').where({id: id}).update({document: document});
    })
}