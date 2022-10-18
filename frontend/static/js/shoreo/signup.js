function e(id){return document.getElementById(id)};
let a = e('fname'); let b = e('fname2'); let c = e('fname1'); let button = e('buttonSubmit');
button.addEventListener('click', () => {
    if (a.value.length <= 1) {
        return;
    } else if (b.value.length <= 1) {
        return;
    } else if (c.value.length < 1) {return} else {
        let t = { username: a.value, password: b.value, userid: c.value}
        fetch(`/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(t),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then (j => {
            if (j.id==181) {
                alert('id already exists');
            } else if (j.id==182) {
                alert('SignUp successfull! (redirection to login page...)');
                setTimeout(() => {
                    window.location.href=`/login`;
                }, 3000);
            }
        })
    }
})