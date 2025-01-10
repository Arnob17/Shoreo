function d(id) {
    return document.getElementById(`${id}`);
}
var msg = new SpeechSynthesisUtterance();
const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString
    .split("&")
    .reduce((accumulator, singleQueryParam) => {
        const [key, value] = singleQueryParam.split("=");
        accumulator[key] = decodeURIComponent(value);
        return accumulator;
    }, {});
fetch("/api/view_req_data", {
    method: "POST",
    body: JSON.stringify({ id: `${queryParams.i}` }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((j) => {
        d("_edit").addEventListener(
            "click",
            () => (window.location.href = `/edit/${queryParams.i}`),
        );
        if (j._type == "type_poddo" || "type_goddo") {
            d("_title").innerText = `${j._title}`;
            // d('_info2').style.background = `url('${j.bg}')`
            d("_info2").style.backgroundSize = `100%;`;
            d("_writer").innerText = `${j._writer}`;
            d("_writer").addEventListener("click", () => {
                window.location.href = `/user/${j._writer_id}`;
            });
            let p = document.createElement("p");
            p.id = "maintext";
            p.innerHTML = `${j._document}`;
            d("post").appendChild(p);
        }

        if (j._type == "type_comic") {
            window.location.href = `http://localhost:3000/view/book?i=${j.id}`;
        }

        d("_speak").addEventListener("click", () => {
            msg.text = `${j._document}`;

            window.speechSynthesis.speak(msg);
        });
        //zoom-in-out functions (starts here)
        let main_font_sizes = ["15px", "20px", "30px"];
        let stored_font_size = localStorage.getItem("font_size") || 0;
        d("maintext").style.fontSize = main_font_sizes[stored_font_size];
        let font_index = stored_font_size;
        d("_zoom-in").addEventListener("click", () => {
            if (font_index !== main_font_sizes.length - 1) {
                font_index++;
            }
            localStorage.setItem("font_size", font_index);
            d("maintext").style.fontSize = main_font_sizes[font_index];
        });
        d("_zoom-out").addEventListener("click", () => {
            if (!font_index == 0) {
                font_index--;
            }
            localStorage.setItem("font_size", font_index);
            d("maintext").style.fontSize = main_font_sizes[font_index];
        });
        //zoom-in-out functions (ends here)
        let ctag = j.Gtag;
        console.log(ctag);
        let sugUl = document.getElementById("suggestionsUL");

        fetch("/api/posts_data/all", {
            method: "POST",
            body: JSON.stringify({ id: `id` }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((y) => {
                for (let o of y) {
                    if (o.Gtag == ctag) {
                        console.log(o.Gtag);
                        let li = document.createElement("li");

                        li.innerHTML = `
                    <div class="title">
                    <span onclick="window.location.href='/view?i=${o.id}'" class="_title">
                        ${o._title}
                    </span>
                    <span class="_author">
                        ${o._writer}
                    </span>
                </div>
                <div class="text">
                    <span>
                        ${o._document.slice(0, o._document.length / 4)}...               
                    </span>
                </div>
                    `;
                        sugUl.appendChild(li);
                    }
                }
            });
    });
