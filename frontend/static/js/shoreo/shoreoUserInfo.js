function d (id) {return document.getElementById(id);}
let o = window.location.href;
let str = o.replace('http://localhost:3000/user/', '');
fetch(`/user/${str}`, {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-powered-by': 'Shoreo'
    }
}).then(response => response.json())
.then(j => {

    let a = d('_username');
    let b = d('_role');
    let c = d('_avatar');
    let c_point = d('c_point');
    // let v = `<span><i style="color:rgb(37, 174, 238); font-size:17px; cursor:pointer;" title="verified" class="fa-solid fa-circle-check"></i></span>`
    a.innerText = `${j._name}`;
    c.src = `${j._avatar}`;
    b.innerText=`${j._role}`;
    c_point.innerText=`${j.c_point}`

    for (let x of j._posts) {
        let ul = d('_posts');
        let li = document.createElement('li');

        li.innerHTML = `<div class="profile2">
        <img src="${j._avatar}" alt=""> <span onclick="window.location.href='/user/${x.authorid}'" >${x.user_name}</span>
    </div>
    <div class="m">
        <div class="title">
            <h1 onclick="window.location.href='/view?i=${x.id}'" >${x.title}</h1>
        </div>
        <div class="sub">
            <p>${x.document.substr(0, (x.document.length - 299))}<span onclick="window.location.href='/view?i=${x.id}'" style="font-weight: bolder; cursor:pointer;">..more</span></p>
        </div>
    </div>`

        ul.appendChild(li);
    }

    let q_ul = d('_q');

    for (let y of j._questions) {
        let li = document.createElement('li');

        li.innerHTML = `
        <div class="question">
            <span>${y.title}</span>
        </div>
        <div onclick='window.location.href="/q?i=${y.id}"' class="answer">
            <span>Answer</span>
        </div>
        `;

        q_ul.appendChild(li);

    }

    const ctx = document.getElementById('myChart');
        console.log()
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Previous', 'Current'],
                datasets: [{
                    label: 'C-Point',
                    data: [0, j.c_point],
                    borderWidth: 1,
                    backgroundColor: 'grey',
                }]
            },
            options: {
                plugins: {
                    //   title: {
                    //     display: true,
                    //     text: 'Shoreo - User Stats'
                    //   },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

})