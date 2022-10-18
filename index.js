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
  console.log(answer)
  let o = answer;
  if (o.length > 0) {
    for (let i of answer) {
      y.a.push(i);
    }
  }
  res.send(y);
})

// db(knex);

  // let x = async () => {
  //   let y = await knex('posts').where({id: 7}).update(
  //     {
  //       document: 'রবীন্দ্রনাথ ঠাকুর এফআরএএস (৭ মে ১৮৬১ – ৭ আগস্ট ১৯৪১; ২৫ বৈশাখ ১২৬৮ – ২২ শ্রাবণ ১৩৪৮ বঙ্গাব্দ)[১] ছিলেন অগ্রণী বাঙালি কবি, ঔপন্যাসিক, সংগীতস্রষ্টা, নাট্যকার, চিত্রকর, ছোটগল্পকার, প্রাবন্ধিক, অভিনেতা, কণ্ঠশিল্পী ও দার্শনিক।[২] তাকে বাংলা ভাষার সর্বশ্রেষ্ঠ সাহিত্যিক মনে করা হয়।[৩] রবীন্দ্রনাথকে “গুরুদেব”, “কবিগুরু” ও “বিশ্বকবি” অভিধায় ভূষিত করা হয়।[৪] রবীন্দ্রনাথের ৫২টি কাব্যগ্রন্থ,[৫] ৩৮টি নাটক,[৬] ১৩টি উপন্যাস[৭] ও ৩৬টি প্রবন্ধ ও অন্যান্য গদ্যসংকলন[৮] তার জীবদ্দশায় বা মৃত্যুর অব্যবহিত পরে প্রকাশিত হয়। তার সর্বমোট ৯৫টি ছোটগল্প[৯] ও ১৯১৫টি গান[১০] যথাক্রমে গল্পগুচ্ছ ও গীতবিতান সংকলনের অন্তর্ভুক্ত হয়েছে। রবীন্দ্রনাথের যাবতীয় প্রকাশিত ও গ্রন্থাকারে অপ্রকাশিত রচনা ৩২ খণ্ডে রবীন্দ্র রচনাবলী নামে প্রকাশিত হয়েছে।[১১] রবীন্দ্রনাথের যাবতীয় পত্রসাহিত্য উনিশ খণ্ডে চিঠিপত্র ও চারটি পৃথক গ্রন্থে প্রকাশিত।[১২] এছাড়া তিনি প্রায় দুই হাজার ছবি এঁকেছিলেন।[১৩] রবীন্দ্রনাথের রচনা বিশ্বের বিভিন্ন ভাষায় অনূদিত হয়েছে। ১৯১৩ সালে গীতাঞ্জলি কাব্যগ্রন্থের ইংরেজি অনুবাদের জন্য তিনি এশীয়দের মধ্যে সাহিত্যে প্রথম নোবেল পুরস্কার লাভ করেন।[১৪]\n' +        '\n' +        `রবীন্দ্রনাথ ঠাকুর কলকাতার এক ধনাঢ্য ও সংস্কৃতিবান ব্রাহ্ম পিরালী ব্রাহ্মণ পরিবারে জন্মগ্রহণ করেন।[১৫][১৬][১৭][১৮] বাল্যকালে প্রথাগত বিদ্যালয়-শিক্ষা তিনি গ্রহণ করেননি; গৃহশিক্ষক রেখে বাড়িতেই তার শিক্ষার ব্যবস্থা করা হয়েছিল।[১৯] আট বছর বয়সে তিনি কবিতা লেখা শুরু করেন।ক[›][২০] ১৮৭৪ সালে তত্ত্ববোধিনী পত্রিকা-এ তার "অভিলাষ" কবিতাটি প্রকাশিত হয়। এটিই ছিল তার প্রথম প্রকাশিত রচনা।[২১] ১৮৭৮ সালে মাত্র সতেরো বছর বয়সে রবীন্দ্রনাথ প্রথমবার ইংল্যান্ডে যান।[২২] ১৮৮৩ সালে মৃণালিনী দেবীর সঙ্গে তার বিবাহ হয়।[২২] ১৮৯০ সাল থেকে রবীন্দ্রনাথ পূর্ববঙ্গের শিলাইদহের জমিদারি এস্টেটে বসবাস শুরু করেন।[২২] ১৯০১ সালে তিনি পশ্চিমবঙ্গের শান্তিনিকেতনে ব্রহ্মচর্যাশ্রম প্রতিষ্ঠা করেন এবং সেখানেই পাকাপাকিভাবে বসবাস শুরু করেন।[২৩] ১৯০২ সালে তার পত্নীবিয়োগ হয়।[২৩] ১৯০৫ সালে তিনি বঙ্গভঙ্গ-বিরোধী আন্দোলনে জড়িয়ে পড়েন।[২৩] ১৯১৫ সালে ব্রিটিশ সরকার তাকে 'নাইট' উপাধিতে ভূষিত করেন।[২৩] কিন্তু ১৯১৯ সালে জালিয়ানওয়ালাবাগ হত্যাকাণ্ডের প্রতিবাদে তিনি সেই উপাধি ত্যাগ করেন।[২৪] ১৯২১ সালে গ্রামোন্নয়নের জন্য তিনি শ্রীনিকেতন নামে একটি সংস্থা প্রতিষ্ঠা করেন।[২৫] ১৯২৩ সালে আনুষ্ঠানিকভাবে বিশ্বভারতী প্রতিষ্ঠিত হয়।[২৬] দীর্ঘজীবনে তিনি বহুবার বিদেশ ভ্রমণ করেন এবং সমগ্র বিশ্বে বিশ্বভ্রাতৃত্বের বাণী প্রচার করেন।[২৫] ১৯৪১ সালে দীর্ঘ রোগভোগের পর কলকাতার পৈত্রিক বাসভবনেই তার মৃত্যু হয়।[২৭]`
  //     }
  //     );
  //   console.log(await knex('posts'));
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