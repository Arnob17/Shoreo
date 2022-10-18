function o() {
    let i = 0;
    let l = ['অনু','অংকন', 'অর্ণব', 'অভ্র', 'অর্ক', 'অল্প', 'অংক', 'অনন্ত', 'অসীম'];
    document.getElementById('_favText').innerText = `${l[Math.floor(Math.random() * l.length)]}`
}
function d (id) {return document.getElementById(id);}
let en = d('_lang_eng');let jp = d('_lang_japanese');let kr = d('_lang_korean');
function langClick (d, l)
{
    d.addEventListener('click', () => {
        localStorage.setItem('language',`${l}`);
    });
}
langClick(en, 'en'); langClick(jp, 'jp'); langClick(kr, 'kr');


let j = localStorage.getItem('userName') || false;
let i = localStorage.getItem('userImg') || false;
let id = localStorage.getItem('userId') || false;

if (
    localStorage.getItem('userName')
) {

    window.location.href=`/feed`

}