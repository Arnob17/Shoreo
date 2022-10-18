function d (id) {
    return document.getElementById(`${id}`);
}let ul = d('_main_ul') || false;
fetch ('/api/posts_data/all', {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json())
.then(j => {
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    main_arra = shuffleArray(j);
    for (let o of main_arra) {
        let li = document.createElement('li');
        let s = `<img src="${o.img || false}" alt="">
        <a title="${o._title || 'No Title'}" href="http://localhost:3000/view?i=${o.id}"> ${o._title} <span title="${o.Gtag}" class="_status">${o.Gtag}</span></a>
            <span style="cursor:pointer;" onclick="window.location.href = 'http://localhost:3000/user/${o._writer_id}'" title="${o._writer}"><span style="color:grey">-</span>${o._writer}</span>
        <hr>
        <p style="color: grey;">${o._document.substr(0, 100)}<a href="http://localhost:3000/view?i=${o.id}"><span style="font-weight: bolder; color: rgb(70, 70, 70);">..আরও</span></a></p>`;
        li.innerHTML = s;
        ul.appendChild(li);
    }
})
let pfp = d('_pfp');
let q = d('_quote');
let t=[{t: 'ও রজনীগন্ধা, তোমার গন্ধসুধা ঢাল', a: 'অর্ণব'}, {t: 'আমি যাবো তোমার সাথে, তুমি আছো কোন শহরে?', a: 'শুভ'}]
let iindex = Math.floor(Math.random() * t.length);
q.innerText=`${t[iindex].t}`;
d('_subtext').innerText=`${t[iindex].a}`
let j = localStorage.getItem('userName') || false;
let i = localStorage.getItem('userImg') || false;
let id = localStorage.getItem('userId') || false;
// if (!j) { window.location.href = `http://localhost:3000/`; }
pfp.src = `${i}`;
pfp.addEventListener('click', () => {
    window.location.href = `http://localhost:3000/user/${id}`;
})
async function Fetch () {
    const response = await fetch('/api/v1/q', {
        method: 'POST',
        body: JSON.stringify({ id: `id` }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return await response.json();
}
let _ul = d('_main_ul');
Fetch().then((x) => {
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    let new_Arr = shuffleArray(x);
    for (let y of new_Arr) {
        let _li = document.createElement('li');
        _li.innerHTML=`<div class="c">
        <p>${y.q}</p>
        <div id="_button_${y.qid}" class="answerButton">
            Answer
         </div>
        </div>
        <div class="status">
            <span><code>${y.a.length}</code> answers</span>
        </div>`
        _li.className = '_q1'
        _ul.append(_li);
        d(`_button_${y.qid}`).addEventListener('click', () => {
            window.location.href=`/q?i=${y.qid}`
        })
    }
})

d('_upload').addEventListener('click', () => {
    window.location.href=`/upload`
})