const express = require('express');
const app = new express();
const path = require('path');
const regester_router = require('./backend/js/routers.js');
const LeafPostRoute = require('./backend/js/postRouter.js');
const PostRoute = new LeafPostRoute(app);
const db = require('./db.js');
const postRes = require('./postRes.js');
let shoreoApi = require('./backend/js/api/Users.js');
let user = new shoreoApi('fsfsd8sud8suhHhh77n', '17OnuArnob');
const knex = require('knex')({
  client: 'better-sqlite3',
  connection: {
    filename: "./database.sqlite"
  },
  useNullAsDefault: true
});
let server = app.listen(3000, () => {
  console.log('server started');
})
app.use(express.json())
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoHome.html'));
});
app.get('/api/v1', (req, res) => {
  res.redirect('/?ref=footer');
});

PostRoute.post('/api/v1/q/i', async (req, res) => {
  let { id } = req.body;
  let x = await knex('questions').where({ id: id }) || false;
  if (x.length == 0) { return res.send({ error: 'error!' }) }
  let b = await knex('users').where({ userid: x[0].authorid }) || false;
  if (!b) { return res.send({ error: 'error!' }) }
  let y = {
    q: x[0].title,
    a: [],
    author: b[0].user_name,
    author_id: x[0].authorid,
    qid: x[0].id
  }
  let answer = await knex('answers').where({ question_id: `${y.qid}` })
  let o = answer;
  if (o.length > 0) {
    for (let i of answer) {
      y.a.push(i);
    }
  }
  res.send(y);
})

async function x() {
  //  return knex.schema.table('personal_posts', table => {
  //   table.integer('thumbs_up_int');
  // })
  // let x = await knex("olympiad_questions");
  // console.log(x);
  // console.log(await knex('olympiad'))
  // let ids = [10, 7, 6, 1];
  // for (let x of ids) {
  //   await knex('posts').where({id: ids[x]}).update({Gtag: 'literature'});
  //   console.log();
  // }
  // let x = await knex('posts');
  // console.log(x);
  // let array = ['17OnuArnob', 'Robin01', 'Rakib07'];
  // let jsonaray = JSON.stringify(array);
  // let x = await knex('personal_posts').where({id: 4});

  // console.log(x[0].thumbs_up);
  // console.log('extracted', JSON.parse(x[0].thumbs_up));
}
x()
app.get('/user/:userid', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoUserInfo.html'));
})
app.get('/edit/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'postEDIT.html'));
})

app.get('/questions/q/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'questions_answers.html'));
})
postRes(app, path, knex);
// db(knex);
let routers = require('./routers.js');
routers(path, regester_router, app);
app.get('*', (req, res) => {
  res.status(404).send("<h1>Can't find this page.. Sorry (Error: 404)</h1>")
})