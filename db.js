module.exports = async function (knex) {
  await knex.schema
  .createTable('users', table => {
    table.increments('id');
    table.string('user_name');
    table.string('role');
    table.string('password');
    table.string('img');
    table.string('is_verified');
    table.string('userid');
  })
}