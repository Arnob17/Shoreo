module.exports = function (knex) {
    let letters_small = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let letters_capital = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    async function generator(a, b, c) {
        let w = [a, b, c];
        let users = await knex('users');
        let token = [];
        for (let i = 0; i < (47 + Math.floor(Math.random(7))); i++) {
            let j = w[(Math.floor(Math.random() * w.length))];
            token.push(j[(Math.floor(Math.random() * j.length))]);
        }
        let string = token.join('');
        for (let x of users) {
            if (x.token === string) {
                return (x.token, string);
            }
        }
        return string;
    }

    return generator(letters_capital, letters_small, numbers);
}