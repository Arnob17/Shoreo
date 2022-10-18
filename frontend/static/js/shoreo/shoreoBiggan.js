function d(id) {return document.getElementById(id)}
let ul = d('_main_ul') || false;
const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString.split('&').reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split('=');
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
}, {})
fetch('/api/posts_data/all', {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json()).then(j => {
    for (let o of j) {
        console.log(o)
        if (o._type == '_science') {
            for (let x of o._tags) {
                if (x==queryParams.filter) {
                    let li = document.createElement('li');
                    let s = `<img src="${o.img || false}" alt="">
                    <a title="${o._title || 'No Title'}" href="http://localhost:3000/view?i=${o.id}"> ${o._title} <span title="${o.Gtag}" class="_status">${o.Gtag}</span></a>
                        <span style="cursor:pointer;" onclick="window.location.href = 'http://localhost:3000/user/${o._writer_id}'" title="${o._writer}"><span style="color:grey">-</span>${o._writer}</span>
                    <hr>
                    <p style="color: white;">${o._document.substr(0, 100)}<a href="http://localhost:3000/view?i=${o.id}"><span style="font-weight: bolder; color: rgb(255, 255, 255);">..আরও</span></a></p>`;
                    li.innerHTML = s;
                    ul.appendChild(li);
                } else if (!queryParams.filter) {
                    let li = document.createElement('li');
                    let s = `<img src="${o.img || false}" alt="">
                    <a title="${o._title || 'No Title'}" href="http://localhost:3000/view?i=${o.id}"> ${o._title} <span title="${o.Gtag}" class="_status">${o.Gtag}</span></a>
                        <span style="cursor:pointer;" onclick="window.location.href = 'http://localhost:3000/user/${o._writer_id}'" title="${o._writer}"><span style="color:grey">-</span>${o._writer}</span>
                    <hr>
                    <p style="color: white;">${o._document.substr(0, 100)}<a href="http://localhost:3000/view?i=${o.id}"><span style="font-weight: bolder; color: rgb(255, 255, 255);">..আরও</span></a></p>`;
                    li.innerHTML = s;
                    ul.appendChild(li);
                }
            }
        }
    }
})