function d(id) {
    return document.getElementById(id);
}

class Page_Question {
    constructor (className) {
        this.className = className;
    }

    build(html) {
        let element = document.createElement('div');
        element.className = this.className;

        element.innerHTML = html();

        d('root').appendChild(element);
    }
}