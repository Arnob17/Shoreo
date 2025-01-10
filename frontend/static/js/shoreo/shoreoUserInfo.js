function d(id) {
    return document.getElementById(id);
}
let o = window.location.href;
let str = o.replace(
    "http://localhost:3000/user/",
    "",
);
fetch(`/user/${str}`, {
    method: "POST",
    body: JSON.stringify({ id: `id` }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-powered-by": "PhiOcean",
    },
})
    .then((response) => response.json())
    .then((j) => {
        let a = d("_username");
        let b = d("_role");
        let c = d("_avatar");
        let c_point = d("c_point");
        let image_input = d("_image_input");
        // let v = `<span><i style="color:rgb(37, 174, 238); font-size:17px; cursor:pointer;" title="verified" class="fa-solid fa-circle-check"></i></span>`
        a.innerText = `${j._name}`;
        c.src = `${j._avatar}`;
        b.innerText = `${j._role}`;
        c_point.innerText = `${j.c_point}`;

        c.addEventListener("click", () => {
            d("_image_input").click();
        });

        for (let x of j._posts) {
            let ul = d("_posts");
            let li = document.createElement("li");

            li.innerHTML = `<div class="profile2">
        <img src="${j._avatar}" alt=""> <span onclick="window.location.href='/user/${x.authorid}'" >${x.user_name}</span>
    </div>
    <div class="m">
        <div class="title">
            <h1 onclick="window.location.href='/view?i=${x.id}'" >${x.title}</h1>
        </div>
        <div class="sub">
            <p>${x.document.substr(0, x.document.length - 299)}<span onclick="window.location.href='/view?i=${x.id}'" style="font-weight: bolder; cursor:pointer;">..more</span></p>
        </div>
    </div>`;

            ul.appendChild(li);
        }

        let q_ul = d("_q");

        for (let y of j._questions) {
            let li = document.createElement("li");

            li.innerHTML = `
        <div class="question">
            <span>${y.title}</span>
        </div>
        <div onclick='window.location.href="/q?i=${y.id}"' class="answer">
            <span>Answer</span>
        </div>
        `;

            q_ul.appendChild(li);
        }
        c.addEventListener("click", () => {
            fetch("/api/private/isuser_owner", {
                method: "POST",
                body: JSON.stringify({
                    usertoken: localStorage.getItem("token"),
                    userid: str,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "x-powered-by": "Shoreo",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res == "true") {
                        image_input.click();
                    }
                });
        });
        image_input.onchange = function previewFile() {
            var preview = c;
            var file = document.querySelector("input[type=file]").files[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                c.src = reader.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "";
            }
        };
        const colorThief = new ColorThief();
        const img = d("_avatar");
        // Make sure image is finished loading
        if (img.complete) {
            let color = colorThief.getColor(img);
            console.log(color);
        } else {
            img.addEventListener("load", function () {
                let color = colorThief.getColor(img);
                let color1 = color[0];
                let color2 = color[1];
                let color3 = color[2];

                console.log(color);
                let x = `linear-gradient(45deg, rgb(${color1}, ${color2}, ${color3}, .7), rgb(${color3}, ${color2}, ${color1}, .5))`;
                document.getElementById("_bg_profile").style.background = x;
            });
        }
        const ctx = document.getElementById("myChart");
        console.log();
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Previous", "Current"],
                datasets: [
                    {
                        label: "C-Point",
                        data: [j.c_point_prev, j.c_point],
                        // data: [1000, 500],
                        borderWidth: 1,
                        backgroundColor: "grey",
                    },
                ],
            },
            options: {
                plugins: {
                    //   title: {
                    //     display: true,
                    //     text: 'Shoreo - User Stats'
                    //   },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });
