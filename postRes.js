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
        let user = await knex('users') || false;
        if (user.length == 0) { return; }
        if (_shoreo_data.length == 0) { return; }
        let { data_quantity } = req.params;
        let arr = [];
        for (let x of _shoreo_data) {
            let o = await knex('users').where({ userid: `${x.authorid}` })
            arr.push(
                {
                    id: x.id,
                    _tag: x.tag,
                    Gtag: x.Gtag,
                    _type: x._type,
                    _title: x.title,
                    _writer: o[0].user_name,
                    _writer_id: x.authorid,
                    _writer_avatar: o[0].img,
                    _document: x.document,
                    img: x.thumbnail,
                    type: '01',
                    time: x.time,
                    servertime: x.servertime
                }
            )
        }
        res.send(arr);
    })

    let Users = require('./backend/js/shoreo/Users.js');
    app.post('/user/:userid', async (req, res) => {
        const { userid } = req.params;
        let _shoreo_data = await knex('posts');
        let _questions = await knex('questions');
        let a = [];
        let b = [];
        for (let x of _shoreo_data) {
            if (userid === x.authorid) {
                a.push(x);
            }
        }
        for (let y of _questions) {
            if (userid === y.authorid) {
                b.push(y);
            }
        }
        let users = await knex('users').where({ userid: userid });
        if (users.length == 0) { return; }
        let c_point = await knex('c_point').where({ user_id: userid });
        if (c_point.length == 0) { c_point = [{ point: 0 }] }
        let obj = {
            _name: `${users[0].user_name}`,
            _avatar: `${users[0].img}`,
            is_verified: `${users[0].is_verified}`,
            _posts: a,
            _questions: b,
            status: users[0].status || false,
            _role: `${users[0].role}` || false,
            c_point: `${c_point[0].point}`,
            c_point_prev: `${c_point[0].point_prev}`
        }
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
                    a: [],
                    type: '02'
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
            res.send({ _avatar: user[0].img, _name: user[0].user_name, _id: user[0].userid, _token: user[0].token, _password: user[0].password });
        }
    })

    app.post('/auth/signup', async (req, res) => {
        let token_generator = require('./backend/js/api/tokenGenerator.js');
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
                userid: `${userid}`,
                token: await token_generator(knex)
            });
            res.send({ id: 182, message: 'successful!' });
            console.log(await knex('users'))
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
        res.send({ id: 1, message: 'Done' });
    })
    app.post('/api/v1/ask_a_question', async (req, res) => {
        let { title, authorid, type } = req.body;
        // if (!title && !authorid && !type) {return;};
        await knex('questions').insert({ title: `${title}`, authorid: `${authorid}`, type: `${type}` });
        res.send({ x: 'done' });
    })
    app.post('/api/post', async (req, res) => {
        let { document, authorid, _type, title, gtag, time, servertime } = req.body;
        if (!document && !authorid && !_type && !title && !gtag, !time, !servertime) { return; }
        if (!gtag == 'science_and_technology' && 'literature' && 'socity' && 'philosophy_and_history') {
            return;
        }
        if (await knex('users').where({ userid: authorid }).length == 0) { return; }
        let user = await knex('users').where({ userid: `${authorid}` });
        let a = {
            document: document,
            authorid: authorid,
            _type: _type,
            Gtag: gtag,
            title: title,
            user_name: user[0].user_name,
            time: `${time}`,
            servertime: `${servertime}`
        }
        await knex('posts').insert(a);
        res.send({ c: 1 });
    })

    app.post('/edit/:id', async (req, res) => {
        let { id } = req.params;
        if (!id) {
            res.send({ error: 1 });
        }
        let x = await knex('posts').where({ id: id });
        if (x.length == 0) { return; }
        res.send(x[0]);
    })
    app.post('/api/update', async (req, res) => {
        let { id, document } = req.body;
        if (!id && !document) { return }
        console.log(document);
        await knex('posts').where({ id: id }).update({ document: document });
    })

    app.post('/api/questions/subjects', async (req, res) => {
        let subjects = [
            {
                id: 'physics',
                name: 'Physics',
                description: 'Do you know the theory of relativity?',
                color: 'rgb(226, 86, 86)'
            },
            {
                id: 'chemistry',
                name: 'Chemistry',
                description: 'Do you know the Ionic BOND?',
                color: 'rgb(86, 88, 226)'
            },
            {
                id: 'biology',
                name: 'Biology',
                description: 'Do you know the cells?',
                color: 'rgb(75, 222, 114)'
            },
            {
                id: 'mathematics',
                name: 'Math',
                description: 'Do you know the formulas of math?',
                color: 'rgb(108, 102, 222)'
            },
            {
                id: 'love',
                name: 'Love',
                description: 'Do you know the meaning of love..?',
                color: 'rgb(208, 102, 222)'
            },
            
        ];
        let y = [];
        for (let x of subjects) {
            y.push(x);
        }

        res.send(y);
    })

    app.post('/questions/q/:id', async (req, res) => {
        let { id } = req.params;
        let olympiads = await knex('olympiad').where({ id: id });
        let questions = await knex('olympiad_questions');
        let array = [];
        for (let y of questions) {
            if (olympiads[0].id == y.for_question) {
                array.push(y);
                olympiads[0].questions = array;
            }
        }
        res.send(olympiads[0]);
    })

    app.post('/api/c_point/update', async (req, res) => {
        let { id } = req.body;
        let data = await knex('c_point').where({ user_id: id });
        if (data) {
            res.send(data[0]);
        } else {
            res.status(418).send({ error: 'No id founded' })
        }
    })

    app.post('/api/leaderboard', async (req, res) => {
        let leaderboard_Arr = await knex('c_point');
        let leaderboard = leaderboard_Arr.sort((a, b) => b.point - a.point);
        res.send(leaderboard);
        // console.log(leaderboard);
    })

    app.post('/api/public/create_questions', async (req, res) => {
        let { question } = req.body;

        if (question.token === 'nXjHnPiLt178712' && question.title && question.userid) {
            let p = await knex('olympiad').where({ title: question.title, question_by: question.userid, purpose: question.purpose })
            if (!p.length == 0) { return; }
            await knex('olympiad').insert({ title: question.title, question_by: question.userid, purpose: question.purpose });
            let q = await knex('olympiad').where({ title: question.title, question_by: question.userid, purpose: question.purpose });
            for (let x of question.q) {
                await knex('olympiad_questions').insert({ q_title: x.title, options: x.options ? x.options : "none", q_answer: x.answer, explaination: x.explaination, for_question: q[0].id });
            }
            console.log(await knex('olympiad'))
        }
    })

    app.post('/api/private/answer_check', async (req, res) => {
        let { id, user_id } = req.body;
        let { givenans } = req.body;
        if (!id) { return };
        if (!user_id) { return } else if (user_id == 'none') { return; };
        if (!givenans) { return };
        let q = await knex('olympiad_questions').where({ id: id });
        let answer = q[0].q_answer;
        let isanswerd = await knex('answered_question').where({ userid: user_id, quid: id });
        if (!isanswerd.length == 0) { return; }
        if (givenans == answer) {
            let point = await knex('c_point').where({ user_id: user_id });
            // if (answered_question.length == 0) {return};
            if (point.length == 0) { return; }
            let new_p = point[0].point + 5;
            await knex('c_point').where({ user_id: user_id }).update({ point: new_p, point_prev: point[0].point });
            await knex('answered_question').insert({ userid: user_id, quid: id });
            res.send({ x: 1 });
        } else {
            res.send({ x: 0 });
        }
    })

    app.post('/api/personal_post/add', async (req, res) => {
        let { document, authorid, _type, gtag, time } = req.body;

        if (!document && !authorid && !_type && !gtag && !time) { return };

        await knex('personal_posts').insert({ document: document, authorid: authorid, _type: _type, time: time, gtag: gtag, thumbs_up_int: 0, thumbs_down_int: 0, thumbs_up: JSON.stringify(['0']), thumbs_down: JSON.stringify(['0']) })

        res.send({ o: 1 });

    })

    app.post('/api/personal_post/get', async (req, res) => {
        let { authorid } = req.body;
        let arr = [];
        let t = await knex('personal_posts');
        for (let x of t) {
            let thumbs_up_clicked = false;
            let thumbs_down_clicked = false;
            let is_thums_up = await knex('personal_posts').where({id: x.id})
            let thumbs_up_array = JSON.parse(is_thums_up[0].thumbs_up) || [];
            let thumbs_down_array = JSON.parse(is_thums_up[0].thumbs_down) || [];
            for (let y of thumbs_up_array) {
                if (y==authorid) {
                    thumbs_up_clicked = true;
                }
            }
            for (let y of thumbs_down_array) {
                if (y==authorid) {
                    thumbs_down_clicked = true;
                }
            }
            let o = await knex('users').where({ userid: `${x.authorid}` })
            arr.push(
                {
                    id: x.id,
                    Gtag: x.Gtag,
                    _type: x._type,
                    _title: x.title,
                    _writer: o[0].user_name,
                    _writer_id: x.authorid,
                    _writer_avatar: o[0].img,
                    _document: x.document,
                    type: x._type,
                    time: x.time,
                    servertime: x.servertime,
                    thumbs_up: x.thumbs_up_int,
                    thumbs_down: x.thumbs_down_int,
                    thumbs_up_clicked: thumbs_up_clicked,
                    thumbs_down_clicked: thumbs_down_clicked
                }
            )
        }
        res.send(arr);
    })
    app.post('/api/personal_post/private/edit/:what/:action', async (req, res) => {
        let { what, action, } = req.params;
        let { id, userid } = req.body;
        if (!what && !action && !id && !userid) { return };
        if (userid==null) {return};
        if (what == 'thumbsup') {
            let prev_thumbs_up = await knex('personal_posts').where({ id: id });
            let thumbs_up_users = prev_thumbs_up[0].thumbs_up;
            let array = JSON.parse(thumbs_up_users);
            if (Array.isArray(array) == false) {return;}
            for (let x of array) {
                if (x == userid) {
                    return res.send({error: 'action failed'})
                } else {
                    array.push(userid);
                    let another_array = JSON.stringify(array);
                    await knex('personal_posts').where({ id: id }).update({ thumbs_up_int: action == 'add' ? (prev_thumbs_up[0].thumbs_up_int + 1) : (prev_thumbs_up[0].thumbs_up_int - 1), thumbs_up: another_array })
                }
            }
        }
        if (what == 'only_thumb_up') {
            let prev_thumbs_up = await knex('personal_posts').where({ id: id });
            let thumbs_up_users = prev_thumbs_up[0].thumbs_up;
            let array = JSON.parse(thumbs_up_users);
            for (let x of array) {
                if (!x == userid) {
                    return res.send({error: 'action failed'})
                } else {
                    const index = array.indexOf(userid);
                    if (index > -1) {
                      array.splice(index, 1);
                    }
                    let another_array = JSON.stringify(array);
                    await knex('personal_posts').where({ id: id }).update({ thumbs_up_int: prev_thumbs_up[0].thumbs_up_int - 1, thumbs_up: another_array })
                }
            }
        }
        if (what == 'only_thumb_down') {
            let prev_thumbs_up = await knex('personal_posts').where({ id: id });
            let thumbs_up_users = prev_thumbs_up[0].thumbs_down;
            let array = JSON.parse(thumbs_up_users);
            for (let x of array) {
                if (!x == userid) {
                    return res.send({error: 'action failed'})
                } else {
                    const index = array.indexOf(userid);
                    if (index > -1) {
                      array.splice(index, 1);
                    }
                    let another_array = JSON.stringify(array);
                    await knex('personal_posts').where({ id: id }).update({ thumbs_down_int: prev_thumbs_up[0].thumbs_down_int - 1, thumbs_down: another_array })
                }
            }
        }
        if (what == 'thumbsdown') {
            let prev_thumbs_down = await knex('personal_posts').where({ id: id });
            let thumbs_down_users = prev_thumbs_down[0].thumbs_down;
            let array = JSON.parse(thumbs_down_users);
            for (let x of array) {
                if (x == userid) {
                    return res.send({error: 'action failed'})
                } else {
                    array.push(userid);
                    let another_array = JSON.stringify(array);
                    await knex('personal_posts').where({ id: id }).update({ thumbs_down_int: action == 'add' ? (prev_thumbs_down[0].thumbs_down_int + 1) : (prev_thumbs_down[0].thumbs_down_int - 1), thumbs_down: another_array })
                    console.log(await knex('personal_posts'))
                }
            }
        }
    })

    app.post('/api/olympiad/create', async(req, res) => {
        let { name, authors, type} = req.body;

        await knex('olympiad').insert(
            {
                title: name,
                question_by: authors,
                purpose: type
            }
        )
        res.send({x: 'done'});
    })
    app.post('/api/olympiad_questions/create', async(req, res) => {
        let { title, answer, exp, id } = req.body;

        await knex('olympiad_questions').insert(
            {
                q_title: title,
                options: exp,
                q_answer: answer,
                for_question: id
            }
        )
        res.send({id: 112});
    })
    app.post('/api/private/user/edit/:what', async (req, res) => {
        let { token, str, img } = req.body;
        let { what } = req.params
        if (what == 'img') {
            await knex('users').where({token: token}).update({img: img})
        }
        if (what == 'name') {
            await knex('users').where({token: token}).update({user_name: str})
        }
    })
    app.post('/api/private/isuser_owner', async(req, res) => {
        let {usertoken, userid} = req.body;

        let user = await knex('users').where({userid: userid})

        if (user[0].token == usertoken) {
            res.send({res: 'true'});
        }
    })
}