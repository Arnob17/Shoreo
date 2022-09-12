const express = require('express');
const app = new express();
const path = require('path');
const regester_router = require('./backend/js/routers.js');
const LeafPostRoute = require('./backend/js/postRouter.js');
const PostRoute = new LeafPostRoute(app);
let server = app.listen(3000, () => {
  console.log('server started')
})
app.use(express.json())
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoHome.html'));
});

app.get('/api/v1', (req, res) => {
  res.redirect('/?ref=footer')
})

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
app.post('/user/:userid', (req, res) => {
  const { userid } = req.params;
  let a = [];
  for (let x of _shoreo_data) {
    if (userid === x._writer_id) {
      a.push(x);
    }
  }
  for (let y of Users) {
    if (userid === y._id) {
      let obj = {
        _name: `${y._name}`,
        _avatar: `${y._avatar}`,
        is_verified: `${y.is_verified}`,
        _posts: a,
        status: y.status || false,
        _role: `${y._role}` || false,
      }
      res.send(obj);
    }
  }
})

app.get('/user/:userid', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoUserInfo.html'));
})

app.post('/api/v1/q', (req, res) => {
  let x = require('./backend/js/shoreo/questions.js');
  res.send(x);
})

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

app.post('/auth/check', (req, res) => {
  let { id } = req.body;
  let { pass } = req.body;
  let b = false;
  let users = require('./backend/js/shoreo/Users.js');
  for (let x of users) {
    if (x._id == id && x.password == pass) {
      res.send(x);
    }
  }
})

let routers = require('./routers.js');
routers(path, regester_router, app);