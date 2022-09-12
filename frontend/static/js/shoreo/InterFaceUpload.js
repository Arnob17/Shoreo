function d (id) {
    return document.getElementById(id);
}
let _title = d('fname');
let _mainText = d('maintext');
let submit = d('_submit');

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

})