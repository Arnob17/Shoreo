module.exports = function () {
    let letters_small = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let letters_capital = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let numbers = [0,1,2,3,4,5,6,7,8,9];

    function generator(a, b, c) {
        let w = [a,b,c];
        let token = [];
        for (let i=0; i<(10+Math.random(7)); i++){
            let j = w[Math.random((w.length-1))];
            token.push(j[Math.random((j.length-1))]);
        }
        let string = token.join('');
        return console.log(string);
    }

    return generator(letters_capital, letters_small, numbers);
}