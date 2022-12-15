let keys = [
    '1010114', 'fsfsd8sud8suhHhh77n', '9ji8JMbsjbniBNHba', 'ijsdj8JimasKNknakmimk'
]
module.exports = 
class {
    constructor (id, token) {
        this.id = id;
        this.token = keys.includes(token) ? token : 'Invalid_Token';
    }

    async getUserName() {
        if (this.token==='Invalid_Token') {throw new Error('Token Is invalid')}
        let x = await knex('users').where({userid: this.id});
        return x[0].user_name;
    }

    async getAvatar() {
        if (this.token==='Invalid_Token') {throw new Error('Token Is invalid')}
        let x = await knex('users').where({userid: this.id});
        return x[0].img;
    }
}