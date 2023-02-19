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
//   // return knex.schema.table('olympiad_questions', table => {
//   //   table.integer('for_question');
//   // })
//   let olympiads = await knex('olympiad')
//   let questions = await knex('olympiad_questions')
//   // .insert({
//   //   q_title: 'What is radius of the Earth?',
//   //   options: JSON.stringify({a: '9 x 10^9', b: '6.37 x 10^6', c: '6.67 x 10^-11'}),
//   //   q_answer: '6.37 x 10^6',
//   //   for_question: 1
//   // })
//   let array = [];
//   for (let x of olympiads) {
//     for (let y of questions) {
//       if (x.id == y.for_question) {
//         array.push(y);
//         x.questions = array;
//       }
//     }
//     console.log(x)
//   }
// }
// x()
// async function y () {
//   let x = await knex('olympiad_questions').where({id: 2}).update({q_title: 'question 2'})
// }
// y()
app.get('/user/:userid', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoUserInfo.html'));
})
app.get('/edit/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'postEDIT.html'));
})

app.get('/questions/q', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'questions_answers.html'));
})

postRes(app, path, knex);
// db(knex);
let routers = require('./routers.js');
routers(path, regester_router, app);