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
///api/q/answer
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
                <span class="_user_name" id="_user_name"><a href="/user/${y.authorid}">${y.authorid}</a></span>
            </p>
        </div>
    </div>
    <div class="answer">
        <p>${y.answer}</p>
    </div>`
        li.className = '_a1';
        ul.appendChild(li);
    }
})

let textArea = d('_textarea');
let submitB = d('submitButton');
submitB.addEventListener('click', () => {
    let user_id = localStorage.getItem('userId');
    if (!user_id) return alert('You have to Log-In!!');
    if (textArea.value.length < 1) {return}
    let Json = {answer: `${textArea.value}`, qid: queryParams.i, authorid: user_id, post_token: 1};
    fetch ('/api/q/answer', {
        method: 'POST',
        body: JSON.stringify(Json),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json()).then((x) => {
        if (x.id === 001) {
            console.log('done');
            window.location.reload();
        } else {
            console.log('not done');
        }
    })
})