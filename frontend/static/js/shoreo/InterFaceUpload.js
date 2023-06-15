function d (id) {
    return document.getElementById(id);
}
let _title = d('fname');
let _mainText = d('maintext');
let submit = d('_submit');
let img = d('img');
let userid = localStorage.getItem('userId');
submit.addEventListener('click', () => {

    if (_title.value.length <= 1) {
        _title.style.outline = `3px solid red`
        return console.log('failed, code:101');
    }
    if (_mainText.value.length <= 100) {
        _mainText.style.outline = `3px solid red`
        return console.log('failed, code:102');
    }

    console.log({
        title: `${_title.value}`,
        main: `${_mainText.value}`
    })

    let catagories = d('catagory_names');

    let catagory_selected = catagories.value;
    console.log(catagory_selected);
    if (!catagory_selected == 'science_and_technology' && 'literature' && 'socity' && 'philosophy_and_history') {
        return;
    }

    console.log(catagory_selected);
    var now = new Date();
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(); 
    let json = {
        document: `${_mainText.value}`, authorid: userid, _type: '_poem', title: `${_title.value}`, gtag: `${catagory_selected}`, time: `${time}`, servertime: `${new Date().getTime()}`
    }

    fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {  
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => response.json()).then(x => {console.log(x); window.location.href=`/`});

})