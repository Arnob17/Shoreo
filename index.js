const express = require("express");
const app = new express();
const path = require("path");
const regester_router = require("./backend/js/routers.js");
const LeafPostRoute = require("./backend/js/postRouter.js");
const PostRoute = new LeafPostRoute(app);
const db = require("./db.js");
const postRes = require("./postRes.js");
let shoreoApi = require("./backend/js/api/Users.js");
let user = new shoreoApi("fsfsd8sud8suhHhh77n", "17OnuArnob");
const { Server } = require('socket.io');
let live_olympiad = require('./socketio.js');
const knex = require("knex")({
  client: "better-sqlite3",
  connection: {
    filename: "./database.sqlite",
  },
  useNullAsDefault: true,
});
let server = app.listen(3000, () => {
  console.log("server started");
});
const io = new Server(server);
app.use(express.json());
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static")),
);

app.get("/", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "frontend/public/html/shoreo", "shoreoHome.html"),
  );
});
app.get("/api/v1", (req, res) => {
  res.redirect("/?ref=footer");
});

PostRoute.post("/api/v1/q/i", async (req, res) => {
  let { id } = req.body;
  let x = (await knex("questions").where({ id: id })) || false;
  if (x.length == 0) {
    return res.send({ error: "error!" });
  }
  let b = (await knex("users").where({ userid: x[0].authorid })) || false;
  if (!b) {
    return res.send({ error: "error!" });
  }
  let y = {
    q: x[0].title,
    a: [],
    author: b[0].user_name,
    author_id: x[0].authorid,
    qid: x[0].id,
    img: b[0].img,
  };
  let answer = await knex("answers").where({ question_id: `${y.qid}` });
  let o = answer;
  if (o.length > 0) {
    for (let i of answer) {
      let user = await knex("users").where({ userid: i.authorid });
      i.author = user[0].user_name;
      i.img = user[0].img;
      y.a.push(i);
    }
  }
  res.send(y);
});

async function x() {
  //  return knex.schema.table('users', table => {
  //   table.integer('token');
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
  // let x = await knex('personal_posts').where({id: 5}).update({thumbs_down: JSON.stringify(['0']), thumbs_up: JSON.stringify(['0'])});

  // console.log(x[0].thumbs_up);
  // console.log('extracted', JSON.parse(x[0].thumbs_up));
  // let letters_small = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  // let letters_capital = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  // let numbers = [0,1,2,3,4,5,6,7,8,9];
  // function generator(a, b, c) {
  //     let w = [a,b,c];
  //     let token = [];
  //     for (let i=0; i<(47+Math.floor(Math.random(7))); i++){
  //         let j = w[(Math.floor(Math.random() * w.length))];
  //         token.push(j[(Math.floor(Math.random() * j.length))]);
  //     }
  //     let string = token.join('');
  //     return string;
  // }
  // let user = await knex('olympiad_questions')
  // let array = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27, 28, 29]
  // for (x of user) {
  //   await knex('users').where({id: x.id}).update({ token: generator(letters_capital, letters_small, numbers)})
  // }
  // let user = await knex('olympiad_questions');
  // let ids = [4,5,6,7,8,9,10,11];
  // for (let x of array) {
  //   await knex('olympiad_questions').where({id: x}).del();
  // }
  // let user = await knex('posts')
  // console.log(user)
  // let c = await knex("users");
  // for (let i of c) {
  //   console.log(i)
  // }
}
x();
app.get("/user/:userid", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      "frontend/public/html/shoreo",
      "shoreoUserInfo.html",
    ),
  );
});
app.get("/edit/:id", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "frontend/public/html/shoreo", "postEDIT.html"),
  );
});

app.get("/questions/q/:id", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      "frontend/public/html/shoreo",
      "questions_answers.html",
    ),
  );
});
postRes(app, path, knex);
live_olympiad(app, knex, io);
// db(knex);
let routers = require("./routers.js");
routers(path, regester_router, app);
app.get("*", (req, res) => {
  res.status(404).send("<h1>Can't find this page.. Sorry (Error: 404)</h1>");
});
