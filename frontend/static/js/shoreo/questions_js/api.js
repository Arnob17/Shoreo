fetch ('/api/questions/subjects', {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json()).then((x) => {
    let ul = document.getElementById('_ul_subject');

    for (let y of x) {
        let li = document.createElement('li');

        li.innerHTML = `
        <h1 onclick="window.location.href = '/questions/q'">${y.name.toUpperCase()}</h1>
        <p>
            ${y.description}
        </p>
        `;

        li.style.backgroundColor = y.color;

        ul.appendChild(li);
    }
})