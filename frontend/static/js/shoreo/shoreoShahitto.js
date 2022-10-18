function d (id) {
    return document.getElementById(`${id}`);
}let ul = d('_main_ul') || false;
const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString.split('&').reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split('=');
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
}, {})
fetch ('/api/posts_data/all', {
    method: 'POST',
    body: JSON.stringify({ id: `id` }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}).then(response => response.json())
.then(j => {
    let bestoftoday_Ul = d('_bestoftodayUL');
    let goddo_UL = d('_goddoUl');
    let poddo_Ul = d('poddo_UL');

    let bestoftoday_Ul_arr = [];
    let goddo_UL_arr = [];
    let poddo_UL_arr = [];
    for (let o of j) {
        if (o._type == 'type_goddo') {
            goddo_UL_arr.push(o);
            bestoftoday_Ul_arr.push(o);
        }
        if (o._type == 'type_poddo') {
            poddo_UL_arr.push(o);
            bestoftoday_Ul_arr.push(o);
        }
    }
    for (let x of bestoftoday_Ul_arr) {
        let el_bestOFTODAY = document.createElement('li');
        el_bestOFTODAY.innerHTML = `<div class="c1">
            <img src="${x.img}" alt="">
            <span class="_title"><a style="text-decoration:none; color:grey;" href="http://localhost:3000/view?i=${x.id}">${x._title}</a> <span class="_tag">(${x._type == 'type_goddo' ? '(গদ্য)' : '(পদ্য)'})</span></span>
            <span class="_document">
            ${x._document.substr(0, 150)}...</span>
        </div>`
//http://localhost:3060/shoreo/view?i=robithakur1
        bestoftoday_Ul.appendChild(el_bestOFTODAY);
    }
    for (let x of goddo_UL_arr) {
        let el_goddo = document.createElement('li');
        el_goddo.innerHTML = `<div class="c1">
            <img src="${x.img}" alt="">
            <span class="_title"><a style="text-decoration:none; color:grey;" href="http://localhost:3000/view?i=${x.id}">${x._title}</a> <span class="_tag">(${x._type == 'type_goddo' || 'type_comic' ? '(গদ্য)' : '(পদ্য)'})</span></span>
            <span class="_document">
            ${x._document.substr(0, 150)}...</span>
        </div>`

        goddo_UL.appendChild(el_goddo);
    }
    for (let x of poddo_UL_arr) {
        let el_poddo = document.createElement('li');
        el_poddo.innerHTML = `<div class="c1">
            <img src="${x.img}" alt="">
            <span class="_title"><a style="text-decoration:none; color:grey;" href="http://localhost:3000/view?i=${x.id}">${x._title}</a> <span class="_tag">(${x._type == 'type_goddo' ? '(গদ্য)' : '(পদ্য)'})</span></span>
            <span class="_document">
            ${x._document.substr(0, 150)}...</span>
        </div>`

        poddo_Ul.appendChild(el_poddo);
    }
}).catch(e => {
    console.log(e);
})