function d (id) {
    return document.getElementById(`${id}`);
}
const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString.split('&').reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split('=');
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
}, {})
fetch ('/api/view_req_data', {
    method: 'POST',
    body: JSON.stringify({ id: `${queryParams.i}` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json())
    .then(j => {
        console.log(j.pages);
        if (j._type == 'type_poddo' || 'type_goddo') {
            d('_title').innerText = `${j._title}`;
            d('_writer').innerText = `${j._writer}`;
            d('_writer').addEventListener ('click', () => {
                window.location.href = `http://localhost:3000/user/${j._writer_id}`
            })
            let p = document.createElement('p');
            p.innerHTML = `${j._document}`
            d('post').appendChild(p);
        }

        if (j._type == 'type_comic') {
            window.location.href = `http://localhost:3000/view/book?i=${j.id}`
        }
    })