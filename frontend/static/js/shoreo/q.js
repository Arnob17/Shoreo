function d(x) {
    return document.getElementById(x);
}
const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString.split('&').reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split('=');
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
}, {})
async function Fetch() {

    const response = await fetch('/api/v1/q/i', {
        method: 'POST',
        body: JSON.stringify({ id: `${queryParams.i}` }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return await response.json();

}
let a = d('_question'); let b = d('_by');
Fetch().then(x => {
    a.innerText = `${x.q}`; b.innerText = `${x.author}`;
    for (let y of x.a) {
        let ul = d('answers');
        let li = document.createElement('li');

        li.innerHTML = `<div class="InfoComponent">
        <div class="contents">
            <img id="_user_avatar" src="${y.img}" alt="">
            <p>
                <span class="_user_name" id="_user_name">${y.a}</span>
            </p>
        </div>
    </div>
    <div class="answer">
        <p>${y.p}</p>
    </div>
    <hr>
    <div class="votes">
        <i id="${x.qid}_upvote" class="fa-solid fa-caret-up"></i> <span id="_0">(0)</span>
        <i id="${x.qid}_downvote" class="fa-solid fa-caret-down"></i> <span>(0)</span>
    </div>`
        li.className = '_a1';
        ul.appendChild(li);
        d(`${x.qid}_upvote`).style.color = 'grey';
        d(`${x.qid}_downvote`).style.color = 'grey';
        d(`${x.qid}_downvote`).addEventListener('click', () => {
            if (d(`${x.qid}_upvote`).style.color == 'grey') {
                d(`${x.qid}_upvote`).style.color = 'blue';
            } else if (d(`${x.qid}_upvote`).style.color == 'blue')
            {
                d(`${x.qid}_upvote`).style.color = 'grey';
            }
        })
        d(`${x.qid}_downvote`).addEventListener('click', () => {
            if (d(`${x.qid}_downvote`).style.color == 'grey') {
                d(`${x.qid}_downvote`).style.color = 'blue';
            } else if (d(`${x.qid}_downvote`).style.color == 'blue')
            {
                d(`${x.qid}_downvote`).style.color = 'grey';
            }
        })
    }
})