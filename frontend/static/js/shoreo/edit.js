function d(id) {
    return document.getElementById(id);
}
let _title = d("fname");
let _mainText = d("maintext");
let submit = d("_submit");
let img = d("img");
let o = window.location.href;
let str = o.replace(
    "http://localhost:3000/edit/",
    "",
);
fetch(`/edit/${str}`, {
    method: "POST",
    body: JSON.stringify({ x: "a" }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((x) => {
        _mainText.value = `${x.document}`;
        _title.value = `${x.title}`;
        img.value = `${x.thumbnail}`;
        console.log(_mainText.value);
        submit.addEventListener("click", () => {
            console.log(_mainText.value);
            fetch("/api/update", {
                method: "POST",
                body: JSON.stringify({ id: str, document: _mainText.value }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res) => res.json());
            window.location.href = "/";
        });
    });
