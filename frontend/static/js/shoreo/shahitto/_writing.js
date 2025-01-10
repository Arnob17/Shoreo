function d(id) {
    return document.getElementById(`${id}`);
}
let ul = d("_main_ul") || false;
fetch("/api/posts_data/all", {
    method: "POST",
    body: JSON.stringify({ id: `id` }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((j) => {
        for (let x of j) {
            let li = document.createElement("li");
            let ul = d("_main_ul");
            li.innerHTML = `
        <div class="profile">
            <img src="${x._writer_avatar}" alt=""> <span onclick="window.location.href='/user/${x._writer_id}'" >${x._writer}</span> <span class="_time">at ${x.time ? x.time : "timex"}</span>
        </div>
        <div class="m">
            <div class="title">
                <h1 onclick="window.location.href='/view?i=${x.id}'" >${x._title}</h1>
            </div>
            <div class="sub">
                <p>${x._document.slice(0, x._document.length / 2)} <span onclick="window.location.href='/view?i=${x.id}'" style="font-weight: bolder; cursor:pointer;">..more</span></p>
            </div>
        </div>
        `;
            ul.appendChild(li);
        }
    });
fetch("/api/personal_post/get", {
    method: "POST",
    body: JSON.stringify({ authorid: localStorage.getItem("userId") }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((j) => {
        console.log(j);
        for (let x of j) {
            let li = document.createElement("li");
            let ul = d("_main_ul");
            li.innerHTML = `
        <div class="profile">
            <img src="${x._writer_avatar}" alt=""> <div class="_name_flex"><span onclick="window.location.href='/user/${x._writer_id}'" >${x._writer}</span> <span class="writer_id" >@${x._writer_id}</span> </div> <span class="_time">at ${x.time ? x.time : "timex"}</span>
        </div>
        <div class="m">
            <div class="sub">
                <p style="font-weight: none;" >${x._document}</p>
            </div>
            <div class="votes">
                <div class="vote">
                    <i id="_thumbs_up_${x.id}" class="fa-solid fa-thumbs-up"></i> <span id="_thumbs_up_int_${x.id}" style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-weight: bold; color: #a1a1a1; margin-left: 5px;">${x.thumbs_up}</span>
                </div>
                <div class="vote">
                    <i id="_thumbs_down_${x.id}" class="fa-solid fa-thumbs-down"></i> <span id="_thumbs_down_int_${x.id}" style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-weight: bold; color: #a1a1a1; margin-left: 5px;" >${x.thumbs_down}</span>
                </div>
            </div>
        </div>
        `;
            ul.appendChild(li);

            if (x.thumbs_up_clicked == true) {
                d(`_thumbs_up_${x.id}`).classList.add("clicked");
            }
            if (x.thumbs_down_clicked == true) {
                d(`_thumbs_down_${x.id}`).classList.add("clicked");
            }
            d(`_thumbs_up_${x.id}`).addEventListener("click", () => {
                fetch("/api/personal_post/get", {
                    method: "POST",
                    body: JSON.stringify({
                        authorid: localStorage.getItem("userId"),
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((y) => {
                        for (let j of y) {
                            if (j.id == x.id) {
                                if (
                                    j.thumbs_up_clicked == false &&
                                    j.thumbs_down_clicked == false
                                ) {
                                    d(`_thumbs_up_${j.id}`).classList.add(
                                        "clicked",
                                    );
                                    fetch(
                                        "/api/personal_post/private/edit/thumbsup/add",
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                id: j.id,
                                                userid: localStorage.getItem(
                                                    "userId",
                                                ),
                                            }),
                                            headers: {
                                                "Content-type":
                                                    "application/json; charset=UTF-8",
                                            },
                                        },
                                    )
                                        .then((response) => response.json())
                                        .then((x) => console.log(x));
                                } else if (
                                    j.thumbs_up_clicked == true &&
                                    j.thumbs_down_clicked == false
                                ) {
                                    d(`_thumbs_up_${j.id}`).classList.remove(
                                        "clicked",
                                    );
                                    fetch(
                                        "/api/personal_post/private/edit/only_thumb_up/add",
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                id: j.id,
                                                userid: localStorage.getItem(
                                                    "userId",
                                                ),
                                            }),
                                            headers: {
                                                "Content-type":
                                                    "application/json; charset=UTF-8",
                                            },
                                        },
                                    )
                                        .then((response) => response.json())
                                        .then((x) => console.log(x));
                                }
                            }
                        }
                    });
            });
            d(`_thumbs_down_${x.id}`).addEventListener("click", () => {
                fetch("/api/personal_post/get", {
                    method: "POST",
                    body: JSON.stringify({
                        authorid: localStorage.getItem("userId"),
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((y) => {
                        for (let j of y) {
                            if (j.id == x.id) {
                                console.log(
                                    j.thumbs_down_clicked,
                                    j.thumbs_up_clicked,
                                );
                                if (
                                    j.thumbs_down_clicked == false &&
                                    j.thumbs_up_clicked == false
                                ) {
                                    d(`_thumbs_down_${j.id}`).classList.add(
                                        "clicked",
                                    );
                                    fetch(
                                        "/api/personal_post/private/edit/thumbsdown/add",
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                id: j.id,
                                                userid: localStorage.getItem(
                                                    "userId",
                                                ),
                                            }),
                                            headers: {
                                                "Content-type":
                                                    "application/json; charset=UTF-8",
                                            },
                                        },
                                    )
                                        .then((response) => response.json())
                                        .then((x) => console.log(x));
                                } else if (
                                    j.thumbs_up_clicked == false &&
                                    j.thumbs_down_clicked == true
                                ) {
                                    d(`_thumbs_down_${j.id}`).classList.remove(
                                        "clicked",
                                    );
                                    fetch(
                                        "/api/personal_post/private/edit/only_thumb_down/add",
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                id: j.id,
                                                userid: localStorage.getItem(
                                                    "userId",
                                                ),
                                            }),
                                            headers: {
                                                "Content-type":
                                                    "application/json; charset=UTF-8",
                                            },
                                        },
                                    )
                                        .then((response) => response.json())
                                        .then((x) => console.log(x));
                                }
                            }
                        }
                    });
            });
            // if (x.thumbs_up_clicked == false && x.thumbs_down_clicked == false) {
            //     d(`_thumbs_up_${x.id}`).addEventListener('click', () => {
            //         d(`_thumbs_up_${x.id}`).classList.add('clicked');
            //         console.log(x);
            //         fetch('/api/personal_post/private/edit/thumbsup/add', {
            //             method: 'POST',
            //             body: JSON.stringify({ id: x.id, userid: localStorage.getItem('userId') }),
            //             headers: {
            //                 'Content-type': 'application/json; charset=UTF-8'
            //             }
            //         }).then(response => response.json()).then(x => console.log(x));
            //     })
            // } else if (x.thumbs_up_clicked == true && x.thumbs_down_clicked == false) {
            //     d(`_thumbs_up_${x.id}`).addEventListener('click', () => {
            //         console.log(x);
            //         fetch('/api/personal_post/private/edit/only_thumb_up/add', {
            //             method: 'POST',
            //             body: JSON.stringify({ id: x.id, userid: localStorage.getItem('userId') }),
            //             headers: {
            //                 'Content-type': 'application/json; charset=UTF-8'
            //             }
            //         }).then(response => response.json()).then(x => console.log(x));
            //     })
            // }
            // if (x.thumbs_down_clicked == false && x.thumbs_up_clicked == false) {
            //     d(`_thumbs_down_${x.id}`).addEventListener('click', () => {
            //         d(`_thumbs_down_${x.id}`).classList.add('clicked');
            //         console.log(x);
            //         fetch('/api/personal_post/private/edit/thumbsdown/add', {
            //             method: 'POST',
            //             body: JSON.stringify({ id: x.id, userid: localStorage.getItem('userId') }),
            //             headers: {
            //                 'Content-type': 'application/json; charset=UTF-8'
            //             }
            //         }).then(response => response.json()).then(x => console.log(x));
            //     })
            // } else if (x.thumbs_up_clicked == false && x.thumbs_down_clicked == true) {
            //     d(`_thumbs_down_${x.id}`).addEventListener('click', () => {
            //         console.log(x);
            //         fetch('/api/personal_post/private/edit/only_thumb_down/add', {
            //             method: 'POST',
            //             body: JSON.stringify({ id: x.id, userid: localStorage.getItem('userId') }),
            //             headers: {
            //                 'Content-type': 'application/json; charset=UTF-8'
            //             }
            //         }).then(response => response.json()).then(x => console.log(x));
            //     })
            // }
        }
    });
let pfp = d("_pfp");
let what_you_thinking_img = d("what_you_thinking_img");
// let q = d('_quote');
// let t=[{t: 'ও রজনীগন্ধা, তোমার গন্ধসুধা ঢাল', a: 'অচেনা মানুষ'}, {t: 'আমি যাবো তোমার সাথে, তুমি আছো কোন শহরে?', a: 'শুভ'}]
// let iindex = Math.floor(Math.random() * t.length);
// q.innerText=`${t[iindex].t}`;
// d('_subtext').innerText=`${t[iindex].a}`
let j = localStorage.getItem("userName") || false;
let i = localStorage.getItem("userImg") || false;
let id = localStorage.getItem("userId") || false;
// if (!j) { window.location.href = `http://localhost:3000/`; }
pfp.src = `${i}`;
what_you_thinking_img.src = `${i}`;
pfp.addEventListener("click", () => {
    window.location.href = `/user/${id}`;
});
async function Fetch() {
    const response = await fetch("/api/v1/q", {
        method: "POST",
        body: JSON.stringify({ id: `id` }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return await response.json();
}
let _ul = d("_main_ul");
Fetch().then((x) => {
    for (let y of x) {
        let li = document.createElement("li");
        let ul = d("_q");
        li.innerHTML = `
        <div class="question">
                            <span>${y.q}</span>
                        </div>
                        <div onclick='window.location.href="/q?i=${y.qid}"' class="answer">
                            <span>Answer</span>
                        </div>`;
        ul.appendChild(li);
    }
});

let personal_posts_text_area = d("_textarea2");
let personal_posts_submit_button = d("submit_button2");
var now = new Date();
var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
//document, authorid, _type, title, gtag, time
personal_posts_submit_button.addEventListener("click", () => {
    if (personal_posts_text_area.value.length > 10) {
        fetch("/api/personal_post/add", {
            method: "POST",
            body: JSON.stringify({
                document: personal_posts_text_area.value,
                authorid: `${localStorage.getItem("userId")}` /* i know its not a good idea */,
                _type: "_social",
                gtag: "pore dekha jabe",
                time: `${time}`,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((x) => {
                console.log(x);
            });
    }
});

setInterval(() => {
    fetch("/api/personal_post/get", {
        method: "POST",
        body: JSON.stringify({ authorid: localStorage.getItem("userId") }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((x) => {
            for (let y of x) {
                // console.table(y.thumbs_up_clicked, y.thumbs_down_clicked);
                let span = d(`_thumbs_up_int_${y.id}`);
                span.innerText = `${y.thumbs_up}`;
                let span2 = d(`_thumbs_down_int_${y.id}`);
                span2.innerText = `${y.thumbs_down}`;
            }
        });
}, 5000);
