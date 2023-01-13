let components = [
    {
        className: 'navbar',
        html: `<nav>
        <ul>
            <!-- <a class="_favText" id="_favText"> অ </a> -->
            <li class="_favico_main"><img id="_favico" src="../../../../static/src/lg4.png" onclick="window.location.href='/'" alt="logo"></li>
            <li> <a id="1" href="/biggan"> বিজ্ঞান </a> </li>
            <li> <a id="2" href="/shahitto"> সাহিত্য </a> </li>
            <li> <a id="3" href="/tech"> প্রযুক্তি </a> </li>
            <!-- <i title="Ask a Question" class="fa-solid fa-q" id="_Ask"></i>
            <i title="Write a post" class="fa-solid fa-plus" id="_upload"></i> -->
            <li class="Iu" id="_iU"> <img id="_pfp" style="cursor: pointer;"src=""alt=""> </li>
        </ul>
    </nav>`
    }
];

for (let x of components) {
    let page_Question = new Page_Question(x.className);

    page_Question.build(() => {
        return `${x.html}`
    })
}