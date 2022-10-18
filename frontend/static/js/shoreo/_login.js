function e(id) {
    return document.getElementById(id);
} async function F(t) {
    const response = await fetch(`/auth/check`, {
        method: 'POST',
        body: JSON.stringify(t),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return await response.json();
} let a = e('fname'); let b = e('fname2');
b.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (a.value.length <= 1) {
            return;
        } else if (b.value.length <= 1) {
            return;
        } else {
            let t = { id: a.value, pass: b.value }
            fetch(`/auth/check`, {
                method: 'POST',
                body: JSON.stringify(t),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.json()).then (j => {
                console.log(console.log(j));
                localStorage.setItem('userImg', j._avatar);
                localStorage.setItem('userName', j._name);
                localStorage.setItem('userId', j._id);
                window.location.href = `http://localhost:3000/feed`
            })
        }
    }
})