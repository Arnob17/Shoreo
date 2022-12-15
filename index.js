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

app.get("/ip", (req, res) => {
  let IP = (req.headers['x-forwarded-for'] ||'').split(',').pop().trim() ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress ||
  req.headers['x-appengine-user-ip'] ||
  req.headers['fastly-client-ip'] ;


  res.send(IP);
});

app.get('/api/v1', (req, res) => {
  res.redirect('/?ref=footer');
});

PostRoute.post('/api/v1/q/i', async (req, res) => {
  let { id } = req.body;
  let x = await knex('questions').where({id: id}) || false;
  if (x.length==0) {return res.send({error: 'error!'})}
  let b = await knex('users').where({userid: x[0].authorid}) || false;
  if (!b) {return res.send({error: 'error!'})}
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

// async function x() {
//   await knex('questions').where({id: '13'}).update({title: 'What is an atom?'})
// }
// x();
app.get('/user/:userid', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoUserInfo.html'));
})
app.get('/edit/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'postEDIT.html'));
})
postRes(app, path, knex);

let routers = require('./routers.js');
routers(path, regester_router, app);