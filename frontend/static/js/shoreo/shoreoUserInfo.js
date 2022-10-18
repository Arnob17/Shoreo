function d (id) {return document.getElementById(id);}
let o = window.location.href;
let str = o.replace('http://localhost:3000/user/', '');
fetch(`/user/${str}`, {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json())
.then(j => {

    let a = d('_user_name');
    let b = d('role');
    let c = d('_user_avatar');
    let v = `<span><i style="color:rgb(37, 174, 238); font-size:17px; cursor:pointer;" title="verified" class="fa-solid fa-circle-check"></i></span>`
    a.innerHTML = `${j._name} ${j.is_verified == 'true' ? v : ''}`;
    c.src = `${j._avatar}`;
    b.innerHTML=`${j._role}` || '';

    for (let x of j._posts) {

        
        let ul = d('_ul');
        let li = document.createElement('li');

        li.innerHTML = `<div id="c1" class="c1">
        <span class="_title"><a style="text-decoration:none" href="http://localhost:3000/view?i=${x.id}">${x.title}</a></span>
        <span class="_document">${x.document.substr(0, 50)}...</span>
        </div>`

        li.querySelector('.c1').style.background = x.bg ? `url('${x.bg}')` : `#bebebe`

        ul.appendChild(li);
    }

})