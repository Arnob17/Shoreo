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
    for (let x of j) {
        let li = document.createElement('li');
        let ul = d('_main_ul');
        li.innerHTML = `
        <div class="profile">
            <img src="${x._writer_avatar}" alt=""> <span onclick="window.location.href='/user/${x._writer_id}'" >${x._writer}</span>
        </div>
        <div class="m">
            <div class="title">
                <h1 onclick="window.location.href='/view?i=${x.id}'" >${x._title}</h1>
            </div>
            <div class="sub">
                <p>${x._document.substr(0, (x._document.length - 299))} <span onclick="window.location.href='/view?i=${x.id}'" style="font-weight: bolder; cursor:pointer;">..more</span></p>
            </div>
        </div>
        `;
        ul.appendChild(li);
    }
})
let pfp = d('_pfp');
let q = d('_quote');
let t=[{t: 'ও রজনীগন্ধা, তোমার গন্ধসুধা ঢাল', a: 'অচেনা মানুষ'}, {t: 'আমি যাবো তোমার সাথে, তুমি আছো কোন শহরে?', a: 'শুভ'}]
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
    for (let y of x) {
        let li = document.createElement('li');
        let ul = d('_q')
        li.innerHTML = `
        <div class="question">
                            <span>${y.q}</span>
                        </div>
                        <div onclick='window.location.href="/q?i=${y.qid}"' class="answer">
                            <span>Answer</span>
                        </div>`
        ul.appendChild(li);
    }
})
d('_upload').addEventListener('click', () => {
    window.location.href=`/upload`
})
