const express = require('express');
const app = new express();
const path = require('path');
const regester_router = require('./backend/js/routers.js');
const LeafPostRoute = require('./backend/js/postRouter.js');
const PostRoute = new LeafPostRoute(app);
const db = require('./db.js');
const postRes = require('./postRes.js');
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

PostRoute.post('/api/v1/q/i', (req, res) => {
  let { id } = req.body;
  let x = require('./backend/js/shoreo/questions.js');
  if (id) {
    for (y of x) {
      if (y.qid == id) {
        res.send(y);
      }
    }
  }
})

// db(knex);

// let x = async () => {
//   await knex('users').insert({
//     user_name: 'অর্ণব',
//     role: 'লেখক',
//     password: '__11__17__27',
//     img: 'https://cdn.discordapp.com/attachments/778294816190103642/1020328438306963566/unknown.png',
//     is_verified: 'true',
//     userid: '17OnuArnob'
//   });
//   let y = await knex('users');
//   console.log(y);
// }

// x();

app.get('/user/:userid', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoUserInfo.html'));
})

postRes(app, path, knex);

let routers = require('./routers.js');
routers(path, regester_router, app);